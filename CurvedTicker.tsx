import { useEffect, useState } from "react";
import CurvedLoop from "@/components/CurvedLoop";

/**
 * Faixa curva com as palavras-chave, usando o CurvedLoop (estilo racing: Racing Sans One, laranja, maior).
 * O SVG do CurvedLoop tem proporção fixa (1440 × 800) e escala com a largura, então no celular a fonte
 * é maior (em unidades do SVG) para continuar legível. O "palco" tem altura própria e corta o que sobra,
 * assim a faixa não cobre os elementos vizinhos nem atrapalha cliques.
 */
const FAMILY = "'Racing Sans One', Anton, Impact, sans-serif";

// H = altura do palco (unidades do SVG). top = onde o centro do SVG fica dentro do palco (%), para
// a curva ficar centralizada na faixa. Se mudar fonte/curva, ajuste estes dois valores.
const DESKTOP = { font: { fontFamily: FAMILY, fontWeight: 400, fontSize: 72, letterSpacing: "0.03em", lineHeight: "1.2em", textAlign: "left" }, curve: -140, H: 200, top: 72.5 };
const MOBILE = { font: { fontFamily: FAMILY, fontWeight: 400, fontSize: 118, letterSpacing: "0.03em", lineHeight: "1.2em", textAlign: "left" }, curve: -120, H: 250, top: 70 };

function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export default function CurvedTicker({ words }: { words: string[] }) {
  const compact = useMedia("(max-width: 640px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const cfg = compact ? MOBILE : DESKTOP;
  // A fonte racing carrega depois do primeiro render: força o CurvedLoop a medir o texto de novo quando ela chegar.
  useEffect(() => {
    document.fonts?.load(`72px "Racing Sans One"`).then(() => setTimeout(() => window.dispatchEvent(new Event("resize")), 300));
  }, []);
  const text = words.join("  //  ") + "  //";
  return (
    <div className="ed-marquee" role="img" aria-label={words.join(", ")} style={{ aspectRatio: `1440 / ${cfg.H}`, ["--ed-svg-top" as any]: `${cfg.top}%` }}>
      <CurvedLoop
        text={text}
        font={cfg.font}
        color="#ff4b0b"
        direction="left"
        baseVelocity={reduce ? 0 : 10}
        curveAmount={cfg.curve}
        gap={1.2}
        style={{ minHeight: 0 }}
      />
    </div>
  );
}
