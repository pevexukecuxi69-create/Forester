import React, { useState } from "react";
import { Scale, RefreshCw, Layers, Check, CheckSquare, Square } from "lucide-react";

interface SpecsTableProps {
  trailerIds: string[];
}

interface SpecRow {
  label: string;
  category: string;
  ft10: { metric: string; imperial: string };
  ft12: { metric: string; imperial: string };
  ft15: { metric: string; imperial: string };
  isDifferent: boolean;
}

export default function SpecsTable() {
  const [useImperial, setUseImperial] = useState(false);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  const specRows: SpecRow[] = [
    {
      label: "Nominal Load Capacity",
      category: "Capacity Specs",
      ft10: { metric: "10 tons", imperial: "22,046 lbs" },
      ft12: { metric: "12 tons", imperial: "26,455 lbs" },
      ft15: { metric: "15 tons", imperial: "33,069 lbs" },
      isDifferent: true
    },
    {
      label: "Standard Net Weight",
      category: "Weights",
      ft10: { metric: "1,620 kg", imperial: "3,571 lbs" },
      ft12: { metric: "1,850 kg", imperial: "4,078 lbs" },
      ft15: { metric: "2,400 kg", imperial: "5,291 lbs" },
      isDifferent: true
    },
    {
      label: "Chassis Frame Geometry",
      category: "Structural Strength",
      ft10: { metric: "200x200x8 mm", imperial: "7.8x7.8x0.31 inches" },
      ft12: { metric: "200x200x10 mm", imperial: "7.8x7.8x0.39 inches" },
      ft15: { metric: "Double Girder", imperial: "Twin Girder Beam" },
      isDifferent: true
    },
    {
      label: "Steel Grade Rating",
      category: "Structural Strength",
      ft10: { metric: "Swedish S355 Alloy", imperial: "Swedish S355 Alloy" },
      ft12: { metric: "Swedish S460 High-Yield", imperial: "Swedish S460 High-Yield" },
      ft15: { metric: "Swedish S460 High-Yield", imperial: "Swedish S4 Sweden" },
      isDifferent: true
    },
    {
      label: "Drawbar Steer Angle",
      category: "Handling & Safety",
      ft10: { metric: "+/- 40 degrees", imperial: "+/- 40 degrees" },
      ft12: { metric: "+/- 40 degrees", imperial: "+/- 40 degrees" },
      ft15: { metric: "+/- 40 degrees", imperial: "+/- 40 degrees" },
      isDifferent: false
    },
    {
      label: "Drawbar Steering Cylinders",
      category: "Handling & Safety",
      ft10: { metric: "2 Cylinders Heavy", imperial: "2 Cylinders Heavy" },
      ft12: { metric: "2 Cylinders Heavy", imperial: "2 Cylinders Heavy" },
      ft15: { metric: "2 Cylinders Heavy", imperial: "2 Cylinders Heavy" },
      isDifferent: false
    },
    {
      label: "Standard Tyres Dimensions",
      category: "Wheels & Bogie",
      ft10: { metric: "400/60-15.5 14PR", imperial: "400/60-15.5 14PR" },
      ft12: { metric: "500/50-17 Flotation", imperial: "500/50-17 Flotation" },
      ft15: { metric: "550/45-22.5 Flot", imperial: "550/45-22.5 Flot" },
      isDifferent: true
    },
    {
      label: "Solid Wheel Axle Profile",
      category: "Wheels & Bogie",
      ft10: { metric: "70x70 mm", imperial: "2.75x2.75 inches" },
      ft12: { metric: "70x70 mm", imperial: "2.75x2.75 inches" },
      ft15: { metric: "80x80 mm", imperial: "3.15x3.15 inches" },
      isDifferent: true
    },
    {
      label: "Loading Area Length",
      category: "Volumetric Limits",
      ft10: { metric: "3.80 m", imperial: "12.4 ft" },
      ft12: { metric: "4.20 m", imperial: "13.7 ft" },
      ft15: { metric: "4.85 m", imperial: "15.9 ft" },
      isDifferent: true
    },
    {
      label: "Maximum Net Width",
      category: "Volumetric Limits",
      ft10: { metric: "2.18 m", imperial: "7.1 ft" },
      ft12: { metric: "2.35 m", imperial: "7.7 ft" },
      ft15: { metric: "2.55 m", imperial: "8.3 ft" },
      isDifferent: true
    }
  ];

  const categories = Array.from(new Set(specRows.map((row) => row.category)));

  return (
    <div className="flex flex-col border border-[#1A2D23] bg-[#0B130E] rounded overflow-hidden shadow-xl p-6">
      
      {/* Filtering control segment */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1A2D23]/30 pb-5 mb-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">
            Machinery Verification Suite
          </span>
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mt-1">
            Side-by-Side Trailer Matrix
          </h3>
        </div>
        
        {/* Toggle Controls */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Difference Switcher */}
          <button
            onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
              showOnlyDifferences 
                ? "bg-industrial-orange/10 border-industrial-orange text-industrial-orange" 
                : "bg-black/30 border-[#1A2D23] text-gray-400 hover:text-white"
            }`}
          >
            {showOnlyDifferences ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            Only Differences
          </button>

          {/* Metric Imperial Toggle */}
          <button
            onClick={() => setUseImperial(!useImperial)}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#1A2D23] bg-black/30 text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-industrial-orange" />
            Unit: {useImperial ? "Imperial" : "Metric"}
          </button>

        </div>
      </div>

      {/* Comparison Grid Sheet */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1A2D23]/60">
              <th className="py-4.5 pr-4 text-xs font-display font-bold uppercase tracking-wider text-[#2C5241] w-[30%]">
                Technical Criteria
              </th>
              <th className="py-4.5 px-4 text-xs font-display font-extrabold uppercase tracking-widest text-white w-[23%] bg-[#121F18]/10">
                FT-10 (Agile Thinning)
              </th>
              <th className="py-4.5 px-4 text-xs font-display font-extrabold uppercase tracking-widest text-industrial-orange w-[23%] bg-[#121F18]/25 border-x border-[#1A2D23]/30">
                FT-12 (Primary Sales)
              </th>
              <th className="py-4.5 pl-4 text-xs font-display font-extrabold uppercase tracking-widest text-white w-[23%] bg-[#121F18]/10">
                FT-15 (Industrial Heavy)
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const rowsInCat = specRows.filter(
                (row) => row.category === cat && (!showOnlyDifferences || row.isDifferent)
              );

              if (rowsInCat.length === 0) return null;

              return (
                <React.Fragment key={cat}>
                  {/* Category separator line */}
                  <tr className="bg-[#121F18]/25">
                    <td 
                      colSpan={4} 
                      className="py-2.5 px-3 border-b border-[#1A2D23]/30 font-mono text-[9px] font-bold uppercase tracking-widest text-[#2C5241]"
                    >
                      {cat}
                    </td>
                  </tr>
                  {rowsInCat.map((row, rIdx) => (
                    <tr 
                      key={rIdx} 
                      className="border-b border-[#1A2D23]/20 hover:bg-[#121F18]/10 transition-colors"
                    >
                      {/* Metric name */}
                      <td className="py-4.5 pr-4 pl-3 font-sans text-xs font-medium text-gray-400 leading-snug">
                        {row.label}
                      </td>
                      {/* FT-10 Value */}
                      <td className="py-4.5 px-4 font-mono text-xs text-gray-300 bg-[#121F18]/5">
                        {useImperial ? row.ft10.imperial : row.ft10.metric}
                      </td>
                      {/* FT-12 Value (Highlighted Best Seller) */}
                      <td className="py-4.5 px-4 font-mono text-xs text-white bg-[#121F18]/15 border-x border-[#1A2D23]/20 font-semibold shadow-inner">
                        {useImperial ? row.ft12.imperial : row.ft12.metric}
                      </td>
                      {/* FT-15 Value */}
                      <td className="py-4.5 pl-4 font-mono text-xs text-gray-300 bg-[#121F18]/5">
                        {useImperial ? row.ft15.imperial : row.ft15.metric}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Recommended Crane Companion Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#1A2D23]/40 pt-6 mt-6">
        <div className="rounded border border-[#1A2D23]/30 bg-[#070D0B] p-3.5 font-sans">
          <p className="font-mono text-[8px] text-[#2C5241] uppercase tracking-widest">FC Recommended Option</p>
          <h4 className="font-display font-bold text-xs text-white uppercase mt-1">FC-51 Crane Match (FT-10)</h4>
          <p className="text-[11px] text-gray-500 leading-normal mt-1.5">
            The FC-51 loader delivers efficient cycle rates under standard tractor pump capacities (30-45 l/min). Perfect fit for agile thinning.
          </p>
        </div>
        <div className="rounded border border-industrial-orange bg-[#121F18]/25 p-3.5 font-sans relative">
          <span className="absolute top-2.5 right-2 px-1.5 py-0.5 rounded bg-industrial-orange text-black font-mono text-[7.5px] font-bold uppercase tracking-widest leading-none">
            Ideal Pairing
          </span>
          <p className="font-mono text-[8px] text-industrial-orange uppercase tracking-widest">FC Recommended Option</p>
          <h4 className="font-display font-bold text-xs text-white uppercase mt-1">FC-67 Crane Match (FT-12)</h4>
          <p className="text-[11px] text-gray-400 leading-normal mt-1.5">
            The FC-67 telescopic loader maximizes the mechanical advantage of the FT-12. Ideal lifting radius (6.7 meters) for wide log distribution.
          </p>
        </div>
        <div className="rounded border border-[#1A2D23]/30 bg-[#070D0B] p-3.5 font-sans">
          <p className="font-mono text-[8px] text-[#2C5241] uppercase tracking-widest">FC Recommended Option</p>
          <h4 className="font-display font-bold text-xs text-white uppercase mt-1">FC-80 Crane Match (FT-15)</h4>
          <p className="text-[11px] text-gray-500 leading-normal mt-1.5">
            To lift giant timber species at extended sweeps (8.0 meters reach). Heavy oil reservoir, rigid dual outriggers, and Hardox-27 grapple are recommended.
          </p>
        </div>
      </div>

    </div>
  );
}
