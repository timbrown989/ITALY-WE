import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  AtSign,
  BookOpen,
  Compass,
  Facebook,
  Ghost,
  Gift,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Pencil,
  Phone,
  RotateCcw,
  Send,
  ThumbsUp,
  UserRound,
  X,
} from "lucide-react";
import { askToMeet, connectTelegram, linkTelegramChat, loadNetwork, loadThread, passOn, resetPasses, saveMine, sendMessage, telegramStatus, type ChatLine, type NetworkCard, type NetworkState, type TelegramLink } from "@/lib/network.functions";
import {
  BODIES,
  CHILDREN,
  DRINKING,
  EDUCATIONS,
  ETHNICITIES,
  GENDERS,
  HEIGHTS,
  HOBBIES,
  LOOKING,
  RELATIONSHIPS,
  SMOKING,
} from "@/data/profile-fields";
import { signIn, signInWithTelegram } from "@/lib/auth/client";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  BIO_MIN,
  emptyProfile,
  hasReach,
  isComplete,
  profileScore,
  useItaly,
  validateProfile,
  type FieldErrors,
  type Profile,
} from "@/lib/italy-store";

type Tab = "meet" | "messages" | "you";
type Leave = { id: string; dir: "pass" | "meet" };

export function ItalyApp() {
  const hydrated = useItaly((state) => state.hydrated);
  const hydrate = useItaly((state) => state.hydrate);
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated || !user || user.isDevFallback) return;
    const profile = useItaly.getState().profile;
    const name = user.displayName?.trim() ?? "";
    const next = { ...profile };
    let changed = false;
    if (!profile.name.trim() && name.length >= 2 && name.length <= 40) {
      next.name = name;
      changed = true;
    }
    if (!profile.avatar && user.profileImageUrl) {
      next.avatar = user.profileImageUrl;
      changed = true;
    }
    if (changed) useItaly.getState().saveProfile(next);
  }, [hydrated, user]);

  let screen: ReactNode;
  if (!hydrated || isPending) screen = <Cover pending />;
  else if (!user) screen = <XSignIn />;
  else screen = <Experience />;

  return (
    <div className="app-split bg-bg text-fg">
      <Poster />
      <div className="flex min-h-dvh flex-col md:border-l md:border-line">{screen}</div>
    </div>
  );
}

