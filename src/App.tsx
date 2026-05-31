import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Shield, Hammer, FileText, Compass, HardDrive, 
  ChevronRight, Phone, Mail, MapPin, Check, Scale, Bookmark, 
  Trash2, FileDown, BookOpen, Clock, Calendar, ChevronDown, CheckCircle, Info 
} from "lucide-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AiAssistant from "./components/AiAssistant";
import Configurator from "./components/Configurator";
import SpecsTable from "./components/SpecsTable";

import { PRODUCT_ITEMS, BLOG_POSTS, PORTFOLIO_PROJECTS } from "./data";
import { EquipmentItem, BlogPost, PortfolioItem } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  
  // Configurator cross-routing helpers
  const [preselectedTrailer, setPreselectedTrailer] = useState<string>("ft-12");
  const [preselectedCrane, setPreselectedCrane] = useState<string>("fc-67");

  // Blog reader state
  const [readingPostId, setReadingPostId] = useState<string | null>(null);

  // Quote Request State & Configurator selections
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteTrailerId, setQuoteTrailerId] = useState("ft-12");
  const [quoteCraneId, setQuoteCraneId] = useState("fc-67");
  const [quoteAccessories, setQuoteAccessories] = useState<Record<string, string>>({});
  const [quoteTotalPrice, setQuoteTotalPrice] = useState(34900);
  const [quoteTotalWeight, setQuoteTotalWeight] = useState(2830);

  // Success Notification ticket state
  const [isSuccessTicketOpen, setIsSuccessTicketOpen] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "Sweden",
    message: ""
  });

  // Track equipment comparison list
  const [comparisonItems, setComparisonItems] = useState<string[]>(["ft-10", "ft-12"]);

  const toggleCompare = (id: string) => {
    setComparisonItems((prev) => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleOpenConfiguratorFromProduct = (trailerId: string, craneId: string) => {
    setPreselectedTrailer(trailerId);
    setPreselectedCrane(craneId);
    setActiveTab("configurator");
  };

  const handleOpenQuoteFromConfigurator = (details: {
    trailerId: string;
    craneId: string;
    accessories: Record<string, string>;
    totalPrice: number;
    totalWeight: number;
  }) => {
    setQuoteTrailerId(details.trailerId);
    setQuoteCraneId(details.craneId);
    setQuoteAccessories(details.accessories);
    setQuoteTotalPrice(details.totalPrice);
    setQuoteTotalWeight(details.totalWeight);
    setIsQuoteOpen(true);
  };

  const handleOpenDefaultQuote = () => {
    setQuoteTrailerId("ft-12");
    setQuoteCraneId("fc-67");
    setQuoteAccessories({});
    setQuoteTotalPrice(34900);
    setQuoteTotalWeight(2830);
    setIsQuoteOpen(true);
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueRef = "FC-" + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(uniqueRef);
    setIsQuoteOpen(false);
    setIsSuccessTicketOpen(true);
  };

  const handleCloseTicket = () => {
    setIsSuccessTicketOpen(false);
    // Reset state
    setCustomerForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "Sweden",
      message: ""
    });
  };

  // Pre-load top of page on change tab
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, readingPostId]);

  return (
    <div className="min-h-screen bg-[#070D0B] text-[#E6EAE7] flex flex-col font-sans selection:bg-industrial-orange selection:text-black">
      
      {/* HEADER BAR */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setReadingPostId(null);
        }} 
        onOpenQuote={handleOpenDefaultQuote} 
      />

      {/* PRIMARY TRANSITION CONTAINER */}
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4">
          
          <AnimatePresence mode="wait">
            
            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <motion.div
                key="home-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-16"
              >
                
                {/* Hero / AI side-by-side terminal block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Left Column: Industrial hook words */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#2C5241]">
                      Designed in Scandinavia • Engineered for extremes
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.1]">
                      Steel and Oak:<br />
                      <span className="text-industrial-orange">Uncompromising</span><br />
                      Forestry Solutions
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xl font-sans">
                      Forester Crane combines Scandinavian metal integrity with hydraulic accuracy. Built with SSAB certified high-yield S355 and S460 alloys to thrive during non-stop timber sweeps in subweights.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => setActiveTab("catalog")}
                        className="group flex items-center gap-2 rounded bg-industrial-orange hover:bg-[#F27E31] px-5 py-3 font-display text-[12px] font-bold uppercase tracking-wider text-black transition-all cursor-pointer active:scale-95"
                      >
                        Explore Catalog
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button
                        onClick={() => handleOpenConfiguratorFromProduct("ft-12", "fc-67")}
                        className="flex items-center gap-2 rounded border border-[#1A2D23] hover:border-industrial-orange px-5 py-3 font-display text-[12px] font-bold uppercase tracking-wider text-gray-300 transition-all cursor-pointer bg-black/25 active:scale-95"
                      >
                        Configure Best-Seller
                      </button>
                    </div>

                    {/* Standard B2B reassurance icons */}
                    <div className="grid grid-cols-3 gap-4 border-t border-[#1A2D23]/30 pt-6 mt-6 font-mono text-[10px] text-gray-500">
                      <div>
                        <p className="text-white text-base font-bold font-display leading-none">12 Tons</p>
                        <p className="text-[9px] text-[#2C5241] uppercase tracking-wider mt-1">L1 Payload Rate</p>
                      </div>
                      <div>
                        <p className="text-white text-base font-bold font-display leading-none">6.7 Meters</p>
                        <p className="text-[9px] text-[#2C5241] uppercase tracking-wider mt-1">Boom Horizontal Sweep</p>
                      </div>
                      <div>
                        <p className="text-white text-base font-bold font-display leading-none">4 Cylinders</p>
                        <p className="text-[9px] text-[#2C5241] uppercase tracking-wider mt-1">Oil Slewing Gears</p>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Grounded AI specialist assistant console */}
                  <div className="lg:col-span-6">
                    <AiAssistant />
                  </div>

                </div>

                {/* Section: Standard Sets Showcases */}
                <div className="space-y-6 pt-8 border-t border-[#1A2D23]/30">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Featured Selections</span>
                      <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mt-1">Pre-Configured Logging Sets</h3>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab("catalog");
                        setSelectedCategory("Configured Sets");
                      }}
                      className="text-xs text-industrial-orange hover:underline font-mono uppercase font-bold flex items-center gap-1 cursor-pointer"
                    >
                      View All Trailer-Crane set-up combos
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sets grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PRODUCT_ITEMS.filter(p => p.type === "set").slice(0, 3).map((item) => (
                      <div 
                        key={item.id}
                        className="rounded border border-[#1A2D23] bg-[#0B130E] p-5 flex flex-col justify-between hover:border-industrial-orange/50 transition-all group"
                      >
                        <div>
                          {/* Sizing badges */}
                          <div className="flex items-center justify-between border-b border-[#1A2D23]/35 pb-3 mb-4 font-mono text-[9px]">
                            <span className="bg-[#121F18] px-2.5 py-1 text-[#468266] rounded font-bold uppercase">
                              Set-Up Combo
                            </span>
                            <span className="text-gray-500">Weight: {item.weight} kg</span>
                          </div>

                          <h4 className="font-display font-bold text-sm text-white group-hover:text-industrial-orange transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 leading-normal mt-1.5 font-sans">
                            {item.description}
                          </p>

                          <ul className="space-y-1.5 mt-4 text-[11px] text-gray-400">
                            {item.features.slice(0, 3).map((f, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <Check className="h-3. w-3.5 text-industrial-orange flex-shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pricing section and configure CTA */}
                        <div className="border-t border-[#1A2D23]/30 pt-4 mt-6 flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[9px] text-gray-600 block leading-none">EXW Quote:</span>
                            <span className="font-mono text-sm font-bold text-industrial-orange mt-1 block">
                              €{item.priceEstimate.toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              // map set name to configured trailer and crane
                              const parts = item.id.split("-");
                              const tId = `${parts[1]}-${parts[2]}`;
                              const cId = `${parts[3]}-${parts[4]}`;
                              handleOpenConfiguratorFromProduct(tId, cId);
                            }}
                            className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-[#121F18] px-3.5 py-2 rounded hover:bg-industrial-orange hover:text-black transition-all cursor-pointer"
                          >
                            Generate Specs
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: The Forester Advantage (Specs highlights) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-[#1A2D23]/30">
                  <div className="lg:col-span-5 space-y-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Welding & Assembly Focus</span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                      The Forester Advantage
                    </h3>
                    <p className="text-xs text-gray-400 leading-normal font-sans">
                      Standard agricultural loaders are designed to swing hay, which compromises structural frame thickness under log stresses. Forester Crane frames are assembled using SSAB wear alloy sheets and fitted with premium protective components.
                    </p>

                    {/* Standard highlights list */}
                    <div className="space-y-3 font-sans">
                      <div className="flex gap-3">
                        <div className="h-5 w-5 bg-industrial-orange/10 rounded flex items-center justify-center text-industrial-orange text-xs font-bold leading-none flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase">Protected Hydraulic Lines</p>
                          <p className="text-[11px] text-gray-500 leading-normal mt-0.5">Hydraulic channels are routed internally within the crane extension booms and protected by metal tubes alongside tractor draws.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-5 w-5 bg-industrial-orange/10 rounded flex items-center justify-center text-industrial-orange text-xs font-bold leading-none flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase">Symmetrical 4-Cylinder Slewing</p>
                          <p className="text-[11px] text-gray-500 leading-normal mt-0.5">Dual rack pistons balances rotating forces inside the cast-oil base, eliminating gear teeth shearing during side lifts.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-5 w-5 bg-industrial-orange/10 rounded flex items-center justify-center text-industrial-orange text-xs font-bold leading-none flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase">Flange-Mounted stability</p>
                          <p className="text-[11px] text-gray-500 leading-normal mt-0.5">Integrated high strength steel flange blocks lock cranes directly above stabilizers, neutralizing chassis twisting forces.</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="lg:col-span-7 bg-[#0B130E] border border-[#1A2D23] rounded p-6">
                    <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-[#1A2D23]/30 pb-3 mb-4">
                      SSAB Alloy Structural Stress Test Ratings
                    </h4>
                    
                    <div className="space-y-4 font-mono text-[10px]">
                      <div>
                        <div className="flex justify-between text-gray-400">
                          <span>S355 Structural Carbon Steel (Regular Loaders)</span>
                          <span className="text-gray-500">355 N/mm²</span>
                        </div>
                        <div className="w-full bg-[#070D0B] h-2 rounded mt-1.5 overflow-hidden border border-[#1A2D23]/30">
                          <div className="bg-gray-700 h-full w-[55%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-white font-semibold">
                          <span className="text-industrial-orange">S460 Premium Swedish Alloy (Forester Frames)</span>
                          <span className="text-industrial-orange">460 N/mm² (+30% Yield)</span>
                        </div>
                        <div className="w-full bg-[#070D0B] h-2 rounded mt-1.5 overflow-hidden border border-[#1A2D23]/30">
                          <div className="bg-industrial-orange h-full w-[85%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[#83D7AE]">
                          <span>Hardox 450 Brinell Alloy Grade (Claw Blades)</span>
                          <span>1200 N/mm² Tensile</span>
                        </div>
                        <div className="w-full bg-[#070D0B] h-2 rounded mt-1.5 overflow-hidden border border-[#1A2D23]/30">
                          <div className="bg-[#468266] h-full w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded bg-[#121F18]/20 p-3.5 text-[10px] text-gray-500 leading-normal font-sans">
                      Our structural welds undergo rigorous non-destructive ultrasonic scanning before finishing to ensure 100% molecular bonding of crucial S460 crane couplings.
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 2. CATALOG TAB */}
            {activeTab === "catalog" && (
              <motion.div
                key="catalog-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-8"
              >
                
                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1A2D23]/30 pb-5">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">B2B Product Inventory</span>
                    <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                      Forester Machinery Catalog
                    </h2>
                  </div>
                  
                  {/* Category Pills Selector */}
                  <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-0">
                    {["All Products", "Forestry Trailers", "Forestry Cranes", "Configured Sets"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                          selectedCategory === cat 
                            ? "bg-industrial-orange text-black font-bold" 
                            : "bg-[#0B130E] border border-[#1A2D23] text-gray-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Product inventory grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCT_ITEMS.filter((p) => selectedCategory === "All Products" || p.category === selectedCategory).map((item) => {
                    const isInComparisonList = comparisonItems.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        className="rounded border border-[#1A2D23] bg-[#0B130E] overflow-hidden flex flex-col justify-between group hover:border-[#2C5241]/70 transition-all shadow-md"
                      >
                        {/* Upper image style filler & category */}
                        <div className="bg-[#121F18]/15 border-b border-[#1A2D23]/30 p-5 relative min-h-[160px] flex flex-col justify-between">
                          <span className="bg-black/40 px-2.5 py-1 text-[#2C5241] rounded font-mono text-[8px] font-bold uppercase tracking-wider max-w-max">
                            {item.category}
                          </span>
                          
                          {/* Conceptual Technical SVG drafting icon representing each product type */}
                          <div className="mx-auto my-3 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                            {item.type === "trailer" ? (
                              <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4A6E59" strokeWidth="2">
                                <line x1="10" y1="50" x2="160" y2="50" strokeWidth="4" />
                                <circle cx="100" cy="50" r="14" fill="#070D0B" stroke="#E06A1B" strokeWidth="2.5" />
                                <circle cx="138" cy="50" r="14" fill="#070D0B" stroke="#E06A1B" strokeWidth="2.5" />
                                <rect x="30" y="24" width="6" height="26" fill="#4A6E59" />
                                <rect x="74" y="24" width="6" height="26" fill="#4A6E59" />
                                <rect x="110" y="24" width="6" height="26" fill="#4A6E59" />
                              </svg>
                            ) : item.type === "crane" ? (
                              <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#E06A1B" strokeWidth="2">
                                <path d="M 20,60 L 20,24 L 80,10 L 140,24 Z" strokeLinecap="round" />
                                <circle cx="20" cy="60" r="6" fill="#070D0B" />
                                <circle cx="80" cy="10" r="4" fill="#070D0B" />
                              </svg>
                            ) : (
                              <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#E06A1B" strokeWidth="1.5">
                                <line x1="10" y1="50" x2="110" y2="50" stroke="#4A6E59" strokeWidth="3" />
                                <circle cx="50" cy="50" r="12" fill="#070D0B" stroke="#4A6E59" />
                                <circle cx="85" cy="50" r="12" fill="#070D0B" stroke="#4A6E59" />
                                <path d="M 120,44 L 120,10 L 160,20" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <span className="font-mono text-[9px] text-[#2C5241] uppercase tracking-wider font-semibold">
                              Base weight: {item.weight} kg
                            </span>
                          </div>
                        </div>

                        {/* Mid Details block */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display font-bold text-sm text-white group-hover:text-industrial-orange transition-all select-all">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans mt-2">
                              {item.description}
                            </p>

                            {/* Core Specs row */}
                            <div className="grid grid-cols-2 gap-2 border-t border-[#1A2D23]/25 pt-3.5 mt-4 text-[10.5px] font-mono">
                              {item.specs.slice(0, 2).map((s, sIdx) => (
                                <div key={sIdx}>
                                  <p className="text-gray-600 uppercase text-[8px] leading-tight font-semibold">{s.label}</p>
                                  <p className="text-white font-bold select-all mt-0.5">{s.value} {s.unit || ""}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action links footer */}
                          <div className="border-t border-[#1A2D23]/25 pt-4 mt-5 space-y-3">
                            <div className="flex justify-between items-center font-mono">
                              <div>
                                <span className="text-[8px] text-gray-600 uppercase block">Estimated Base:</span>
                                <span className="text-xs font-bold text-industrial-orange mt-0.5 block select-all">
                                  €{item.priceEstimate.toLocaleString()}
                                </span>
                              </div>
                              
                              {/* Compare checklist checkbox */}
                              {item.type === "trailer" && (
                                <button
                                  onClick={() => toggleCompare(item.id)}
                                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-semibold rounded border transition-colors cursor-pointer ${
                                    isInComparisonList 
                                      ? "bg-industrial-orange/10 border-industrial-orange text-industrial-orange" 
                                      : "bg-black/25 border-[#1A2D23] text-gray-500 hover:text-white"
                                  }`}
                                >
                                  {isInComparisonList ? "In Compare" : "+ Compare"}
                                </button>
                              )}
                            </div>

                            {/* Main Stepper triggering direct customization */}
                            <button
                              onClick={() => {
                                if (item.type === "trailer") {
                                  handleOpenConfiguratorFromProduct(item.id, "fc-67");
                                } else if (item.type === "crane") {
                                  handleOpenConfiguratorFromProduct("ft-12", item.id);
                                } else {
                                  const parts = item.id.split("-");
                                  handleOpenConfiguratorFromProduct(`${parts[1]}-${parts[2]}`, `${parts[3]}-${parts[4]}`);
                                }
                              }}
                              className="w-full flex items-center justify-center gap-2 rounded bg-[#121F18] hover:bg-industrial-orange text-white hover:text-black font-display text-[11px] font-bold uppercase tracking-wider py-2 transition-all cursor-pointer active:scale-95"
                            >
                              Configure Assembly
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Compare Bar floating alert */}
                {comparisonItems.length > 0 && (
                  <div className="bg-[#0B130E] border border-[#1A2D23] p-4 rounded flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-industrial-orange" />
                      <span>Comparison Tray ({comparisonItems.length} trailers queued)</span>
                      <span className="text-gray-500">|</span>
                      <div className="flex gap-2">
                        {comparisonItems.map(cId => (
                          <span key={cId} className="bg-[#121F18] text-[#83D7AE] py-0.5 px-2 rounded uppercase text-[10px]">
                            {cId.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("comparison")}
                      className="rounded bg-industrial-orange hover:bg-[#F27E31] text-black font-semibold text-[10px] uppercase px-4 py-2 cursor-pointer transition-all active:scale-95"
                    >
                      Compare Machinery Specification Table
                    </button>
                  </div>
                )}

              </motion.div>
            )}

            {/* 3. CONFIGURATOR TAB */}
            {activeTab === "configurator" && (
              <motion.div
                key="configurator-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Interactive Specification Builder</span>
                  <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                    Configure Trailer & Hydraulic Loader Crane
                  </h2>
                </div>
                
                {/* Embedded dynamic core configurator */}
                <Configurator 
                  initialTrailerId={preselectedTrailer} 
                  initialCraneId={preselectedCrane}
                  onSubmitQuote={handleOpenQuoteFromConfigurator}
                />
              </motion.div>
            )}

            {/* 4. COMPARISON TAB */}
            {activeTab === "comparison" && (
              <motion.div
                key="comparison-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Verification Workbench</span>
                  <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                    Machinery Parameters Matrix
                  </h2>
                </div>
                
                {/* Embedded specifications comparison matrix */}
                <SpecsTable />
              </motion.div>
            )}

            {/* 5. PORTFOLIO / GALLERIES TAB */}
            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-8"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Field Timber Harvests logs</span>
                  <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                    Client Operations & Projects
                  </h2>
                </div>

                <div className="space-y-8">
                  {PORTFOLIO_PROJECTS.map((item) => (
                    <div 
                      key={item.id}
                      className="border border-[#1A2D23] bg-[#0B130E] rounded p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    >
                      {/* Metric column */}
                      <div className="lg:col-span-5 space-y-4">
                        <span className="bg-[#121F18] px-2.5 py-1 text-industrial-orange rounded font-mono text-[9px] font-bold uppercase tracking-wider">
                          {item.country} Operations
                        </span>
                        
                        <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mt-1.5 select-all">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans">
                          {item.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 border-t border-[#1A2D23]/30 pt-4 mt-4 text-[11px] font-mono">
                          <div>
                            <span className="text-gray-600 block uppercase text-[8px]">Chassis Deployed</span>
                            <span className="text-white font-semibold mt-1 block select-all">{item.trailerModel}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block uppercase text-[8px]">Boom Model</span>
                            <span className="text-white font-semibold mt-1 block select-all">{item.craneModel}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block uppercase text-[8px]">Temp Margin</span>
                            <span className="text-white font-sans mt-1 block select-all">{item.operatingTemp}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 block uppercase text-[8px]">Log count hour rate</span>
                            <span className="text-white font-sans mt-1 block select-all">{item.operatingHours} hrs logged</span>
                          </div>
                        </div>
                      </div>

                      {/* Visual stats panel right */}
                      <div className="lg:col-span-7 bg-[#070D0B] border border-[#1A2D23]/40 rounded p-6">
                        <p className="font-mono text-[8px] text-[#2C5241] uppercase tracking-widest mb-4">
                          Field Output KPI Indicators
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4">
                          {item.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="bg-[#0B130E] border border-[#1A2D23]/20 p-4 rounded text-center font-sans">
                              <p className="text-2xl font-display font-extrabold text-industrial-orange leading-none select-all">{m.value}</p>
                              <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase leading-tight">{m.label}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-5 text-[10px] text-gray-600 italic font-sans text-center">
                          Statistics audited in accordance with operational log receipts. Values represent optimal performance on matched tractor rigs.
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* 6. TECHNICAL BLOG TAB (zoomable list reader) */}
            {activeTab === "blog" && (
              <motion.div
                key="blog-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                
                {/* Stepper context */}
                {!readingPostId ? (
                  <div className="space-y-8">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Metallurgical & Hydraulics Academy</span>
                      <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                        Technical Forestry Blog
                      </h2>
                    </div>

                    {/* Blog posts list */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {BLOG_POSTS.map((post) => (
                        <div 
                          key={post.id}
                          className="rounded border border-[#1A2D23] bg-[#0B130E] p-6 flex flex-col justify-between hover:border-industrial-orange/50 transition-all group"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-[#2C5241] font-mono uppercase pb-3.5 border-b border-[#1A2D23]/30 mb-4 font-bold">
                              <span>{post.category}</span>
                              <span>{post.readTime}</span>
                            </div>
                            
                            <h3 className="font-display font-bold text-sm text-white group-hover:text-industrial-orange transition-colors select-all">
                              {post.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans mt-2.5">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="border-t border-[#1A2D23]/25 pt-4 mt-6 flex items-center justify-between font-mono text-[10px]">
                            <span className="text-gray-600">{post.date}</span>
                            <button
                              onClick={() => setReadingPostId(post.id)}
                              className="text-industrial-orange font-bold uppercase tracking-wider hover:underline cursor-pointer flex items-center gap-1"
                            >
                              Read Spec Document
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Zoomed individual document view
                  (() => {
                    const post = BLOG_POSTS.find(p => p.id === readingPostId);
                    if (!post) {
                      setReadingPostId(null);
                      return null;
                    }
                    return (
                      <div className="max-w-4xl mx-auto border border-[#1A2D23] bg-[#0B130E] rounded p-6 sm:p-10 space-y-6">
                        
                        {/* Go back */}
                        <button
                          onClick={() => setReadingPostId(null)}
                          className="text-xs font-mono font-bold text-[#468266] uppercase hover:text-industrial-orange flex items-center gap-1 cursor-pointer transition-all"
                        >
                          ← BACK TO Spec Documents Archive
                        </button>

                        <div className="border-b border-[#1A2D23]/30 pb-5 pt-3">
                          <span className="bg-[#121F18] text-[#83D7AE] px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded">
                            {post.category}
                          </span>
                          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mt-4 select-all">
                            {post.title}
                          </h1>
                          
                          <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-500 font-mono mt-3 uppercase font-semibold">
                            <span>Author: {post.author}</span>
                            <span>•</span>
                            <span>Published: {post.date}</span>
                            <span>•</span>
                            <span>Reading Limit: {post.readTime}</span>
                          </div>
                        </div>

                        {/* Article body with pristine formatting */}
                        <div className="prose prose-invert prose-xs max-w-none text-xs font-sans leading-relaxed text-gray-300 space-y-4 select-text">
                          {post.content.split("\n\n").map((para, pIdx) => {
                            if (para.startsWith("### ")) {
                              return <h3 key={pIdx} className="font-display font-bold text-sm text-white uppercase tracking-wider mt-6 select-all">{para.replace("### ", "")}</h3>;
                            }
                            if (para.startsWith("1. ") || para.startsWith("2. ") || para.startsWith("3. ")) {
                              const lines = para.split("\n");
                              return (
                                <ol key={pIdx} className="list-decimal pl-5 space-y-1.5 mt-2">
                                  {lines.map((ln, lIdx) => (
                                    <li key={lIdx} className="select-all">
                                      <strong className="text-white uppercase font-sans font-semibold inline-block">{ln.replace(/^\d+\.\s*/, "").split(":")[0]}:</strong>
                                      {ln.replace(/^\d+\.\s*/, "").split(":")[1]}
                                    </li>
                                  ))}
                                </ol>
                              );
                            }
                            return <p key={pIdx} className="select-all">{para}</p>;
                          })}
                        </div>

                        <div className="border-t border-[#1A2D23]/30 pt-6 mt-8 flex justify-between items-center bg-[#070D0B] p-4 rounded text-xs">
                          <div className="font-sans text-gray-500">
                            Did this technical article answer your engineering specification inquiries?
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab("contact");
                              setReadingPostId(null);
                            }}
                            className="text-industrial-orange font-mono uppercase font-bold hover:underline cursor-pointer"
                          >
                            Ask Engineering Representative →
                          </button>
                        </div>

                      </div>
                    );
                  })()
                )}

              </motion.div>
            )}

            {/* 7. ABOUT COMPANY TAB */}
            {activeTab === "about" && (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-16"
              >
                
                {/* Hero profile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Metallurgical Heritage</span>
                    <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider">
                      Scandinavian Foundations
                    </h2>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      Forester Crane was conceived based on a simple observation: standard forestry trailers were constantly twisting under the dynamic slewing stress of timber grabs. Mechanical stress factors in high-density hardwood logs (Oak, Beech, Pine) easily stress low-quality welds.
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      Our engineering lab in Copenhagen began constructing rigid skeletal tube configurations using premium SSAB S460 steel. By shifting from structural boilerplate models to central thick spine frames, we balanced empty trailers' weight ratio, yielding stable tracking while keeping tractor fuel bills to a minimum.
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-[#1A2D23]/30 pt-4 mt-4 text-[10px] font-mono uppercase font-semibold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-industrial-orange flex-shrink-0" />
                        <span>ZERO WELD-FAIL RECORD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-industrial-orange flex-shrink-0" />
                        <span>SSAB SWEDISH ALLOY CORES</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 border border-[#1A2D23] bg-[#0B130E] p-6 rounded relative overflow-hidden min-h-[300px] flex items-center justify-center">
                    
                    {/* Visual metallurgical layout */}
                    <div className="absolute inset-0 bg-[#070D0B] opacity-40 bg-[linear-gradient(to_right,#111F16_1px,transparent_1px)] bg-[size:16px_16px]" />
                    
                    <div className="text-center space-y-4 relative z-10 font-mono">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded bg-industrial-orange text-black font-extrabold text-lg shadow-inner">
                        9001
                      </div>
                      <p className="text-xs text-white uppercase tracking-widest font-bold font-display">
                        ISO 9001:2015 Manufacturing
                      </p>
                      <p className="text-[10px] text-gray-500 max-w-sm mx-auto font-sans leading-normal">
                        Every single structural chassis assembly is tested under loaded hydrostatic strain to simulate continuous work-shift forces before leaving our docks.
                      </p>
                      <div className="text-[9px] text-[#2C5241] font-bold border-t border-[#1A2D23]/40 pt-3 max-w-xs mx-auto">
                        GDANSK HARBOR WAREHOUSE ASSEMBLY DIRECTIVE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Timeline values */}
                <div className="space-y-6 pt-8 border-t border-[#1A2D23]/30">
                  <h3 className="font-display text-base font-bold text-white uppercase tracking-widest text-center">
                    Forester Crane Global Service Network
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                    <div className="bg-[#0B130E] border border-[#1A2D23]/60 p-5 rounded">
                      <div className="flex items-center gap-2 font-mono text-xs text-industrial-orange font-bold uppercase">
                        <MapPin className="h-4 w-4" />
                        Copenhagen HQ (DK)
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2.5 leading-normal">
                        Structural CAD engineering, hydraulics configuration analysis, metallurgy lab testing, and international sales log contracts coordination.
                      </p>
                    </div>
                    <div className="bg-[#0B130E] border border-[#1A2D23]/60 p-5 rounded">
                      <div className="flex items-center gap-2 font-mono text-xs text-industrial-orange font-bold uppercase">
                        <MapPin className="h-4 w-4" />
                        Gdansk Docks (PL)
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2.5 leading-normal">
                        Primary manufacturing assembly, robotic seam welding, ssab alloy stress testing, outriggers casting and Baltic log fleet shipping hub.
                      </p>
                    </div>
                    <div className="bg-[#0B130E] border border-[#1A2D23]/60 p-5 rounded">
                      <div className="flex items-center gap-2 font-mono text-xs text-industrial-orange font-bold uppercase">
                        <MapPin className="h-4 w-4" />
                        Authorized Hubs (DE/PL/SE)
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2.5 leading-normal">
                        Regional logistics warehousing, hydraulic maintenance, parts dispatch, SSAB frame verification, and localized tractor hookup support.
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 8. CONTACTS TAB */}
            {activeTab === "contact" && (
              <motion.div
                key="contacts-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                
                {/* Left side address panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">Reach Out Directly</span>
                    <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider mt-1">
                      Industrial Representative Hubs
                    </h2>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Have structured machinery questions? Get in touch with our commercial sales coordinators, or schedule a physical stress-test demonstration inside nearest authorized woodland zone.
                  </p>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="bg-[#0B130E] border border-[#1A2D23]/50 p-4 rounded flex gap-3 text-left">
                      <Phone className="h-5 w-5 text-industrial-orange mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold uppercase text-[10px] leading-tight">Intl Sales Coordinator</p>
                        <p className="text-sm font-bold text-industrial-orange mt-1 select-all">+45 89 22 41 00</p>
                        <p className="text-[9px] text-gray-600 mt-0.5">Mon-Fri (08:00 - 17:00 CET)</p>
                      </div>
                    </div>

                    <div className="bg-[#0B130E] border border-[#1A2D23]/50 p-4 rounded flex gap-3 text-left">
                      <Mail className="h-5 w-5 text-industrial-orange mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white uppercase text-[10px] leading-tight">Sales & Proposal Desk</p>
                        <p className="text-sm font-bold text-white mt-1 select-all">sales@forester-crane.com</p>
                        <p className="text-[9px] text-gray-600 mt-0.5">We respond inside 4 hours</p>
                      </div>
                    </div>

                    <div className="bg-[#0B130E] border border-[#1A2D23]/50 p-4 rounded flex gap-3 text-left">
                      <Info className="h-5 w-5 text-industrial-orange mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white uppercase text-[10px] leading-tight flex items-center gap-1.5 font-bold">
                          Manufacturing Assembly Plant
                        </p>
                        <p className="text-xs text-gray-400 mt-1 font-sans">ul. Hutnicza 14, 80-210 Gdansk, Poland (PL)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side contact form */}
                <div className="lg:col-span-7 bg-[#0B130E] border border-[#1A2D23]/60 rounded p-6 sm:p-8">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-[#1A2D23]/30 pb-3 mb-5">
                    Submit Technical Inquiry
                  </h3>

                  <form onSubmit={handleFormSubmission} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={customerForm.name}
                          onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                          placeholder="Arvid Lindström"
                          className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={customerForm.company}
                          onChange={(e) => setCustomerForm({ ...customerForm, company: e.target.value })}
                          placeholder="Sveaskog Forest AB"
                          className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={customerForm.email}
                          onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                          placeholder="arvid@sveaskog.se"
                          className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Telephone Number *</label>
                        <input
                          type="tel"
                          required
                          value={customerForm.phone}
                          onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                          placeholder="+46 8 123 45 67"
                          className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Operational Country</label>
                      <select
                        value={customerForm.country}
                        onChange={(e) => setCustomerForm({ ...customerForm, country: e.target.value })}
                        className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5 font-mono select-none"
                      >
                        <option value="Sweden">Sweden (SE)</option>
                        <option value="Denmark">Denmark (DK)</option>
                        <option value="Poland">Poland (PL)</option>
                        <option value="Germany">Germany (DE)</option>
                        <option value="Finland">Finland (FI)</option>
                        <option value="Russian Federation">Russian Federation (RU)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Message Detail *</label>
                      <textarea
                        rows={4}
                        required
                        value={customerForm.message}
                        onChange={(e) => setCustomerForm({ ...customerForm, message: e.target.value })}
                        placeholder="Detail your trailer/crane selection model, accessories or tractor hydraulics flow context..."
                        className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5 font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex h-11 items-center justify-center gap-2 rounded bg-industrial-orange hover:bg-[#F27E31] text-black font-display text-xs font-bold uppercase tracking-widest transition-transform py-2 cursor-pointer active:scale-95"
                    >
                      Dispatch Proposal Request
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER BLOCK */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        setReadingPostId(null);
      }} />

      {/* MODAL 1: REQUEST A QUOTE MODAL (CALCULATED BILL OF MATERIALS) */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl border border-[#1A2D23] bg-[#0B130E] rounded overflow-hidden shadow-2xl scale-95 md:scale-100 transition-all text-xs font-sans flex flex-col justify-between">
            
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#1A2D23]/50 bg-[#121F18]/50 px-6 py-4.5">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-industrial-orange">Request Quote</span>
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mt-0.5">
                  Confirm Equipment Configuration
                </h3>
              </div>
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="text-gray-500 hover:text-white font-mono text-sm uppercase font-semibold cursor-pointer"
              >
                [Esc] Close
              </button>
            </div>

            {/* Modal Content Column Grid */}
            <form onSubmit={handleFormSubmission} className="p-6 md:p-8 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-[#1A2D23]/25">
                
                {/* Visual spec breakdown */}
                <div className="bg-[#070D0B] border border-[#1A2D23]/40 p-4.5 rounded font-mono">
                  <p className="text-[#2C5241] uppercase text-[9px] font-bold tracking-widest mb-3">MACHINERY SPECIFICATION REASSURANCE</p>
                  
                  <div className="space-y-2.5 text-[10.5px]">
                    <div className="flex justify-between border-b border-[#1A2D23]/20 pb-1.5">
                      <span className="text-gray-500">Selected Trailer:</span>
                      <span className="text-white font-semibold uppercase">{quoteTrailerId}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2D23]/20 pb-1.5">
                      <span className="text-gray-500">Selected Crane:</span>
                      <span className="text-white font-semibold uppercase">{quoteCraneId}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2D23]/20 pb-1.5">
                      <span className="text-gray-500">Gross Weight:</span>
                      <span className="text-industrial-orange font-bold font-mono">{quoteTotalWeight} kg</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-500">Estimated Total (EXW):</span>
                      <span className="text-industrial-orange font-bold text-sm">€{quoteTotalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={customerForm.company}
                      onChange={(e) => setCustomerForm({ ...customerForm, company: e.target.value })}
                      placeholder="e.g. Baltic Timber Log SAS"
                      className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      placeholder="e.g. logs@baltic.com"
                      className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#2C5241] uppercase font-mono font-bold block mb-1">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      placeholder="e.g. +45 80 12 34 56"
                      className="w-full text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3 py-2 text-xs"
                    />
                  </div>
                </div>

              </div>

              {/* Submit panel */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-gray-500 leading-normal max-w-sm">
                  SSAB Steel certified. Deployed assemblies undergo full hydrostatic pressure analysis simulated at Gdansk Harbor.
                </p>
                <button
                  type="submit"
                  className="rounded bg-industrial-orange hover:bg-[#F27E31] text-black font-semibold uppercase text-xs px-6 py-3 cursor-pointer transition-transform active:scale-95"
                >
                  Confirm Specifications Booking
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: SUCCESS TICKET / proposal confirmation */}
      {isSuccessTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-industrial-orange bg-[#0B130E] rounded p-6 shadow-2xl relative text-center space-y-5 font-sans text-xs">
            
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded bg-industrial-orange text-black font-extrabold text-lg">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-industrial-orange">Logistics Core Receipt</span>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mt-1 select-all">
                DRAFT PROPOSAL INITIATED
              </h3>
            </div>

            {/* Receipt document mock */}
            <div className="bg-[#070D0B] border border-[#1A2D23]/50 p-4 rounded font-mono text-left max-w-sm mx-auto text-[11px] leading-relaxed">
              <p className="text-white border-b border-[#1A2D23]/30 pb-1 mb-2 font-bold select-all">BOOKING: {ticketNumber}</p>
              <div className="space-y-1 text-gray-400">
                <p>Company: <span className="text-white select-all">{customerForm.company}</span></p>
                <p>Country: <span className="text-white select-all">{customerForm.country}</span></p>
                <p>Assembly code: <span className="text-[#81C784] select-all">{quoteTrailerId.toUpperCase()} + {quoteCraneId.toUpperCase()}</span></p>
                <p>Configured EXW quote: <span className="text-industrial-orange font-bold select-all">€{quoteTotalPrice.toLocaleString()}</span></p>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-normal max-w-xs mx-auto">
              Our regional Scandinavian representative will contact you via email (<span className="text-gray-300 font-semibold select-all">{customerForm.email}</span>) within 4 operating hours to coordinate drawing revisions and shipping schedules.
            </p>

            <button
              onClick={handleCloseTicket}
              className="w-full rounded bg-[#121F18] hover:bg-industrial-orange hover:text-black text-white font-mono font-bold uppercase py-2 cursor-pointer"
            >
              Close Receipt Document
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
