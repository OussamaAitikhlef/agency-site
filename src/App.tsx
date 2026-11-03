import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import Home from "./pages/Home";

export default function App() {
  const [loading, setLoading] = useState(true);
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
  }, [start]);

  return (
    <BrowserRouter>
      {loading && <Preloader onDone={handleDone} />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
