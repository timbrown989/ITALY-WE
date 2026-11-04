import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck, Users, FileText, Flag, Ban, Check } from "lucide-react";
import { loadAdminDashboard, moderateSocialItem } from "@/lib/social.functions";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [data,setData]=useState<Awaited<ReturnType<typeof loadAdminDashboard>>|null>(null);
  const [error,setError]=useState("");
  const [busy,setBusy]=useState("");
  async function refresh(){try{setData(await loadAdminDashboard());setError("");}catch(e){setError(e instanceof Error?e.message:"Administrator access required.");}}
  useEffect(()=>{void refresh();},[]);
  async function act(action:"hide_post"|"suspend_user"|"restore_user"|"resolve_report"|"dismiss_report",targetId:string){
    setBusy(targetId+action);
    try{await moderateSocialItem({data:{action,targetId}});await refresh();}
    catch(e){setError(e instanceof Error?e.message:"Action failed.");}
    finally{setBusy("");}
  }
  return <main className="min-h-dvh bg-bg px-4 py-6 text-fg">
    <div className="mx-auto max-w-5xl">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16}/> Back to Italy We</a>
      <div className="mt-6 flex items-center gap-3"><ShieldCheck size={28}/><div><h1 className="font-display text-4xl">Owner console</h1><p className="text-sm text-muted">Private trust, safety and community operations</p></div></div>
      {error && <div className="mt-6 rounded-2xl border border-clay p-4 text-sm">{error.includes("Forbidden")||error.includes("Unauthorized")?"This account is not authorized. Set ITALY_WE_ADMIN_EMAILS in your hosting environment to the exact owner login email, then sign in again.":error}</div>}
      {data && <>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Metric icon={<Users/>} label="Members" value={data.stats.members}/>
          <Metric icon={<FileText/>} label="Visible posts" value={data.stats.posts}/>
          <Metric icon={<Flag/>} label="Open reports" value={data.stats.openReports}/>
        </div>
        <section className="mt-8"><h2 className="font-display text-2xl">Safety reports</h2><div className="mt-3 space-y-3">
          {data.reports.map((r:any)=><article key={r.id} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">#{r.id} · {r.target_type} · {r.reason}</p><span className="text-xs text-muted">{r.status}</span></div>
            {r.details&&<p className="mt-2 text-sm text-muted">{r.details}</p>}
            <p className="mt-2 text-xs text-muted">Target: {r.target_id} · {new Date(r.created_at).toLocaleString()}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.target_type==="post"&&<button className="btn btn-line" disabled={!!busy} onClick={()=>void act("hide_post",r.target_id)}><Ban size={14}/> Hide post</button>}
              {r.target_type==="profile"&&<button className="btn btn-line" disabled={!!busy} onClick={()=>void act("suspend_user",r.target_id)}><Ban size={14}/> Suspend account</button>}
              <button className="btn btn-line" disabled={!!busy} onClick={()=>void act("resolve_report",String(r.id))}><Check size={14}/> Resolve</button>
              <button className="btn btn-line" disabled={!!busy} onClick={()=>void act("dismiss_report",String(r.id))}>Dismiss</button>
            </div>
          </article>)}
          {!data.reports.length&&<p className="rounded-2xl border border-dashed border-line p-6 text-sm text-muted">No reports yet.</p>}
        </div></section>
        <section className="mt-8"><h2 className="font-display text-2xl">Recently updated members</h2><div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {data.recent.map((u:any)=><div key={u.user_id} className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="font-medium">{u.name}</p><p className="text-xs text-muted">{u.city} · {u.user_id}</p></div><button className="btn btn-line" disabled={!!busy} onClick={()=>void act("suspend_user",u.user_id)}><Ban size={14}/> Suspend</button></div>)}
        </div></section>
      </>}
      {!data&&!error&&<p className="mt-8 text-sm text-muted">Loading secure owner dashboard…</p>}
    </div>
  </main>;
}
function Metric({icon,label,value}:{icon:React.ReactNode;label:string;value:number}){return <div className="rounded-2xl border border-line bg-surface p-5"><div className="flex items-center gap-2 text-muted">{icon}<span className="text-sm">{label}</span></div><p className="mt-3 font-display text-4xl">{value}</p></div>}
