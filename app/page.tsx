import About from "@/sections/about/About";
import Hero from "@/sections/hero/Hero";
import Experience from "@/sections/experience/Experience";
import Services from "@/sections/services/Services";
import Skills from "@/sections/skills/Skills";
import Recognitions from "@/sections/recognitions/Recognitions";

import FloatingNav from "@/components/navigation/FloatingNav";
import Footer from "@/sections/footer/Footer";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Services />
        <Skills />
        <Recognitions />
      </main>
      <Footer />
    </>
  );
}
