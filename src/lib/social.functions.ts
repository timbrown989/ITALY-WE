import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSessionUser } from "@/lib/auth/verify.server";
import { getSql } from "@/lib/db";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const loadFeed = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql`
      select p.id, p.user_id, u.name, u.city, u.avatar, p.body, p.image_data, p.created_at
      from social_posts p join profiles u on u.user_id = p.user_id
      left join social_user_status s on s.user_id = p.user_id
      where p.hidden = false and coalesce(s.status, 'active') = 'active'
      order by p.created_at desc limit 100
    `;
    return rows.map((r: any) => ({
      id: Number(r.id), userId: r.user_id, name: r.name, city: r.city,
      avatar: r.avatar, body: r.body, imageData: r.image_data,
      createdAt: r.created_at, mine: r.user_id === context.userId,
    }));
  });

export const publishPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { body: string; imageData?: string }) => ({
    body: clean(input?.body, 2000), imageData: clean(input?.imageData, 280000),
  }))
  .handler(async ({ context, data }) => {
    if (!data.body && !data.imageData) throw new Error("Write something or add a photo.");
    if (data.imageData && !data.imageData.startsWith("data:image/")) throw new Error("Use a valid image.");
    const sql = await getSql();
    const profile = await sql`select complete from profiles where user_id = ${context.userId} limit 1`;
    if (!profile[0]?.complete) throw new Error("Complete your profile before posting.");
    const status = await sql`select status from social_user_status where user_id = ${context.userId} limit 1`;
    if (status[0]?.status === "suspended") throw new Error("This account is currently restricted.");
    const inserted = await sql`insert into social_posts (user_id, body, image_data) values (${context.userId}, ${data.body}, ${data.imageData}) returning id`;
    return { id: Number(inserted[0].id) };
  });

export const reportSocialItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { targetType: "post" | "profile"; targetId: string; reason: string; details?: string }) => ({
    targetType: input?.targetType, targetId: clean(input?.targetId, 80),
    reason: clean(input?.reason, 80), details: clean(input?.details, 500),
  }))
  .handler(async ({ context, data }) => {
    if (!["post", "profile"].includes(data.targetType) || !data.targetId || !data.reason) throw new Error("Choose a report reason.");
    if (data.targetType === "post" && !/^\d+$/.test(data.targetId)) throw new Error("Invalid post.");
    if (data.targetId === context.userId) throw new Error("You cannot report yourself.");
    const sql = await getSql();
    await sql`insert into social_reports (reporter_id, target_type, target_id, reason, details) values (${context.userId}, ${data.targetType}, ${data.targetId}, ${data.reason}, ${data.details})`;
    return { submitted: true };
  });

async function requireAdmin(bearerToken?: string) {
  const user = await getSessionUser(bearerToken);
  const allowlist = (process.env.ITALY_WE_ADMIN_EMAILS ?? "").split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !allowlist.includes(user.email.toLowerCase())) throw new Error("Forbidden: administrator access is not configured for this account.");
  return user;
}

export const loadAdminDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.bearerToken);
    const sql = await getSql();
    const [members, posts, openReports, reports, recent] = await Promise.all([
      sql`select count(*)::int as count from profiles where sample = false`,
      sql`select count(*)::int as count from social_posts where hidden = false`,
      sql`select count(*)::int as count from social_reports where status = 'open'`,
      sql`select id, target_type, target_id, reason, details, status, created_at from social_reports order by created_at desc limit 100`,
      sql`select user_id, name, city, updated_at from profiles where sample = false order by updated_at desc limit 30`,
    ]);
    return { stats: { members: Number(members[0]?.count ?? 0), posts: Number(posts[0]?.count ?? 0), openReports: Number(openReports[0]?.count ?? 0) }, reports, recent };
  });

export const moderateSocialItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { action: "hide_post" | "suspend_user" | "restore_user" | "resolve_report" | "dismiss_report"; targetId: string }) => ({
    action: input?.action, targetId: clean(input?.targetId, 80),
  }))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.bearerToken);
    const sql = await getSql();
    if (data.action === "hide_post") {
      if (!/^\d+$/.test(data.targetId)) throw new Error("Invalid post.");
      await sql`update social_posts set hidden = true where id = ${Number(data.targetId)}`;
    } else if (data.action === "suspend_user" || data.action === "restore_user") {
      await sql`insert into social_user_status (user_id, status, reason, updated_at) values (${data.targetId}, ${data.action === "suspend_user" ? "suspended" : "active"}, ${data.action === "suspend_user" ? "Administrator moderation" : ""}, now()) on conflict (user_id) do update set status = excluded.status, reason = excluded.reason, updated_at = now()`;
    } else if (data.action === "resolve_report" || data.action === "dismiss_report") {
      if (!/^\d+$/.test(data.targetId)) throw new Error("Invalid report.");
      await sql`update social_reports set status = ${data.action === "resolve_report" ? "resolved" : "dismissed"}, reviewed_at = now() where id = ${Number(data.targetId)}`;
    } else throw new Error("Unsupported moderation action.");
    return { success: true };
  });
