import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Sections coming in Phase 3 */}
      </main>
      <Footer />
    </>
  );
}