function Poster() {
  return (
    <aside className="relative hidden min-h-dvh md:block">
      <img
        src="/portraits/sofia.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="relative flex h-full flex-col justify-end">
        <div className="max-w-xl bg-bg px-10 py-10">
          <p className="text-sm tracking-wide text-muted">Italy We</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-fg">
            Meet someone after you say who you are.
          </h1>
          <ul className="mt-6 space-y-3 text-base text-muted">
            <li>A biography, long enough to be a person.</li>
            <li>A way to reach you, shared only when you both agree.</li>
            <li>One network. Other people see you after you finish.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

function Experience() {
  const profile = useItaly((state) => state.profile);
  const seenIntro = useItaly((state) => state.seenIntro);
  const complete = isComplete(profile);

  if (!complete && !seenIntro) return <Cover />;
  if (!complete) return <Gate initial={profile} />;
  return <Lounge />;
}

function XSignIn() {
  const [pending, setPending] = useState<"x" | "telegram" | null>(null);
  const [error, setError] = useState("");

  return (
    <main className="flex flex-1 flex-col justify-between px-6 py-8 safe-bottom">
      <p className="font-display text-2xl">Italy We</p>
      <div>
        <h1 className="font-display text-5xl leading-tight">Sign in.</h1>
        <p className="mt-6 text-base leading-relaxed text-muted">
          X or Telegram is how Italy We knows it is you. You still write a biography before anyone
          can meet. X does not send the @username, so you type that on your profile.
        </p>
      </div>
      <div>
        {error && <p className="mb-3 text-sm text-clay">{error}</p>}
        <button
          type="button"
          className="btn btn-clay w-full"
          disabled={pending !== null}
          onClick={() => {
            setPending("x");
            setError("");
            void signIn("grok-x", { callbackURL: "/" }).catch((reason: unknown) => {
              setPending(null);
              const message = reason instanceof Error ? reason.message : "";
              setError(
                message.toLowerCase().includes("pop-up")
                  ? "Allow pop-ups, then try Continue with X again."
                  : "Sign-in did not finish. Try again.",
              );
            });
          }}
        >
          {pending === "x" ? "Opening X…" : "Continue with X"}
        </button>
        <button
          type="button"
          className="btn btn-line mt-3 w-full"
          disabled={pending !== null}
          onClick={() => {
            setPending("telegram");
            setError("");
            void signInWithTelegram("/").catch((reason: unknown) => {
              setPending(null);
              const message = reason instanceof Error ? reason.message : "";
              setError(message || "Telegram sign-in did not finish. Try again.");
            });
          }}
        >
          {pending === "telegram" ? "Opening Telegram…" : "Continue with Telegram"}
        </button>
        <p className="mt-4 text-center text-sm text-muted">
          <a className="underline" href="/privacy">
            Privacy policy
          </a>
        </p>
      </div>
    </main>
  );
}

function Cover({ pending = false }: { pending?: boolean }) {
  const setSeenIntro = useItaly((state) => state.setSeenIntro);

  return (
    <main className="flex flex-1 flex-col justify-between px-6 py-8 safe-bottom">
      <p className="font-display text-2xl">Italy We</p>
      <div>
        <h1 className="font-display text-5xl leading-tight">
          Say who you are. Then meet someone.
        </h1>
        <ul className="mt-8 space-y-5">
          <Rule
            icon={<BookOpen className="size-5" aria-hidden="true" />}
            title="Biography"
            body={`At least ${BIO_MIN} characters. A headline is not enough to meet.`}
          />
          <Rule
            icon={<Phone className="size-5" aria-hidden="true" />}
            title="Contact"
            body="WhatsApp, Telegram, X, email, or a phone. Hidden until you both agree to meet."
          />
        </ul>
      </div>
      {pending ? (
        <div className="h-12 animate-pulse rounded-full bg-raised" aria-hidden="true" />
      ) : (
        <button type="button" className="btn btn-clay w-full" onClick={() => setSeenIntro(true)}>
          Begin
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </main>
  );
}

function Rule({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 text-clay">{icon}</span>
      <span>
        <span className="block font-medium text-fg">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{body}</span>
      </span>
    </li>
  );
}

function Gate({ initial }: { initial: Profile }) {
  const saveProfile = useItaly((state) => state.saveProfile);
  const setSeenIntro = useItaly((state) => state.setSeenIntro);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Profile>(initial);
  const [tried, setTried] = useState(false);

  const errors = validateProfile(draft);
  const visible = stepErrors(step, errors);
  const show = tried ? visible : {};

  function goNext() {
    if (Object.keys(visible).length > 0) {
      setTried(true);
      return;
    }
    setTried(false);
    saveProfile(draft, true);
    if (step < 3) setStep(step + 1);
    else void saveMine({ data: draft }).catch(() => undefined);
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col px-6 py-8 safe-bottom">
      <div className="flex items-center justify-between">
        <p className="font-display text-xl">Italy We</p>
        <p className="text-sm tabular-nums text-muted">0{step} / 03</p>
      </div>
      <div className="mt-8 min-h-0 flex-1 overflow-y-auto">
        {step === 1 && (
          <>
            <h1 className="font-display text-4xl leading-tight">Who should they meet?</h1>
            <p className="mt-3 text-muted">Your name, your age, and the city you are actually in.</p>
            <div className="mt-8 space-y-5">
              <Field
                label="Name"
                value={draft.name}
                error={show.name}
                autoComplete="name"
                onChange={(name) => setDraft({ ...draft, name })}
              />
              <Field
                label="Age"
                value={draft.age}
                error={show.age}
                inputMode="numeric"
                onChange={(age) => setDraft({ ...draft, age: age.replace(/\D/g, "").slice(0, 2) })}
              />
              <Field
                label="City"
                value={draft.city}
                error={show.city}
                autoComplete="address-level2"
                onChange={(city) => setDraft({ ...draft, city })}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="font-display text-4xl leading-tight">Your biography</h1>
            <p className="mt-3 text-muted">
              Write where you spend your time and what kind of meeting you want. {BIO_MIN}{" "}
              characters opens the door.
            </p>
            <label className="mt-8 block">
              <span className="flex items-baseline justify-between text-sm text-muted">
                Biography
                <span className={draft.bio.trim().length >= BIO_MIN ? "text-muted" : "text-clay"}>
                  {draft.bio.trim().length} / {BIO_MIN}
                </span>
              </span>
              <textarea
                className="field mt-2 min-h-48"
                value={draft.bio}
                maxLength={600}
                onChange={(event) => setDraft({ ...draft, bio: event.target.value })}
              />
              {show.bio && <span className="mt-2 block text-sm text-clay">{show.bio}</span>}
            </label>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="font-display text-4xl leading-tight">How can they reach you?</h1>
            <p className="mt-3 text-muted">
              One is enough. WhatsApp, Telegram, and X stay hidden until you both agree to meet.
            </p>
            <div className="mt-8 space-y-5">
              <Field
                label="WhatsApp number"
                type="tel"
                value={draft.whatsapp}
                error={show.whatsapp}
                autoComplete="tel"
                onChange={(whatsapp) => setDraft({ ...draft, whatsapp })}
              />
              <Field
                label="Telegram username"
                value={draft.telegram}
                error={show.telegram}
                onChange={(telegram) => setDraft({ ...draft, telegram })}
              />
              <Field
                label="X username"
                value={draft.x}
                error={show.x}
                onChange={(xName) => setDraft({ ...draft, x: xName })}
              />
              <p className="-mt-2 text-sm text-muted">
                Sign-in does not fill this. Type the @username you want people to see.
              </p>
              <Field
                label="Email"
                type="email"
                value={draft.email}
                error={show.email}
                autoComplete="email"
                onChange={(email) => setDraft({ ...draft, email })}
              />
              <Field
                label="Phone"
                type="tel"
                value={draft.phone}
                error={show.phone}
                autoComplete="tel"
                onChange={(phone) => setDraft({ ...draft, phone })}
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-auto flex gap-3 pt-8">
        <button
          type="button"
          className="btn btn-line"
          onClick={() => {
            setTried(false);
            if (step === 1) setSeenIntro(false);
            else setStep(step - 1);
          }}
        >
          Back
        </button>
        <button type="button" className="btn btn-clay flex-1" onClick={goNext}>
          {step === 3 ? "Open the piazza" : "Continue"}
        </button>
      </div>
    </main>
  );
}

function stepErrors(step: number, errors: FieldErrors): FieldErrors {
  if (step === 1) return pick(errors, ["name", "age", "city"]);
  if (step === 2) return pick(errors, ["bio"]);
  return pick(errors, ["email", "phone", "whatsapp", "telegram", "x"]);
}

function pick(errors: FieldErrors, keys: (keyof Profile)[]): FieldErrors {
  const next: FieldErrors = {};
  for (const key of keys) {
    if (errors[key]) next[key] = errors[key];
  }
  return next;
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel";
  required?: boolean;
}) {
  return (
    <label className="mt-5 block">
      <span className="text-sm text-muted">
        {label}
        {required && <span className="text-clay">*</span>}
      </span>
      <input
        className="field mt-2"
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="mt-2 block text-sm text-clay">{error}</span>}
    </label>
  );
}

function Lounge() {
  const profile = useItaly((state) => state.profile);
  const saveProfile = useItaly((state) => state.saveProfile);
  const [tab, setTab] = useState<Tab>("meet");
  const [net, setNet] = useState<NetworkState | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    const next = await loadNetwork();
    setNet(next);
    if (next.profile) saveProfile(next.profile, true);
    return next;
  }

  useEffect(() => {
    let live = true;
    void (async () => {
      try {
        const first = await loadNetwork();
        if (!live) return;
        if (!first.profile && isComplete(profile)) {
          await saveMine({ data: profile });
          const second = await loadNetwork();
          if (live) setNet(second);
        } else {
          if (first.profile) saveProfile(first.profile, true);
          setNet(first);
        }
      } catch {
        if (live) setError("The piazza could not open. Try again in a moment.");
      }
    })();
    return () => {
      live = false;
    };
    // Load once when the lounge opens. Later saves refresh explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col">
        {error && <p className="px-5 pt-5 text-sm text-clay">{error}</p>}
        {tab === "meet" && (
          <Discover
            city={profile.city}
            deck={net?.deck ?? []}
            ready={Boolean(net)}
            onRefresh={refresh}
          />
        )}
        {tab === "messages" && <Messages meetings={net?.meetings ?? []} incoming={net?.incoming ?? []} onRefresh={refresh} />}
        {tab === "you" && <You onShared={refresh} />}
      </div>
      <nav className="grid grid-cols-4 border-t border-line px-2 pt-2 safe-bottom">
        <NavButton active={tab === "meet"} onClick={() => setTab("meet")} label="Meet">
          <Compass className="size-5" aria-hidden="true" />
        </NavButton>
        <NavButton active={tab === "messages"} onClick={() => setTab("messages")} label="Messages">
          <MessageCircle className="size-5" aria-hidden="true" />
        </NavButton>
        <NavButton active={tab === "you"} onClick={() => setTab("you")} label="You">
          <UserRound className="size-5" aria-hidden="true" />
        </NavButton>
        <a href="/feed" className="flex min-h-12 flex-col items-center justify-center gap-1 text-xs text-muted">
          <MessageCircle className="size-5" aria-hidden="true" />
          Feed
        </a>
      </nav>
    </div>
  );
}

function NavButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 flex-col items-center justify-center gap-1 text-xs ${
        active ? "text-fg" : "text-muted"
      }`}
    >
      {children}
      {label}
    </button>
  );
}

function Discover({
  city,
  deck,
  ready,
  onRefresh,
}: {
  city: string;
  deck: NetworkCard[];
  ready: boolean;
  onRefresh: () => Promise<NetworkState>;
}) {
  const [leave, setLeave] = useState<Leave | null>(null);
  const [reading, setReading] = useState<NetworkCard | null>(null);
  const [reveal, setReveal] = useState<NetworkCard | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [women, setWomen] = useState(true);
  const [nearby, setNearby] = useState(true);
  const mine = city.trim().toLowerCase();
  const pool = deck.filter((person) => !women || person.gender === "Female");
  const near = pool.filter((person) => mine.length > 0 && person.city.trim().toLowerCase() === mine);
  const shown = nearby ? (near.length > 0 ? near : pool) : pool;
  const relaxed = nearby && near.length === 0 && pool.length > 0;
  const current = shown[0];

  useEffect(() => {
    if (!note) return;
    const timer = window.setTimeout(() => setNote(null), 3200);
    return () => window.clearTimeout(timer);
  }, [note]);

  function act(dir: "pass" | "meet") {
    if (!current || leave || busy) return;
    setLeave({ id: current.id, dir });
    window.setTimeout(() => {
      void (async () => {
        setBusy(true);
        try {
          if (dir === "pass") {
            await passOn({ data: current.id });
          } else {
            const result = await askToMeet({ data: current.id });
            if (result.agreed && result.contact) {
              setReveal({ ...current, accepts: true, contact: result.contact });
            } else {
              setNote(`${current.name.split(" ")[0]} will read your biography before answering.`);
            }
          }
          await onRefresh();
        } catch {
          setNote("That did not reach the network. Try again.");
        } finally {
          setBusy(false);
          setLeave(null);
          setReading(null);
        }
      })();
    }, 260);
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-end justify-between px-5 pt-5 pb-3">
        <div>
          <p className="font-display text-2xl leading-none">Italy We</p>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted">
            <MapPin className="size-3.5" aria-hidden="true" />
            {relaxed
              ? `No women in ${city.trim() || "your city"} yet`
              : women && nearby
                ? `Women nearby · ${city.trim() || "your city"}`
                : women
                  ? "Women"
                  : `Everyone · ${city.trim() || "your city"}`}
          </p>
        </div>
        <p className="text-sm tabular-nums text-muted">{ready ? `${shown.length} left` : "…"}</p>
      </header>
      <div className="flex gap-2 px-5 pb-3">
        <button
          type="button"
          aria-pressed={women}
          className={`rounded-full px-4 py-2 text-sm ${women ? "bg-clay text-clay-deep" : "border border-line"}`}
          onClick={() => setWomen((on) => !on)}
        >
          Women
        </button>
        <button
          type="button"
          aria-pressed={nearby}
          className={`rounded-full px-4 py-2 text-sm ${nearby ? "bg-clay text-clay-deep" : "border border-line"}`}
          onClick={() => setNearby((on) => !on)}
        >
          Nearby
        </button>
      </div>
      {note && (
        <p className="mx-5 mb-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted">
          {note}
        </p>
      )}
      <div className="min-h-0 flex-1 px-4">
        {!ready ? (
          <div className="flex h-full items-center justify-center rounded-card border border-line bg-surface px-6 text-muted">
            Opening the piazza…
          </div>
        ) : !current ? (
          <EmptyDeck onReset={() => void resetPasses().then(() => onRefresh())} />
        ) : (
          <article
            className={`flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface ${
              leave?.id === current.id ? (leave.dir === "pass" ? "leave-pass" : "leave-meet") : ""
            }`}
          >
            <div className="relative min-h-0 flex-1">
              <img
                src={current.photo}
                alt={`Portrait of ${current.name}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {current.sample && (
                <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-fg">Sample</span>
              )}
            </div>
            <div className="px-4 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl leading-none">
                  {current.name.split(" ")[0]}, {current.age}
                </h2>
                <span className="text-sm text-muted">
                  {mine && current.city.trim().toLowerCase() === mine ? "Nearby · " : ""}
                  {current.city}
                </span>
              </div>
              <p className="mt-2 text-sm text-clay">{current.role}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{current.bio}</p>
              <button
                type="button"
                className="mt-3 text-sm text-muted underline decoration-line underline-offset-4"
                onClick={() => setReading(current)}
              >
                Read the biography
              </button>
            </div>
          </article>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <button type="button" className="btn btn-line" disabled={!current || busy} onClick={() => act("pass")}>
          <X className="size-4" aria-hidden="true" />
          Pass
        </button>
        <button type="button" className="btn btn-clay" disabled={!current || busy} onClick={() => act("meet")}>
          Ask to meet
        </button>
      </div>
      {reading && (
        <Sheet title={`${reading.name}, ${reading.age}`} onClose={() => setReading(null)}>
          <p className="text-sm text-clay">
            {reading.role} · {reading.city}
          </p>
          <p className="mt-4 leading-relaxed">{reading.bio}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {reading.interests.map((interest) => (
              <li key={interest} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {interest}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Contact stays hidden until {reading.name.split(" ")[0]} agrees to meet.
          </p>
          <button type="button" className="btn btn-clay mt-6 w-full" onClick={() => act("meet")}>
            Ask to meet
          </button>
        </Sheet>
      )}
      {reveal && (
        <Sheet title={`${reveal.name.split(" ")[0]} agreed to meet`} onClose={() => setReveal(null)}>
          <ContactBlock person={reveal} />
        </Sheet>
      )}
    </section>
  );
}

function EmptyDeck({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-card border border-line bg-surface px-6 py-10">
      <h2 className="font-display text-4xl leading-tight">The piazza is quiet.</h2>
      <p className="mt-4 leading-relaxed text-muted">
        Other people appear here once they finish a biography. Passed cards come back if you ask to see them again.
      </p>
      <button type="button" className="btn btn-line mt-8" onClick={onReset}>
        <RotateCcw className="size-4" aria-hidden="true" />
        See them again
      </button>
    </div>
  );
}

function Messages({
  meetings,
  incoming,
  onRefresh,
}: {
  meetings: NetworkCard[];
  incoming: NetworkCard[];
  onRefresh: () => Promise<NetworkState>;
}) {
  const likes = meetings.filter((person) => person.accepts);
  const comments = meetings.filter((person) => !person.accepts);
  const gifts = likes.filter((person) => person.sample);
  const [box, setBox] = useState<"gifts" | "likes" | "comments" | "mentions">("likes");
  const [open, setOpen] = useState<NetworkCard | null>(null);
  const rows = box === "comments" ? comments : box === "mentions" ? incoming : box === "gifts" ? gifts : likes;

  async function agree(person: NetworkCard) {
    const result = await askToMeet({ data: person.id });
    await onRefresh();
    setOpen(result.agreed && result.contact ? { ...person, accepts: true, contact: result.contact } : null);
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col px-5 pt-5">
      <h1 className="font-display text-4xl leading-tight">Messages</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Contact opens only after you both agree. A match opens a real chat.
      </p>
      <div className="mt-5 grid grid-cols-4 gap-2">
        <InboxChip
          label="Gifts"
          count={gifts.length}
          active={box === "gifts"}
          onClick={() => setBox("gifts")}
          icon={<Gift className="size-5" aria-hidden="true" />}
        />
        <InboxChip
          label="Likes"
          count={likes.length}
          active={box === "likes"}
          onClick={() => setBox("likes")}
          icon={<ThumbsUp className="size-5" aria-hidden="true" />}
        />
        <InboxChip
          label="Comments"
          count={comments.length}
          active={box === "comments"}
          onClick={() => setBox("comments")}
          icon={<MessageCircle className="size-5" aria-hidden="true" />}
        />
        <InboxChip
          label="@Me"
          count={incoming.length}
          active={box === "mentions"}
          onClick={() => setBox("mentions")}
          icon={<AtSign className="size-5" aria-hidden="true" />}
        />
      </div>
      {rows.length === 0 ? (
        <p className="mt-10 font-display text-2xl leading-tight text-muted">Nothing in this box yet.</p>
      ) : (
        <ul className="mt-6 min-h-0 flex-1 space-y-3 overflow-y-auto pb-6">
          {rows.map((person) => (
            <li key={`${box}-${person.id}`}>
              <button
                type="button"
                onClick={() => setOpen(person)}
                className="flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-3 text-left"
              >
                <img src={person.photo} alt="" className="size-14 rounded-full object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-medium">{person.name.split(" ")[0]}</span>
                    <span className="shrink-0 text-xs text-muted">{person.sample ? "Sample" : "Member"}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted">{inboxLine(box, person)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && open.accepts ? (
        <ChatSheet person={open} onClose={() => setOpen(null)} onSent={() => void onRefresh()} />
      ) : open ? (
        <Sheet
          title={open.incoming ? "Asked to meet you" : "Still reading"}
          onClose={() => setOpen(null)}
        >
          {open.incoming ? (
            <div>
              <p className="leading-relaxed text-muted">
                {open.name.split(" ")[0]} asked to meet. Agree only if you have read the biography.
              </p>
              <p className="mt-4 leading-relaxed">{open.bio}</p>
              <button type="button" className="btn btn-clay mt-6 w-full" onClick={() => void agree(open)}>
                Agree to meet
              </button>
            </div>
          ) : (
            <p className="leading-relaxed text-muted">
              {open.name.split(" ")[0]} has not agreed yet. Chat and contact stay closed.
            </p>
          )}
        </Sheet>
      ) : null}
    </section>
  );
}

function inboxLine(box: "gifts" | "likes" | "comments" | "mentions", person: NetworkCard) {
  if (box === "gifts") return person.gift;
  if (box === "comments") return "Still reading your biography";
  if (box === "mentions") return `Asked to meet you from ${person.city}`;
  return person.lastMessage || "Agreed. Chat is open.";
}

function InboxChip({
  label,
  count,
  active,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-2">
      <span
        className={`flex size-12 items-center justify-center rounded-full ${
          active ? "bg-clay text-clay-deep" : "bg-raised text-fg"
        }`}
      >
        {icon}
      </span>
      <span className={`text-xs ${active ? "text-fg" : "text-muted"}`}>
        {label}
        {count > 0 ? ` ${count}` : ""}
      </span>
    </button>
  );
}

function ChatSheet({ person, onClose, onSent }: { person: NetworkCard; onClose: () => void; onSent: () => void }) {
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    let live = true;
    void loadThread({ data: person.id })
      .then((next) => {
        if (live) setLines(next);
      })
      .catch(() => {
        if (live) setError("Chat could not open.");
      });
    const timer = window.setInterval(() => {
      void loadThread({ data: person.id })
        .then((next) => {
          if (live) setLines(next);
        })
        .catch(() => undefined);
    }, 4000);
    return () => {
      live = false;
      window.clearInterval(timer);
    };
  }, [person.id]);

  async function send() {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError("");
    try {
      const next = await sendMessage({ data: { otherId: person.id, body } });
      setLines(next);
      setDraft("");
      onSent();
    } catch {
      setError("That message did not send.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Sheet title={person.name.split(" ")[0]} onClose={onClose}>
      <p className="text-sm text-muted">
        {person.sample ? "Sample match. The reply is written for the demo." : "Chat stays here until you both leave."}
      </p>
      <div className="mt-4 flex max-h-64 min-h-40 flex-col gap-2 overflow-y-auto">
        {lines.length === 0 && <p className="text-sm text-muted">Say something. Contact is below if you want it.</p>}
        {lines.map((line) => (
          <p
            key={line.id}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              line.mine ? "ml-auto bg-clay text-clay-deep" : "bg-raised text-fg"
            }`}
          >
            {line.body}
          </p>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-clay">{error}</p>}
      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
      >
        <input
          className="field"
          value={draft}
          maxLength={500}
          placeholder="Write a message"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="btn btn-clay shrink-0 px-4" disabled={sending || !draft.trim()}>
          Send
        </button>
      </form>
      <button type="button" className="mt-4 text-sm text-muted underline underline-offset-4" onClick={() => setShowContact((open) => !open)}>
        {showContact ? "Hide contact" : "Show contact"}
      </button>
      {showContact && (
        <div className="mt-3">
          <ContactBlock person={person} />
        </div>
      )}
    </Sheet>
  );
}

function contactHref(label: string, value: string) {
  if (label === "WhatsApp") {
    const digits = value.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  if (label === "Telegram") {
    const name = value.replace(/^@/, "").trim();
    return name ? `https://t.me/${name}` : "";
  }
  if (label === "X") {
    const name = value.replace(/^@/, "").trim();
    return name ? `https://x.com/${name}` : "";
  }
  if (label === "Email") return `mailto:${value}`;
  if (label === "Phone") return `tel:${value.replace(/[^\d+]/g, "")}`;
  if (label === "Instagram") return `https://instagram.com/${value.replace(/^@/, "")}`;
  if (label === "TikTok") return `https://www.tiktok.com/@${value.replace(/^@/, "")}`;
  if (label === "Snapchat") return `https://www.snapchat.com/add/${value.replace(/^@/, "")}`;
  if (label === "Facebook") return `https://www.facebook.com/${encodeURIComponent(value.trim())}`;
  return "";
}

function ContactBlock({ person }: { person: NetworkCard }) {
  const mine = useItaly((state) => state.profile);
  const contact = person.contact;
  const rows = contact
    ? [
        { label: "WhatsApp", value: contact.whatsapp },
        { label: "Telegram", value: contact.telegram ? `@${contact.telegram.replace(/^@/, "")}` : "" },
        { label: "X", value: contact.x ? `@${contact.x.replace(/^@/, "")}` : "" },
        { label: "Email", value: contact.email },
        { label: "Phone", value: contact.phone },
        { label: "Instagram", value: contact.instagram ? `@${contact.instagram.replace(/^@/, "")}` : "" },
        { label: "Snapchat", value: contact.snapchat ? `@${contact.snapchat.replace(/^@/, "")}` : "" },
        { label: "TikTok", value: contact.tiktok ? `@${contact.tiktok.replace(/^@/, "")}` : "" },
        { label: "Facebook", value: contact.facebook },
      ].filter((row) => row.value)
    : [];

  return (
    <div>
      <p className="leading-relaxed">
        {person.name.split(" ")[0]} read your biography and said yes.
        {mine.contactsOpen
          ? " Your contacts were shared back."
          : " Your contacts stayed hidden because Contacts is off on your profile."}
      </p>
      <dl className="mt-5 space-y-3">
        {rows.map((row) => {
          const href = person.sample ? "" : contactHref(row.label, row.value);
          return (
            <div key={row.label} className="rounded-2xl border border-line bg-raised px-4 py-3">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="mt-1 break-all">
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {person.sample
          ? "Sample contact. This person is fictional, so these numbers and usernames do not reach anyone."
          : "This contact belongs to a real member. It stays between you two."}
      </p>
    </div>
  );
}

function You({ onShared }: { onShared: () => Promise<NetworkState> }) {
  const profile = useItaly((state) => state.profile);
  const saveProfile = useItaly((state) => state.saveProfile);
  const resetAll = useItaly((state) => state.resetAll);
  const [draft, setDraft] = useState<Profile>(profile);
  const [tried, setTried] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [bot, setBot] = useState<TelegramLink>({ connected: false, username: "", name: "", linked: false });
  const [botToken, setBotToken] = useState("");
  const [botNote, setBotNote] = useState("");
  const [botBusy, setBotBusy] = useState(false);
  const errors = validateProfile(draft);
  const show = tried ? errors : {};
  const ready = Object.keys(errors).length === 0;
  const score = profileScore(draft);

  async function addPhoto(file: File | undefined, slot: "avatar" | "public") {
    if (!file) return;
    setPhotoError("");
    try {
      const url = await shrinkPhoto(file);
      if (!url) return;
      if (slot === "avatar") setDraft({ ...draft, avatar: url });
      else if (draft.photos.length < 4) setDraft({ ...draft, photos: [...draft.photos, url] });
    } catch {
      setPhotoError("That photo could not be added.");
    }
  }

  function toggleHobby(hobby: string) {
    const hobbies = draft.hobbies.includes(hobby)
      ? draft.hobbies.filter((item) => item !== hobby)
      : [...draft.hobbies, hobby];
    setDraft({ ...draft, hobbies });
  }

  useEffect(() => {
    void telegramStatus()
      .then(setBot)
      .catch(() => undefined);
  }, []);

  async function connectBot() {
    setBotBusy(true);
    setBotNote("");
    try {
      setBot(await connectTelegram({ data: botToken }));
      setBotToken("");
      setBotNote("Bot accepted. Open it in Telegram, tap Start, then link the chat.");
    } catch (reason) {
      setBotNote(reason instanceof Error ? reason.message : "Telegram did not connect.");
    } finally {
      setBotBusy(false);
    }
  }

  async function linkBot() {
    setBotBusy(true);
    setBotNote("");
    try {
      setBot(await linkTelegramChat());
      setBotNote("This chat will get a message when a real member agrees to meet.");
    } catch (reason) {
      setBotNote(reason instanceof Error ? reason.message : "The chat did not link.");
    } finally {
      setBotBusy(false);
    }
  }

  return (
    <section className="flex-1 overflow-y-auto px-5 pt-5 pb-8">
      <div className="account-chip">
        <UserButton />
      </div>
      <h1 className="mt-6 font-display text-4xl leading-tight">
        Edit profile <span className="text-clay">({score}%)</span>
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Fields with a mark are needed for 100%. Meeting only stays open with a biography and one way to reach you:
        WhatsApp, Telegram, X, email, or phone.
      </p>
      <p className="mt-4 text-sm text-muted">
        Avatar<span className="text-clay">*</span>
      </p>
      <label className="mt-3 block w-24">
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          onChange={(event) => void addPhoto(event.target.files?.[0], "avatar")}
        />
        {draft.avatar ? (
          <img src={draft.avatar} alt="Your avatar" className="size-24 rounded-2xl object-cover" />
        ) : (
          <span className="flex size-24 items-center justify-center rounded-2xl border border-line bg-raised text-sm text-muted">
            Add
          </span>
        )}
      </label>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">Public photos</p>
        <label className="text-sm text-clay">
          Add
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={(event) => void addPhoto(event.target.files?.[0], "public")}
          />
        </label>
      </div>
      {draft.photos.length > 0 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto">
          {draft.photos.map((photo, index) => (
            <li key={photo.slice(0, 24) + index} className="relative shrink-0">
              <img src={photo} alt="" className="size-20 rounded-xl object-cover" />
              <button
                type="button"
                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-bg text-fg"
                aria-label="Remove photo"
                onClick={() =>
                  setDraft({ ...draft, photos: draft.photos.filter((_, photoIndex) => photoIndex !== index) })
                }
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {photoError && <p className="mt-2 text-sm text-clay">{photoError}</p>}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-2xl">Contacts</h2>
        <button
          type="button"
          aria-pressed={draft.contactsOpen}
          onClick={() => setDraft({ ...draft, contactsOpen: !draft.contactsOpen })}
          className={`h-8 w-14 rounded-full p-1 ${draft.contactsOpen ? "bg-clay" : "bg-raised"}`}
        >
          <span
            className={`block size-6 rounded-full bg-fg ${draft.contactsOpen ? "ml-auto" : ""}`}
          />
          <span className="sr-only">{draft.contactsOpen ? "Contacts on" : "Contacts off"}</span>
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">
        Off means your numbers and usernames stay hidden even after someone agrees.
      </p>
      <div className="mt-4 space-y-3">
        <ContactRow
          icon={<Phone className="size-4" aria-hidden="true" />}
          label="Phone"
          value={draft.phone}
          error={show.phone}
          onChange={(phone) => setDraft({ ...draft, phone })}
        />
        <ContactRow
          icon={<Mail className="size-4" aria-hidden="true" />}
          label="Email"
          value={draft.email}
          error={show.email}
          onChange={(email) => setDraft({ ...draft, email })}
        />
        <ContactRow
          icon={<Send className="size-4" aria-hidden="true" />}
          label="Telegram username"
          value={draft.telegram}
          error={show.telegram}
          onChange={(telegram) => setDraft({ ...draft, telegram })}
        />
        <ContactRow
          icon={<Ghost className="size-4" aria-hidden="true" />}
          label="Snapchat"
          value={draft.snapchat}
          error={show.snapchat}
          onChange={(snapchat) => setDraft({ ...draft, snapchat })}
        />
        <ContactRow
          icon={<Facebook className="size-4" aria-hidden="true" />}
          label="Facebook"
          value={draft.facebook}
          error={show.facebook}
          onChange={(facebook) => setDraft({ ...draft, facebook })}
        />
        <ContactRow
          icon={<MessageCircle className="size-4" aria-hidden="true" />}
          label="WhatsApp number"
          value={draft.whatsapp}
          error={show.whatsapp}
          onChange={(whatsapp) => setDraft({ ...draft, whatsapp })}
        />
        <ContactRow
          icon={<AtSign className="size-4" aria-hidden="true" />}
          label="X username"
          value={draft.x}
          error={show.x}
          onChange={(xName) => setDraft({ ...draft, x: xName })}
        />
        <p className="text-sm text-muted">
          Type the @username you want people to see. Sign-in does not include it.
        </p>
        <div className="rounded-2xl border border-line bg-raised px-4 py-4">
          <p className="text-sm text-muted">Your Telegram bot</p>
          {bot.connected ? (
            <p className="mt-2">
              Connected as @{bot.username}
              {bot.linked ? ". Chat linked." : ". Chat not linked yet."}
            </p>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Paste the token from BotFather. It stays on your account. Italy We messages you only after you tap Start.
            </p>
          )}
          {!bot.connected && (
            <input
              className="field mt-3"
              type="password"
              autoComplete="off"
              placeholder="123456:ABC..."
              value={botToken}
              onChange={(event) => setBotToken(event.target.value)}
            />
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {!bot.connected && (
              <button type="button" className="btn btn-clay" disabled={botBusy || botToken.trim().length < 20} onClick={() => void connectBot()}>
                {botBusy ? "Checking…" : "Connect bot"}
              </button>
            )}
            {bot.connected && (
              <a className="btn btn-line" href={`https://t.me/${bot.username}`} target="_blank" rel="noreferrer">
                Open bot
              </a>
            )}
            {bot.connected && !bot.linked && (
              <button type="button" className="btn btn-clay" disabled={botBusy} onClick={() => void linkBot()}>
                {botBusy ? "Linking…" : "Link this chat"}
              </button>
            )}
          </div>
          {botNote && <p className="mt-3 text-sm text-clay">{botNote}</p>}
        </div>
        <ContactRow
          icon={<Music2 className="size-4" aria-hidden="true" />}
          label="TikTok"
          value={draft.tiktok}
          error={show.tiktok}
          onChange={(tiktok) => setDraft({ ...draft, tiktok })}
        />
        <ContactRow
          icon={<Instagram className="size-4" aria-hidden="true" />}
          label="Instagram"
          value={draft.instagram}
          error={show.instagram}
          onChange={(instagram) => setDraft({ ...draft, instagram })}
        />
      </div>

      <Field
        label="Nickname"
        required
        value={draft.name}
        error={show.name}
        onChange={(name) => setDraft({ ...draft, name })}
      />
      <Field
        label="Headline"
        required
        value={draft.headline}
        error={show.headline}
        onChange={(headline) => setDraft({ ...draft, headline })}
      />
      <label className="mt-5 block">
        <span className="flex items-baseline justify-between text-sm text-muted">
          <span>
            About me<span className="text-clay">*</span>
          </span>
          <span className="tabular-nums">
            {draft.bio.trim().length} / {BIO_MIN}
          </span>
        </span>
        <textarea
          className="field mt-2 min-h-32"
          value={draft.bio}
          maxLength={600}
          onChange={(event) => setDraft({ ...draft, bio: event.target.value })}
        />
        {show.bio && <span className="mt-2 block text-sm text-clay">{show.bio}</span>}
      </label>

      <h2 className="mt-8 font-display text-2xl">Basic information</h2>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-raised px-4 py-3">
        <span>Voice bio</span>
        <button
          type="button"
          aria-pressed={draft.voiceBio}
          onClick={() => setDraft({ ...draft, voiceBio: !draft.voiceBio })}
          className={`rounded-full px-4 py-2 text-sm ${draft.voiceBio ? "bg-clay text-clay-deep" : "border border-line"}`}
        >
          {draft.voiceBio ? "60s ready" : "Add 60s"}
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">Heard only after you both agree. This marks the slot on your profile.</p>
      <p className="mt-5 text-sm text-muted">
        Gender<span className="text-clay">*</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {GENDERS.map((gender) => (
          <button
            key={gender}
            type="button"
            onClick={() => setDraft({ ...draft, gender })}
            className={`rounded-full px-4 py-2 text-sm ${
              draft.gender === gender ? "bg-clay text-clay-deep" : "border border-line"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>
      <Choice
        label="Age"
        required
        value={draft.age}
        options={AGES}
        onChange={(age) => setDraft({ ...draft, age })}
      />
      {show.age && <p className="mt-2 text-sm text-clay">{show.age}</p>}
      <Field
        label="Location"
        required
        value={draft.city}
        error={show.city}
        onChange={(city) => setDraft({ ...draft, city })}
      />
      <Choice
        label="Ethnicity"
        required
        value={draft.ethnicity}
        options={ETHNICITIES}
        onChange={(ethnicity) => setDraft({ ...draft, ethnicity })}
      />
      <Choice
        label="Height"
        required
        value={draft.height}
        options={HEIGHTS}
        onChange={(height) => setDraft({ ...draft, height })}
      />
      <Choice
        label="Body type"
        required
        value={draft.bodyType}
        options={BODIES}
        onChange={(bodyType) => setDraft({ ...draft, bodyType })}
      />
      <Choice
        label="Education"
        required
        value={draft.education}
        options={EDUCATIONS}
        onChange={(education) => setDraft({ ...draft, education })}
      />
      <Choice
        label="Looking for"
        required
        value={draft.lookingFor}
        options={LOOKING}
        onChange={(lookingFor) => setDraft({ ...draft, lookingFor })}
      />

      <h2 className="mt-8 font-display text-2xl">Social information</h2>
      <Choice
        label="Relationship"
        required
        value={draft.relationship}
        options={RELATIONSHIPS}
        onChange={(relationship) => setDraft({ ...draft, relationship })}
      />
      <Choice
        label="Have children"
        required
        value={draft.children}
        options={CHILDREN}
        onChange={(children) => setDraft({ ...draft, children })}
      />
      <Choice
        label="Smoking"
        required
        value={draft.smoking}
        options={SMOKING}
        onChange={(smoking) => setDraft({ ...draft, smoking })}
      />
      <Choice
        label="Drinking"
        required
        value={draft.drinking}
        options={DRINKING}
        onChange={(drinking) => setDraft({ ...draft, drinking })}
      />
      <p className="mt-5 text-sm text-muted">
        Hobbies<span className="text-clay">*</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {HOBBIES.map((hobby) => {
          const on = draft.hobbies.includes(hobby);
          return (
            <button
              key={hobby}
              type="button"
              onClick={() => toggleHobby(hobby)}
              className={`rounded-full px-4 py-2 text-sm ${on ? "bg-clay text-clay-deep" : "border border-line"}`}
            >
              {hobby}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="btn btn-clay mt-8 w-full"
        onClick={() => {
          if (!ready) {
            setTried(true);
            setSaved(false);
            return;
          }
          saveProfile(draft, true);
          void saveMine({ data: draft })
            .then(() => onShared())
            .then(() => {
              setTried(false);
              setSaved(true);
            })
            .catch(() => {
              setSaved(false);
              setPhotoError("Saved on this phone, not shared yet. Try a smaller photo.");
            });
        }}
      >
        {saved ? "Saved" : "Save"}
      </button>
      {!ready && tried && (
        <p className="mt-3 text-sm text-clay">Not saved. Meet still uses the last complete biography and contact.</p>
      )}
      {!hasReach(draft) && (
        <p className="mt-3 text-sm text-muted">Add WhatsApp, Telegram, X, an email, or a phone before saving.</p>
      )}
      <div className="mt-10 border-t border-line pt-6">
        {confirmReset ? (
          <div>
            <p className="text-sm leading-relaxed text-muted">
              This forgets your biography, contacts, and messages on this phone.
            </p>
            <div className="mt-4 flex gap-3">
              <button type="button" className="btn btn-line" onClick={() => setConfirmReset(false)}>
                Keep it
              </button>
              <button
                type="button"
                className="btn btn-clay"
                onClick={() => {
                  resetAll();
                  setDraft(emptyProfile());
                }}
              >
                Forget me
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="text-sm text-muted underline underline-offset-4"
            onClick={() => setConfirmReset(true)}
          >
            Start over
          </button>
        )}
      </div>
    </section>
  );
}

const AGES = Array.from({ length: 63 }, (_, index) => String(index + 18));

function Choice({
  label,
  value,
  options,
  onChange,
  required,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-line bg-raised px-4 py-3">
      <span>
        {label}
        {required && <span className="text-clay">*</span>}
      </span>
      <select
        className="max-w-[11rem] bg-transparent text-right text-muted"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Choose</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  error,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <span className="flex items-center gap-3 rounded-2xl border border-line bg-raised px-4 py-3">
        <span className="text-muted">{icon}</span>
        <input
          className="min-w-0 flex-1 bg-transparent outline-none"
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <Pencil className="size-4 text-muted" aria-hidden="true" />
      </span>
      {error && <span className="mt-2 block text-sm text-clay">{error}</span>}
    </label>
  );
}

async function shrinkPhoto(file: File) {
  const bitmap = await createImageBitmap(file);
  const max = 720;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.72);
}

function Sheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-bg/80 md:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="sheet-panel w-full max-w-md overflow-y-auto rounded-t-card bg-surface px-5 pt-5 pb-8 md:rounded-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="sheet-title" className="font-display text-3xl leading-tight">
            {title}
          </h2>
          <button type="button" className="btn btn-line size-12 px-0" onClick={onClose} aria-label="Close">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
