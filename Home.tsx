import { ArrowRight, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/SiteChrome";
import ProductShowcase from "@/components/ProductShowcase";
import CarWashHero from "@/components/CarWashHero";
import OrderFlow from "@/components/OrderFlow";
import { categories, DEMO_PRODUCTS } from "@/lib/catalog";
import { trpc } from "@/lib/trpc";
import InstagramReels from "@/components/InstagramReels";
import SwapPhrase from "@/components/SwapPhrase";
import CurvedTicker from "@/components/CurvedTicker";
import { INSTAGRAM_URL, WA_HELLO as WA, WA_QUOTE } from "@/lib/contact";

// Produto que representa cada linha (slug do catálogo). Troque aqui se quiser outra foto.
const LINE_PRODUCT: Record<string, string> = {
  "Lavagem automotiva": "vonixx-v-floc-lava-autos",
  "Interior e superfícies": "vonixx-sintra-pro-limpador",
  "Pneus e acabamento": "lincoln-hof-hi-one-fast",
  "Pintura e proteção": "cadillac-cleaner-wax",
};

const MAPS_URL = "https://share.google/kebiOkuOwJPefVGdX";

const ticker = ["Espuma neutra", "Lavagem", "Descontaminação", "Cera e proteção", "Interior", "Pneus", "Acabamento"];

export default function Home() {
  const { data } = trpc.products.list.useQuery();
  const products = data?.length ? data : DEMO_PRODUCTS;
  const featured = products.filter(p => p.featured).slice(0, 8);
  return <div className="site-shell home-page"><SiteHeader /><main>
    <CarWashHero />

    <section className="ed-section ed-manifesto"><div className="container">
      <h2><SwapPhrase text="A sujeira é temporária." /><br /><em><SwapPhrase text="O brilho é uma decisão." /></em></h2>
      <div className="ed-split"><span className="ed-label">O padrão MEGAUTO</span><p>Produtos para lavar, proteger e acabar cada detalhe do carro. Sem atalho, sem improviso: você escolhe, a gente confirma o melhor pelo WhatsApp.</p></div>
      <CurvedTicker words={ticker} />
    </div></section>

    <section className="ed-section"><div className="container">
      <span className="ed-label">Linhas</span>
      <h2 className="ed-h2">Quatro linhas. <em>Um padrão.</em></h2>
      <p className="ed-lead">Cada linha cobre uma etapa do cuidado, para nada ficar sem atenção.</p>
      <div className="ed-bays">{categories.map((c, i) => (
        <Link key={c.label} href={`/catalogo?categoria=${encodeURIComponent(c.label)}`} className="ed-bay">
          {(() => { const img = products.find(p => p.slug === LINE_PRODUCT[c.label])?.imageUrl; return img ? <img className="ed-bay-img" src={img} alt="" loading="lazy" decoding="async" /> : null; })()}
          <span className="ed-num">Linha 0{i + 1}</span>
          <h3>{c.label}</h3>
          <p>{c.kicker}</p>
          <span className="ed-more">Ver produtos <ArrowRight size={15} /></span>
        </Link>))}
      </div>
    </div></section>

    <section className="ed-section"><div className="container">
      <span className="ed-label">O que toca na sua pintura</span>
      <h2 className="ed-h2">Produtos em que <em>confiamos.</em></h2>
      <p className="ed-lead">Deslize, use as setas ou toque em um produto para ver os detalhes.</p>
      <ProductShowcase products={featured.length >= 3 ? featured : products.slice(0, 6)} />
      <Link href="/catalogo" className="text-link ed-catalog-link">Ver catálogo completo <ArrowRight size={17} /></Link>
    </div></section>

    <section className="ed-section"><div className="container">
      <span className="ed-label">Instagram</span>
      <h2 className="ed-h2">A MEGAUTO <em>em ação.</em></h2>
      <p className="ed-lead">Veja a lavagem e o acabamento de perto no @megautosnc.</p>
      <InstagramReels />
      <a className="text-link ed-catalog-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver mais no Instagram <ArrowRight size={17} /></a>
    </div></section>

    <section className="ed-section"><div className="container">
      <span className="ed-label">Pedido</span>
      <h2 className="ed-h2">Peça em <em>três passos.</em></h2>
      <OrderFlow />
    </div></section>

    <section className="ed-section" id="localizacao"><div className="container">
      <span className="ed-label">Localização</span>
      <h2 className="ed-h2">Venha até <em>a gente.</em></h2>
      <p className="ed-lead">Encontre a MEGAUTO no mapa e trace a rota direto pelo Google Maps.</p>
      <a className="ed-loc" href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Abrir a localização da MEGAUTO no Google Maps">
        <div className="ed-loc-map"><div className="ed-loc-tag"><b>MEGAUTO</b><i /></div></div>
        <div className="ed-loc-info">
          <span className="ed-loc-pin"><MapPin size={26} /></span>
          <span className="ed-loc-text"><strong>MEGAUTO</strong><small>Senador Canedo • Fazemos entregas</small></span>
          <span className="ed-more">Abrir no Google Maps <ArrowRight size={15} /></span>
        </div>
      </a>
    </div></section>

    <section className="ed-section ed-final"><div className="container">
      <span className="ed-label">Peça agora</span>
      <h2>Quem ama carro<br /><em>escolhe o produto certo.</em></h2>
      <div className="hero-actions">
        <a className="button button-primary" href={WA_QUOTE} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Pedir orçamento</a>
        <Link className="button button-ghost" href="/catalogo">Ver catálogo <ArrowRight size={18} /></Link>
        <a className="button button-ghost" href="https://www.instagram.com/megautosnc/" target="_blank" rel="noreferrer"><Instagram size={18} /> @megautosnc</a>
      </div>
      <p className="ed-note">Senador Canedo • Fazemos entregas</p>
    </div></section>
  </main><SiteFooter /><WhatsAppFloat /></div>;
}
