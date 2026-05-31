import { EquipmentItem, ConfigurableCategory, BlogPost, PortfolioItem } from "./types";

export const PRODUCT_ITEMS: EquipmentItem[] = [
  {
    id: "ft-10",
    name: "Forestry Trailer FT-10",
    category: "Forestry Trailers",
    type: "trailer",
    description: "Compact yet exceptionally solid, the FT-10 is built for mid-sized operations. It features a high-tensile 200x200x8mm single spine chassis, dynamic 2-cylinder drawbar steering, and protective gates. Easily navigated in dense forest paths, it represents Scandinavian agility and durability.",
    priceEstimate: 14500,
    weight: 1620,
    images: ["ft10_side"],
    features: [
      "S355 Structural High-Strength Steel main beam",
      "Unified hydraulic drawbar steering with double cylinders",
      "Protection guard screen and 4 pairs of flexible stakes",
      "Compatible with FC-51 and FC-67 cranes"
    ],
    specs: [
      { label: "Nominal Load Capacity", value: "10", unit: "t", category: "Load Dimensions" },
      { label: "Frame Structure", value: "Single Central Beam (200x200x8 mm)", category: "Structural" },
      { label: "Empty Weight (Standard)", value: "1,620", unit: "kg", category: "Structural" },
      { label: "Steering Drawbar Cylinders", value: "2 Cylinders (Angle +/- 40°)", category: "Handling" },
      { label: "Standard Tyre Dimensions", value: "400/60-15.5 14PR", category: "Chassis" },
      { label: "Brake Configurations", value: "Hydraulic or Overrun Brakes (Optional)", category: "Chassis" },
      { label: "Overall Width", value: "2.18", unit: "m", category: "Dimensions" },
      { label: "Loading Area Length", value: "3.80", unit: "m", category: "Dimensions" }
    ]
  },
  {
    id: "ft-12",
    name: "Forestry Trailer FT-12",
    category: "Forestry Trailers",
    type: "trailer",
    description: "Our signature and best-selling model global-wide. Configured with a monumental 200x200x10mm structural beam, the FT-12 handles severe log weights (12 tons payload) in demanding winter and alpine conditions. Complete with pre-shielded hydraulic components and heavy-duty 8-hole heavy axles.",
    priceEstimate: 18900,
    weight: 1850,
    images: ["ft12_side"],
    features: [
      "Ultra-thick S460 high-yield Swedish alloy steel chassis",
      "Premium 2-housing wheel hubs with taper roller bearings",
      "Fold-away high ground clearance protective support panel",
      "Supports 2WD or 4WD modern friction-roller drive system config"
    ],
    specs: [
      { label: "Nominal Load Capacity", value: "12", unit: "t", category: "Load Dimensions" },
      { label: "Frame Structure", value: "Single Reinforced Spine (200x200x10 mm)", category: "Structural" },
      { label: "Empty Weight (Standard)", value: "1,850", unit: "kg", category: "Structural" },
      { label: "Steering Drawbar Cylinders", value: "2 Cylinders (Angle +/- 40°)", category: "Handling" },
      { label: "Standard Tyre Dimensions", value: "500/50-17 Flotation Heavy", category: "Chassis" },
      { label: "Axle Shaft Profile", value: "Solid Steel (70x70 mm)", category: "Chassis" },
      { label: "Overall Width", value: "2.35", unit: "m", category: "Dimensions" },
      { label: "Loading Area Length", value: "4.20", unit: "m", category: "Dimensions" }
    ]
  },
  {
    id: "ft-15",
    name: "Forestry Trailer FT-15",
    category: "Forestry Trailers",
    type: "trailer",
    description: "Built for true industrial wood recovery and massive volume logs. The FT-15 leverages a dual-box heavy beam or specialized reinforced spine, coupled with air dual-circuit brakes on all four wheels. Includes massive flotation wheels and heavy duty stakes to maximize payloads across swamps and mud.",
    priceEstimate: 26500,
    weight: 2400,
    images: ["ft15_side"],
    features: [
      "Reinforced dual structural girder architecture",
      "Double steering drawbar cylinders for maximum high torque steering",
      "Flax-bogie system with heavy scale axles",
      "Ideal choice for multi-shift professional logging and FC-80 Crane"
    ],
    specs: [
      { label: "Nominal Load Capacity", value: "15", unit: "t", category: "Load Dimensions" },
      { label: "Frame Structure", value: "Reinforced Heavy Dual Girder", category: "Structural" },
      { label: "Empty Weight (Standard)", value: "2,400", unit: "kg", category: "Structural" },
      { label: "Steering Drawbar Cylinders", value: "2 Cylinders (Angle +/- 40°)", category: "Handling" },
      { label: "Standard Tyre Dimensions", value: "550/45-22.5 Industrial Flotation", category: "Chassis" },
      { label: "Braking System", value: "Pneumatic Double-Circuit on 4 wheels", category: "Chassis" },
      { label: "Overall Width", value: "2.55", unit: "m", category: "Dimensions" },
      { label: "Loading Area Length", value: "4.85", unit: "m", category: "Dimensions" }
    ]
  },
  {
    id: "fc-51",
    name: "Forestry Crane FC-51",
    category: "Forestry Cranes",
    type: "crane",
    description: "The ideal loaders for light or local operations. Boasting 5.1 meters of pure hydraulic reach, the FC-51 delivers unmatched responsiveness. Engineered with 4 heavy cylinders for rotational slewing that operate in a protective oil bath, protecting the gears from wear.",
    priceEstimate: 12100,
    weight: 780,
    images: ["fc51_schematic"],
    features: [
      "4-cylinder slewing design in oil bath block",
      "Wide-angle joint system as standard equipment",
      "Double-axle joint stabilizer of agricultural standards",
      "S355 steel boom with standard protective hydraulic casings"
    ],
    specs: [
      { label: "Maximum Horizontal Reach", value: "5.1", unit: "m", category: "Crane Performance" },
      { label: "Gross Lifting Torque", value: "31", unit: "kNm", category: "Crane Performance" },
      { label: "Lifting Capacity (Full Range)", value: "590", unit: "kg", category: "Lifting Values" },
      { label: "Lifting Capacity (at 4m)", value: "755", unit: "kg", category: "Lifting Values" },
      { label: "Slewing Torque", value: "9.2", unit: "kNm", category: "Power System" },
      { label: "Working Pressure", value: "180", unit: "bar", category: "Power System" },
      { label: "Recommended Pump Flow", value: "30-45", unit: "l/min", category: "Power System" },
      { label: "Slewing Angle", value: "360", unit: "°", category: "Handling" }
    ]
  },
  {
    id: "fc-67",
    name: "Forestry Crane FC-67",
    category: "Forestry Cranes",
    type: "crane",
    description: "Our core engineering workhorse. Features a 6.7m reach facilitated by an ultra-fast telescopic arm extension. High-grade S460 steel reduces overhead boom deadweight while augmenting lifting capacities to 510kg at full length. Includes custom anti-twist linkages.",
    priceEstimate: 16800,
    weight: 980,
    images: ["fc67_schematic"],
    features: [
      "1.4-meter high speed telescope expansion boom",
      "Integrated linkage mechanical compensation (wide-angle linkage)",
      "High capacity 4-cylinder slewing gear box providing 14 kNm torque",
      "Dual-directional brake damper fitted on the rotator flange"
    ],
    specs: [
      { label: "Maximum Horizontal Reach", value: "6.7", unit: "m", category: "Crane Performance" },
      { label: "Gross Lifting Torque", value: "46", unit: "kNm", category: "Crane Performance" },
      { label: "Lifting Capacity (Full Range)", value: "510", unit: "kg", category: "Lifting Values" },
      { label: "Lifting Capacity (at 4m)", value: "880", unit: "kg", category: "Lifting Values" },
      { label: "Slewing Torque", value: "14.0", unit: "kNm", category: "Power System" },
      { label: "Working Pressure", value: "195", unit: "bar", category: "Power System" },
      { label: "Recommended Pump Flow", value: "35-50", unit: "l/min", category: "Power System" },
      { label: "Slewing Cylinders", value: "4 Cylinders (Gears in Oil Bath)", category: "Structural" }
    ]
  },
  {
    id: "fc-80",
    name: "Forestry Crane FC-80",
    category: "Forestry Cranes",
    type: "crane",
    description: "Elite power designed for high volume operators. Features a highly advanced double-telescopic arm pushing reach out to 8.0 meters. Reinforced steel structure with extreme slewing forces is ready for non-stop shift tasks handling large hardwood timber bundles.",
    priceEstimate: 23200,
    weight: 1250,
    images: ["fc80_schematic"],
    features: [
      "Double telescopic boom (total 2.8m extension layout)",
      "Premium internal routing of hydraulic lines inside the extension arms",
      "Slewing house with double roller bearings and high performance gearing",
      "Reinforced heavy-link wood-grapple mounting base"
    ],
    specs: [
      { label: "Maximum Horizontal Reach", value: "8.0", unit: "m", category: "Crane Performance" },
      { label: "Gross Lifting Torque", value: "62", unit: "kNm", category: "Crane Performance" },
      { label: "Lifting Capacity (Full Range)", value: "410", unit: "kg", category: "Lifting Values" },
      { label: "Lifting Capacity (at 4m)", value: "1,220", unit: "kg", category: "Lifting Values" },
      { label: "Slewing Torque", value: "18.5", unit: "kNm", category: "Power System" },
      { label: "Working Pressure", value: "210", unit: "bar", category: "Power System" },
      { label: "Recommended Pump Flow", value: "45-70", unit: "l/min", category: "Power System" },
      { label: "Telescope Stroke Length", value: "2.8", unit: "m", category: "Structural" }
    ]
  },
  {
    id: "set-ft-10-fc-51",
    name: "Standard Set FT-10 + FC-51",
    category: "Configured Sets",
    type: "set",
    description: "The complete setup for flexible operations. Featuring our core 10-ton central tube trailer matched with the robust FC-51 crane. This combination provides a nimble footprint, making it perfect for light industrial forest thinning and regional log sales.",
    priceEstimate: 26000,
    weight: 2400,
    images: ["set_heavy_1"],
    features: [
      "Factory aligned trailer & crane hydraulic system",
      "A-type fold-down support legs included",
      "Integrated double-cylinder drawbar steering system",
      "Exceptional maneuvering capability in dense tree plots"
    ],
    specs: [
      { label: "Combined Payload Capacity", value: "10", unit: "t", category: "Set Specs" },
      { label: "Crane Horizontal Reach", value: "5.1", unit: "m", category: "Set Specs" },
      { label: "Total Net Weight", value: "2,400", unit: "kg", category: "Set Specs" },
      { label: "Lifting Force at Full Reach", value: "590", unit: "kg", category: "Set Specs" },
      { label: "Optimal Tractor Power", value: "70 - 95 HP", category: "Tractor Requirements" },
      { label: "Minimum Pump Pressure", value: "180 bar", category: "Tractor Requirements" }
    ]
  },
  {
    id: "set-ft-12-fc-67",
    name: "Performance Set FT-12 + FC-67",
    category: "Configured Sets",
    type: "set",
    description: "The premier best-seller of the Forester range. Combining the monstrous structural rigidity of the FT-12 (12-ton) chassis with the versatility of the FC-67 telescopic crane. Optimized torque ratios, protective underhousing shield plates, and high-stability flap flap legs.",
    priceEstimate: 34900,
    weight: 2830,
    images: ["set_heavy_2"],
    features: [
      "Sweden Weld S460 high strength steel structural chassis",
      "High capacity 6.7m reach crane with telescopic arm",
      "Included: A-type premium flap down ground anchor legs",
      "Excellent high traction bogie axle design ready for flotation profiles"
    ],
    specs: [
      { label: "Combined Payload Capacity", value: "12", unit: "t", category: "Set Specs" },
      { label: "Crane Horizontal Reach", value: "6.7", unit: "m", category: "Set Specs" },
      { label: "Total Net Weight", value: "2,830", unit: "kg", category: "Set Specs" },
      { label: "Lifting Force at Full Reach", value: "510", unit: "kg", category: "Set Specs" },
      { label: "Optimal Tractor Power", value: "90 - 130 HP", category: "Tractor Requirements" },
      { label: "Minimum Pump Pressure", value: "195 bar", category: "Tractor Requirements" }
    ]
  },
  {
    id: "set-ft-15-fc-80",
    name: "Industrial Set FT-15 + FC-80",
    category: "Configured Sets",
    type: "set",
    description: "Absolute forestry brute power. Combines our heaviest 15-ton double spine workhorse trailer with the extreme reach and capability of our FC-80 double-telescopic crane. Built for professional forest contractors recovering heavy logs across deep terrains.",
    priceEstimate: 48500,
    weight: 3650,
    images: ["set_heavy_3"],
    features: [
      "Reinforced heavy dual frame structure layout",
      "Extreme-reach 8.0m double telescopic crane stability",
      "Pneumatic double-circuit braking on all tires standard",
      "Compatible with large grapple FC-27 (0.27 m2) and proportional electric control"
    ],
    specs: [
      { label: "Combined Payload Capacity", value: "15", unit: "t", category: "Set Specs" },
      { label: "Crane Horizontal Reach", value: "8.0", unit: "m", category: "Set Specs" },
      { label: "Total Net Weight", value: "3,650", unit: "kg", category: "Set Specs" },
      { label: "Lifting Force at Full Reach", value: "410", unit: "kg", category: "Set Specs" },
      { label: "Optimal Tractor Power", value: "120 - 185 HP", category: "Tractor Requirements" },
      { label: "Minimum Pump Pressure", value: "210 bar", category: "Tractor Requirements" }
    ]
  }
];

