export type Category =
  | "Security Cabins"
  | "Portable Cabins"
  | "Office Cabins"
  | "Accommodation"
  | "Toilet Cabins"
  | "Container Offices"
  | "Container Buildings"
  | "Custom Buildings";

export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Application {
  icon: string; // Lucide icon name
  title: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: Category;
  description: string; // fallback short description
  shortDescription: string;
  fullDescription: string;
  price: string;
  badge?: string;
  images: string[];
  size: string;
  capacity: string;
  material: string;
  warranty: string;
  brochure: string;
  features: Feature[];
  specifications: Specification[];
  applications: Application[];
  faq: FAQ[];
}

export const categories: (Category | "All Products")[] = [
  "All Products",
  "Security Cabins",
  "Portable Cabins",
  "Office Cabins",
  "Accommodation",
  "Toilet Cabins",
  "Container Offices",
  "Container Buildings",
  "Custom Buildings",
];

// Helper to generate consistent mock details for a product category to make each product unique
const getDefaultFeatures = (category: Category): Feature[] => [
  { icon: "Shield", title: "Weather Resistant", description: "Engineered to withstand extreme Gulf temperatures and high wind speeds." },
  { icon: "Thermometer", title: "Thermal Insulation", description: "Premium polyurethane (PU) or rockwool insulation for optimal energy efficiency." },
  { icon: "Flame", title: "Fire Resistant", description: "Built with certified fire-retardant materials adhering to UAE Civil Defence codes." },
  { icon: "Zap", title: "Electrical Ready", description: "Fully integrated, pre-wired conduit systems matching DEWA/ADDC standards." },
  { icon: "Hammer", title: "Low Maintenance", description: "Anti-corrosive external cladding requires minimal cleaning or paint touch-ups." },
  { icon: "Maximize", title: "Custom Sizes", description: "Customizable layout, height, wall panel thickness, and window placement." },
];

const getDefaultFAQs = (): FAQ[] => [
  {
    question: "How long is the installation process?",
    answer: "For standard units, onsite deployment takes just 1-2 days. Custom buildings and larger double-stack complexes can range from 2 to 4 weeks depending on site readiness and complexity.",
  },
  {
    question: "Can the dimensions be customized?",
    answer: "Yes, absolutely. While we offer standard sizes (such as 1.5x1.5m, 3x6m, 4x8m, etc.), our in-house engineering team can custom design structures matching your specific space and layout requirements.",
  },
  {
    question: "Is delivery available across the UAE?",
    answer: "Yes, we provide complete logistics, heavy lifting, and installation services across all seven Emirates, including remote oil & gas sites and industrial areas in Abu Dhabi, Dubai, Sharjah, and beyond.",
  },
  {
    question: "What warranty is provided?",
    answer: "We provide a comprehensive 1-Year warranty on all fixtures, electrical components, and leakage, along with a 5-Year structural integrity guarantee on the welded steel chassis.",
  },
  {
    question: "Can electrical and plumbing fittings be included?",
    answer: "All units come fully wired (DB board, switches, sockets, lights, and AC provisions) and plumbed (sanitary wares, PPR piping, and external drainage outlets) based on your layout design.",
  },
];

