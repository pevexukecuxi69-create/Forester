import React from "react";
import { Hammer, ArrowRight, Phone, Mail, Globe, MapPin } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenQuote }: HeaderProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "catalog", label: "Catalog" },
    { id: "configurator", label: "Configure & Price" },
    { id: "comparison", label: "Compare Machinery" },
    { id: "portfolio", label: "Client Operations" },
    { id: "blog", label: "Technical Blog" },
    { id: "about", label: "About Company" },
    { id: "contact", label: "Contacts" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A2D23]/50 bg-[#070D0B]/90 backdrop-blur-md">
      {/* Upper B2B Info Strip */}
      <div className="hidden border-b border-[#1A2D23]/30 bg-[#0B130E] py-2 text-xs md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-gray-400 font-mono">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-industrial-orange" />
              Scandinavia Engineering Hub
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-industrial-orange" />
              +45 89 22 41 00 (Intl. Sales)
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-industrial-orange" />
              sales@forester-crane.com
            </span>
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 text-gray-400" />
              <span className="text-gray-300">EN</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500 hover:text-gray-300 cursor-pointer">RU</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gird Layout Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab("home")}
          className="flex cursor-pointer items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded bg-industrial-orange text-white overflow-hidden shadow-inner font-display font-bold">
            FC
          </div>
          <div>
            <h1 className="font-display text-lg font-bold uppercase tracking-wider text-white leading-none">
              Forester Crane
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">
              Scandinavian Wood Loggers
            </p>
          </div>
        </div>

        {/* Unified Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 font-display text-[13px] font-semibold uppercase tracking-wider transition-all duration-150 rounded ${
                  isActive 
                    ? "bg-[#192D23] text-white shadow-sm" 
                    : "text-gray-400 hover:text-white hover:bg-[#121F18]/40"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-industrial-orange rounded" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Inquiry CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuote}
            className="group flex h-10 items-center gap-2 rounded bg-industrial-orange hover:bg-[#F27E31] px-5 py-2 font-display text-[12px] font-bold uppercase tracking-wider text-black transition-all active:scale-95"
          >
            Request Quote
            <ArrowRight className="h-4 w-4 text-black transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Mobile nav indicator bar */}
      <div className="flex overflow-x-auto border-t border-[#1A2D23]/30 scrollbar-none bg-[#0B130E] lg:hidden">
        <div className="flex gap-1 px-4 py-2 whitespace-nowrap min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider rounded ${
                  isActive 
                    ? "bg-[#192D23] text-[#E6EAE7]" 
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
