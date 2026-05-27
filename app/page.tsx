import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollInit from "./components/ScrollInit";

export default function Home() {
  return (
    <>
      <ScrollInit />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Achievements />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