export const products: Product[] = [
  {
    id: 1,
    title: "Security Guard Cabin",
    slug: "security-guard-cabin",
    category: "Security Cabins",
    description: "Single-occupancy booth with 360° glazing and AC-ready insulation.",
    shortDescription: "A durable, single-occupancy security cabin with 360-degree glass visibility, fully insulated and pre-wired for immediate onsite setup.",
    fullDescription: "Designed for premium gate control and perimeter security, the Security Guard Cabin is engineered to keep security personnel comfortable and alert in harsh environments. Featuring heavy-duty structural steel frame construction, 50mm polyurethane sandwich wall panels, and high-visibility tinted sliding aluminum windows on all four sides. This unit comes complete with an integrated writing desk, internal LED lighting, power sockets, and a dedicated structural shelf for an air conditioning unit. Easy to lift, relocate, and deploy within minutes of delivery.",
    price: "From AED 9,500",
    badge: "Popular",
    images: [
      "/images/security-cabin.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "1.5×1.5 m",
    capacity: "1 person",
    material: "Polyurethane (PU) Sandwich Panels & Galvanized Steel Frame",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/security-guard-cabin.pdf",
    features: getDefaultFeatures("Security Cabins"),
    specifications: [
      { label: "Overall Size", value: "1.50m (L) x 1.50m (W) x 2.40m (H)" },
      { label: "Steel Frame", value: "3mm thick hot-rolled galvanized steel chassis, epoxy painted" },
      { label: "Wall Panels", value: "50mm EPS / PU core sandwich panels, 0.4mm prepainted steel sheets" },
      { label: "Roofing", value: "Multi-layered corrugated steel roof with structural PU insulation" },
      { label: "Floor Structure", value: "18mm fiber cement board with premium heavy-duty vinyl overlay" },
      { label: "Door", value: "Insulated sandwich panel door with heavy-duty aluminum lockset" },
      { label: "Windows", value: "4 sides sliding aluminum windows with clear, tempered glass (6mm)" },
      { label: "Electricals", value: "1x DB Board, 2x double sockets, 1x LED ceiling light, 1x AC provision" },
      { label: "Internal Fittings", value: "Laminated wooden writing desk with cable grommet" },
      { label: "Paint Finish", value: "Anti-corrosive polyurethane industrial coating (RAL 9002 White)" },
    ],
    applications: [
      { icon: "Construction", title: "Construction Sites" },
      { icon: "Shield", title: "Security Checkpoints" },
      { icon: "Building", title: "Residential Communities" },
      { icon: "Building2", title: "Industrial Warehouses" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 2,
    title: "Watchman Booth",
    slug: "watchman-booth",
    category: "Security Cabins",
    description: "Compact entry-gate booth with signage strip and sliding window.",
    shortDescription: "A modern watchman booth built with a highly rigid steel frame, wide sliding windows, and a dedicated external banner strip for custom company branding.",
    fullDescription: "The Watchman Booth is the perfect compact checkpost unit for gated facilities, logistics parks, and parking structures. Built to last, it incorporates high-grade thermal barrier wall panels that significantly reduce solar heat gain. The cabin is equipped with high-durability floor finishes and heavy-duty corner castings for crane loading. Its ergonomic workspace design ensures maximum operator comfort while occupying a minimal footprint on site.",
    price: "From AED 12,000",
    images: [
      "/images/security-cabin.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "2×2 m",
    capacity: "1–2 person",
    material: "High-density Rockwool Sandwich Panels & Structural Steel",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/watchman-booth.pdf",
    features: getDefaultFeatures("Security Cabins"),
    specifications: [
      { label: "Overall Size", value: "2.00m (L) x 2.00m (W) x 2.50m (H)" },
      { label: "Steel Frame", value: "Heavy-duty structural steel frame, prime coated and painted" },
      { label: "Wall Panels", value: "50mm Rockwool sandwich panels for fire-rated safety" },
      { label: "Roofing", value: "Sloped insulated roof with built-in drainage channels" },
      { label: "Floor Structure", value: "Plywood base with slip-resistant commercial PVC sheet" },
      { label: "Door", value: "Steel insulated security door with lock and keys" },
      { label: "Windows", value: "Heavy-gauge sliding aluminum frames, tinted tempered glass" },
      { label: "Electricals", value: "DB board, 1x light switch, 2x power outlets, AC power line ready" },
      { label: "Paint Finish", value: "Dual coat polyurethane finish, custom color options" },
    ],
    applications: [
      { icon: "Building2", title: "Commercial Hubs" },
      { icon: "Shield", title: "Port Control Gates" },
      { icon: "Home", title: "Private Estates" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 3,
    title: "Standard Portable Cabin",
    slug: "standard-portable-cabin",
    category: "Portable Cabins",
    description: "The all-purpose relocatable cabin - fast to deploy, easy to move.",
    shortDescription: "A versatile, highly durable portable cabin that serves as a temporary office, storage space, or multi-purpose utility room anywhere in the UAE.",
    fullDescription: "Our Standard Portable Cabin is the industry benchmark for flexible onsite space. Fabricated with highly insulated walls and structural roof panels, this relocatable cabin provides a comfortable, quiet, and dust-tight environment. It is engineered with four-point crane lifting lugs and forklift pockets for quick logistics. Ideal for short-term projects, temporary expansions, and remote operation hubs.",
    price: "From AED 16,000",
    images: [
      "/images/portable-cabin.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-2.jpg",
      "/images/proj-7.jpg"
    ],
    size: "3×6 m",
    capacity: "4-6 person",
    material: "EPS Sandwich Panels & Solid Steel Frame",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/standard-portable-cabin.pdf",
    features: getDefaultFeatures("Portable Cabins"),
    specifications: [
      { label: "Overall Size", value: "6.00m (L) x 3.00m (W) x 2.60m (H)" },
      { label: "Chassis Frame", value: "Cold-formed galvanized steel profile (4mm thick)" },
      { label: "Wall Insulation", value: "60mm EPS sandwich panels (16kg/m³ density)" },
      { label: "Roof System", value: "0.5mm galvanized steel sheet, rockwool insulation, gypsum board ceiling" },
      { label: "Floor System", value: "Marine plywood base (18mm) with commercial vinyl flooring" },
      { label: "Door", value: "Aluminum framed swing door with rubber seals and secure key latch" },
      { label: "Windows", value: "2x Sliding windows (1.0m x 1.0m) with flyscreen mesh" },
      { label: "Electrical", value: "LED tube lights, double sockets, telephone/data ports, split AC bracket" },
    ],
    applications: [
      { icon: "Construction", title: "Construction Hubs" },
      { icon: "Briefcase", title: "Field Offices" },
      { icon: "User", title: "Accommodation Units" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 4,
    title: "Portable Site Office",
    slug: "portable-site-office",
    category: "Portable Cabins",
    description: "Ready-to-work cabin with desk-ready power and data provisions.",
    shortDescription: "A professional, move-in-ready portable office cabin designed to keep engineering and supervisory teams working efficiently in the field.",
    fullDescription: "The Portable Site Office is engineered with productivity in mind. Equipped with pre-wired trunking for power and Ethernet network connections, high-performance LED lighting, and thick polyurethane foam insulation to keep the hot desert climate out. It features an open-plan layout that accommodates desks, filing cabinets, and small meeting tables with ease.",
    price: "From AED 19,500",
    images: [
      "/images/portable-cabin.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "3×7 m",
    capacity: "6 person",
    material: "Polyurethane Foam Core Panels & Heavy-duty Frame",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/portable-site-office.pdf",
    features: getDefaultFeatures("Portable Cabins"),
    specifications: [
      { label: "Overall Size", value: "7.00m (L) x 3.00m (W) x 2.65m (H)" },
      { label: "Frame", value: "Robust galvanized steel profiles, crane lift points built-in" },
      { label: "Walls", value: "60mm PU injected sandwich panels, outstanding thermal coefficient" },
      { label: "Ceiling", value: "Decorative PVC ceiling panels with rockwool insulation layer" },
      { label: "Floor", value: "Fiber cement board floor base with premium heavy-duty wood-pattern vinyl" },
      { label: "Windows", value: "2x large sliding aluminum windows with safety security grills" },
      { label: "Electrical", value: "Pre-wired CAT6 data network cabling, multiple double power points, DB box" },
    ],
    applications: [
      { icon: "Construction", title: "Civil Infrastructure Sites" },
      { icon: "Building2", title: "Industrial Yards" },
      { icon: "Briefcase", title: "Site Engineering Labs" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 5,
    title: "Executive Office Cabin",
    slug: "executive-office-cabin",
    category: "Office Cabins",
    description: "Insulated, climate-controlled workspace with premium interior finish.",
    shortDescription: "A premium executive-class workspace, featuring luxury interior finishes, sound insulation, and dedicated private facilities.",
    fullDescription: "Make a strong impression on clients and team members alike with our Executive Office Cabin. Crafted to meet the highest corporate standards, this modular workspace includes gypsum board walls, acoustic ceiling tiles, energy-efficient LED spot lighting, and high-quality timber or wood-look flooring. Ideal for project managers, executive directors, and client meeting spaces on construction sites, commercial developments, or event venues.",
    price: "From AED 28,000",
    badge: "Premium",
    images: [
      "/images/office-cabin.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "4×8 m",
    capacity: "8 person",
    material: "Laminated Board Cladding & Acoustic Steel Structure",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/executive-office-cabin.pdf",
    features: getDefaultFeatures("Office Cabins"),
    specifications: [
      { label: "Overall Size", value: "8.00m (L) x 4.00m (W) x 2.80m (H)" },
      { label: "Structural Frame", value: "Enhanced structural steel box sections, anticorrosion sandblasting" },
      { label: "Wall Construction", value: "Acoustic gypsum internal wall panels with paint finish, 60mm PU core" },
      { label: "Ceiling", value: "Acoustic ceiling tiles (60x60cm) with aluminum grid system" },
      { label: "Floor Finish", value: "Parquet wood flooring with solid wood skirting board" },
      { label: "Door", value: "Heavy-duty security main door with electronic keyless lock option" },
      { label: "Air Conditioning", value: "Split unit air-conditioner ready trunking, copper tubes installed" },
      { label: "Electrical/Data", value: "Recessed spotlights, network switch board, RJ45 ports, floor sockets" },
    ],
    applications: [
      { icon: "Briefcase", title: "Corporate Onsite Offices" },
      { icon: "User", title: "VIP Meeting Rooms" },
      { icon: "Building", title: "Temporary Sales Centers" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 6,
    title: "Modular Office Suite",
    slug: "modular-office-suite",
    category: "Office Cabins",
    description: "Multi-room office configuration with meeting space and pantry.",
    shortDescription: "A complete multi-room modular complex containing individual private offices, an open workstation area, kitchen pantry, and washroom facility.",
    fullDescription: "Our Modular Office Suite offers a cost-effective alternative to permanent building extensions. Prefabricated in a controlled factory setting and assembled on site, this complex contains multiple functional zones. Standard layouts include two executive offices, a centralized staff workstation area, a fully fitted pantry cupboard, and an integrated toilet stall. Perfect for rapidly expanding businesses, field command centers, or permanent site operations.",
    price: "From AED 52,000",
    images: [
      "/images/office-cabin.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "6×12 m",
    capacity: "12+ person",
    material: "Polyurethane Sandwich Panels & Gypsum Board",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/modular-office-suite.pdf",
    features: getDefaultFeatures("Office Cabins"),
    specifications: [
      { label: "Overall Size", value: "12.00m (L) x 6.00m (W) x 2.80m (H)" },
      { label: "Frame Structure", value: "Interlocking modular steel beams, bolted connections" },
      { label: "Wall System", value: "Double-skin prepainted steel sandwich panels with PU insulation" },
      { label: "Internal Partitions", value: "Framer-drywall partitions with acoustic rockwool infill" },
      { label: "Pantry Fitted", value: "Laminated under-counter cupboards, stainless steel sink, mixer tap" },
      { label: "Toilet Sanitary", value: "Ceramic WC, wash basin, mirror, ventilation fan, plumbing lines" },
      { label: "Electrical", value: "Comprehensive dual zone DB board, grid LED panel lighting, AC mounts" },
    ],
    applications: [
      { icon: "Briefcase", title: "Operations HQ" },
      { icon: "Building2", title: "Mining & Gas Camps" },
      { icon: "School", title: "Administrative School Blocks" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 7,
    title: "Labour Accommodation",
    slug: "labour-accommodation",
    category: "Accommodation",
    description: "Durable bunk-ready housing engineered for the regional climate.",
    shortDescription: "Cost-effective, highly durable, and compliant modular bunkhouses designed to comfortably accommodate workforce teams in industrial sectors.",
    fullDescription: "Our Labour Accommodation cabins are built to meet the stringent local municipal standards for workforce housing. Engineered with heavy-duty structural steel and extra-strength wall panels to withstand heavy daily use. The layouts maximize bed capacity while maintaining strict comfort and safety regulations. Fully pre-configured for bunk bed layout, locker storage, and high-efficiency ventilation systems.",
    price: "From AED 34,000",
    images: [
      "/images/accommodation.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "6×14 m",
    capacity: "8-12 beds",
    material: "Galvanized Iron Sheets, PU Insulation & Steel Frame",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/labour-accommodation.pdf",
    features: getDefaultFeatures("Accommodation"),
    specifications: [
      { label: "Overall Size", value: "14.00m (L) x 6.00m (W) x 2.70m (H)" },
      { label: "Structural Chassis", value: "Reinforced steel structural frame designed for multiple relocation cycles" },
      { label: "Wall Cladding", value: "50mm high-density polyurethane (PU) sandwich panels, self-extinguishing" },
      { label: "Flooring Base", value: "18mm waterproof marine plywood, finished with 2mm industrial vinyl" },
      { label: "Ventilation", value: "Heavy-duty exhaust fan provisions plus standard sliding windows" },
      { label: "Electrical Plan", value: "Multiple bedside sockets, central LED tubes, emergency exit lights" },
    ],
    applications: [
      { icon: "Construction", title: "Workforce Camp Sites" },
      { icon: "Building", title: "Industrial Parks" },
      { icon: "Building2", title: "Agricultural Farms" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 8,
    title: "Staff Accommodation",
    slug: "staff-accommodation",
    category: "Accommodation",
    description: "Partitioned living quarters with private rooms and shared facilities.",
    shortDescription: "Premium modular hostel units featuring partitioned bedrooms, shared bathrooms, and dedicated leisure space for technical staff.",
    fullDescription: "Provide high-quality housing for your engineers, supervisors, and administrative personnel. The Staff Accommodation cabin features private partitioned bedrooms, built-in wardrobes, a communal living and dining area, and attached washroom units. Engineered for maximum thermal comfort and sound dampening, creating a relaxing home-away-from-home.",
    price: "From AED 46,000",
    images: [
      "/images/accommodation.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "6×16 m",
    capacity: "6 rooms",
    material: "PU Panels with Internal Laminated MDF Partitions",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/staff-accommodation.pdf",
    features: getDefaultFeatures("Accommodation"),
    specifications: [
      { label: "Overall Size", value: "16.00m (L) x 6.00m (W) x 2.75m (H)" },
      { label: "Frame", value: "Heavy-duty modular framing with corner lifting blocks" },
      { label: "Acoustic Walls", value: "60mm PU core external walls, timber framed internal partition walls" },
      { label: "Doors", value: "Flush MDF internal doors, heavy security external door" },
      { label: "Sanitary Fitting", value: "2x fully-equipped shower stalls, 2x WC, washbasins with mirrors" },
      { label: "Plumbing System", value: "PPR water inlet pipes, heavy-duty PVC drainage pipe cluster" },
    ],
    applications: [
      { icon: "Building2", title: "Oil & Gas Sub-camps" },
      { icon: "School", title: "University Staff Housing" },
      { icon: "Briefcase", title: "Remote Infrastructure Projects" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 9,
    title: "Portable Toilet Block",
    slug: "portable-toilet-block",
    category: "Toilet Cabins",
    description: "Fully-plumbed multi-stall washroom with ventilation and water tank.",
    shortDescription: "A self-contained, easily sanitized multi-stall toilet cabin with complete plumbing, water heaters, and built-in exhaust systems.",
    fullDescription: "Our Portable Toilet Block is designed for heavy usage at construction sites, public events, and industrial yards. Manufactured with water-resistant wall panels, high-grade marine-grade plumbing, and slip-resistant floor finishes. Each stall is fitted with high-quality ceramic sanitary fixtures, tissue holders, mirrors, and privacy indicators. Ready to connect to local sewerage and water supplies.",
    price: "From AED 14,500",
    images: [
      "/images/toilet-cabins.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-2.jpg",
      "/images/proj-7.jpg"
    ],
    size: "3×6 m",
    capacity: "4 stalls",
    material: "Waterproof Cement Board & Polyurethane Panels",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/portable-toilet-block.pdf",
    features: getDefaultFeatures("Toilet Cabins"),
    specifications: [
      { label: "Overall Size", value: "6.00m (L) x 3.00m (W) x 2.60m (H)" },
      { label: "Structure", value: "Corrosion-resistant treated steel frame" },
      { label: "Walls", value: "Fiberglass reinforced plastic (FRP) internal sheets over PU core" },
      { label: "Floor Finish", value: "Anti-slip aluminum checkered plate or heavy industrial ceramic tiles" },
      { label: "Plumbing", value: "PPR hot & cold water pipes, PVC waste disposal manifolds" },
      { label: "Stalls Fitting", value: "4x Ceramic Western/Oriental WC, 4x Wash basins, 1x Water heater" },
      { label: "Ventilation", value: "Individual louvers and heavy-duty ceiling exhaust fans" },
    ],
    applications: [
      { icon: "Construction", title: "Construction Camps" },
      { icon: "Building2", title: "Public Event Grounds" },
      { icon: "Building", title: "Industrial Storage Yards" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 10,
    title: "Ablution & Shower Unit",
    slug: "ablution-shower-unit",
    category: "Toilet Cabins",
    description: "Combined ablution, shower and washroom block for labour camps.",
    shortDescription: "A dual-purpose sanitary unit combining shower stalls and ablution taps, built specifically to meet the high hygiene demands of remote worksites.",
    fullDescription: "The Ablution & Shower Unit is a high-capacity, robust solution designed to support large workforces. Combining dedicated shower cubicles, WC stalls, and a continuous stainless steel ablution wash trough. It features anti-corrosive finishes, commercial-grade taps, and high-efficiency water drainage to facilitate rapid cleaning and sanitation.",
    price: "From AED 22,000",
    images: [
      "/images/toilet-cabins.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "4×8 m",
    capacity: "8 stalls",
    material: "FRP Laminated Panels, Galvanized Steel Frame",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/ablution-shower-unit.pdf",
    features: getDefaultFeatures("Toilet Cabins"),
    specifications: [
      { label: "Overall Size", value: "8.00m (L) x 4.00m (W) x 2.65m (H)" },
      { label: "Base Frame", value: "Extra-braced steel chassis with epoxy paint" },
      { label: "Stalls Layout", value: "4x Shower stalls with curtains, 4x WC stalls, 6-tap ablution counter" },
      { label: "Floor System", value: "FRP waterproof floor pan with non-skid textured pattern" },
      { label: "Hot Water", value: "2x 80L heavy-duty electric water heaters" },
      { label: "Piping", value: "Corrosion-resistant copper and PPR fittings throughout" },
    ],
    applications: [
      { icon: "Construction", title: "Contractor Camp Sites" },
      { icon: "Building2", title: "Military & Oil Camps" },
      { icon: "Shield", title: "Emergency Relocations" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 11,
    title: "20ft Container Office",
    slug: "20ft-container-office",
    category: "Container Offices",
    description: "Converted shipping container — rugged, secure and rapid to deploy.",
    shortDescription: "A secure, ultra-rugged site office constructed from a recycled 20ft ISO cargo container, offering high security and transport ease.",
    fullDescription: "Our 20ft Container Office is converted from genuine marine shipping containers. This ensures unparalleled strength, structural security, and weathering resistance. Fitted with high-density mineral wool insulation, gypsum boards, dual-glazed sliding windows, and a heavy-duty steel lock door. Ideal for high-risk sites, security control centers, or remote construction hubs.",
    price: "From AED 21,000",
    images: [
      "/images/container-offices.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "6x2.4 m",
    capacity: "3–4 person",
    material: "ISO Shipping Container Steel & Mineral Wool Insulation",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/20ft-container-office.pdf",
    features: getDefaultFeatures("Container Offices"),
    specifications: [
      { label: "Overall Size", value: "6.058m (L) x 2.438m (W) x 2.591m (H)" },
      { label: "Chassis Core", value: "Original high-tensile Corten steel ISO shipping container structure" },
      { label: "Insulation", value: "50mm Rockwool (density 50kg/m³) behind fire-resistant gypsum boards" },
      { label: "Flooring", value: "Original 28mm marine plywood clad with heavy-duty wood-look PVC overlay" },
      { label: "Door", value: "Corten steel security swing door with double lock mechanism" },
      { label: "Windows", value: "2x sliding double-glazed aluminum windows with steel burglar bars" },
      { label: "AC Unit", value: "Pre-installed frame and power line for 1.5-ton split AC" },
    ],
    applications: [
      { icon: "Construction", title: "Heavy Civil Works" },
      { icon: "Shield", title: "High-Security Sites" },
      { icon: "Briefcase", title: "Port Logistics Yards" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 12,
    title: "40ft Container Office",
    slug: "40ft-container-office",
    category: "Container Offices",
    description: "Spacious container workspace with partitions, glazing and HVAC.",
    shortDescription: "A spacious 40ft converted shipping container office containing executive cabins, workstation room, and a small built-in pantry.",
    fullDescription: "The 40ft Container Office provides a massive 29 square meters of climate-controlled, premium corporate workspace. Built using heavy Corten steel panels, it features internal drywall partitions dividing the space into an executive cabin and a team workspace. The interior is finished to a high spec with recessed LED panels, AC cooling, and multi-network routing.",
    price: "From AED 38,000",
    images: [
      "/images/container-offices.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "12x2.4 m",
    capacity: "5-8 person",
    material: "Corten Steel Frame, Rockwool & Luxury Board Interior",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/40ft-container-office.pdf",
    features: getDefaultFeatures("Container Offices"),
    specifications: [
      { label: "Overall Size", value: "12.192m (L) x 2.438m (W) x 2.591m (H)" },
      { label: "Structure", value: "Corten steel corrugated walls and load-bearing corner castings" },
      { label: "Insulation", value: "50mm glasswool or PU wall and ceiling thermal protection" },
      { label: "Interior Lining", value: "MDF laminated paneling or painted gypsum boards" },
      { label: "Partitions", value: "1x central partition door separating executive room from staff area" },
      { label: "Electrical", value: "2x DB boards, 8x double sockets, network ports, ceiling LED grid panels" },
    ],
    applications: [
      { icon: "Briefcase", title: "Engineering Headquarters" },
      { icon: "Building2", title: "Mining Command Posts" },
      { icon: "Building", title: "Logistics Admin Units" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 13,
    title: "Double-Stack Building",
    slug: "double-stack-building",
    category: "Container Buildings",
    description: "Two-storey stacked container complex with external stair access.",
    shortDescription: "An efficient, two-storey modular office or accommodation complex featuring stackable frame connections and external steel stairs.",
    fullDescription: "Maximize your office space without expanding your footprint. The Double-Stack Building uses heavy-duty steel columns and specialized corner connectors to safely stack two levels. Comes complete with a heavy steel external staircase, handrails, safety platform, and dynamic canopy structures. Engineered to withstand high-velocity wind loads.",
    price: "From AED 96,000",
    images: [
      "/images/container-buildings.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "2 storey",
    capacity: "20+ person",
    material: "Structural Reinforced Steel & Interlocking Modules",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/double-stack-building.pdf",
    features: getDefaultFeatures("Container Buildings"),
    specifications: [
      { label: "Overall Size", value: "Stacked configuration (Customizable layouts e.g. 6x12m footprint)" },
      { label: "Staircase", value: "Hot-dip galvanized steel staircase with safety tread steps and handrails" },
      { label: "Load Capacity", value: "First-floor deck designed to carry up to 250 kg/m² live load" },
      { label: "Wall Construction", value: "60mm polyurethane core panels with thick steel profile backing" },
      { label: "Roof", value: "Reinforced composite roof pane with structural water drainage pipe" },
      { label: "Connectors", value: "Heavy-duty ISO corner lock bolts" },
    ],
    applications: [
      { icon: "Briefcase", title: "Site Offices" },
      { icon: "Construction", title: "Large-Scale Civil Projects" },
      { icon: "School", title: "Modular Schools" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 14,
    title: "Container Building Block",
    slug: "container-building-block",
    category: "Container Buildings",
    description: "Modular container cluster for large-scale worker camps and sites.",
    shortDescription: "A multi-unit interlocking modular structure designed to house large corporate teams, worker colonies, or temporary clinics on-site.",
    fullDescription: "The Container Building Block is a scalable, modular solution for massive projects. By interlocking multiple container cabins horizontally and vertically, we create large workspaces, canteen blocks, clinics, or accommodation complexes. Fully insulated, weather-sealed, and pre-engineered for rapid block assembly.",
    price: "On request",
    images: [
      "/images/container-buildings.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "Multi-unit",
    capacity: "50+ person",
    material: "Heavy Gauge Galvanized Steel & PU Sandwich Panels",
    warranty: "5 Years Structural Guarantee",
    brochure: "/brochures/container-building-block.pdf",
    features: getDefaultFeatures("Container Buildings"),
    specifications: [
      { label: "Module Layout", value: "Custom floor layouts (Canteens, office halls, dormitory clusters)" },
      { label: "Framing System", value: "Anti-corrosion primed steel columns, fully bolted structural skeleton" },
      { label: "Wall Core", value: "75mm PU foam or Rockwool sandwich panels for maximum thermal efficiency" },
      { label: "Roof Water Path", value: "Integrated internal downspout tubes inside modular corner posts" },
      { label: "Certifications", value: "Compliant with UAE Civil Defence (UCD) fire safety regulations" },
    ],
    applications: [
      { icon: "Construction", title: "Megaproject Staff Camps" },
      { icon: "Hospital", title: "Field Medical Facilities" },
      { icon: "Building2", title: "Military Training Centers" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 15,
    title: "Custom Modular Villa",
    slug: "custom-modular-villa",
    category: "Custom Buildings",
    description: "Architect-designed two-storey modular home with full glazing.",
    shortDescription: "An architectural marvel, combining the speeds of modular construction with high-end luxury villa finishes, floor-to-ceiling windows, and structural design.",
    fullDescription: "Why wait months for conventional concrete construction? Our Custom Modular Villa is designed by premium architects and built in our advanced factory. It features a modern architectural steel skeleton, full floor-to-ceiling double-glazed glass walls, custom wood cladding, luxury kitchen fittings, and premium designer restrooms. Fully customizable to meet your lifestyle and design preferences.",
    price: "On request",
    badge: "Bespoke",
    images: [
      "/images/custom-buildings.png",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
      "/images/proj-7.jpg",
      "/images/proj-9.jpg"
    ],
    size: "Custom",
    capacity: "Bespoke",
    material: "Reinforced Structural H-Beams, Glass Facades & Wood Cladding",
    warranty: "10 Years Structural Guarantee",
    brochure: "/brochures/custom-modular-villa.pdf",
    features: getDefaultFeatures("Custom Buildings"),
    specifications: [
      { label: "Chassis System", value: "Engineered heavy H-beam and I-beam structural steel chassis" },
      { label: "Glass Facade", value: "Double-glazed low-E safety glass, thermal broken aluminum frame" },
      { label: "Internal Cladding", value: "High-end gypsum drywall, smooth stucco or custom wallpaper finish" },
      { label: "Flooring Options", value: "Imported Italian marble, engineered hardwood, or luxury porcelain tiles" },
      { label: "Kitchen Fitted", value: "Custom high-gloss modular cabinets, quartz countertops, built-in brand appliances" },
      { label: "Restroom Fitting", value: "Designer wall-hung WC, rain showers, premium mixer fittings" },
    ],
    applications: [
      { icon: "Home", title: "Luxury Beachfront Villas" },
      { icon: "Building2", title: "VIP Desert Retreats" },
      { icon: "Building", title: "Premium Sales Galleries" },
    ],
    faq: getDefaultFAQs(),
  },
  {
    id: 16,
    title: "Custom Showroom",
    slug: "custom-showroom",
    category: "Custom Buildings",
    description: "Premium retail or showroom space engineered to your brand spec.",
    shortDescription: "A striking modular commercial showroom designed with high architectural glass, open spans, and professional branding elements.",
    fullDescription: "Launch your retail brand, car showroom, or property marketing suite in record time. The Custom Showroom is engineered with wide column-free spans, allowing maximum display layouts. Features include high-end facades, premium interior lighting, integrated HVAC, and full compliance with UAE commercial building codes.",
    price: "On request",
    images: [
      "/images/custom-buildings.png",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
      "/images/proj-9.jpg",
      "/images/proj-7.jpg"
    ],
    size: "Custom",
    capacity: "Bespoke",
    material: "Heavy-duty Portal Frames & Architectural Facade Systems",
    warranty: "10 Years Structural Guarantee",
    brochure: "/brochures/custom-showroom.pdf",
    features: getDefaultFeatures("Custom Buildings"),
    specifications: [
      { label: "Structural Span", value: "Clear portal frames without intermediate columns up to 8m span" },
      { label: "Exterior Cladding", value: "Aluminum composite panels (ACP), textured paint, and curtain walling" },
      { label: "Ceiling System", value: "Modern grid acoustic tiles or custom gypsum ceiling with track light fittings" },
      { label: "Flooring Base", value: "Heavy-duty load bearing base with high-traffic porcelain tiles" },
      { label: "HVAC Provision", value: "Centralized ducted package AC or multi-split system pre-engineered" },
    ],
    applications: [
      { icon: "Briefcase", title: "Real Estate Sales Galleries" },
      { icon: "Building2", title: "Automobile Showrooms" },
      { icon: "Building", title: "Bespoke Retail Outlets" },
    ],
    faq: getDefaultFAQs(),
  },
];
