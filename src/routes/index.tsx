import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Methodology } from "@/components/site/Methodology";
import { Programs } from "@/components/site/Programs";
import { Gallery } from "@/components/site/Gallery";
import { Clients } from "@/components/site/Clients";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Nikhil B. Mehta | Leadership & Corporate Training | Best and Beyond";
const description =
  "Corporate leadership, communication and sales training by Nikhil B. Mehta — 18+ years entrepreneurial experience, 6000+ professionals trained.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
