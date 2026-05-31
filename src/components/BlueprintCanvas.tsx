import React, { useState } from "react";
import { MoveHorizontal, ArrowUpRight, Gauge, HelpCircle, HardDrive } from "lucide-react";

interface BlueprintCanvasProps {
  trailerId: string;
  craneId: string;
  totalWeight: number;
}

export default function BlueprintCanvas({ trailerId, craneId, totalWeight }: BlueprintCanvasProps) {
  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);

  // Derive parameters depending on selections
  const trailerName = trailerId === "ft-10" ? "FT-10 Agility" : trailerId === "ft-12" ? "FT-12 Standard" : "FT-15 Heavy";
  const craneName = craneId === "fc-51" ? "FC-51 Loader" : craneId === "fc-67" ? "FC-67 Telescopic" : "FC-80 Extreme";

  const getSpecs = () => {
    switch (trailerId) {
      case "ft-10":
        return { length: "5,840 mm", width: "2,180 mm", clearance: "540 m", beam: "200x200x8 mm", tyres: "400/60-15.5" };
      case "ft-15":
        return { length: "6,950 mm", width: "2,550 mm", clearance: "640 m", beam: "Double 180x185 mm", tyres: "550/45-22.5" };
      case "ft-12":
      default:
        return { length: "6,280 mm", width: "2,350 mm", clearance: "610 m", beam: "200x200x10 mm", tyres: "500/50-17" };
    }
  };

  const craneReach = craneId === "fc-51" ? "5.1m" : craneId === "fc-67" ? "6.7m" : "8.0m";
  const spec = getSpecs();

  return (
    <div className="flex flex-col border border-[#1A2D23] bg-[#0B130E] rounded overflow-hidden shadow-xl p-5 relative">
      
      {/* Visual Title */}
      <div className="flex items-start justify-between border-b border-[#1A2D23]/30 pb-4 mb-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#2C5241]">
            ENGINEERING SCHEMATIC V4
          </span>
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mt-1">
            {trailerName} / {craneName} Arrangement
          </h3>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] text-gray-500">Gross Assembly Weight:</span>
          <p className="font-mono text-xs font-bold text-industrial-orange mt-0.5">{totalWeight} kg</p>
        </div>
      </div>

      {/* Main SVG Blueprint Drafting Board */}
      <div className="relative border border-[#1A2D23]/50 bg-[#040806] rounded py-8 flex items-center justify-center overflow-hidden min-h-[300px]">
        
        {/* Subtle graph grid background (pure CSS) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14231A_1px,transparent_1px),linear-gradient(to_bottom,#14231A_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />

        <svg 
          viewBox="0 0 800 360" 
          className="w-full max-w-[620px] h-auto relative z-10 drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radial reach circle overlay (dashed orange) */}
          <circle 
            cx="320" 
            cy="160" 
            r={craneId === "fc-51" ? "160" : craneId === "fc-67" ? "210" : "260"} 
            fill="none" 
            stroke="#E06A1B" 
            strokeWidth="1.2" 
            strokeDasharray="4,8" 
            className="opacity-40 animate-pulse"
          />
          {/* Reach Marker text */}
          <text 
            x="320" 
            y={craneId === "fc-51" ? "10" : craneId === "fc-67" ? "30" : "50"} 
            fill="#E06A1B" 
            fontSize="10" 
            fontFamily="monospace" 
            textAnchor="middle" 
            className="opacity-60"
          >
            FC CRANE RANGE SWEEP BOUNDARY: {craneReach}
          </text>

          {/* TRAILER DRAWINGS */}
          <g stroke="#607065" strokeWidth="2.5" fill="none">
            {/* Main beam - thick central line */}
            <path d="M 120,240 L 520,240 L 520,180" strokeLinecap="round" strokeWidth="6" stroke="#4A5F51" />
            
            {/* Front drawbar hitch segment with steer pivot */}
            <path d="M 60,255 L 120,240" strokeWidth="5.5" stroke="#3D4E43" />
            <circle cx="120" cy="240" r="7" fill="#0B130E" stroke="#E06A1B" strokeWidth="2" />
            
            {/* Drawbar cylinder outline */}
            <line x1="72" y1="240" x2="140" y2="230" stroke="#7E9385" strokeWidth="2" />
            <rect x="94" y="232" width="22" height="6" fill="#070D0B" stroke="#E06A1B" strokeWidth="1" />

            {/* Schutzgitter / Front protective mesh gate */}
            <rect x="238" y="100" width="12" height="140" fill="none" strokeWidth="3" stroke="#7E9385" />
            <line x1="244" y1="100" x2="244" y2="240" stroke="#7E9385" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Rungen / Vertical timber stakes arrangement */}
            {/* Stake 1 */}
            <path d="M 280,240 L 285,110 Q 295,100 310,105" strokeWidth="2.5" strokeLinecap="round" />
            {/* Stake 2 */}
            <path d="M 370,240 L 375,110 Q 385,100 400,105" strokeWidth="2.5" strokeLinecap="round" />
            {/* Stake 3 */}
            <path d="M 450,240 L 455,110 Q 465,100 480,105" strokeWidth="2.5" strokeLinecap="round" />
            {/* Stake 4 */}
            <path d="M 510,240 L 515,110 Q 525,100 540,105" strokeWidth="2.5" strokeLinecap="round" />

            {/* Bogie Pendelachse / Bogie pivot rocker */}
            <path d="M 360,285 L 430,285" strokeWidth="5" stroke="#566A5D" />
            <circle cx="395" cy="285" r="8" fill="#121F18" stroke="#7E9385" strokeWidth="3" />
          </g>

          {/* Tyres (wheels on pivot rocker) */}
          <g stroke="#7E9385" strokeWidth="4" fill="#070D0B">
            {/* Wheel 1 */}
            <circle cx="350" cy="295" r="34" />
            <circle cx="350" cy="295" r="14" fill="#121F18" stroke="#2C5241" strokeWidth="2.5" />
            {/* Wheel 2 */}
            <circle cx="440" cy="295" r="34" />
            <circle cx="440" cy="295" r="14" fill="#121F18" stroke="#2C5241" strokeWidth="2.5" />
          </g>

          {/* CRANE DRAWINGS */}
          <g stroke="#E06A1B" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Base block / Slewing housing on the drawbar platform */}
            <rect x="200" y="215" width="38" height="26" fill="#121F18" stroke="#7E9385" strokeWidth="2" />
            {/* Slewing cylinders indicators on bottom */}
            <rect x="184" y="222" width="16" height="6" fill="#030605" stroke="#7E9385" strokeWidth="1" />
            <rect x="238" y="222" width="16" height="6" fill="#030605" stroke="#7E9385" strokeWidth="1" />

            {/* Vertical column pivot hub */}
            <path d="M 218,215 L 218,145" strokeWidth="6" stroke="#4A5F51" />
            
            {/* Main lifting boom */}
            <path d="M 218,145 L 300,75" strokeWidth="5" stroke="#E06A1B" />
            {/* Main lifting cylinder assembly underneath */}
            <path d="M 218,180 L 265,115" strokeWidth="2" stroke="#4B6E59" />
            <rect x="235" y="140" width="12" height="18" transform="rotate(-35 235 140)" fill="#0B130E" stroke="#566A5D" strokeWidth="1" />

            {/* Outer knuckle boom with telescopic arm */}
            <path d="M 300,75 L 430,90" strokeWidth="4" stroke="#E06A1B" />
            
            {/* Teleskop extension segment - sliding inside boom (colored blue or highlight) */}
            {craneId !== "fc-51" && (
              <path 
                d="M 430,90 L 490,95" 
                stroke="#6DBF96" 
                strokeWidth="2.5" 
                strokeDasharray="2,2" 
                className="animate-pulse"
              />
            )}

            {/* Rotator and Log grapple claw */}
            <line x1={craneId === "fc-51" ? "430" : "490"} y1={craneId === "fc-51" ? "90" : "95"} x2={craneId === "fc-51" ? "430" : "490"} y2="120" stroke="#7E9385" strokeWidth="2" />
            <rect x={craneId === "fc-51" ? "424" : "484"} y="120" width="12" height="10" fill="#121F18" stroke="#E06A1B" strokeWidth="1.5" />
            
            {/* Claw curves (open jaws) */}
            <path d="M 414,142 Q 430,130 446,142 Q 430,165 414,142" fill="none" stroke="#E06A1B" strokeWidth="2" transform={`translate(${craneId === "fc-51" ? 0 : 60}, 0)`} />
          </g>

          {/* DIMENSION LINES & HOVER REGIONS */}
          <g>
            {/* Overall length metric */}
            <line x1="60" y1="340" x2="520" y2="340" stroke="#2C5241" strokeWidth="1.2" strokeDasharray="2,2" />
            <path d="M 60,336 L 60,344 M 520,336 L 520,344 M 60,340 L 75,340 M 520,340 L 505,340" stroke="#2C5241" strokeWidth="1" />
            <text x="290" y="343" fill="#6DBF96" fontSize="10" fontFamily="monospace" textAnchor="middle" className="font-bold">
              LENGTH (L1): {spec.length}
            </text>

            {/* Ground clearance indicator */}
            <line x1="280" y1="240" x2="280" y2="310" stroke="#2C5241" strokeWidth="1.2" strokeDasharray="3,3" />
            <text x="290" y="275" fill="#6DBF96" fontSize="9" fontFamily="monospace">
              CLEARANCE: {spec.clearance}
            </text>

            {/* Tractor hitch reference */}
            <path d="M 40,266 Q 50,260 60,255" stroke="#7E9385" strokeWidth="1" strokeDasharray="2,2" />
            <text x="20" y="278" fill="#4A5F51" fontSize="8" fontFamily="monospace">
              TRACTOR drawbar line
            </text>
          </g>
        </svg>
      </div>

      {/* Specification labels grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded border border-[#1A2D23]/30 bg-[#121F18]/20 p-3 flex items-start gap-2.5">
          <MoveHorizontal className="h-4 w-4 text-industrial-orange mt-0.5" />
          <div>
            <p className="text-[10px] text-[#2C5241] font-mono leading-none uppercase">Central Tube Frame</p>
            <p className="text-xs text-white font-semibold mt-1">{spec.beam}</p>
          </div>
        </div>
        <div className="rounded border border-[#1A2D23]/30 bg-[#121F18]/20 p-3 flex items-start gap-2.5">
          <Gauge className="h-4 w-4 text-industrial-orange mt-0.5" />
          <div>
            <p className="text-[10px] text-[#2C5241] font-mono leading-none uppercase">Standard Heavy Tyres</p>
            <p className="text-xs text-white font-semibold mt-1">{spec.tyres}</p>
          </div>
        </div>
      </div>

      {/* User interactive alert panel */}
      <div className="mt-4 rounded bg-[#121F18]/30 px-3 py-2 text-[10px] text-gray-500 font-mono flex items-start gap-2">
        <HelpCircle className="h-3.5 w-3.5 text-industrial-orange flex-shrink-0 mt-0.5" />
        <span>Click options in the configurator column on the left to inspect dynamic weight, price adjustments, and wheel traction specs on-the-fly.</span>
      </div>

    </div>
  );
}