export const CONFIGURATOR_CATEGORIES: ConfigurableCategory[] = [
  {
    id: "control-block",
    name: "Control Block Options",
    description: "Choose the physical interface that connects the crane to your tractor cab. Proportional electronic systems provide unparalleled feedback and ergonomics.",
    options: [
      { id: "ctrl-mechanical", name: "Mechanical 2-Lever + 4-Lever Block", price: 0, weight: 45, description: "Highly reliable standard mechanism, mounted on solid adjustable frame support." },
      { id: "ctrl-joystick", name: "Hydraulic Low-Pressure Servo Joysticks", price: 1850, weight: 60, description: "Hydraulically pre-operated low-pressure oil channels inside standard light levers." },
      { id: "ctrl-electrical", name: "Full-Electric Proportional Joy-Sticks (Danfoss / IQAN)", price: 4400, weight: 35, description: "Premium electrical sensor joystick handles with fine adjustment and profile customization slots." }
    ]
  },
  {
    id: "drive-system",
    name: "Trailer Propulsion Drives",
    description: "Equip your forestry trailer with motorized traction to push through deep snow, swamp-like terrains, or steep mountain ranges.",
    options: [
      { id: "drive-standard", name: "Standard Passive Axles (No Drive)", price: 0, weight: 0, description: "Unified heavy structural axles utilizing natural tractor tow power." },
      { id: "drive-2wd", name: "2WD Drive (Hydraulic Friction Rollers)", price: 3900, weight: 220, description: "Retractable hydraulic drive rollers that press directly against tyre grooves to provide secondary propulsion." },
      { id: "drive-4wd", name: "4WD Heavy High-Traction Bogie Drive", price: 8200, weight: 380, description: "Unified integrated hydraulic hub-motors inside bogie axle blocks, yielding maximum climbing torque." }
    ]
  },
  {
    id: "braking-system",
    name: "Brake Configurations",
    description: "Ensure safe operations and regulatory compliance when hauling massive timber weights on local forestry roads.",
    options: [
      { id: "brake-none", name: "Parking Hydraulic Lock (Standard)", price: 0, weight: 15, description: "Heavy-duty locking system for secure stationary log grabbing." },
      { id: "brake-2w-hydraulic", name: "Hydraulic Brakes on 2-Wheels", price: 950, weight: 65, description: "Responsive hydraulic cylinder piston nodes active on front bogie wheel housings." },
      { id: "brake-4w-pneumatic", name: "Dual-Line Air Brakes on All 4-Wheels", price: 2100, weight: 120, description: "Full pneumatic dual-circuit safety brakes, certified for public highway log transportation rules." }
    ]
  },
  {
    id: "premium-accessories",
    name: "Industrial Accessories",
    description: "Maximize output and increase operator safety during night shifts with high-intensity forestry gear.",
    options: [
      { id: "acc-none", name: "No Additional Accessories", price: 0, weight: 0, description: "Standard factory equipment configuration." },
      { id: "acc-winch", name: "Remote-Controlled Hydraulic Winch (1.8t Pull)", price: 1950, weight: 95, description: "Boom-mounted hydraulic cable winch, ideal for hauling distant trees out of deep hollows." },
      { id: "acc-lights", name: "Protected LED Work Lights pack (4x 45W)", price: 650, weight: 12, description: "Chassis-guard mounted high output forest LEDs providing shadowless, eye-safe yellow/white zones." },
      { id: "acc-grapple", name: "Hardox FC-27 Log Grapple (0.27 m2 Upgrade)", price: 1200, weight: 80, description: "Upgrade standard wood claw to oversized Hardox structural jaws, expanding single lift capacity." }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "hydraulic-subzero",
    title: "Hydraulic System Maintenance in Sub-zero Temperatures",
    excerpt: "Operating heavy-duty log loaders during Northern winters requires strict focus on fluid viscosity, valve seals, and start-up oil cycling routines.",
    content: `When winter temperatures descend below zero across European forests, hydraulic oil behaviors change drastically. Normal mineral oil undergoes immediate thickening, substantially increasing flow resistance inside valves and cylinders. 

If an operator engages the crane load cylinders immediately upon cold-starting the tractor, high shearing forces can blow internal pressure rings, damage cylinder seals, and trigger structural cavitation within the hydraulic gear pump.

### 1. Viscosity and Fluid Selection
For consistent operations below -15°C, standard ISO VG 46 mineral grease is highly discouraged. Forecasters should transition to high-viscosity-index (HV) ISO VG 32 equivalent fluids, or fully synthetic bio-oils. These modern synthetic formulas maintain structural fluidity, guaranteeing responsive spool valves and instant relief-valve responses.

### 2. The Golden Warm-up Routine
Before hoisting the first softwood oak pile, initiate the standard 10-minute warming loop:
1. Engages tractor PTO at a low RPM setting.
2. Direct flow safely through the valve banks back to the reservoir.
3. Slowly extend and retract the outrigger stabilizer legs three times.
4. Execute full rotational slewing ranges under zero load to distribute warm oil through the slewing block gears.

Lubricating the crane mechanisms properly when steel becomes brittle under extreme frost prevents hairline fractures in the high-yield S460 welded seams. Regularly check the oil status indicator; moisture accumulation under cold climates causes whitish emulsions, which will freeze and seize pilot check valves completely.`,
    category: "Technical Advice",
    date: "November 14, 2025",
    author: "Arvid Lindström (Chief Metallurgist)",
    readTime: "6 min read"
  },
  {
    id: "grapple-selection",
    title: "Selecting the Right Grapple Size: Hardwood vs. Softwood Operations",
    excerpt: "Matching timber load volume and wood species density to your grapple opening area guarantees optimal cycle times and avoids rotor fatigue.",
    content: `A central point of friction in forestry logistics is cycle time: how fast can an operator transfer logs from the landing stack onto the FT-12 trailer chassis? Utilizing an incorrect log claw configuration can lead to structural overload or inefficient packing.

At Forester Crane, we configure loader systems with three primary grapple apertures: FC-18 (0.18 m2), FC-22 (0.22 m2), and FC-27 (0.27 m2). Selecting the proper match depends entirely on wood structural properties.

### Hardwood Species (Oak, Beech, Ash)
Hardwood species have high dry densities, averaging 720 to 880 kg/m3. Lifting multiple heavy hardwood logs simultaneously can easily exceed the gross lifting torque of a 5-6m crane class (e.g. 46 kNm on the FC-67 boom).
- **Recommended grapple**: FC-18 or FC-22.
- **Why**: Smaller jaw profiles force the operator to grab fewer logs per movement cycle, guaranteeing total mechanical stability and eliminating heavy stress on the high-torque rotator flange.

### Softwood Species (Spruce, Pine, Fir)
Softwoods are significantly lighter, averaging 450 to 550 kg/m3. Maximize efficiency by hauling large bundles.
- **Recommended grapple**: FC-27.
- **Why**: Jaws wrap around extensive clusters of lighter branches, ensuring the loader crane operates right at its designed volumetric limit, slicing total loading duration by up to 30%.

Always inspect the Hardox wear bars on the underside of your grapple blades. Grabbing abrasive stone surfaces or deep frozen mud during wood loading strips carbon steel layers, requiring immediate welding beads to reinforce the claw tips.`,
    category: "Operations",
    date: "September 28, 2025",
    author: "Janusz Kowalski (Forestry Contractor, Poland)",
    readTime: "4 min read"
  },
  {
    id: "slewing- torque-protection",
    title: "Understanding Slewing Torque and Gearing Protection",
    excerpt: "Deep dive into the 4-cylinder slewing gear systems that serve as the backbone for heavy forest operations, and how to prevent tooth sheer.",
    content: `Unlike construction loaders, forestry cranes operate on steep hillsides where they must swing heavy logs upwards against gravity. This physical requirement demands massive slewing torque—the force that rotates the entire loader column.

Forester Crane cranes (FC-51, FC-67, FC-80) utilize a unified heavy-duty 4-cylinder rack-and-pinion slewing device. Why four cylinders instead of two?

### 1. Symmetrical Force Distribution
By utilizing two pairs of opposing hydraulic pistons, the horizontal force pressed against the central geared pinion remains perfectly balanced. This avoids radial offset pressures, which would slowly warp the main column bushings over long operating seasons.

### 2. Gearing in Oil-Bath Cast Housings
Our entire slewing assembly is encased in a cast-iron tooth-box filled with heavy-gear oil (SAE 90). The oil bath has multiple functions:
- Provides absolute continuous lubrication to every tooth interface.
- Acts as a heat sink to absorb thermal spikes built up during rapid, repeating swing rotations.
- Cushions vertical shock transfers when heavy logs suddenly drop onto the trailer gates.

### 3. Preventing Gearing Damage
To ensure your gear system remains operational for decades:
- **Never yank the controls**: Abruptly reversing rotational direction causes massive hydraulic pressure spikes inside the cylinders, which can stress gears. Always slow down your rotation before swinging the other way.
- **Keep stabilizers firm on the ground**: If the trailer tilts because support outriggers are not properly anchored, the slewing system must work against gravity, increasing gearing load by up to 150%.`,
    category: "Engineering",
    date: "July 05, 2025",
    author: "Lars Sorensen (Lead Design Engineer)",
    readTime: "8 min read"
  }
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "polish-lowlands",
    title: "Bialowieza Modern Spruce Clearance",
    location: "Podlaskie Voivodeship, Poland",
    country: "Poland",
    clientType: "Commercial Wood Hauler",
    operatingTemp: "-18°C to +8°C",
    operatingHours: 2450,
    trailerModel: "FT-12 (Central Chassis)",
    craneModel: "FC-67 Telescopic",
    description: "Clearing dense beetle-infestation spruce plots across marshy fields. This project proved the critical performance values of our 4WD Bogie Friction Drive. Heavy flotation tyres on the FT-12 hauled enormous softwood loads without bogging down in muddy trenches.",
    metrics: [
      { label: "Timber Harvested", value: "48,000 m³" },
      { label: "Cycle Efficiency", value: "14.5 min" },
      { label: "Fuel Savings Ratio", value: "12%" }
    ]
  },
  {
    id: "swedish-high",
    title: "Jämtland Extreme Slope Logging",
    location: "Jämtland Province, Sweden",
    country: "Sweden",
    clientType: "Industrial Forest Contractor",
    operatingTemp: "-28°C to +15°C",
    operatingHours: 4100,
    trailerModel: "FT-15 Heavy Dual Frame",
    craneModel: "FC-80 Extreme Double-Telescope",
    description: "Operating in steep sub-arctic landscapes harvesting deep pine logs. The FT-15 trailer utilized standard heavy-duty air braking on all wheels to ensure extreme slope braking safety. The hydraulic pilot servo joystick system allowed micro-accurate crane maneuvers around electrical corridors.",
    metrics: [
      { label: "Slope Grade Cleared", value: "32%" },
      { label: "Total Logs Transported", value: "72,000 tons" },
      { label: "Zero-Failure Welding Record", value: "100%" }
    ]
  },
  {
    id: "german-estate",
    title: "Black Forest Sustainable Logging",
    location: "Baden-Württemberg, Germany",
    country: "Germany",
    clientType: "State Forest Administration",
    operatingTemp: "-5°C to +30°C",
    operatingHours: 1980,
    trailerModel: "FT-10 Agility Spine",
    craneModel: "FC-51 Standard Loader",
    description: "Undertaking sensitive ecological thinning and selective logging within public access forest zones. The compact FT-10 with standard agricultural drawbar pivots with high maneuvers around young trees, preventing root system damages while clearing log piles.",
    metrics: [
      { label: "Operational Footprint Width", value: "2.18 meters" },
      { label: "Tractor Weight Balanced Ratio", value: "40/60" },
      { label: "Ground Compression Index", value: "0.22 kg/cm²" }
    ]
  }
];
