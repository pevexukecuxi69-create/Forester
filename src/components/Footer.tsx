import React from "react";
import { Shield, Mail, Phone, MapPin, Hammer, FileText } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1A2D23]/60 bg-[#070D0B] text-gray-400">
      {/* Prime specs assurance label banner */}
      <div className="bg-[#0B130E] border-b border-[#1A2D23]/30 py-6">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-industrial-orange flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-display font-semibold uppercase tracking-wider">
                Scandinavian Rigidity Assurance
              </p>
              <p className="text-[11px] text-gray-500 font-mono">
                Weld-fault protection & High-Tensile S460 Steel Frame Guarantee
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-500 font-mono">
            <span className="bg-[#121F18] px-2.5 py-1 text-[#2C5241] rounded">ISO 9001:2015</span>
            <span className="bg-[#121F18] px-2.5 py-1 text-[#2C5241] rounded">SSAB Steel Certified</span>
            <span className="bg-[#121F18] px-2.5 py-1 text-[#2C5241] rounded">Hardox In My Body Eligible</span>
          </div>
        </div>
      </div>

      {/* Primary Footer Grid Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Core Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-industrial-orange text-black font-display font-bold text-sm">
                FC
              </div>
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                Forester Crane
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 font-sans">
              Designed in Scandinavia, manufactured to withstand extreme logging stresses. Our machinery sets the standard for S355 and S460 structural steel integrity and high-torque 4-cylinder hydraulic systems.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-[#2C5241] flex-shrink-0" />
                <span>Copenhagen Engineering Lab, DK</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-[#2C5241] flex-shrink-0" />
                <span>Gdansk Assembly Plant, PL</span>
              </div>
            </div>
          </div>

          {/* Column 2: Equipment Directory */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#2C5241] mb-4">
              Machinery Dir
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              <li>
                <button 
                  onClick={() => onNavigate("catalog")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Forestry Trailers (10t - 15t)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("catalog")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Loader Cranes (FC-51 - FC-80)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("catalog")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Configured Trailer-Crane Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("configurator")} 
                  className="hover:text-industrial-orange text-gray-500 transition-colors"
                >
                  Interactive Specification Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Directory */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#2C5241] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              <li>
                <button 
                  onClick={() => onNavigate("blog")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Hydraulic Maintenance Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("portfolio")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Field Timber Operations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("about")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Metallurgical Foundations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("contact")} 
                  className="hover:text-white text-gray-500 transition-colors"
                >
                  Representative Hub Contacts
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Contacts */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#2C5241] mb-4">
              B2B Logistical Core
            </h4>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-industrial-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-semibold">+45 89 22 41 00</p>
                  <p className="text-[10px] text-gray-600">Mon-Fri (08:00 - 17:00 CET)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-industrial-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-semibold">sales@forester-crane.com</p>
                  <p className="text-[10px] text-gray-600">Response time within 4 hrs</p>
                </div>
              </div>
              <div className="border-t border-[#1A2D23]/30 pt-3">
                <p className="text-[10px] text-gray-500 italic font-sans leading-tight">
                  Have a custom technical setup? Ask our interactive AI engineering assistant in the hero segment.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copy & Legal Disclaimers */}
      <div className="bg-[#030605] py-6 border-t border-[#1A2D23]/40">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-600 font-mono">
          <p>© {currentYear} Forester Crane. Concept Redesign Prototype. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>WP-Theme Compliant Redesign</span>
            <span>GDPR Data Protection Compliant</span>
            <span>SSAB Raw Steel Audited</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
