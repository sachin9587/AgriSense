import React, { useState } from 'react';
import '../styles/CultivationTips.css';

const CultivationTips = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  
  const cropsData = [
    { name: 'Wheat', image: '/images/Wheat.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Wheat' },
    { name: 'Brinjal', image: '/images/brinjal.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Eggplant' },
    { name: 'Chilli', image: '/images/chilli.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Chili_pepper' },
    { name: 'Carrot', image: '/images/carrot.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Carrot' },
    { name: 'Cucumber', image: '/images/cucumber.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Cucumber' },
    { name: 'Rice', image: '/images/rice.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Rice' },
    { name: 'Beans', image: '/images/beans.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Bean' },
    { name: 'Bitter Gourd', image: '/images/bitter_gourd.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Momordica_charantia' },
    { name: 'Cabbage', image: '/images/cabbage.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Cabbage' },
    { name: 'Cauliflower', image: '/images/cauliflower.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Cauliflower' },
    { name: 'Cotton', image: '/images/cotton.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Cotton' },
    { name: 'Ginger', image: '/images/ginger.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Ginger' },
    { name: 'Maize', image: '/images/maize.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Maize' },
    { name: 'Melon', image: '/images/melon.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Melon' },
    { name: 'Millet', image: '/images/millet.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Millet' },
    { name: 'Onion', image: '/images/onion.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Onion' },
    { name: 'Pea', image: '/images/pea.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Pea' },
    { name: 'Peanut', image: '/images/peanut.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Peanut' },
    { name: 'Potato', image: '/images/potato.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Potato' },
    { name: 'Tomato', image: '/images/tomato.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Tomato' },
    { name: 'Pumpkin', image: '/images/pumkin.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Pumpkin' },
    { name: 'Soybean', image: '/images/soybean.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Soybean' },
    { name: 'Sugarcane', image: '/images/sugarcane.png', wikipediaLink: 'https://en.wikipedia.org/wiki/Sugarcane' }
  ];

  const cultivationTips = {
    
      "Wheat": [
        { 
          week: 1,
          tip: "Prepare soil (pH 6.0-7.5) with deep plowing (20-25cm depth). Add 10-15 tons/ha organic matter. Ensure drainage (slope 0.5-1%). Optimal soil temp: 12-25°C. Seed rate: 100-150 kg/ha."
        },
        {
          week: 2,
          tip: "Sow certified seeds (germination >85%) at 5cm depth. Row spacing 20-25cm. Apply basal dose: 60kg N, 60kg P₂O₅, 40kg K₂O per hectare. Treat seeds with carbendazim 2g/kg."
        },
        {
          week: 3,
          tip: "First irrigation (5cm depth). Monitor for aphids (ETL: 5-10/ tiller). Maintain 18-22°C temp. Apply Chlorpyriphos 20EC @2.5ml/l. Critical stage: CRI (Crown Root Initiation)."
        },
        {
          week: 4,
          tip: "Top dress 30kg N/ha. Weed control: Sulfosulfuron 75% WG @25g/ha. Maintain 60-70% soil moisture. Critical stage: Tillering (25-35 DAS)."
        },
        {
          week: 6,
          tip: "Second irrigation (7.5cm depth). Monitor for yellow rust (spray Propiconazole 25EC @0.1%). Maintain 15-20°C night temp. Growth stage: Jointing."
        },
        {
          week: 8,
          tip: "Third dose: 20kg N/ha. Check Karnal bunt (Tilt 25EC @0.1%). Critical stage: Flowering (65-75 DAS). Maintain 50-60% RH."
        },
        {
          week: 12,
          tip: "Final irrigation (5cm depth). Growth stage: Milk development (Zadoks 75-85). Monitor for termites (Chlorpyrifos 20G @15kg/ha)."
        },
        {
          week: 16,
          tip: "Harvest at 14-16% moisture. Yield: 4-6t/ha (irrigated). Use combine harvester at 1200-1500 rpm cylinder speed. Storage: <12% moisture."
        }
      ],
      "Brinjal": [
        {
          week: 1,
          tip: "Seedbed: 1m wide, 15cm height. Sow 500g seeds/ha (hybrid) or 250g/ha (varieties). Maintain 25-30°C soil temp. Treat seeds with Trichoderma viride @4g/kg. Optimal pH: 5.5-6.5."
        },
        {
          week: 3,
          tip: "Transplant at 60x60cm spacing (18,000 plants/ha). Root dip in Pseudomonas fluorescens @5g/l. Critical stage: 4-5 true leaves (25-30 days old). Apply 20:20:20 NPK @2g/l starter solution."
        },
        {
          week: 4,
          tip: "Apply 50kg N, 25kg P₂O₅, 25kg K₂O/ha. Monitor fruit borer (ETL: 5% infestation). Install pheromone traps @5/ha. Night temp >18°C crucial."
        },
        {
          week: 6,
          tip: "Second dose: 50kg N/ha. Spray NSKE 5% for mites. Maintain 70-80% soil moisture. Critical stage: Flowering (45-50 DAS)."
        },
        {
          week: 8,
          tip: "Apply 25kg K₂O/ha. Control fruit rot (Copper oxychloride 0.3%). Optimal EC: 1.5-2.5 dS/m. Average fruit weight: 150-200g."
        },
        {
          week: 10,
          tip: "Harvest at 60-70 DAS (2.5-3t/ha). Pick when fruits are glossy. Post-harvest dip in 100ppm Chlorine solution. Storage: 10-12°C with 90-95% RH."
        },
        {
          week: 12,
          tip: "Continue harvest every 5-7 days. Apply 1% KNO₃ foliar spray. Critical stage: Fruit maturity (Brix 5-6°). Maintain 25-30°C day temp."
        },
        {
          week: 16,
          tip: "Final harvest before frost. Remove crop residues. Solarize soil (6 weeks). Yield potential: 35-50t/ha under optimal conditions."
        }
      ],
      "Chilli": [
        {
          week: 1,
          tip: "Nursery: 1kg seeds/ha. Treat with Bavistin @2g/kg + Streptocycline @150ppm. Maintain 28-30°C for germination. Sowing depth: 0.5cm. 70-80% shade net recommended."
        },
        {
          week: 3,
          tip: "Transplant at 60x45cm spacing (37,000 plants/ha). Apply 50kg N, 100kg P₂O₅, 50kg K₂O/ha basal dose. Critical stage: Flower initiation (45-50 DAS). Maintain 22-30°C daytime temp."
        },
        {
          week: 4,
          tip: "First top dressing: 50kg N/ha. Control thrips (Spinosad 45SC @0.3ml/l). Maintain 50-60% RH. Critical stage: Fruit set initiation."
        },
        {
          week: 6,
          tip: "Apply 50kg K₂O/ha. Manage leaf curl virus (Imidacloprid 0.01%). Optimal EC: 1.0-2.0 dS/m. Average pods/plant: 80-120."
        },
        {
          week: 8,
          tip: "Second top dressing: 25kg N/ha. Control anthracnose (Hexaconazole 0.2%). Harvest index: 0.3-0.4. Capsaicin content: 0.4-1.0%."
        },
        {
          week: 10,
          tip: "First harvest at 70-80 DAS (green). Yield: 15-20t/ha. Sorting criteria: 8-10cm length. Storage: 7-10°C with 95% RH."
        },
        {
          week: 14,
          tip: "Red chilli harvest (90-110 DAS). Sun dry to 10-12% moisture. Paprika types: ASTA value >150. Processing temp: <40°C."
        },
        {
          week: 16,
          tip: "Final yield: 2.5-3.5t dried/ha. Field sanitation: Remove infected plants. Crop rotation: 3-4 year cycle recommended."
        }
      ],
      "Carrot": [
        {
          week: 1,
          tip: "Soil prep: Fine tilth to 30cm depth. Optimal pH 6.0-7.0. Sow 5-6 kg seeds/ha. Row spacing 30-45cm. Germination temp: 7-30°C (optimal 20°C). EC <1 dS/m."
        },
        {
          week: 2,
          tip: "Thin to 5-7cm spacing (2 lakh plants/ha). Critical stage: Root thickening. Apply Boron @2kg/ha. Maintain 70-80% FC. Temp: 15-20°C day/10-15°C night."
        },
        {
          week: 3,
          tip: "First dose: 60kg N, 80kg P₂O₅, 120kg K₂O/ha. Control leaf miner (Abamectin 0.5ml/l). Optimal root zone temp: 18-21°C."
        },
        {
          week: 5,
          tip: "Second dose: 30kg N/ha. Weed control (Pendimethalin 1kg ai/ha). Critical stage: Root elongation. Maintain 1.2-1.5 MPa soil moisture tension."
        },
        {
          week: 7,
          tip: "Monitor carrot fly (Deltamethrin 0.028%). Foliar spray: 0.5% CaNO₃. Optimal root diameter: 2-3cm. TSS: 8-10°Brix."
        },
        {
          week: 9,
          tip: "Baby carrot harvest (50-60 DAS). Yield: 25-30t/ha. Wash with 50ppm chlorine. Cooling: Hydro cooling to 0°C within 4hrs."
        },
        {
          week: 11,
          tip: "Main harvest (90-110 DAS). Top removal: Cut 1cm above crown. Field heat removal: <2hrs. Storage: 0°C with 98-100% RH."
        },
        {
          week: 14,
          tip: "Post-harvest: Waxing (6-8% coating). Processing: 1-2cm dice size. Peeling loss: <25%. Cold storage life: 4-6 months."
        }
      ],
      "Cucumber": [
        {
          week: 1,
          tip: "Raised beds: 1.2m wide, 30cm height. Sow 2.5-3kg seeds/ha. Soil temp 18-35°C. pH 6.0-7.0. Pre-soak seeds in GA3 @50ppm. Critical: Emergence (4-5 DAS)."
        },
        {
          week: 2,
          tip: "Maintain density: 15,000-20,000/ha. Install trellis (2m height). Apply 60:40:40 NPK kg/ha. Critical stage: Vine elongation. Temp: 25-35°C day/18-24°C night."
        },
        {
          week: 3,
          tip: "First dose: 30kg N/ha. Drip irrigation: 4-6 lpd/m². Control downy mildew (Mancozeb 0.25%). Pollination: 8-10am daily."
        },
        {
          week: 5,
          tip: "Second dose: 20kg N + 15kg K₂O/ha. Train vines: 2-3 stems/plant. Critical stage: Flower differentiation. Maintain 60-70% RH."
        },
        {
          week: 6,
          tip: "Fruit setting: Apply 0.5% Boron. Control mites (Dicofol 0.05%). Optimal fruit length: 15-20cm. Avg weight: 150-200g."
        },
        {
          week: 8,
          tip: "Harvest every 2-3 days (40-45 DAS). Yield: 15-25t/ha. Cooling: Forced air to 10°C. Storage: 10-12°C with 95% RH."
        },
        {
          week: 10,
          tip: "Continue harvest (60-70% moisture content). Grade by diameter: A (>35mm), B (25-35mm). Processing: Brine solution 5-8%."
        },
        {
          week: 12,
          tip: "Final harvest. Remove trellis. Solarization: 6 weeks. Crop rotation: 2-3 year gap. Seed yield: 300-400kg/ha."
        }
      ],
      "Rice": [
        {
          week: 1,
          tip: "Nursery: 1000m²/ha. Seed rate 25-30kg/ha. Pre-germinate seeds (24h soak + 24h incubation). Maintain 2cm water. Temp: 21-25°C. Seedling age: 20-25 days."
        },
        {
          week: 3,
          tip: "Transplant @2-3/hill. 20x15cm spacing (33 hills/m²). Water depth 3-5cm. Apply 16:20:13 NPK @500kg/ha. Critical: Root establishment."
        },
        {
          week: 4,
          tip: "First top dressing: 33kg N/ha. Control stem borer (Cartap 4G @25kg/ha). Maintain 25-30°C. Critical stage: Tillering (35-45 DAT)."
        },
        {
          week: 5,
          tip: "Mid-season drainage (5 days). Apply K₂O @40kg/ha. Weed control: Bispyribac 10SC @25g/ha. Panicle initiation stage."
        },
        {
          week: 7,
          tip: "Second top dressing: 33kg N/ha. Control BLB (Streptocycline 200ppm). Maintain 80-90% RH. Critical stage: Booting."
        },
        {
          week: 9,
          tip: "Final dose: 34kg N/ha. Drain field 15 days before harvest. Grain filling temp: 21-25°C. Moisture content: 20-25%."
        },
        {
          week: 12,
          tip: "Harvest at 18-20% moisture. Threshing loss: <3%. Drying: Reduce to 14% MC. Yield: 6-8t/ha (IR64 variety)."
        },
        {
          week: 16,
          tip: "Post-harvest: Parboiling (steam 10min at 100°C). Milling recovery: 65-70%. Storage: Hermetic bags @12-13% MC."
        }
      ],
      "Beans": [
        {
          week: 1,
          tip: "Direct sow @2-3cm depth. Seed rate: 80-100kg/ha (bush), 40-50kg/ha (pole). Soil temp: 16-30°C. Inoculate with Rhizobium. Optimal pH: 6.0-6.8."
        },
        {
          week: 2,
          tip: "Install trellis (2m height). Thin to 10cm spacing. Critical stage: Emergence. Apply 20:40:20 NPK @200kg/ha. Soil EC: <1.0 dS/m."
        },
        {
          week: 3,
          tip: "First dose: 30kg N/ha. Control bean beetle (Cypermethrin 0.005%). Maintain 18-24°C night temp. Nodulation check: 10-20 nodules/plant."
        },
        {
          week: 5,
          tip: "Second dose: 20kg N + 15kg K₂O/ha. Monitor anthracnose (Copper oxychloride 0.3%). Critical stage: Flowering (35-40 DAS)."
        },
        {
          week: 7,
          tip: "Pod setting: Apply 0.5% MgSO₄. Optimal pod length: 10-15cm. Irrigation: 35-40mm/week. Temp: 15-27°C."
        },
        {
          week: 9,
          tip: "Harvest snap beans @60-70 DAS. Yield: 8-12t/ha. Cooling: Vacuum cooling to 4°C. Storage: 4-7°C with 95% RH."
        },
        {
          week: 11,
          tip: "Shelling stage (90 DAS). Moisture content: 18-20%. Thresh at <15% MC. Seed viability: >85% germination."
        },
        {
          week: 13,
          tip: "Dry bean harvest (100-120 DAS). Combine at 450-600rpm. Cleaning: 2mm screens. Storage: 12% MC in silos."
        }
      ],
      "Bitter Gourd": [
        {
          week: 1,
          tip: "Seed treatment: Soak in 100ppm GA3 for 12h. Sow @5kg/ha. Spacing 2x1.5m. Optimal temp: 25-30°C. pH: 6.0-6.7. Critical: Germination (5-7 DAS)."
        },
        {
          week: 2,
          tip: "Install trellis (2.5m height). Thin to 2 plants/pit. Apply 20:40:20 NPK @200kg/ha. Maintain 70-80% FC. PPI: 1.0-1.5 MPa."
        },
        {
          week: 4,
          tip: "First dose: 50kg N/ha. Train vines daily. Control fruit fly (Cue-lure traps @10/ha). Critical stage: Flowering (30-35 DAS)."
        },
        {
          week: 6,
          tip: "Second dose: 30kg N + 20kg K₂O/ha. Hand pollinate (6-8am). Apply 0.5% Boron. Fruit set: 60-70% success rate."
        },
        {
          week: 8,
          tip: "Harvest @12-15 DAA (Days After Anthesis). Yield: 10-15t/ha. Size: 15-20cm length. Cooling: Room cooling to 12°C."
        },
        {
          week: 10,
          tip: "Continue harvest (2-3 days interval). Grade by weight: A (>50g), B (30-50g). Waxing: 6% vegetable coating."
        },
        {
          week: 12,
          tip: "Apply 1% KNO₃ foliar spray. Maintain 25-30°C day/18-22°C night. Fruit brix: 2-3%. Avg seeds/fruit: 20-25."
        },
        {
          week: 16,
          tip: "Final harvest. Solarize soil. Seed extraction: Ferment 24h. Drying: 35°C to 8% MC. Storage: 15°C with 30% RH."
        }
      ],
      "Cabbage": [
        {
          week: 1,
          tip: "Nursery: 500g seeds/ha. Treat with Thiram @3g/kg. Spacing 10x10cm. Temp: 15-20°C. pH: 6.0-6.8. EC: <2.0 dS/m. Critical: Cotyledon stage."
        },
        {
          week: 3,
          tip: "Transplant @45x45cm (48,000 plants/ha). Root dip in IBA 1000ppm. Apply 120:60:80 NPK kg/ha. Critical stage: Head initiation (45-50 DAT)."
        },
        {
          week: 4,
          tip: "First top dressing: 50kg N/ha. Control diamondback moth (Spinosad 0.01%). Maintain 15-20°C. Head firmness: 4-5 lb pressure."
        },
        {
          week: 6,
          tip: "Second dose: 30kg N + 20kg K₂O/ha. Apply CaNO₃ @0.5% foliar. Critical stage: Head filling. Avg head weight: 1-2kg."
        },
        {
          week: 8,
          tip: "Third dose: 20kg N/ha. Control black rot (Streptomycin 200ppm). Maintain 70-80% FC. TSS: 6-8°Brix."
        },
        {
          week: 10,
          tip: "Harvest @70-90 DAT. Yield: 25-40t/ha. Trim outer leaves. Cooling: Hydro cooling to 4°C. Storage: 0°C with 95-100% RH."
        },
        {
          week: 12,
          tip: "Post-harvest: Controlled atmosphere (3% O₂, 5% CO₂). Processing: Shred size 3-5mm. Waste: <15%."
        },
        {
          week: 14,
          tip: "Field cleanup. Destroy residues. Rotate with legumes. Soil test: Maintain 150kg N/ha residual."
        }
      ],
      "Cauliflower": [
        {
          week: 1,
          tip: "Nursery: 600-800g seeds/ha. Treat with Captan @2g/kg. Spacing 8x8cm. Temp: 20-25°C. pH: 6.0-7.0. Critical: Button stage (40-45 DAS)."
        },
        {
          week: 3,
          tip: "Transplant @60x45cm (37,000 plants/ha). Apply 150:100:150 NPK kg/ha. Curd initiation temp: 15-20°C. Blanching: Tie leaves at 10-15cm curd size."
        },
        {
          week: 4,
          tip: "First dose: 50kg N/ha. Control clubroot (Lime @4t/ha). Maintain 60-70% FC. Critical stage: Curd development."
        },
        {
          week: 6,
          tip: "Second dose: 40kg N + 30kg K₂O/ha. Apply Boron @0.25%. Curd size: 15-20cm diameter. Avg weight: 500-800g."
        },
        {
          week: 8,
          tip: "Third dose: 30kg N/ha. Control black rot (Copper hydroxide 0.3%). Maintain 18-22°C. Harvest index: 0.4-0.5."
        },
        {
          week: 10,
          tip: "Harvest @80-100 DAT. Cut with 2-3 wrapper leaves. Yield: 15-25t/ha. Cooling: Forced air to 0°C. Storage: 90-95% RH."
        },
        {
          week: 12,
          tip: "Processing: Floret size 3-5cm. Blanching: 3min at 95°C. Freezing: IQF at -35°C. Waste: <20%."
        },
        {
          week: 14,
          tip: "Field management: Remove stumps. Green manure: Sunnhemp @25kg/ha. Soil solarization: 6 weeks."
        }
      ],
      "Cotton": [
        {
          week: 1,
          tip: "Sow @8-10kg/ha (BT) or 15-20kg/ha (non-BT). Depth 5cm. Spacing 90x60cm. Soil temp >18°C. pH: 5.5-6.5. Critical: Emergence (5-7 DAS)."
        },
        {
          week: 2,
          tip: "Thin to 2 plants/hill. Apply 60:30:30 NPK kg/ha. Control jassids (Imidacloprid 0.005%). Maintain 25-30°C."
        },
        {
          week: 4,
          tip: "First top dressing: 40kg N/ha. Square initiation stage. Apply Mepiquat chloride @50ppm. Maintain 60-70% FC."
        },
        {
          week: 6,
          tip: "Second dose: 60kg N/ha. Control bollworm (Emamectin 0.002%). Critical stage: Flowering (60-70 DAS)."
        },
        {
          week: 8,
          tip: "Third dose: 40kg N/ha. Apply KNO₃ @1% foliar. Boll development stage. Maintain 30-35°C day temp."
        },
        {
          week: 12,
          tip: "Monitor boll opening. Defoliate (Thidiazuron 0.05%) if needed. Fiber strength: 28-30g/tex. Micronaire: 3.8-4.5."
        },
        {
          week: 16,
          tip: "First picking @60-70% opening. Yield: 15-25 q/ha. Ginning: 33-35% turnout. Seed index: 8-10g."
        },
        {
          week: 20,
          tip: "Final picking. Stalk destruction. Crop rotation: 2-3 years. Fiber length: 28-32mm. Lint %: 36-40%."
        }
      ],
      "Ginger": [
        {
          week: 1,
          tip: "Seed rhizome: 1500-2000kg/ha. Treat with Mancozeb 0.3% + Streptocycline 200ppm. Spacing 30x20cm. Soil temp: 25-30°C. pH: 5.5-6.5."
        },
        {
          week: 3,
          tip: "Mulch @6t/ha (paddy straw). Apply 60:60:120 NPK kg/ha. Critical stage: Sprouting (15-20 DAP). Maintain 70-80% FC."
        },
        {
          week: 5,
          tip: "First earthing up (15cm height). Apply 50kg N/ha. Control shoot borer (Neem oil 2%). Temp: 20-25°C."
        },
        {
          week: 8,
          tip: "Second earthing up. Apply 50kg K₂O/ha. Critical stage: Rhizome initiation (90-100 DAP). Maintain 25-30°C."
        },
        {
          week: 12,
          tip: "Third dose: 30kg N + 40kg K₂O/ha. Control rhizome rot (Trichoderma @5kg/ha). Oleoresin content: 4-6%."
        },
        {
          week: 16,
          tip: "Baby ginger harvest (6-7 months). Yield: 15-20t/ha. Wash with 2% citric acid. Storage: 13°C with 65% RH."
        },
        {
          week: 20,
          tip: "Mature harvest (8-9 months). Dry to 10% MC. Fiber content: 3-5%. Essential oil: 1.5-2.5%."
        },
        {
          week: 24,
          tip: "Processing: Peel loss <20%. Slicing: 2-3mm thickness. Drying: 60°C for 6-8h. Storage: <10% MC in jute bags."
        }
      ],
      "Maize": [
        {
          week: 1,
          tip: "Sow @20-25kg/ha. Depth 5cm. Spacing 75x20cm. Soil temp: 10-30°C. pH: 5.8-7.0. Apply 120:60:40 NPK kg/ha. Critical: Emergence (4-5 DAS)."
        },
        {
          week: 2,
          tip: "Thin to 1 plant/hill. Apply Atrazine 1kg ai/ha. Maintain 25-30°C. Critical stage: V3 (3-leaf stage)."
        },
        {
          week: 3,
          tip: "First top dressing: 50kg N/ha. Control FAW (Emamectin 0.002%). Root development: 15-20cm depth."
        },
        {
          week: 5,
          tip: "Second dose: 60kg N/ha. Critical stage: V6 (6-leaf). Tassel initiation. Maintain 60-70% FC."
        },
        {
          week: 7,
          tip: "Third dose: 50kg N/ha. Silking stage. Apply 0.5% ZnSO₄. Pollination temp: 20-28°C."
        },
        {
          week: 9,
          tip: "Grain filling stage. Monitor ECB (Bt maize). Starch accumulation: 70-75%. Moisture: 35-40%."
        },
        {
          week: 12,
          tip: "Physiological maturity (black layer). Harvest at 20-25% MC. Yield: 6-8t/ha (hybrid). Drying: Reduce to 14% MC."
        },
        {
          week: 16,
          tip: "Storage: Hermetic bags. Test weight: 75-80kg/hl. Processing: Dry milling (70-72% recovery). Oil content: 4-5%."
        }
      ],
      "Melon": [
        {
          week: 1,
          tip: "Sow @2-3kg/ha. Depth 2cm. Spacing 2x1m. Soil temp: 21-35°C. pH: 6.0-6.8. Apply 60:40:60 NPK kg/ha. Critical: Emergence (5-7 DAS)."
        },
        {
          week: 2,
          tip: "Thin to 2 plants/hill. Install drip (4 lpd/plant). Apply Carbaryl 0.1% for beetles. Maintain 25-30°C."
        },
        {
          week: 4,
          tip: "First dose: 30kg N/ha. Train vines. Critical stage: Flowering (30-35 DAS). Pollination: 6-8am daily."
        },
        {
          week: 6,
          tip: "Second dose: 20kg N + 15kg K₂O/ha. Fruit set: 80-90% success. Avg fruit weight: 1-2kg. Brix: 10-12%."
        },
        {
          week: 8,
          tip: "Support fruits with nets. Control PM (Sulfur 0.2%). Maintain 40-50% RH. Calcium spray 0.5%."
        },
        {
          week: 10,
          tip: "First harvest (70-80 DAS). Yield: 20-25t/ha. Slip stage: Easy separation. Cooling: Forced air to 10°C."
        },
        {
          week: 12,
          tip: "Main harvest (90-100 DAS). Grade by size: >1.5kg. Storage: 3-4°C with 95% RH. Shelf life: 14-21 days."
        },
        {
          week: 14,
          tip: "Seed extraction: Ferment 24h. Drying: 35°C to 8% MC. Viability: 85-90%. Crop rotation: 3-4 years."
        }
      ],
      "Millet": [
        {
          week: 1,
          tip: "Sow @10-12kg/ha. Depth 3cm. Spacing 30x10cm. Soil temp: 20-30°C. pH: 6.0-7.5. Apply 40:20:20 NPK kg/ha. Critical: Emergence (3-5 DAS)."
        },
        {
          week: 2,
          tip: "Thin to 10cm spacing. Apply 2,4-D 0.5kg ai/ha. Maintain 25-35°C. Critical stage: Tillering (20-25 DAS)."
        },
        {
          week: 3,
          tip: "First top dressing: 20kg N/ha. Control shoot fly (Phorate 10G @10kg/ha). Root depth: 1-1.5m."
        },
        {
          week: 5,
          tip: "Second dose: 20kg N/ha. Critical stage: Panicle initiation. Maintain 50-60% FC. Temp: 20-25°C."
        },
        {
          week: 7,
          tip: "Flowering stage. Apply 0.5% Boron. Pollination: Wind-dependent. Seed set: 70-80%."
        },
        {
          week: 9,
          tip: "Grain filling. Bird scaring. Protein content: 10-12%. Threshing: 18-20% MC."
        },
        {
          week: 12,
          tip: "Harvest @14-15% MC. Yield: 1.5-2t/ha. Dehusking: 85-90% recovery. Storage: <12% MC in bins."
        },
        {
          week: 14,
          tip: "Stover yield: 3-4t/ha. Processing: Pearl millet flour (80-100 mesh). Gluten-free product development."
        }
      ],
      "Onion": [
        {
          week: 1,
          tip: "Nursery: 8-10kg seeds/ha. Spacing 10x2cm. Temp: 20-25°C. pH: 6.0-7.0. EC: <1.5 dS/m. Critical: Bulb initiation (60-70 DAT)."
        },
        {
          week: 2,
          tip: "Transplant @15x10cm (6.6 lakh plants/ha). Apply 60:80:60 NPK kg/ha. Root dip in IBA 500ppm. Maintain 70% FC."
        },
        {
          week: 4,
          tip: "First top dressing: 50kg N/ha. Control thrips (Spinosad 0.01%). Bulb diameter: 1-2cm. TSS: 8-10%."
        },
        {
          week: 6,
          tip: "Second dose: 40kg N + 30kg K₂O/ha. Critical stage: Bulb swelling. Maintain 15-20°C. Pungency: 5-6 Pyruvate scale."
        },
        {
          week: 8,
          tip: "Third dose: 30kg K₂O/ha. Stop irrigation. Neck fall stage. Dry matter: 10-12%."
        },
        {
          week: 12,
          tip: "Harvest @70-80% tops fallen. Yield: 25-35t/ha. Curing: 35-45°C for 3-5 days. Storage: 0-5°C with 65-70% RH."
        },
        {
          week: 14,
          tip: "Processing: Diced (6-8mm), powdered (60 mesh). Dehydration: 60-70°C to 5% MC. Storage life: 6-8 months."
        },
        {
          week: 15,
          tip: "Seed production: Roguing. Isolation: 1000m. Harvest umbels @30-40% MC. Thresh at 12-14% MC. Yield: 500-700kg/ha."
        }
      ],
      "Pea": [
        {
          week: 1,
          tip: "Sow @80-100kg/ha. Depth 5cm. Spacing 30x5cm. Soil temp: 10-22°C. pH: 6.0-7.5. Inoculate with Rhizobium. Critical: Emergence (7-10 DAS)."
        },
        {
          week: 2,
          tip: "Install trellis (1.5m height). Apply 20:60:40 NPK kg/ha. Maintain 15-20°C. Nodulation: 15-20/plant."
        },
        {
          week: 3,
          tip: "First dose: 30kg N/ha. Control powdery mildew (Wettable sulfur 0.2%). Flowering starts (35-40 DAS)."
        },
        {
          week: 5,
          tip: "Second dose: 20kg N + 15kg K₂O/ha. Pod set: 4-6 pods/node. Maintain 18-24°C. Irrigation: 30-35mm/week."
        },
        {
          week: 7,
          tip: "Harvest snap peas @60-65 DAS. Yield: 8-10t/ha. Sugar content: 5-6% Brix. Cooling: Vacuum to 4°C."
        },
        {
          week: 9,
          tip: "Shelling stage (75-80 DAS). Moisture: 18-20%. Tenderometer: 100-120. Processing: IQF at -35°C."
        },
        {
          week: 11,
          tip: "Dry pea harvest (100-110 DAS). Thresh at 14-16% MC. Protein: 22-24%. Splits: <5%. Storage: 12% MC."
        },
        {
          week: 13,
          tip: "Seed production: Rogueing. Isolation: 50m. Harvest @20% MC. Clean to 99% purity. Germination: >85%."
        }
      ],
      "Peanut": [
        {
          week: 1,
          tip: "Sow @100-120kg/ha. Depth 5cm. Spacing 30x10cm. Soil temp: 18-30°C. pH: 5.5-7.0. Inoculate with Bradyrhizobium. Critical: Emergence (5-7 DAS)."
        },
        {
          week: 2,
          tip: "Apply 20:60:40 NPK kg/ha. Control cutworms (Chlorpyrifos 0.05%). Maintain 25-30°C. EC: <2 dS/m."
        },
        {
          week: 4,
          tip: "First earthing up. Apply 50kg N/ha. Flowering starts (30 DAS). Calcium spray @500kg/ha gypsum."
        },
        {
          week: 6,
          tip: "Second earthing up. Control leaf spot (Chlorothalonil 0.2%). Peg penetration stage. Maintain 60-70% FC."
        },
        {
          week: 8,
          tip: "Pod development. Apply 0.5% Boron. Oil content: 45-50%. Shelling %: 70-75. Avg pods/plant: 25-30."
        },
        {
          week: 16,
          tip: "Harvest @120-130 DAS. Yield: 3-4t/ha (unshelled). Moisture: 35-40%. Drying: Reduce to 8-10% MC."
        },
        {
          week: 18,
          tip: "Processing: Blanching (95°C/5min). Roasting: 160°C/20min. Oil extraction: 40-45% recovery. Storage: 10°C with 65% RH."
        },
        {
          week: 20,
          tip: "Crop rotation: 3-4 years. Green manure: Crotalaria @25kg/ha. Soil health: Maintain 1.5% organic carbon."
        }
      ],
      "Potato": [
        {
          week: 1,
          tip: "Plant @2.5-3t/ha. Spacing 60x20cm. Soil temp: 15-20°C. pH: 5.0-6.5. Apply 150:100:150 NPK kg/ha. Critical: Sprouting (15-20 DAP)."
        },
        {
          week: 3,
          tip: "First earthing up (15cm). Apply 50kg N/ha. Control CPB (Imidacloprid 0.005%). Maintain 16-18°C."
        },
        {
          week: 5,
          tip: "Second earthing up. Apply 50kg K₂O/ha. Tuber initiation (30-35 DAP). Maintain 60-70% FC."
        },
        {
          week: 7,
          tip: "Third dose: 30kg N/ha. Control late blight (Metalaxyl 0.2%). Tuber bulking stage. Starch: 12-15%."
        },
        {
          week: 9,
          tip: "Stop irrigation. Maturity signs: Skin set. Dry matter: 18-20%. Reducing sugars: <0.25%."
        },
        {
          week: 12,
          tip: "Harvest @10-15% vine desiccation. Yield: 25-35t/ha. Curing: 10-15°C for 10 days. Storage: 4°C with 95% RH."
        },
        {
          week: 14,
          tip: "Processing: Chips (SG 1.080-1.095). French fries: Strips 10x10mm. Specific gravity: >1.080."
        },
        {
          week: 16,
          tip: "Seed certification: Virus-free stock. Cold storage: 2-4°C. Dormancy breaking: GA3 1-2ppm."
        }
      ],
      "Tomato": [
        {
          week: 1,
          tip: "Nursery: 100-150g seeds/ha. Treat with 1% NaHCO₃. Temp: 25-30°C. pH: 6.0-6.8. EC: <2.5 dS/m. Critical: Cotyledon expansion (5-7 DAS)."
        },
        {
          week: 3,
          tip: "Transplant @60x45cm (37,000 plants/ha). Apply 150:60:100 NPK kg/ha. Root dip in IBA 1000ppm. Maintain 20-25°C."
        },
        {
          week: 4,
          tip: "First top dressing: 50kg N/ha. Install stakes. Control whitefly (Acetamiprid 0.005%). Flowering starts (35-40 DAT)."
        },
        {
          week: 6,
          tip: "Second dose: 50kg N + 30kg K₂O/ha. Cluster pruning: 4-5 fruits/truss. Brix: 4-5%. Lycopene: 3-5mg/100g."
        },
        {
          week: 8,
          tip: "Third dose: 30kg K₂O/ha. Control TYLCV (Imidacloprid 0.01%). Critical stage: Fruit maturation (70-75 DAT)."
        },
        {
          week: 10,
          tip: "First harvest @90-95 DAS. Yield: 60-80t/ha. Color: Breaker stage. Ethylene treatment: 100-150ppm."
        },
        {
          week: 12,
          tip: "Main harvest (110-120 DAS). Grade by size: >57mm. Cooling: Hydro cooling to 12°C. Storage: 12°C with 90-95% RH."
        },
        {
          week: 16,
          tip: "Processing: Paste (5-7% TSS), ketchup (25-30°Brix). Canning: pH <4.3. Waste utilization: Lycopene extraction."
        }
      ],
      "Pumpkin": [
        {
          week: 1,
          tip: "Sow @4-5kg/ha. Depth 3cm. Spacing 2x2m. Soil temp: 20-30°C. pH: 6.0-7.0. Apply 60:40:60 NPK kg/ha. Critical: Emergence (5-7 DAS)."
        },
        {
          week: 2,
          tip: "Thin to 2 plants/hill. Install drip (4 lpd/plant). Control cucumber beetles (Carbaryl 0.1%). Maintain 25-35°C."
        },
        {
          week: 4,
          tip: "First dose: 40kg N/ha. Train vines. Critical stage: Flowering (35-40 DAS). Pollination: 8-10am."
        },
        {
          week: 6,
          tip: "Second dose: 30kg N + 20kg K₂O/ha. Fruit set: 70-80%. Avg weight: 3-5kg. Carotenoids: 5-7mg/100g."
        },
        {
          week: 8,
          tip: "Support fruits. Control PM (Dinocap 0.05%). Maintain 60-70% FC. Brix: 8-10%."
        },
        {
          week: 10,
          tip: "First harvest @75-85 DAS. Yield: 20-30t/ha. Cure @24-27°C for 10 days. Storage: 10-13°C with 50-70% RH."
        },
        {
          week: 14,
          tip: "Seed extraction: Ferment 2 days. Dry to 8% MC. Oil content: 35-40%. Seed yield: 300-400kg/ha."
        },
        {
          week: 16,
          tip: "Processing: Puree (8-10% TSS), canned cubes. Waste utilization: Pectin extraction from rind."
        }
      ],
      "Soybean": [
        {
          week: 1,
          tip: "Sow @80-100kg/ha. Depth 3-5cm. Spacing 45x5cm. Soil temp: 15-40°C. pH: 6.0-7.0. Inoculate with Bradyrhizobium. Critical: Emergence (4-5 DAS)."
        },
        {
          week: 2,
          tip: "Apply 20:60:40 NPK kg/ha. Control cutworms (Chlorpyrifos 0.05%). Maintain 25-30°C. Nodulation: 20-30/plant."
        },
        {
          week: 3,
          tip: "First dose: 30kg N/ha. Flowering starts (35-40 DAS). Apply Mo @500g/ha. Maintain 60-70% FC."
        },
        {
          week: 5,
          tip: "Second dose: 20kg K₂O/ha. Control rust (Hexaconazole 0.1%). Pod set: 30-50/plant. Protein: 38-42%."
        },
        {
          week: 7,
          tip: "Pod filling. Apply 0.5% KNO₃. Oil content: 18-22%. Moisture: 50-60%."
        },
        {
          week: 14,
          tip: "Harvest @15% MC. Yield: 2.5-3.5t/ha. Combine at 450-600rpm. Drying: Reduce to 12% MC."
        },
        {
          week: 16,
          tip: "Processing: Oil extraction (18-20%), meal (44% protein). Storage: 12°C with <12% MC. IP: Non-GMO certification."
        },
        {
          week: 18,
          tip: "Crop rotation: Wheat/maize. Green manure: Incorporate residues. Carbon sequestration: 0.5t C/ha."
        }
      ],
      "Sugarcane": [
        {
          week: 1,
          tip: "Plant @40,000 setts/ha. Spacing 90x30cm. Sett treatment: Hot water 50°C/2h. Soil temp: 25-32°C. pH: 6.0-7.5. Critical: Sprouting (15-20 DAP)."
        },
        {
          week: 3,
          tip: "Apply 250:115:165 NPK kg/ha. Control termites (Chlorpyrifos 0.05%). Maintain 70-80% FC. Tillers: 10-12/stool."
        },
        {
          week: 5,
          tip: "First earthing up. Apply 50kg N/ha. Formative stage. Internode elongation: 2-3cm/week."
        },
        {
          week: 8,
          tip: "Second dose: 100kg N/ha. Control borers (Trichogramma @1 lakh/ha). Sucrose accumulation starts."
        },
        {
          week: 12,
          tip: "Third dose: 100kg N/ha. Lodging control: Ethrel 500ppm. CCS: 10-12%. Fiber: 12-14%."
        },
        {
          week: 24,
          tip: "Harvest @12-14 months. Yield: 100-120t/ha. Brix: 18-20°. Cutting height: 5cm above ground."
        },
        {
          week: 40,
          tip: "Ratoon management: 2-3 cycles. Mill efficiency: 10-12% recovery. Byproducts: Bagasse (30%), molasses (4-5%)."
        },
        {
          week: 48,
          tip: "Processing: Juice extraction (70-75%), clarification pH 7.0-7.2. Crystallization: 60-65° Brix syrup."
        }
      ]
    
  };

  const handleCropSelect = (cropName) => {
    setSelectedCrop(cropName);
  };

  const handleBackClick = () => {
    setSelectedCrop(null);
  };

  return (
    <div className="cultivation-container">
      <h1 className="main-title">Crop Cultivation Tips</h1>
      
      {!selectedCrop ? (
        <div className="crop-selection">
          <h2>Select a Crop</h2>
          <div className="crops-list">
            {cropsData.map((crop) => (
              <div 
                key={crop.name} 
                className="crop-card" 
                onClick={() => handleCropSelect(crop.name)}
              >
                <div className="crop-image-container">
                  <img src={crop.image} alt={crop.name} className="crop-image__1" />
                </div>
                <h3 className="crop-name">{crop.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="cultivation-tips">
          <div className="tips-header">
            <button className="back-button" onClick={handleBackClick}>
              &larr; Back to Crops
            </button>
            <div className="selected-crop-info">
              {cropsData.find(crop => crop.name === selectedCrop) && (
                <>
                  <div className="crop-header">
                    <img 
                      src={cropsData.find(crop => crop.name === selectedCrop).image} 
                      alt={selectedCrop} 
                      className="selected-crop-image" 
                    />
                    <h2>{selectedCrop} Cultivation Guide</h2>
                  </div>
                  <a 
                    href={cropsData.find(crop => crop.name === selectedCrop).wikipediaLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="wiki-link"
                  >
                    Learn more about {selectedCrop} on Wikipedia
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="timeline-container">
            {cultivationTips[selectedCrop] ? (
              <div className="timeline">
                {cultivationTips[selectedCrop].map((tip, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <span className="week-label">Week {tip.week}</span>
                      <p className="tip-text">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-tips">
                <p>No cultivation tips available for {selectedCrop} yet. Check back later for updates!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CultivationTips;