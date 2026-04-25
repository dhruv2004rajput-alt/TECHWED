import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CurtainIntro } from "./CurtainIntro";
import { useScrollReveal } from "./hooks/useScrollReveal";

export const Layout = ({ children, hideChrome = false }: { children: ReactNode; hideChrome?: boolean }) => {
  const loc = useLocation();
  useScrollReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [loc.pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CurtainIntro />
      {!hideChrome && <Navbar />}
      <main key={loc.pathname} className={`flex-1 ${hideChrome ? "" : "pt-16 md:pt-20"} animate-fade-in`}>
        {children}
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};
