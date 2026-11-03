import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut, r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { i as hasGateSessionMarker } from "./server-RwKwh_fk.mjs";
import { a as profileScore, i as isComplete, n as emptyProfile, o as useItaly, r as hasReach, s as validateProfile, t as authMiddleware } from "./italy-store-DMlPga00.mjs";
import { _ as Compass, a as Send, b as ArrowRight, c as Pencil, d as MapPin, f as Mail, g as Facebook, h as Ghost, i as ThumbsUp, l as Music2, m as Gift, n as UserRound, o as RotateCcw, p as Instagram, s as Phone, t as X, u as MessageCircle, v as BookOpen, y as AtSign } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/italy-app-BKN9oEsw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function clip(value, max) {
	return value.trim().slice(0, max);
}
function cleanProfile(input) {
	return {
		...emptyProfile(),
		name: clip(input.name ?? "", 40),
		headline: clip(input.headline ?? "", 80),
		age: clip(input.age ?? "", 3),
		city: clip(input.city ?? "", 40),
		bio: clip(input.bio ?? "", 600),
		gender: clip(input.gender ?? "", 24),
		ethnicity: clip(input.ethnicity ?? "", 40),
		height: clip(input.height ?? "", 24),
		bodyType: clip(input.bodyType ?? "", 24),
		education: clip(input.education ?? "", 40),
		lookingFor: clip(input.lookingFor ?? "", 40),
		relationship: clip(input.relationship ?? "", 40),
		children: clip(input.children ?? "", 40),
		smoking: clip(input.smoking ?? "", 24),
		drinking: clip(input.drinking ?? "", 24),
		hobbies: (input.hobbies ?? []).filter((item) => typeof item === "string").slice(0, 12),
		voiceBio: input.voiceBio === true,
		contactsOpen: input.contactsOpen !== false,
		email: clip(input.email ?? "", 80),
		phone: clip(input.phone ?? "", 24),
		whatsapp: clip(input.whatsapp ?? "", 24),
		telegram: clip(input.telegram ?? "", 32),
		x: clip(input.x ?? "", 15),
		snapchat: clip(input.snapchat ?? "", 32),
		facebook: clip(input.facebook ?? "", 50),
		tiktok: clip(input.tiktok ?? "", 24),
		instagram: clip(input.instagram ?? "", 30),
		avatar: input.avatar ?? "",
		photos: (input.photos ?? []).filter((item) => typeof item === "string").slice(0, 4)
	};
}
var loadNetwork = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c84ff05f384553e4735f2df6ec8710e16e0da068f3a634d644fd4bf8fe4c1b3c"));
var saveMine = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => cleanProfile(input)).handler(createSsrRpc("2ca65d03cd38927d95dbe81b7012789cc209e43b03a313925f6eed869cb4f7ed"));
var askToMeet = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id.trim()).handler(createSsrRpc("241b2b02d7e6aa823c08abfe74a490a941d075d1016a8e411403a2d51a058089"));
var passOn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id.trim()).handler(createSsrRpc("17568884f910e80f3195bc70ccf8ba6c918283e0b2ecb7ac9cebf93f1b55d6a9"));
var resetPasses = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("9b8207b367f6a803683b116a682e8a4a92810f1896fbfe7d8f14a96a0be05989"));
var loadThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((otherId) => otherId.trim()).handler(createSsrRpc("0e71b8b0b120f1125750c5fa91b5a2d5c693ce72ab0060d9d85eebce339a5124"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	otherId: input.otherId.trim(),
	body: input.body.trim().slice(0, 500)
})).handler(createSsrRpc("66b1e7f734c5f0eb85f59b8925bcf45117f7ca780ca584d9fb0126f9d09d9b9a"));
var HOBBIES = [
	"Collectibles",
	"Adventure",
	"Boating",
	"Camping",
	"Gourmet dining",
	"Gardening",
	"Hiking",
	"Theater",
	"Watch spots",
	"Travel",
	"Wine",
	"Walking",
	"Basketball"
];
var GENDERS = [
	"Female",
	"Male",
	"Non-binary"
];
var ETHNICITIES = [
	"Asian",
	"Black",
	"Hispanic or Latino",
	"Middle Eastern",
	"White",
	"Mixed",
	"Another",
	"Prefer not to say"
];
var HEIGHTS = [
	`4'11"`,
	`5'2"`,
	`5'4"`,
	`5'6"`,
	`5'8"`,
	`5'10"`,
	`6'0"`,
	`6'2"`
];
var BODIES = [
	"Petite",
	"Slim",
	"Athletic",
	"Average",
	"Curvy",
	"Muscular"
];
var EDUCATIONS = [
	"High school",
	"Bachelor",
	"Graduate Degree",
	"Other"
];
var LOOKING = [
	"Dating",
	"Friendship",
	"A relationship",
	"Marriage"
];
var RELATIONSHIPS = [
	"Single",
	"Divorced",
	"Separated",
	"Widowed"
];
var CHILDREN = ["No", "Yes"];
var SMOKING = [
	"Non Smoker",
	"Sometimes",
	"Smoker"
];
var DRINKING = [
	"Non Drinker",
	"Socially",
	"Regularly"
];
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function ItalyApp() {
	const hydrated = useItaly((state) => state.hydrated);
	const hydrate = useItaly((state) => state.hydrate);
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
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
	let screen;
	if (!hydrated || isPending) screen = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, { pending: true });
	else if (!user) screen = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XSignIn, {});
	else screen = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-split bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-dvh flex-col md:border-l md:border-line",
			children: screen
		})]
	});
}
function Poster() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "relative hidden min-h-dvh md:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/portraits/sofia.jpg",
			alt: "",
			className: "absolute inset-0 h-full w-full object-cover object-top"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex h-full flex-col justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl bg-bg px-10 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tracking-wide text-muted",
						children: "Italy We"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-tight text-fg",
						children: "Meet someone after you say who you are."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-3 text-base text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A biography, long enough to be a person." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A way to reach you, shared only when you both agree." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One network. Other people see you after you finish." })
						]
					})
				]
			})
		})]
	});
}
function Experience() {
	const profile = useItaly((state) => state.profile);
	const seenIntro = useItaly((state) => state.seenIntro);
	const complete = isComplete(profile);
	if (!complete && !seenIntro) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {});
	if (!complete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, { initial: profile });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lounge, {});
}
function XSignIn() {
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-1 flex-col justify-between px-6 py-8 safe-bottom",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Italy We"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-tight",
				children: "Sign in with X."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-base leading-relaxed text-muted",
				children: "Your X account is how Italy We knows it is you. You still write a biography before anyone can meet. X does not send the @username, so you type that on your profile."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-clay",
				children: error
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-clay w-full",
				disabled: pending,
				onClick: () => {
					setPending(true);
					setError("");
					signIn("grok-x", { callbackURL: "/" }).catch((reason) => {
						setPending(false);
						const message = reason instanceof Error ? reason.message : "";
						setError(message.toLowerCase().includes("pop-up") ? "Allow pop-ups, then try Continue with X again." : "Sign-in did not finish. Try again.");
					});
				},
				children: pending ? "Opening X…" : "Continue with X"
			})] })
		]
	});
}
function Cover({ pending = false }) {
	const setSeenIntro = useItaly((state) => state.setSeenIntro);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-1 flex-col justify-between px-6 py-8 safe-bottom",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Italy We"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-tight",
				children: "Say who you are. Then meet someone."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-8 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
						className: "size-5",
						"aria-hidden": "true"
					}),
					title: "Biography",
					body: `At least 80 characters. A headline is not enough to meet.`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
						className: "size-5",
						"aria-hidden": "true"
					}),
					title: "Contact",
					body: "WhatsApp, Telegram, X, email, or a phone. Hidden until you both agree to meet."
				})]
			})] }),
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-12 animate-pulse rounded-full bg-raised",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn btn-clay w-full",
				onClick: () => setSeenIntro(true),
				children: ["Begin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "size-4",
					"aria-hidden": "true"
				})]
			})
		]
	});
}
function Rule({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 text-clay",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-medium text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-sm leading-relaxed text-muted",
			children: body
		})] })]
	});
}
function Gate({ initial }) {
	const saveProfile = useItaly((state) => state.saveProfile);
	const setSeenIntro = useItaly((state) => state.setSeenIntro);
	const [step, setStep] = (0, import_react.useState)(1);
	const [draft, setDraft] = (0, import_react.useState)(initial);
	const [tried, setTried] = (0, import_react.useState)(false);
	const visible = stepErrors(step, validateProfile(draft));
	const show = tried ? visible : {};
	function goNext() {
		if (Object.keys(visible).length > 0) {
			setTried(true);
			return;
		}
		setTried(false);
		saveProfile(draft, true);
		if (step < 3) setStep(step + 1);
		else saveMine({ data: draft }).catch(() => void 0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-0 flex-1 flex-col px-6 py-8 safe-bottom",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: "Italy We"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [
						"0",
						step,
						" / 03"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 min-h-0 flex-1 overflow-y-auto",
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight",
							children: "Who should they meet?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "Your name, your age, and the city you are actually in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									value: draft.name,
									error: show.name,
									autoComplete: "name",
									onChange: (name) => setDraft({
										...draft,
										name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Age",
									value: draft.age,
									error: show.age,
									inputMode: "numeric",
									onChange: (age) => setDraft({
										...draft,
										age: age.replace(/\D/g, "").slice(0, 2)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "City",
									value: draft.city,
									error: show.city,
									autoComplete: "address-level2",
									onChange: (city) => setDraft({
										...draft,
										city
									})
								})
							]
						})
					] }),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight",
							children: "Your biography"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-muted",
							children: [
								"Write where you spend your time and what kind of meeting you want. ",
								80,
								" ",
								"characters opens the door."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-8 block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline justify-between text-sm text-muted",
									children: ["Biography", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: draft.bio.trim().length >= 80 ? "text-muted" : "text-clay",
										children: [
											draft.bio.trim().length,
											" / ",
											80
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "field mt-2 min-h-48",
									value: draft.bio,
									maxLength: 600,
									onChange: (event) => setDraft({
										...draft,
										bio: event.target.value
									})
								}),
								show.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 block text-sm text-clay",
									children: show.bio
								})
							]
						})
					] }),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight",
							children: "How can they reach you?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "One is enough. WhatsApp, Telegram, and X stay hidden until you both agree to meet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "WhatsApp number",
									type: "tel",
									value: draft.whatsapp,
									error: show.whatsapp,
									autoComplete: "tel",
									onChange: (whatsapp) => setDraft({
										...draft,
										whatsapp
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Telegram username",
									value: draft.telegram,
									error: show.telegram,
									onChange: (telegram) => setDraft({
										...draft,
										telegram
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "X username",
									value: draft.x,
									error: show.x,
									onChange: (xName) => setDraft({
										...draft,
										x: xName
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "-mt-2 text-sm text-muted",
									children: "Sign-in does not fill this. Type the @username you want people to see."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									type: "email",
									value: draft.email,
									error: show.email,
									autoComplete: "email",
									onChange: (email) => setDraft({
										...draft,
										email
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									type: "tel",
									value: draft.phone,
									error: show.phone,
									autoComplete: "tel",
									onChange: (phone) => setDraft({
										...draft,
										phone
									})
								})
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex gap-3 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => {
						setTried(false);
						if (step === 1) setSeenIntro(false);
						else setStep(step - 1);
					},
					children: "Back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-clay flex-1",
					onClick: goNext,
					children: step === 3 ? "Open the piazza" : "Continue"
				})]
			})
		]
	});
}
function stepErrors(step, errors) {
	if (step === 1) return pick(errors, [
		"name",
		"age",
		"city"
	]);
	if (step === 2) return pick(errors, ["bio"]);
	return pick(errors, [
		"email",
		"phone",
		"whatsapp",
		"telegram",
		"x"
	]);
}
function pick(errors, keys) {
	const next = {};
	for (const key of keys) if (errors[key]) next[key] = errors[key];
	return next;
}
function Field({ label, value, onChange, error, type = "text", autoComplete, inputMode, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-5 block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted",
				children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-clay",
					children: "*"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "field mt-2",
				type,
				value,
				autoComplete,
				inputMode,
				onChange: (event) => onChange(event.target.value)
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-sm text-clay",
				children: error
			})
		]
	});
}
function Lounge() {
	const profile = useItaly((state) => state.profile);
	const saveProfile = useItaly((state) => state.saveProfile);
	const [tab, setTab] = (0, import_react.useState)("meet");
	const [net, setNet] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	async function refresh() {
		const next = await loadNetwork();
		setNet(next);
		if (next.profile) saveProfile(next.profile, true);
		return next;
	}
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
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
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pt-5 text-sm text-clay",
					children: error
				}),
				tab === "meet" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discover, {
					city: profile.city,
					deck: net?.deck ?? [],
					ready: Boolean(net),
					onRefresh: refresh
				}),
				tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages, {
					meetings: net?.meetings ?? [],
					incoming: net?.incoming ?? [],
					onRefresh: refresh
				}),
				tab === "you" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(You, { onShared: refresh })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "grid grid-cols-3 border-t border-line px-2 pt-2 safe-bottom",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
					active: tab === "meet",
					onClick: () => setTab("meet"),
					label: "Meet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
					active: tab === "messages",
					onClick: () => setTab("messages"),
					label: "Messages",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
					active: tab === "you",
					onClick: () => setTab("you"),
					label: "You",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
						className: "size-5",
						"aria-hidden": "true"
					})
				})
			]
		})]
	});
}
function NavButton({ active, onClick, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex min-h-12 flex-col items-center justify-center gap-1 text-xs ${active ? "text-fg" : "text-muted"}`,
		children: [children, label]
	});
}
function Discover({ city, deck, ready, onRefresh }) {
	const [leave, setLeave] = (0, import_react.useState)(null);
	const [reading, setReading] = (0, import_react.useState)(null);
	const [reveal, setReveal] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const current = deck[0];
	(0, import_react.useEffect)(() => {
		if (!note) return;
		const timer = window.setTimeout(() => setNote(null), 3200);
		return () => window.clearTimeout(timer);
	}, [note]);
	function act(dir) {
		if (!current || leave || busy) return;
		setLeave({
			id: current.id,
			dir
		});
		window.setTimeout(() => {
			(async () => {
				setBusy(true);
				try {
					if (dir === "pass") await passOn({ data: current.id });
					else {
						const result = await askToMeet({ data: current.id });
						if (result.agreed && result.contact) setReveal({
							...current,
							accepts: true,
							contact: result.contact
						});
						else setNote(`${current.name.split(" ")[0]} will read your biography before answering.`);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between px-5 pt-5 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl leading-none",
					children: "Italy We"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3.5",
							"aria-hidden": "true"
						}),
						"Shared · in ",
						city.trim() || "your city"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tabular-nums text-muted",
					children: ready ? `${deck.length} left` : "…"
				})]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-5 mb-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 px-4",
				children: !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center rounded-card border border-line bg-surface px-6 text-muted",
					children: "Opening the piazza…"
				}) : !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDeck, { onReset: () => void resetPasses().then(() => onRefresh()) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface ${leave?.id === current.id ? leave.dir === "pass" ? "leave-pass" : "leave-meet" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-h-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: current.photo,
							alt: `Portrait of ${current.name}`,
							className: "absolute inset-0 h-full w-full object-cover"
						}), current.sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-fg",
							children: "Sample"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-3xl leading-none",
									children: [
										current.name.split(" ")[0],
										", ",
										current.age
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: current.city
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-clay",
								children: current.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 line-clamp-3 text-sm leading-relaxed",
								children: current.bio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-3 text-sm text-muted underline decoration-line underline-offset-4",
								onClick: () => setReading(current),
								children: "Read the biography"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-line",
					disabled: !current || busy,
					onClick: () => act("pass"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Pass"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-clay",
					disabled: !current || busy,
					onClick: () => act("meet"),
					children: "Ask to meet"
				})]
			}),
			reading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: `${reading.name}, ${reading.age}`,
				onClose: () => setReading(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-clay",
						children: [
							reading.role,
							" · ",
							reading.city
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 leading-relaxed",
						children: reading.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 flex flex-wrap gap-2",
						children: reading.interests.map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-line px-3 py-1 text-sm text-muted",
							children: interest
						}, interest))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm leading-relaxed text-muted",
						children: [
							"Contact stays hidden until ",
							reading.name.split(" ")[0],
							" agrees to meet."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-clay mt-6 w-full",
						onClick: () => act("meet"),
						children: "Ask to meet"
					})
				]
			}),
			reveal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: `${reveal.name.split(" ")[0]} agreed to meet`,
				onClose: () => setReveal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactBlock, { person: reveal })
			})
		]
	});
}
function EmptyDeck({ onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col justify-center rounded-card border border-line bg-surface px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl leading-tight",
				children: "The piazza is quiet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-relaxed text-muted",
				children: "Other people appear here once they finish a biography. Passed cards come back if you ask to see them again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn btn-line mt-8",
				onClick: onReset,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
					className: "size-4",
					"aria-hidden": "true"
				}), "See them again"]
			})
		]
	});
}
function Messages({ meetings, incoming, onRefresh }) {
	const likes = meetings.filter((person) => person.accepts);
	const comments = meetings.filter((person) => !person.accepts);
	const gifts = likes.filter((person) => person.sample);
	const [box, setBox] = (0, import_react.useState)("likes");
	const [open, setOpen] = (0, import_react.useState)(null);
	const rows = box === "comments" ? comments : box === "mentions" ? incoming : box === "gifts" ? gifts : likes;
	async function agree(person) {
		const result = await askToMeet({ data: person.id });
		await onRefresh();
		setOpen(result.agreed && result.contact ? {
			...person,
			accepts: true,
			contact: result.contact
		} : null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col px-5 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl leading-tight",
				children: "Messages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Contact opens only after you both agree. A match opens a real chat."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-4 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxChip, {
						label: "Gifts",
						count: gifts.length,
						active: box === "gifts",
						onClick: () => setBox("gifts"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxChip, {
						label: "Likes",
						count: likes.length,
						active: box === "likes",
						onClick: () => setBox("likes"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxChip, {
						label: "Comments",
						count: comments.length,
						active: box === "comments",
						onClick: () => setBox("comments"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxChip, {
						label: "@Me",
						count: incoming.length,
						active: box === "mentions",
						onClick: () => setBox("mentions"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, {
							className: "size-5",
							"aria-hidden": "true"
						})
					})
				]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 font-display text-2xl leading-tight text-muted",
				children: "Nothing in this box yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 min-h-0 flex-1 space-y-3 overflow-y-auto pb-6",
				children: rows.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(person),
					className: "flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: person.photo,
						alt: "",
						className: "size-14 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-medium",
								children: person.name.split(" ")[0]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-xs text-muted",
								children: person.sample ? "Sample" : "Member"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block truncate text-sm text-muted",
							children: inboxLine(box, person)
						})]
					})]
				}) }, `${box}-${person.id}`))
			}),
			open && open.accepts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSheet, {
				person: open,
				onClose: () => setOpen(null),
				onSent: () => void onRefresh()
			}) : open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: open.incoming ? "Asked to meet you" : "Still reading",
				onClose: () => setOpen(null),
				children: open.incoming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "leading-relaxed text-muted",
						children: [open.name.split(" ")[0], " asked to meet. Agree only if you have read the biography."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 leading-relaxed",
						children: open.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-clay mt-6 w-full",
						onClick: () => void agree(open),
						children: "Agree to meet"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "leading-relaxed text-muted",
					children: [open.name.split(" ")[0], " has not agreed yet. Chat and contact stay closed."]
				})
			}) : null
		]
	});
}
function inboxLine(box, person) {
	if (box === "gifts") return person.gift;
	if (box === "comments") return "Still reading your biography";
	if (box === "mentions") return `Asked to meet you from ${person.city}`;
	return person.lastMessage || "Agreed. Chat is open.";
}
function InboxChip({ label, count, active, onClick, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `flex size-12 items-center justify-center rounded-full ${active ? "bg-clay text-clay-deep" : "bg-raised text-fg"}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `text-xs ${active ? "text-fg" : "text-muted"}`,
			children: [label, count > 0 ? ` ${count}` : ""]
		})]
	});
}
function ChatSheet({ person, onClose, onSent }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [showContact, setShowContact] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		loadThread({ data: person.id }).then((next) => {
			if (live) setLines(next);
		}).catch(() => {
			if (live) setError("Chat could not open.");
		});
		const timer = window.setInterval(() => {
			loadThread({ data: person.id }).then((next) => {
				if (live) setLines(next);
			}).catch(() => void 0);
		}, 4e3);
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
			const next = await sendMessage({ data: {
				otherId: person.id,
				body
			} });
			setLines(next);
			setDraft("");
			onSent();
		} catch {
			setError("That message did not send.");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: person.name.split(" ")[0],
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: person.sample ? "Sample match. The reply is written for the demo." : "Chat stays here until you both leave."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex max-h-64 min-h-40 flex-col gap-2 overflow-y-auto",
				children: [lines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Say something. Contact is below if you want it."
				}), lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${line.mine ? "ml-auto bg-clay text-clay-deep" : "bg-raised text-fg"}`,
					children: line.body
				}, line.id))]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-clay",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					value: draft,
					maxLength: 500,
					placeholder: "Write a message",
					onChange: (event) => setDraft(event.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "btn btn-clay shrink-0 px-4",
					disabled: sending || !draft.trim(),
					children: "Send"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-sm text-muted underline underline-offset-4",
				onClick: () => setShowContact((open) => !open),
				children: showContact ? "Hide contact" : "Show contact"
			}),
			showContact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactBlock, { person })
			})
		]
	});
}
function ContactBlock({ person }) {
	const mine = useItaly((state) => state.profile);
	const contact = person.contact;
	const rows = contact ? [
		{
			label: "WhatsApp",
			value: contact.whatsapp
		},
		{
			label: "Telegram",
			value: contact.telegram ? `@${contact.telegram.replace(/^@/, "")}` : ""
		},
		{
			label: "X",
			value: contact.x ? `@${contact.x.replace(/^@/, "")}` : ""
		},
		{
			label: "Email",
			value: contact.email
		},
		{
			label: "Phone",
			value: contact.phone
		},
		{
			label: "Instagram",
			value: contact.instagram ? `@${contact.instagram.replace(/^@/, "")}` : ""
		},
		{
			label: "Snapchat",
			value: contact.snapchat ? `@${contact.snapchat.replace(/^@/, "")}` : ""
		},
		{
			label: "TikTok",
			value: contact.tiktok ? `@${contact.tiktok.replace(/^@/, "")}` : ""
		},
		{
			label: "Facebook",
			value: contact.facebook
		}
	].filter((row) => row.value) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "leading-relaxed",
			children: [
				person.name.split(" ")[0],
				" read your biography and said yes.",
				mine.contactsOpen ? " Your contacts were shared back." : " Your contacts stayed hidden because Contacts is off on your profile."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-5 space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-raised px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-muted",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 break-all",
					children: row.value
				})]
			}, row.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm leading-relaxed text-muted",
			children: person.sample ? "Sample contact. This person is fictional, so these numbers and usernames do not reach anyone." : "This contact belongs to a real member. It stays between you two."
		})
	] });
}
function You({ onShared }) {
	const profile = useItaly((state) => state.profile);
	const saveProfile = useItaly((state) => state.saveProfile);
	const resetAll = useItaly((state) => state.resetAll);
	const [draft, setDraft] = (0, import_react.useState)(profile);
	const [tried, setTried] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [photoError, setPhotoError] = (0, import_react.useState)("");
	const errors = validateProfile(draft);
	const show = tried ? errors : {};
	const ready = Object.keys(errors).length === 0;
	const score = profileScore(draft);
	async function addPhoto(file, slot) {
		if (!file) return;
		setPhotoError("");
		try {
			const url = await shrinkPhoto(file);
			if (!url) return;
			if (slot === "avatar") setDraft({
				...draft,
				avatar: url
			});
			else if (draft.photos.length < 4) setDraft({
				...draft,
				photos: [...draft.photos, url]
			});
		} catch {
			setPhotoError("That photo could not be added.");
		}
	}
	function toggleHobby(hobby) {
		const hobbies = draft.hobbies.includes(hobby) ? draft.hobbies.filter((item) => item !== hobby) : [...draft.hobbies, hobby];
		setDraft({
			...draft,
			hobbies
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex-1 overflow-y-auto px-5 pt-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "account-chip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-6 font-display text-4xl leading-tight",
				children: ["Edit profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-clay",
					children: [
						"(",
						score,
						"%)"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Fields with a mark are needed for 100%. Meeting only stays open with a biography and one way to reach you: WhatsApp, Telegram, X, email, or phone."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted",
				children: ["Avatar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-clay",
					children: "*"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block w-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "sr-only",
					type: "file",
					accept: "image/*",
					onChange: (event) => void addPhoto(event.target.files?.[0], "avatar")
				}), draft.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: draft.avatar,
					alt: "Your avatar",
					className: "size-24 rounded-2xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-24 items-center justify-center rounded-2xl border border-line bg-raised text-sm text-muted",
					children: "Add"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Public photos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm text-clay",
					children: ["Add", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "sr-only",
						type: "file",
						accept: "image/*",
						onChange: (event) => void addPhoto(event.target.files?.[0], "public")
					})]
				})]
			}),
			draft.photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex gap-3 overflow-x-auto",
				children: draft.photos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo,
						alt: "",
						className: "size-20 rounded-xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-bg text-fg",
						"aria-label": "Remove photo",
						onClick: () => setDraft({
							...draft,
							photos: draft.photos.filter((_, photoIndex) => photoIndex !== index)
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-3",
							"aria-hidden": "true"
						})
					})]
				}, photo.slice(0, 24) + index))
			}),
			photoError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-clay",
				children: photoError
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Contacts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": draft.contactsOpen,
					onClick: () => setDraft({
						...draft,
						contactsOpen: !draft.contactsOpen
					}),
					className: `h-8 w-14 rounded-full p-1 ${draft.contactsOpen ? "bg-clay" : "bg-raised"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block size-6 rounded-full bg-fg ${draft.contactsOpen ? "ml-auto" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: draft.contactsOpen ? "Contacts on" : "Contacts off"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Off means your numbers and usernames stay hidden even after someone agrees."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Phone",
						value: draft.phone,
						error: show.phone,
						onChange: (phone) => setDraft({
							...draft,
							phone
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Email",
						value: draft.email,
						error: show.email,
						onChange: (email) => setDraft({
							...draft,
							email
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Telegram username",
						value: draft.telegram,
						error: show.telegram,
						onChange: (telegram) => setDraft({
							...draft,
							telegram
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Snapchat",
						value: draft.snapchat,
						error: show.snapchat,
						onChange: (snapchat) => setDraft({
							...draft,
							snapchat
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Facebook",
						value: draft.facebook,
						error: show.facebook,
						onChange: (facebook) => setDraft({
							...draft,
							facebook
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "WhatsApp number",
						value: draft.whatsapp,
						error: show.whatsapp,
						onChange: (whatsapp) => setDraft({
							...draft,
							whatsapp
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "X username",
						value: draft.x,
						error: show.x,
						onChange: (xName) => setDraft({
							...draft,
							x: xName
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Type the @username you want people to see. Sign-in does not include it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "TikTok",
						value: draft.tiktok,
						error: show.tiktok,
						onChange: (tiktok) => setDraft({
							...draft,
							tiktok
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						label: "Instagram",
						value: draft.instagram,
						error: show.instagram,
						onChange: (instagram) => setDraft({
							...draft,
							instagram
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nickname",
				required: true,
				value: draft.name,
				error: show.name,
				onChange: (name) => setDraft({
					...draft,
					name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Headline",
				required: true,
				value: draft.headline,
				error: show.headline,
				onChange: (headline) => setDraft({
					...draft,
					headline
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-baseline justify-between text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["About me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-clay",
							children: "*"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								draft.bio.trim().length,
								" / ",
								80
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "field mt-2 min-h-32",
						value: draft.bio,
						maxLength: 600,
						onChange: (event) => setDraft({
							...draft,
							bio: event.target.value
						})
					}),
					show.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 block text-sm text-clay",
						children: show.bio
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Basic information"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between rounded-2xl border border-line bg-raised px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Voice bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": draft.voiceBio,
					onClick: () => setDraft({
						...draft,
						voiceBio: !draft.voiceBio
					}),
					className: `rounded-full px-4 py-2 text-sm ${draft.voiceBio ? "bg-clay text-clay-deep" : "border border-line"}`,
					children: draft.voiceBio ? "60s ready" : "Add 60s"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Heard only after you both agree. This marks the slot on your profile."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted",
				children: ["Gender", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-clay",
					children: "*"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: GENDERS.map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDraft({
						...draft,
						gender
					}),
					className: `rounded-full px-4 py-2 text-sm ${draft.gender === gender ? "bg-clay text-clay-deep" : "border border-line"}`,
					children: gender
				}, gender))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Age",
				required: true,
				value: draft.age,
				options: AGES,
				onChange: (age) => setDraft({
					...draft,
					age
				})
			}),
			show.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-clay",
				children: show.age
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Location",
				required: true,
				value: draft.city,
				error: show.city,
				onChange: (city) => setDraft({
					...draft,
					city
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Ethnicity",
				required: true,
				value: draft.ethnicity,
				options: ETHNICITIES,
				onChange: (ethnicity) => setDraft({
					...draft,
					ethnicity
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Height",
				required: true,
				value: draft.height,
				options: HEIGHTS,
				onChange: (height) => setDraft({
					...draft,
					height
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Body type",
				required: true,
				value: draft.bodyType,
				options: BODIES,
				onChange: (bodyType) => setDraft({
					...draft,
					bodyType
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Education",
				required: true,
				value: draft.education,
				options: EDUCATIONS,
				onChange: (education) => setDraft({
					...draft,
					education
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Looking for",
				required: true,
				value: draft.lookingFor,
				options: LOOKING,
				onChange: (lookingFor) => setDraft({
					...draft,
					lookingFor
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Social information"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Relationship",
				required: true,
				value: draft.relationship,
				options: RELATIONSHIPS,
				onChange: (relationship) => setDraft({
					...draft,
					relationship
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Have children",
				required: true,
				value: draft.children,
				options: CHILDREN,
				onChange: (children) => setDraft({
					...draft,
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Smoking",
				required: true,
				value: draft.smoking,
				options: SMOKING,
				onChange: (smoking) => setDraft({
					...draft,
					smoking
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
				label: "Drinking",
				required: true,
				value: draft.drinking,
				options: DRINKING,
				onChange: (drinking) => setDraft({
					...draft,
					drinking
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted",
				children: ["Hobbies", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-clay",
					children: "*"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: HOBBIES.map((hobby) => {
					const on = draft.hobbies.includes(hobby);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleHobby(hobby),
						className: `rounded-full px-4 py-2 text-sm ${on ? "bg-clay text-clay-deep" : "border border-line"}`,
						children: hobby
					}, hobby);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-clay mt-8 w-full",
				onClick: () => {
					if (!ready) {
						setTried(true);
						setSaved(false);
						return;
					}
					saveProfile(draft, true);
					saveMine({ data: draft }).then(() => onShared()).then(() => {
						setTried(false);
						setSaved(true);
					}).catch(() => {
						setSaved(false);
						setPhotoError("Saved on this phone, not shared yet. Try a smaller photo.");
					});
				},
				children: saved ? "Saved" : "Save"
			}),
			!ready && tried && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-clay",
				children: "Not saved. Meet still uses the last complete biography and contact."
			}),
			!hasReach(draft) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Add WhatsApp, Telegram, X, an email, or a phone before saving."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 border-t border-line pt-6",
				children: confirmReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "This forgets your biography, contacts, and messages on this phone."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => setConfirmReset(false),
						children: "Keep it"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-clay",
						onClick: () => {
							resetAll();
							setDraft(emptyProfile());
						},
						children: "Forget me"
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted underline underline-offset-4",
					onClick: () => setConfirmReset(true),
					children: "Start over"
				})
			})
		]
	});
}
var AGES = Array.from({ length: 63 }, (_, index) => String(index + 18));
function Choice({ label, value, options, onChange, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 flex items-center justify-between gap-3 rounded-2xl border border-line bg-raised px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-clay",
			children: "*"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: "max-w-[11rem] bg-transparent text-right text-muted",
			value,
			onChange: (event) => onChange(event.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Choose"
			}), options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option,
				children: option
			}, option))]
		})]
	});
}
function ContactRow({ icon, label, value, error, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3 rounded-2xl border border-line bg-raised px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "min-w-0 flex-1 bg-transparent outline-none",
						placeholder: label,
						"aria-label": label,
						value,
						onChange: (event) => onChange(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
						className: "size-4 text-muted",
						"aria-hidden": "true"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-sm text-clay",
				children: error
			})
		]
	});
}
async function shrinkPhoto(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, 720 / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(bitmap.width * scale));
	canvas.height = Math.max(1, Math.round(bitmap.height * scale));
	const context = canvas.getContext("2d");
	if (!context) return "";
	context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", .72);
}
function Sheet({ title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if (event.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-30 flex items-end justify-center bg-bg/80 md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "sheet-title",
			className: "sheet-panel w-full max-w-md overflow-y-auto rounded-t-card bg-surface px-5 pt-5 pb-8 md:rounded-card",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "sheet-title",
					className: "font-display text-3xl leading-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line size-12 px-0",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})]
		})
	});
}
//#endregion
export { ItalyApp as t };
