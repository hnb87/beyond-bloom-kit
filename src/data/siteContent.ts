import heroImg from "@/assets/hero.jpg";
import portraitImg from "@/assets/nikhil-portrait.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

export type CourseStatus = "Running" | "Upcoming" | "On Demand";
export type GalleryCategory = "Corporate" | "Campus / University" | "Leadership Workshops";

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: CourseStatus;
  signature: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
}

export interface SiteData {
  adminPin: string;
  brand: {
    company: string;
    person: string;
    role: string;
    tagline: string;
    valueProposition: string;
  };
  contact: {
    whatsapp: string;
    secondaryPhone: string;
    email: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  hero: {
    headline: string;
    subtext: string;
    backgroundImage: string;
    portraitImage: string;
  };
  stats: { value: string; label: string }[];
  about: {
    narrative: string[];
    pillars: { title: string; description: string }[];
  };
  certifications: string[];
  methodology: { step: string; title: string; description: string }[];
  courses: Course[];
  gallery: GalleryItem[];
  clients: string[];
  featuredQuote: string;
}

export const defaultSiteData: SiteData = {
  adminPin: "2468",
  brand: {
    company: "Best and Beyond Knowledge Solutions",
    person: "Nikhil B. Mehta",
    role: "Founder, Trainer & Business/Leadership Development Strategist",
    tagline: "Empowering People. Strengthening Teams. Driving Business Excellence.",
    valueProposition:
      "People Development with Business Purpose. Helping leaders, professionals, and teams translate learning into workplace impact.",
  },
  contact: {
    whatsapp: "919845025061",
    secondaryPhone: "919825090015",
    email: "nikhil.ugp@gmail.com",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
  hero: {
    headline: "Empowering People. Strengthening Teams. Driving Business Excellence.",
    subtext:
      "18+ years of entrepreneurial grit and 15+ years of experiential training — designing leadership and behavioural programs that turn learning into measurable workplace impact.",
    backgroundImage: heroImg,
    portraitImage: portraitImg,
  },
  stats: [
    { value: "18+", label: "Years of Entrepreneurial Experience" },
    { value: "15+", label: "Years in Training & Development" },
    { value: "6000+", label: "People Trained Across Varied Audiences" },
  ],
  about: {
    narrative: [
      "Nikhil B. Mehta is the Founder of Best and Beyond Knowledge Solutions — a learning practice built on one belief: development is only valuable when it changes behaviour at work.",
      "As an entrepreneur for over 18 years, Nikhil brings a business owner's lens to every training room. Programs are never generic content downloads; they are designed around real workplace pressures — targets, teams, customers, deadlines and difficult conversations.",
      "His facilitation style blends experiential behavioural learning with NLP-based tools, structured practice and honest feedback, so participants leave with habits they can apply on Monday morning — not just notes they never revisit.",
    ],
    pillars: [
      { title: "Engage", description: "Participation, curiosity and openness that make learners lean in from minute one." },
      { title: "Experience", description: "Activities, cases, role plays and deliberate practice instead of passive listening." },
      { title: "Apply", description: "Every insight is connected to live workplace situations and real accountability." },
      { title: "Transform", description: "Reinforcement that converts new behaviour into sustainable everyday habits." },
    ],
  },
  certifications: [
    "NLP Practitioner & NLP Master Practitioner (ABNLP, USA)",
    "Train the Trainer (Success Gyan)",
    "Making the Stage (Success Resources)",
    "M.O.S.E. – Mastery of Self Expression (Larry Gilhman)",
    "Breakthrough Coach (SK Consultancy)",
    "Certified Networker Trainer (Phil Belford)",
  ],
  methodology: [
    { step: "01", title: "Discover", description: "Stakeholder conversations and needs analysis to pinpoint the real behavioural gap." },
    { step: "02", title: "Design", description: "Custom curriculum, cases and activities mapped to your business context and KPIs." },
    { step: "03", title: "Engage", description: "High-energy experiential delivery that keeps every participant involved." },
    { step: "04", title: "Apply", description: "Action plans, workplace assignments and manager alignment for on-the-job transfer." },
    { step: "05", title: "Reinforce", description: "Follow-up sessions, nudges and coaching to lock in sustainable habits." },
  ],
  courses: [
    { id: "c1", title: "High-Performance Professionals", description: "Self-awareness, ownership and personal productivity systems for consistent high output.", duration: "1–2 Days", status: "Running", signature: true },
    { id: "c2", title: "Leadership Excellence", description: "Decision-making, coaching conversations, trust building and accountability for people leaders.", duration: "2 Days", status: "Running", signature: true },
    { id: "c3", title: "Professional Communication Mastery", description: "Presentations, public speaking, assertiveness and handling difficult conversations.", duration: "1–2 Days", status: "Upcoming", signature: true },
    { id: "c4", title: "Customer Experience Excellence", description: "Customer-centric behaviours, service mindset and recovery from service failures.", duration: "1 Day", status: "Upcoming", signature: false },
    { id: "c5", title: "Sales Transformation", description: "Consultative selling, questioning frameworks, objection handling and confident closing.", duration: "2 Days", status: "Running", signature: true },
    { id: "c6", title: "Personal Excellence Blueprint", description: "Habit formation, goal setting, self-image and confidence for career acceleration.", duration: "1 Day", status: "Upcoming", signature: false },
    { id: "c7", title: "Team Building & Collaboration", description: "Cross-functional trust, shared purpose and conflict-free collaboration under pressure.", duration: "1 Day", status: "On Demand", signature: false },
    { id: "c8", title: "Manager Effectiveness", description: "Delegation, coaching, feedback and conflict resolution for first-time and mid-level managers.", duration: "2 Days", status: "Upcoming", signature: true },
  ],
  gallery: [
    { id: "g1", src: g1, caption: "Leadership lab with a corporate management team", category: "Corporate" },
    { id: "g2", src: g2, caption: "Campus session on personal excellence", category: "Campus / University" },
    { id: "g3", src: g3, caption: "Manager effectiveness workshop in action", category: "Leadership Workshops" },
    { id: "g4", src: heroImg, caption: "Keynote on people development with business purpose", category: "Corporate" },
  ],
  clients: [
    "Parul University",
    "Maharaja Sayajirao University of Baroda (MSU)",
    "IIIM Jaipur",
    "Poornima University",
    "DICS IAS/IPS",
    "BNI Bangalore",
    "JCI Bangalore",
    "Anna Adarsh College Chennai",
    "GM Vidyaniketan Udupi",
    "LEAP Academy Hyderabad",
    "Sai Investments",
    "Geetanjali Engineers",
    "Teravon Solar Energies",
    "Labh Property",
    "ICFAI University",
  ],
  featuredQuote: "Organizations grow when their people grow.",
};