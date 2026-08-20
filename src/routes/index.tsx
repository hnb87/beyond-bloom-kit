import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Methodology } from "@/components/site/Methodology";
import { Programs } from "@/components/site/Programs";
import { Gallery } from "@/components/site/Gallery";
import { Clients } from "@/components/site/Clients";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Nikhil B. Mehta | Corporate Leadership & Soft Skills Trainer in India";
const description =
  "Nikhil B. Mehta, Founder of Best and Beyond Knowledge Solutions, delivers corporate leadership, communication, sales and team-building training across India. 15+ years training, 6000+ professionals trained.";

const faqs = [
  {
    q: "Who is Nikhil B. Mehta?",
    a: "Nikhil B. Mehta is the Founder of Best and Beyond Knowledge Solutions, a corporate trainer and business/leadership development strategist with 18+ years of entrepreneurial experience and 15+ years in training, having trained 6000+ professionals across corporates and universities in India.",
  },
  {
    q: "What training programs does Best and Beyond Knowledge Solutions offer?",
    a: "Programs include High-Performance Professionals, Leadership Excellence, Professional Communication Mastery, Customer Experience Excellence, Sales Transformation, Personal Excellence Blueprint, Team Building & Collaboration and Manager Effectiveness — delivered as 1–2 day experiential workshops.",
  },
  {
    q: "Where are the corporate training workshops conducted?",
    a: "Workshops are conducted on-site at client offices, campuses and conference venues across India, and are also available as customised in-house or virtual sessions.",
  },
  {
    q: "How do I book a corporate training workshop?",
    a: "You can book directly on WhatsApp at +91 98450 25061, call +91 98250 90015, or email nikhil.ugp@gmail.com to discuss objectives, audience and dates.",
  },
  {
    q: "What makes the training methodology different?",
    a: "Every program follows a five-step methodology — Discover, Design, Engage, Apply and Reinforce — built on the four pillars of Engage, Experience, Apply and Transform, so learning converts into measurable workplace behaviour change.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "corporate trainer India, leadership training, soft skills training, NLP practitioner trainer, sales training, communication skills workshop, Nikhil B. Mehta, Best and Beyond Knowledge Solutions",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Nikhil B. Mehta" },
      // GEO signals
      { name: "geo.region", content: "IN" },
      { name: "geo.placename", content: "India" },
      { name: "ICBM", content: "20.5937, 78.9629" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Best and Beyond Knowledge Solutions" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#nikhil",
              name: "Nikhil B. Mehta",
              jobTitle: "Founder, Trainer & Business/Leadership Development Strategist",
              description,
              email: "mailto:nikhil.ugp@gmail.com",
              telephone: "+91-98450-25061",
              knowsAbout: [
                "Leadership Development",
                "Corporate Training",
                "NLP",
                "Sales Training",
                "Communication Skills",
                "Team Building",
              ],
              worksFor: { "@id": "/#organization" },
            },
            {
              "@type": ["Organization", "ProfessionalService"],
              "@id": "/#organization",
              name: "Best and Beyond Knowledge Solutions",
              slogan: "Empowering People. Strengthening Teams. Driving Business Excellence.",
              description,
              founder: { "@id": "/#nikhil" },
              email: "mailto:nikhil.ugp@gmail.com",
              telephone: "+91-98450-25061",
              areaServed: { "@type": "Country", name: "India" },
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-98450-25061",
                  contactType: "sales",
                  areaServed: "IN",
                  availableLanguage: ["en", "hi", "gu"],
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Corporate Training Programs",
                itemListElement: [
                  "High-Performance Professionals",
                  "Leadership Excellence",
                  "Professional Communication Mastery",
                  "Customer Experience Excellence",
                  "Sales Transformation",
                  "Personal Excellence Blueprint",
                  "Team Building & Collaboration",
                  "Manager Effectiveness",
                ].map((name) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Course", name, provider: { "@id": "/#organization" } },
                })),
              },
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              name: "Best and Beyond Knowledge Solutions",
              publisher: { "@id": "/#organization" },
              inLanguage: "en-IN",
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Header />
      <main>
        <Hero />
        <About />
        <Methodology />
        <Programs />
        <Gallery />
        <Clients />
        <FAQ items={faqs} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
