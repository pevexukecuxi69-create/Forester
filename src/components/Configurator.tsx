import React, { useState } from "react";
import { Hammer, Scale, CreditCard, ChevronRight, Check, Sparkles, Send, FileCheck } from "lucide-react";
import { PRODUCT_ITEMS, CONFIGURATOR_CATEGORIES } from "../data";
import BlueprintCanvas from "./BlueprintCanvas";

interface ConfiguratorProps {
  initialTrailerId?: string;
  initialCraneId?: string;
  onSubmitQuote: (details: {
    trailerId: string;
    craneId: string;
    accessories: Record<string, string>;
    totalPrice: number;
    totalWeight: number;
  }) => void;
}

export default function Configurator({ initialTrailerId = "ft-12", initialCraneId = "fc-67", onSubmitQuote }: ConfiguratorProps) {
  const [selectedTrailerId, setSelectedTrailerId] = useState(initialTrailerId);
  const [selectedCraneId, setSelectedCraneId] = useState(initialCraneId);

  // Initialize accessories with standard first option default values
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    CONFIGURATOR_CATEGORIES.forEach((cat) => {
      defaults[cat.id] = cat.options[0].id;
    });
    return defaults;
  });

  const trailers = PRODUCT_ITEMS.filter((p) => p.type === "trailer");
  const cranes = PRODUCT_ITEMS.filter((p) => p.type === "crane");

  const currentTrailer = PRODUCT_ITEMS.find((p) => p.id === selectedTrailerId) || trailers[0];
  const currentCrane = PRODUCT_ITEMS.find((p) => p.id === selectedCraneId) || cranes[0];

  // Calculate sum of active choices
  const calculateTotal = () => {
    let price = currentTrailer.priceEstimate + currentCrane.priceEstimate;
    let weight = currentTrailer.weight + currentCrane.weight;

    CONFIGURATOR_CATEGORIES.forEach((cat) => {
      const activeOptionId = selectedAccessories[cat.id];
      const option = cat.options.find((o) => o.id === activeOptionId);
      if (option) {
        price += option.price;
        weight += option.weight;
      }
    });

    return { price, weight };
  };

  const totals = calculateTotal();

  const handleAccessoryChange = (categoryId: string, optionId: string) => {
    setSelectedAccessories((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  const handleTriggerSubmission = () => {
    onSubmitQuote({
      trailerId: selectedTrailerId,
      craneId: selectedCraneId,
      accessories: selectedAccessories,
      totalPrice: totals.price,
      totalWeight: totals.weight,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN: Choices & Stepper Form */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Step 1: Base Trailer Selection */}
        <div className="border border-[#1A2D23]/60 bg-[#0B130E] rounded p-6">
          <div className="flex items-center gap-3 border-b border-[#1A2D23]/30 pb-3.5 mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-industrial-orange text-black font-mono text-xs font-bold">
              01
            </span>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Select Chassis Trailer Platform
            </h3>
          </div>
          
          <div className="space-y-3.5">
            {trailers.map((tr) => {
              const isSelected = selectedTrailerId === tr.id;
              const payloadSpec = tr.specs.find((s) => s.label === "Nominal Load Capacity")?.value;
              return (
                <div
                  key={tr.id}
                  onClick={() => setSelectedTrailerId(tr.id)}
                  className={`group relative p-4 rounded border transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#121F18]/45 border-industrial-orange shadow-inner" 
                      : "bg-[#070D0B] border-[#1A2D23] hover:border-[#2C5241]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-industrial-orange transition-colors">
                        {tr.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans mt-1 leading-snug">
                        {tr.description}
                      </p>
                      
                      {/* Mini meta row */}
                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#2C5241] font-mono uppercase font-semibold mt-3">
                        <span>Payload: {payloadSpec} tons</span>
                        <span>•</span>
                        <span>Standard Weight: {tr.weight} kg</span>
                      </div>
                    </div>
                    
                    {/* Price and Check indicator */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xs font-bold text-industrial-orange">
                        €{tr.priceEstimate.toLocaleString()}
                      </p>
                      <div className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border text-xs ml-auto ${
                        isSelected 
                          ? "bg-industrial-orange border-industrial-orange text-black" 
                          : "border-[#1A2D23] text-transparent"
                      }`}>
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Loader Crane Selection */}
        <div className="border border-[#1A2D23]/60 bg-[#0B130E] rounded p-6">
          <div className="flex items-center gap-3 border-b border-[#1A2D23]/30 pb-3.5 mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-industrial-orange text-black font-mono text-xs font-bold">
              02
            </span>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Select Hydraulic Loader Crane
            </h3>
          </div>
          
          <div className="space-y-3.5">
            {cranes.map((cr) => {
              const isSelected = selectedCraneId === cr.id;
              const reachSpec = cr.specs.find((s) => s.label === "Maximum Horizontal Reach")?.value;
              const liftSpec = cr.specs.find((s) => s.label === "Gross Lifting Torque")?.value;
              return (
                <div
                  key={cr.id}
                  onClick={() => setSelectedCraneId(cr.id)}
                  className={`group relative p-4 rounded border transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#121F18]/45 border-industrial-orange shadow-inner" 
                      : "bg-[#070D0B] border-[#1A2D23] hover:border-[#2C5241]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-industrial-orange transition-colors">
                        {cr.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans mt-1 leading-snug">
                        {cr.description}
                      </p>
                      
                      {/* Mini spec labels */}
                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#2C5241] font-mono uppercase font-semibold mt-3">
                        <span>Max Reach: {reachSpec}m</span>
                        <span>•</span>
                        <span>Lifting Torque: {liftSpec} kNm</span>
                        <span>•</span>
                        <span>Net Weight: {cr.weight} kg</span>
                      </div>
                    </div>
                    
                    {/* Price & checking indicator */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xs font-bold text-industrial-orange">
                        €{cr.priceEstimate.toLocaleString()}
                      </p>
                      <div className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border text-xs ml-auto ${
                        isSelected 
                          ? "bg-industrial-orange border-industrial-orange text-black" 
                          : "border-[#1A2D23] text-transparent"
                      }`}>
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Accessory Options */}
        <div className="border border-[#1A2D23]/60 bg-[#0B130E] rounded p-6">
          <div className="flex items-center gap-3 border-b border-[#1A2D23]/30 pb-3.5 mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-industrial-orange text-black font-mono text-xs font-bold">
              03
            </span>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Configure Traction Drives & Systems
            </h3>
          </div>
          
          <div className="space-y-6">
            {CONFIGURATOR_CATEGORIES.map((cat) => {
              const activeOptionId = selectedAccessories[cat.id];
              return (
                <div key={cat.id} className="border-b border-[#1A2D23]/25 pb-5 last:border-b-0 last:pb-0">
                  <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-1">
                    {cat.description}
                  </p>
                  
                  {/* Options row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3.5">
                    {cat.options.map((opt) => {
                      const isOptionSelected = activeOptionId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleAccessoryChange(cat.id, opt.id)}
                          className={`p-3 rounded border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isOptionSelected 
                              ? "bg-[#121F18]/45 border-industrial-orange shadow-inner" 
                              : "bg-[#070D0B] border-[#1A2D23] hover:border-[#1C3328]"
                          }`}
                        >
                          <div>
                            <p className={`font-display text-[11px] font-bold ${
                              isOptionSelected ? "text-white" : "text-gray-400"
                            }`}>
                              {opt.name}
                            </p>
                            <p className="text-[10px] text-gray-500 leading-snug mt-1 font-sans">
                              {opt.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-[#1A2D23]/20 pt-2 mt-3 font-mono text-[9px]">
                            <span className="text-[#2C5241] font-semibold">
                              {opt.weight > 0 ? `+${opt.weight} kg` : "Std wt"}
                            </span>
                            <span className="text-industrial-orange font-bold">
                              {opt.price > 0 ? `+€${opt.price.toLocaleString()}` : "Included"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Realtime Bill of Materials & Technical Live Drawing */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
        
        {/* Dynamic Canvas drawing representing configuration */}
        <BlueprintCanvas 
          trailerId={selectedTrailerId} 
          craneId={selectedCraneId} 
          totalWeight={totals.weight} 
        />

        {/* Bill of materials calculation overview card */}
        <div className="border border-[#1A2D23] bg-[#0B130E] rounded p-6">
          <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest border-b border-[#1A2D23]/30 pb-3 mb-4">
            Configuration Bill of Materials
          </h3>
          
          <div className="space-y-3.5 text-xs">
            {/* Trailer Component */}
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-sans">Chassis Base ({currentTrailer.name})</span>
              <span className="font-mono text-white select-all">€{currentTrailer.priceEstimate.toLocaleString()}</span>
            </div>
            {/* Crane Component */}
            <div className="flex items-center justify-between text-gray-400">
              <span className="font-sans">Hydraulic Crane ({currentCrane.name})</span>
              <span className="font-mono text-white select-all">€{currentCrane.priceEstimate.toLocaleString()}</span>
            </div>

            {/* Configured accessories */}
            {CONFIGURATOR_CATEGORIES.map((cat) => {
              const optionId = selectedAccessories[cat.id];
              const opt = cat.options.find((o) => o.id === optionId);
              if (!opt || opt.price === 0) return null;
              return (
                <div key={cat.id} className="flex items-center justify-between text-gray-500 font-sans">
                  <span>{opt.name}</span>
                  <span className="font-mono text-gray-300 select-all">+€{opt.price.toLocaleString()}</span>
                </div>
              );
            })}

            {/* Divider */}
            <div className="border-t border-[#1A2D23]/30 pt-4 mt-4 space-y-3">
              {/* Weight total inline */}
              <div className="flex items-center justify-between font-mono text-[11px] text-[#2C5241] uppercase font-bold">
                <div className="flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5" />
                  Estimated Gross Weight:
                </div>
                <span>{totals.weight} kg</span>
              </div>
              
              {/* Pricing summary */}
              <div className="flex items-center justify-between border-t border-[#1A2D23]/30 pt-3">
                <div>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Total Estimated EXW Price</p>
                  <p className="text-2xl font-display font-extrabold text-industrial-orange leading-tight mt-0.5 select-all">
                    €{totals.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleTriggerSubmission}
                  className="flex items-center gap-2 rounded bg-[#184631] hover:bg-[#1C5239] hover:text-white text-[#83D7AE] px-5 py-2.5 font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  <FileCheck className="h-4 w-4" />
                  Request Proposal
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
