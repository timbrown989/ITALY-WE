import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Flag, ImagePlus, Send } from "lucide-react";
import { loadFeed, publishPost, reportSocialItem } from "@/lib/social.functions";

export const Route = createFileRoute("/feed")({ component: FeedPage });
type Post = Awaited<ReturnType<typeof loadFeed>>[number];

function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState("");
  const [imageData, setImageData] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh() {
    try { setPosts(await loadFeed()); setError(""); }
    catch { setError("Sign in to view and post in the community."); }
  }
  useEffect(() => { void refresh(); }, []);

  function choosePhoto(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2_000_000) {
      setError("Choose an image smaller than 2 MB."); return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageData(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  }

  async function publish() {
    setBusy(true); setError(""); setNotice("");
    try {
      await publishPost({ data: { body, imageData } });
      setBody(""); setImageData(""); await refresh(); setNotice("Your post is live.");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not publish."); }
    finally { setBusy(false); }
  }

  async function report(post: Post) {
    const reason = window.prompt("Report reason: spam, scam, fake identity, harassment, or other.");
    if (!reason?.trim()) return;
    try {
      await reportSocialItem({ data: { targetType: "post", targetId: String(post.id), reason } });
      setNotice("Report sent to the safety team.");
    } catch { setError("Could not send your report."); }
  }

  return <main className="min-h-dvh bg-bg text-fg">
    <header className="sticky top-0 z-10 border-b border-line bg-bg/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-sm text-muted"><ArrowLeft size={17}/> Italy We</a>
        <h1 className="font-display text-2xl">The piazza</h1>
        <a href="/admin" className="text-xs text-muted underline">Owner</a>
      </div>
    </header>
    <div className="mx-auto max-w-2xl px-4 py-6">
      <section className="rounded-3xl border border-line bg-surface p-5">
        <p className="font-display text-2xl">What’s on your mind?</p>
        <textarea className="field mt-4 min-h-28" maxLength={2000} value={body} onChange={e=>setBody(e.target.value)} placeholder="Share a thought, a moment, a photo…"/>
        {imageData && <img src={imageData} alt="Selected post" className="mt-3 max-h-72 w-full rounded-2xl object-cover"/>}
        <div className="mt-4 flex items-center justify-between gap-3">
          <label className="btn btn-line cursor-pointer"><ImagePlus size={16}/> Photo<input className="sr-only" type="file" accept="image/*" onChange={e=>choosePhoto(e.target.files?.[0])}/></label>
          <button className="btn btn-clay" disabled={busy || (!body.trim() && !imageData)} onClick={()=>void publish()}>{busy ? "Posting…" : "Publish"} <Send size={15}/></button>
        </div>
      </section>
      {notice && <p className="mt-4 text-sm text-emerald-700">{notice}</p>}
      {error && <p className="mt-4 text-sm text-clay">{error}</p>}
      <div className="mt-6 space-y-4">
        {posts.map(post=><article key={post.id} className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="flex items-center gap-3 p-4">
            {post.avatar ? <img src={post.avatar} alt="" className="size-11 rounded-full object-cover"/> : <div className="size-11 rounded-full bg-raised"/>}
            <div className="min-w-0 flex-1"><p className="font-medium">{post.name}</p><p className="text-xs text-muted">{post.city} · {new Date(post.createdAt).toLocaleString()}</p></div>
            {!post.mine && <button className="text-muted" aria-label="Report post" onClick={()=>void report(post)}><Flag size={17}/></button>}
          </div>
          {post.body && <p className="whitespace-pre-wrap px-4 pb-4 leading-relaxed">{post.body}</p>}
          {post.imageData && <img src={post.imageData} alt="Community post" className="max-h-[34rem] w-full object-cover"/>}
        </article>)}
        {!posts.length && !error && <div className="rounded-3xl border border-dashed border-line p-10 text-center"><p className="font-display text-2xl">A new piazza begins here.</p><p className="mt-2 text-sm text-muted">Be the first to share something with the community.</p></div>}
      </div>
    </div>
  </main>;
}
