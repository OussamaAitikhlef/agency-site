import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const { stop, start } = useLenis();

  // Lock scroll while the preloader runs.
  useEffect(() => {
    if (!loading) return;
    stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, stop]);

  const handleDone = useCallback(() => {
    start();
    setLoading(false);
    setReady(true);
  }, [start]);

  // Part 2B wires the fullscreen canvas menu here.
  const handleMenuToggle = useCallback(() => {}, []);

  return (
    <BrowserRouter>
      {loading && <Preloader onDone={handleDone} />}
      <Navbar ready={ready} onMenuToggle={handleMenuToggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
