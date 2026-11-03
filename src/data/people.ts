export type Person = {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  photo: string;
  bio: string;
  email: string;
  phone: string;
  accepts: boolean;
  interests: string[];
};

export const PEOPLE: Person[] = [
  {
    id: "amara",
    name: "Amara Okonkwo",
    age: 29,
    city: "Rome",
    role: "Curator",
    photo: "/portraits/amara.jpg",
    bio: "I am in Rome for a year, hanging a show about migration and cloth. Lagos is home; Trastevere is where my keys are. I like long walks, sharp opinions, and people who answer the question they were asked. If we meet, I will have read your biography all the way through.",
    email: "amara@letters.italywe.app",
    phone: "+39 333 010 2201",
    accepts: true,
    interests: ["Galleries", "Walking", "Cloth"],
  },
  {
    id: "marco",
    name: "Marco Bellini",
    age: 32,
    city: "Milan",
    role: "Sommelier",
    photo: "/portraits/marco.jpg",
    bio: "I run the floor at a wine bar in Isola and I taste for a living, which sounds glamorous and is mostly standing up. Sundays I take the train out of the city and come back with something pickled. I am looking for a person, not a plus-one. Tell me what you actually do with a free evening.",
    email: "marco@letters.italywe.app",
    phone: "+39 333 010 2202",
    accepts: false,
    interests: ["Wine", "Trains", "Late dinner"],
  },
  {
    id: "chiara",
    name: "Chiara Esposito",
    age: 27,
    city: "Naples",
    role: "Ceramicist",
    photo: "/portraits/chiara.jpg",
    bio: "I throw bowls in a studio that smells like rain and I sell them when they survive the kiln. I grew up near the port and I still eat dinner late. I want to meet someone patient enough for a messy table and honest enough to say if they are staying in Naples.",
    email: "chiara@letters.italywe.app",
    phone: "+39 333 010 2203",
    accepts: false,
    interests: ["Clay", "The port", "Late dinner"],
  },
  {
    id: "sofia",
    name: "Sofia Marino",
    age: 26,
    city: "Palermo",
    role: "Marine biologist",
    photo: "/portraits/sofia.jpg",
    bio: "I count seagrass and I argue with fishing boats, politely, for work. On land I swim before the city wakes and cook too much fish for one person. I would like to meet someone who can talk about a real day, not a highlight. I am in Palermo through the spring.",
    email: "sofia@letters.italywe.app",
    phone: "+39 333 010 2204",
    accepts: true,
    interests: ["The sea", "Early swims", "Cooking"],
  },
  {
    id: "alessandro",
    name: "Alessandro Conti",
    age: 31,
    city: "Turin",
    role: "Pianist",
    photo: "/portraits/alessandro.jpg",
    bio: "I play late sets in a room that holds forty people if they like each other. Days are scales and bad coffee. I am not mysterious, I am just awake at the wrong hours. If you write to me, tell me a song you return to when the week has been long.",
    email: "alessandro@letters.italywe.app",
    phone: "+39 333 010 2205",
    accepts: false,
    interests: ["Piano", "Night sets", "Bad coffee"],
  },
  {
    id: "elena",
    name: "Elena Vitali",
    age: 28,
    city: "Bologna",
    role: "Food writer",
    photo: "/portraits/elena.jpg",
    bio: "I write about ordinary kitchens, not tasting menus. I live above a bakery and I know the baker's dog by name. I want company that can split a plate and also split a silence. If you are visiting, say which night — I keep my table small on purpose.",
    email: "elena@letters.italywe.app",
    phone: "+39 333 010 2206",
    accepts: false,
    interests: ["Kitchens", "Writing", "Small tables"],
  },
  {
    id: "luca",
    name: "Luca Ferrara",
    age: 34,
    city: "Florence",
    role: "Bookbinder",
    photo: "/portraits/luca.jpg",
    bio: "I bind books by hand in a shop that is too cold in January and exactly right the rest of the year. I read slowly and I like people who can be quiet without making it a performance. If we meet, it will probably be a walk and a coffee that turns into the afternoon.",
    email: "luca@letters.italywe.app",
    phone: "+39 333 010 2207",
    accepts: true,
    interests: ["Books", "Walks", "Quiet"],
  },
  {
    id: "giulia",
    name: "Giulia Rossi",
    age: 29,
    city: "Rome",
    role: "Architect",
    photo: "/portraits/giulia.jpg",
    bio: "I restore small apartments in Testaccio and I am terrible at leaving a site before the light goes. Most weeks I walk the river after work and argue with myself about tile. I want someone who will sit through a long dinner and not treat plans like a spreadsheet. If you are only in Rome for a weekend, say so — I still like a clear invitation.",
    email: "giulia@letters.italywe.app",
    phone: "+39 333 010 2208",
    accepts: true,
    interests: ["Buildings", "The river", "Long dinners"],
  },
];

export type Social = {
  whatsapp: string;
  telegram: string;
  x: string;
  snapchat: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  gift: string;
};

export const SOCIAL: Record<string, Social> = {
  amara: {
    whatsapp: "+39 333 010 2201",
    telegram: "amarawe",
    x: "amarawe",
    snapchat: "",
    facebook: "",
    tiktok: "",
    instagram: "amara.cloth",
    gift: "A note from the gallery",
  },
  marco: {
    whatsapp: "+39 333 010 2202",
    telegram: "marcobellini",
    x: "marcowine",
    snapchat: "",
    facebook: "Marco Bellini",
    tiktok: "",
    instagram: "",
    gift: "A glass, on the house",
  },
  chiara: {
    whatsapp: "+39 333 010 2203",
    telegram: "chiaraclay",
    x: "chiaraclay",
    snapchat: "chiaraclay",
    facebook: "",
    tiktok: "chiaraclay",
    instagram: "chiara.pots",
    gift: "A small bowl",
  },
  sofia: {
    whatsapp: "+39 333 010 2204",
    telegram: "sofiamarino",
    x: "sofiasea",
    snapchat: "",
    facebook: "",
    tiktok: "",
    instagram: "sofia.sea",
    gift: "A morning swim",
  },
  alessandro: {
    whatsapp: "+39 333 010 2205",
    telegram: "aleconti",
    x: "alepiano",
    snapchat: "",
    facebook: "",
    tiktok: "",
    instagram: "",
    gift: "A late set",
  },
  elena: {
    whatsapp: "+39 333 010 2206",
    telegram: "elenavitale",
    x: "elenakitchen",
    snapchat: "",
    facebook: "",
    tiktok: "elenakitchen",
    instagram: "elena.table",
    gift: "A seat at a small table",
  },
  luca: {
    whatsapp: "+39 333 010 2207",
    telegram: "lucaferrara",
    x: "lucabinds",
    snapchat: "",
    facebook: "",
    tiktok: "",
    instagram: "",
    gift: "A walk and a coffee",
  },
  giulia: {
    whatsapp: "+39 333 010 2208",
    telegram: "giuliarossi",
    x: "giuliarome",
    snapchat: "",
    facebook: "",
    tiktok: "",
    instagram: "giulia.rome",
    gift: "A walk by the river",
  },
};

