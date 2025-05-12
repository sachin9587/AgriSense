import React, { useState, useEffect } from 'react';
import '../styles/CropDiseaseInfo.css';

// Enhanced crop data with Wikipedia links and additional information
const cropsData = [
  { 
    name: 'Wheat', 
    image: '/images/Wheat.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Wheat',
    description: 'Wheat is a grass widely cultivated for its seed, a cereal grain that is a worldwide staple food. Wheat is the most widely grown crop in the world, with an annual production of around 780 million tonnes.'
  },
  { 
    name: 'Brinjal', 
    image: '/images/brinjal.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Eggplant',
    description: 'Brinjal, also known as eggplant or aubergine, is a plant species in the nightshade family Solanaceae. It bears a fruit of the same name, commonly used as a vegetable in cooking.'
  },
  { 
    name: 'Chilli', 
    image: '/images/chilli.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Chili_pepper',
    description: 'Chilli peppers are varieties of the berry-fruit from plants of the genus Capsicum, members of the nightshade family Solanaceae, cultivated for their pungency.'
  },
  { 
    name: 'Carrot', 
    image: '/images/carrot.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Carrot',
    description: 'The carrot is a root vegetable, typically orange in color, though purple, black, red, white, and yellow cultivars exist. It has a crisp texture when fresh.'
  },
  { 
    name: 'Cucumber', 
    image: '/images/cucumber.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Cucumber',
    description: 'Cucumber is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears cylindrical fruits that are used as vegetables.'
  },
  { 
    name: 'Rice', 
    image: '/images/rice.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Rice',
    description: 'Rice is the seed of the grass species Oryza sativa or less commonly Oryza glaberrima. As a cereal grain, it is the most widely consumed staple food for a large part of the world\'s human population.'
  },
  { 
    name: 'Beans', 
    image: '/images/beans.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Bean',
    description: 'Beans are the seeds of several genera of the flowering plant family Fabaceae. They are a significant source of protein, fiber, and other essential nutrients.'
  },
  { 
    name: 'Bitter Gourd', 
    image: '/images/bitter_gourd.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Momordica_charantia',
    description: 'Bitter gourd, also known as bitter melon, is a tropical and subtropical vine of the family Cucurbitaceae, widely grown for its edible fruit which is among the most bitter of all fruits.'
  },
  { 
    name: 'Cabbage', 
    image: '/images/cabbage.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Cabbage',
    description: 'Cabbage is a leafy green, red, or white biennial plant grown as an annual vegetable crop for its dense-leaved heads.'
  },
  { 
    name: 'Cauliflower', 
    image: '/images/cauliflower.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Cauliflower',
    description: 'Cauliflower is one of several vegetables in the species Brassica oleracea, in the family Brassicaceae. It is an annual plant that reproduces by seed.'
  },
  { 
    name: 'Cotton', 
    image: '/images/cotton.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Cotton',
    description: 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants. It is a cash crop valued for its fiber used in textiles.'
  },
  { 
    name: 'Ginger', 
    image: '/images/ginger.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Ginger',
    description: 'Ginger is a flowering plant whose rhizome, ginger root or ginger, is widely used as a spice and folk medicine.'
  },
  { 
    name: 'Maize', 
    image: '/images/maize.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Maize',
    description: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. It is a staple food worldwide.'
  },
  { 
    name: 'Melon', 
    image: '/images/melon.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Melon',
    description: 'Melons are various species of the family Cucurbitaceae with sweet, fleshy fruit. Many different cultivars have been produced, particularly of cantaloupes.'
  },
  { 
    name: 'Millet', 
    image: '/images/millet.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Millet',
    description: 'Millets are a group of highly variable small-seeded grasses, widely grown around the world as cereal crops or grains for fodder and human food.'
  },
  { 
    name: 'Onion', 
    image: '/images/onion.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Onion',
    description: 'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium.'
  },
  { 
    name: 'Pea', 
    image: '/images/pea.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Pea',
    description: 'The pea is most commonly the small spherical seed or the seed-pod of the pod fruit Pisum sativum. Each pod contains several peas, which can be green or yellow.'
  },
  { 
    name: 'Peanut', 
    image: '/images/peanut.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Peanut',
    description: 'The peanut, also known as the groundnut or goober, is a legume crop grown mainly for its edible seeds. It is widely grown in the tropics and subtropics.'
  },
  { 
    name: 'Potato', 
    image: '/images/potato.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Potato',
    description: 'The potato is a root vegetable native to the Americas, a starchy tuber of the plant Solanum tuberosum, and the plant itself is a perennial in the nightshade family.'
  },
  { 
    name: 'Tomato', 
    image: '/images/tomato.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Tomato',
    description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America and Central America.'
  },
  { 
    name: 'Pumpkin', 
    image: '/images/pumkin.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Pumpkin',
    description: 'A pumpkin is a cultivar of winter squash that is round with smooth, slightly ribbed skin, and is most often deep yellow to orange in coloration.'
  },
  { 
    name: 'Soybean', 
    image: '/images/soybean.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Soybean',
    description: 'The soybean, or soya bean, is a species of legume native to East Asia, widely grown for its edible bean, which has numerous uses.'
  },
  { 
    name: 'Sugarcane', 
    image: '/images/sugarcane.png',
    wikiLink: 'https://en.wikipedia.org/wiki/Sugarcane',
    description: 'Sugarcane is a perennial grass of the genus Saccharum, native to the warm temperate to tropical regions of Asia, Oceania, and South America.'
  }
];

// Enhanced disease data with more detailed information and real image links
const diseaseData = {
  'Wheat': [
    {
      name: 'Leaf Rust',
      symptoms: 'Orange-brown, powdery pustules on leaves that can be rubbed off. Severe infections cause leaf yellowing and premature leaf death. The pustules are typically scattered across the leaf surface and are approximately 1-2mm in diameter. In advanced stages, leaves may become completely brown and dry.',
      pests: 'Fungus (Puccinia triticina)',
      treatment: 'Use resistant varieties like "Thatcher" or "McNair". Apply fungicides like propiconazole (Tilt) at 0.1-0.2 kg/ha or tebuconazole (Folicur) at 0.15-0.25 kg/ha at early infection stages. Practice crop rotation with non-cereal crops. Maintain field sanitation by removing crop debris after harvest. Early sowing can help plants develop before disease pressure peaks.',
      prevention: 'Plant certified disease-free seeds. Maintain proper plant spacing to improve air circulation. Monitor fields regularly for early detection. Avoid excessive nitrogen fertilization which can make plants more susceptible.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/wheat-leaf-rust.jpg', 
        'https://www.apsnet.org/edcenter/disandpath/fungalbasidio/pdlessons/Article%20Images/cerealRustFig12.jpg'
      ]
    },
    {
      name: 'Powdery Mildew',
      symptoms: 'White powdery patches on leaves, stems and heads. These patches eventually turn grayish-brown. Leads to reduced photosynthesis and yield loss of 5-20%. Affected leaves may turn yellow and die prematurely. In severe cases, stunting of plants may occur.',
      pests: 'Fungus (Blumeria graminis)',
      treatment: 'Apply sulfur-based fungicides at 2-3 kg/ha or tebuconazole at 0.15-0.25 kg/ha when first symptoms appear. Ensure proper spacing for air circulation of at least 15-20 cm between plants. Plant resistant varieties like "Gene" or "Chancellor".',
      prevention: 'Avoid planting wheat after wheat in rotation. Maintain balanced fertilization, as excessive nitrogen can promote disease. Practice field sanitation by removing volunteer wheat plants. Avoid overhead irrigation which creates favorable conditions for disease development.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/powdery-mildew-wheat.jpg',
        'https://bugwoodcloud.org/images/1536x1024/5390245.jpg'
      ]
    },
    {
      name: 'Septoria Leaf Blotch',
      symptoms: 'Oval to irregular-shaped lesions with light brown or tan centers and darker margins. Black pycnidia (tiny fungal fruiting bodies) visible in the center of mature lesions. Starts on lower leaves and progresses upward. Severe infections can cause up to 40% yield loss.',
      pests: 'Fungus (Zymoseptoria tritici)',
      treatment: 'Apply strobilurin fungicides like azoxystrobin at 0.1-0.125 kg/ha or triazole fungicides like prothioconazole at 0.15-0.2 kg/ha. Time applications to protect the flag leaf. Remove infected plant debris after harvest. Use certified clean seed.',
      prevention: 'Choose resistant cultivars when available. Implement crop rotation with non-host crops for at least 1-2 years. Practice deep plowing to bury crop residues. Avoid early planting which increases disease risk.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/crop_featured/public/septoria-leaf-spot-wheat_0.jpg',
        'https://www.cropscience.bayer.us/-/media/Bayer-CropScience/Country-United-States-Internet/Images/Learning-Center/Articles/Diseases/Wheat-Disease-ID/Septoria-Leaf-Blotch-Closeup.jpg'
      ]
    }
  ],
  'Rice': [
    {
      name: 'Rice Blast',
      symptoms: 'Diamond-shaped lesions on leaves with gray centers and brown margins. Lesions can enlarge and combine, killing entire leaves. Can affect stems and panicles causing "neck blast" which prevents grain filling. Yield losses can reach 70-80% in severe epidemics.',
      pests: 'Fungus (Magnaporthe oryzae)',
      treatment: 'Plant resistant varieties like "IR64" or "IR72". Apply fungicides like tricyclazole at 0.3-0.4 kg/ha or azoxystrobin at 0.1-0.2 kg/ha at tillering, panicle initiation and heading stages. Maintain proper field water management with continuous shallow flooding of 5-10 cm to reduce disease incidence.',
      prevention: 'Avoid excessive nitrogen fertilization. Use balanced NPK fertilizers. Maintain good field drainage during fallow periods. Use disease-free seeds and treat seeds with fungicides before planting. Adjust planting dates to avoid periods favorable for disease development.',
      images: [
        'https://www.apsnet.org/edcenter/disandpath/fungalascomycetes/pdlessons/Article%20Images/RiceBlastFig1a.jpg',
        'https://bugwoodcloud.org/images/768x512/0725017.jpg'
      ]
    },
    {
      name: 'Bacterial Leaf Blight',
      symptoms: 'Water-soaked lesions that turn yellow-orange and eventually dry out. Affects leaf edges and tips, creating a "V" shape of yellowish-white dead tissue. In severe cases, entire leaves may wilt and die. Can reduce yields by 20-50%.',
      pests: 'Bacteria (Xanthomonas oryzae pv. oryzae)',
      treatment: 'Use resistant varieties like "IR8" or "IR20". Treat seeds with hot water (52°C for 30 minutes) or antibacterial agents like streptocycline at 40-100 ppm. Apply copper-based bactericides like copper oxychloride at 2.5 kg/ha. Adjust nitrogen fertilizer levels to avoid excessive vegetative growth.',
      prevention: 'Practice crop rotation with non-host crops. Remove weed hosts and rice stubble after harvest. Avoid overhead irrigation which can spread bacteria. Ensure good drainage to reduce humidity. Maintain proper spacing between plants for better air circulation.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlBlightRice5815943-lg.jpg',
        'https://bugwoodcloud.org/images/768x512/5390680.jpg'
      ]
    },
    {
      name: 'Brown Spot',
      symptoms: 'Brown, oval lesions with gray centers and yellow halos on leaves. Similar spots may appear on glumes and grains. Causes leaf senescence and reduces grain quality and weight. Known as the "poor farmer\'s disease" as it is often associated with nutrient-deficient soils.',
      pests: 'Fungus (Cochliobolus miyabeanus)',
      treatment: 'Apply fungicides like carbendazim at 0.5 kg/ha or mancozeb at 2.0 kg/ha. Correct soil nutrients, especially potassium deficiencies. Treat seeds with fungicides like thiram at 2g/kg seed. Adjust planting density to avoid overcrowding.',
      prevention: 'Maintain balanced soil fertility, particularly with potassium. Use clean, certified seed. Practice crop rotation with legumes to improve soil fertility. Destroy rice stubble after harvest to reduce inoculum levels.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlBrownSpotRice5815942-lg.jpg',
        'https://www.lsuagcenter.com/~/media/system/7/1/9/9/719941930194738ce3c9f86d497648de/brownspotfig1jpg.jpg'
      ]
    }
  ],
  'Tomato': [
    {
      name: 'Early Blight',
      symptoms: 'Dark brown to black spots with concentric rings (target-like appearance) on lower leaves that gradually move upward. Affected leaves turn yellow, then brown, and fall off. Causes defoliation and fruit exposure to sunscald. Stem lesions may also occur, appearing as dark, sunken areas.',
      pests: 'Fungus (Alternaria solani)',
      treatment: 'Rotate crops with non-solanaceous plants for 3-4 years. Apply mulch to reduce soil splash. Apply fungicides like chlorothalonil at 1.5-2.0 kg/ha or copper-based products at recommended rates. Remove and destroy infected plant debris. Stake plants to improve air circulation.',
      prevention: 'Use disease-free transplants and certified seeds. Space plants adequately (at least 45-60 cm apart). Water at the base of plants to keep foliage dry. Maintain proper nutrition, as stressed plants are more susceptible. Avoid working with plants when they are wet.',
      images: [
        'https://www.canr.msu.edu/uploads/resources/pdfs/early_blight_(e3173).pdf',
        'https://extension.umn.edu/sites/extension.umn.edu/files/early-blight-tomato.jpg'
      ]
    },
    {
      name: 'Tomato Leaf Miner',
      symptoms: 'Serpentine tunnels (mines) in leaves caused by larvae feeding between leaf surfaces. Tiny larvae visible inside leaves when held up to light. Dried up patches on foliage. In severe infestations, entire leaves may dry and drop. Can cause 80-100% yield loss if not managed.',
      pests: 'Insect (Tuta absoluta)',
      treatment: 'Use pheromone traps at 25-30 traps/ha to monitor and mass trap males. Apply neem oil at 2-3% concentration or spinosad at 0.5-1.0 ml/L of water. Remove and destroy affected leaves to reduce pest population. Use biological control agents like Trichogramma wasps.',
      prevention: 'Practice crop rotation with non-solanaceous crops. Use insect-proof screens in greenhouses. Implement proper field sanitation by removing crop debris after harvest. Avoid planting new tomato crops near infested fields.',
      images: [
        'https://www.invasive-species.org/wp-content/uploads/sites/2/2019/02/Tuta-absoluta-tomato-leaf-damage-Vladimir-Zlobin.jpg',
        'https://www.infonet-biovision.org/sites/default/files/styles/600x400/public/plant_health/cropsfruitsvegetables/3296_0.jpeg'
      ]
    },
    {
      name: 'Late Blight',
      symptoms: 'Water-soaked, pale green to brown spots on leaves that rapidly enlarge in cool, wet weather. White fuzzy growth on leaf undersides in humid conditions. Dark brown lesions on stems and petioles. Fruit develops large, firm, brown, greasy-looking lesions.',
      pests: 'Oomycete (Phytophthora infestans)',
      treatment: 'Apply preventative fungicides like mancozeb at 2.0-2.5 kg/ha or curative fungicides like metalaxyl + mancozeb at 2.0 kg/ha. Remove and destroy infected plant material. Adjust irrigation to minimize leaf wetness duration. Improve air circulation by proper spacing and staking.',
      prevention: 'Plant resistant varieties when available. Avoid overhead irrigation. Keep garden free of solanaceous weeds. Plant in well-drained soil. Use pathogen-free transplants. In high-risk areas, plant early maturing varieties to harvest before disease pressure peaks.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/late-blight-tomato.jpg',
        'https://www.canr.msu.edu/news/images/late_blight_on_tomato_fruit_clemson_-_usda_cooperative_extension_bugwood_org.jpeg'
      ]
    }
  ],
  'Potato': [
    {
      name: 'Late Blight',
      symptoms: 'Dark green to brown water-soaked patches on leaves that turn necrotic. White fungal growth on leaf undersides in humid conditions. Tuber rot with reddish-brown discoloration in flesh. In favorable conditions, entire fields can be destroyed within days. The disease was responsible for the Irish Potato Famine in the 1840s.',
      pests: 'Oomycete (Phytophthora infestans)',
      treatment: 'Apply protective fungicides like mancozeb at 2.0-2.5 kg/ha or chlorothalonil at 1.2-1.8 kg/ha every 7-10 days during favorable weather. For established infections, use systemic fungicides like metalaxyl + mancozeb at 2.0 kg/ha. Plant resistant varieties like "Sarpo Mira" or "Defender". Maintain good drainage to reduce humidity. Destroy volunteer plants and cull piles.',
      prevention: 'Use certified disease-free seed tubers. Practice crop rotation with non-host crops for at least 3 years. Plant in well-drained soil. Destroy all volunteer potato plants. Increase plant spacing to improve air circulation. Hill soil around plants to protect tubers.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/late-blight-potato.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Phytophthora_infestans_%28Late_Blight_of_Potato%29_on_Potato_Leaf.jpg/1200px-Phytophthora_infestans_%28Late_Blight_of_Potato%29_on_Potato_Leaf.jpg'
      ]
    },
    {
      name: 'Colorado Potato Beetle',
      symptoms: 'Defoliated plants with only stems and major veins remaining. Orange-yellow eggs in clusters of 10-30 on leaf undersides. Distinctive yellow-orange larvae with black spots and red-orange adults with black stripes. A single beetle can consume about 40 cm² of leaf area per day.',
      pests: 'Insect (Leptinotarsa decemlineata)',
      treatment: 'Handpick beetles, larvae, and eggs in small plantings. Apply insecticides like spinosad at 0.04-0.08 kg/ha or Bacillus thuringiensis var. tenebrionis at recommended rates. Use row covers until flowering. Release natural predators like ladybugs or lacewings. Rotate insecticides to prevent resistance development.',
      prevention: 'Practice crop rotation with non-host crops for at least 2 years. Plant early maturing varieties to harvest before beetle populations peak. Use trap crops like eggplant to divert beetles from main crop. Destroy crop residues immediately after harvest. Plant resistant varieties when available.',
      images: [
        'https://www.canr.msu.edu/uploads/resources/pdfs/colorado_potato_beetle_(e3208).pdf',
        'https://www.cropscience.bayer.us/-/media/Bayer-CropScience/Country-United-States-Internet/Images/Learning-Center/Articles/Pests/Colorado-Potato-Beetle/Colorado-Potato-Beetle-Adult.ashx'
      ]
    },
    {
      name: 'Potato Scab',
      symptoms: 'Corky, rough lesions on tuber surfaces ranging from superficial to deep pitted lesions. Scab does not affect storage quality but reduces marketability and yield. Lesions may be raised, flat, or sunken depending on the type of scab and variety susceptibility.',
      pests: 'Bacteria (Streptomyces scabies)',
      treatment: 'Maintain soil pH between 5.0 and 5.2 where possible, as the pathogen is less active in acidic soils. Apply sulfur to lower soil pH. Ensure consistent soil moisture during tuber initiation and development. Plant resistant varieties like "Russet Burbank" or "Kennebec".',
      prevention: 'Use certified disease-free seed tubers. Practice crop rotation with non-host crops for 3-4 years. Avoid applying fresh manure before planting. Avoid fields with a history of scab. Maintain adequate soil moisture (irrigation) during tuber formation.',
      images: [
        'https://www.canr.msu.edu/uploads/resources/pdfs/potato_scab_(e3182).pdf',
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/common-scab-potato.jpg'
      ]
    }
  ],
  'Maize': [
    {
      name: 'Northern Corn Leaf Blight',
      symptoms: 'Long, elliptical gray-green to brown lesions on leaves, 1-6 inches in length. Lesions run parallel to leaf margins. Under humid conditions, dark olive-green to black fungal spores form, giving lesions a dusty appearance. Severe infections cause extensive leaf damage that resembles frost or drought injury.',
      pests: 'Fungus (Exserohilum turcicum)',
      treatment: 'Plant resistant hybrids with Ht resistance genes. Apply foliar fungicides like azoxystrobin at 0.08-0.12 kg/ha or propiconazole at 0.1-0.2 kg/ha at early tasseling stage. Rotate crops with non-host plants like soybeans or alfalfa for at least 1-2 years. Remove and destroy crop debris after harvest.',
      prevention: 'Use balanced fertilization to avoid plant stress. Improve field drainage. Plant tolerant varieties in high-risk areas. Control volunteer corn and grassy weeds that may harbor the pathogen. Consider tillage to bury crop residue in fields with severe previous infections.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/northern-corn-leaf-blight.jpg',
        'https://cropprotectionnetwork.org/uploads/images/public/NorthernCornLeafBlight_Lesions.jpg'
      ]
    },
    {
      name: 'Fall Armyworm',
      symptoms: 'Ragged leaf feeding with "window paning" where only the transparent leaf membrane remains. Large amounts of frass (excrement) in plant whorl resembling sawdust. Damaged ears with irregular feeding patterns. Young plants may be cut at ground level. The caterpillar has distinctive inverted "Y" on its head capsule.',
      pests: 'Insect (Spodoptera frugiperda)',
      treatment: 'Apply insecticides like emamectin benzoate at 0.01-0.02 kg/ha or spinosad at 0.05-0.1 kg/ha when larvae are small (less than 1.25 cm). Release predatory insects like Trichogramma wasps. Plant early to avoid peak infestation periods. Use Bt corn varieties expressing Cry proteins effective against armyworms.',
      prevention: 'Monitor fields with pheromone traps to detect early infestations. Maintain field sanitation by removing crop residues. Encourage natural enemies through habitat conservation. Practice deep plowing to destroy pupae in soil. Use border trap crops to divert pests from main fields.',
      images: [
        'https://extension.entm.purdue.edu/publications/pictures/E-series/images/e-218_7.jpg',
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/fall-armyworm-on-corn.jpg'
      ]
    },
    {
      name: 'Corn Smut',
      symptoms: 'Silver-white galls on ears, tassels, and stalks that later rupture and release black spores. Galls on ears replace kernels and can grow to 10-15 cm in diameter. Infected plants may be stunted. In Mexico, immature galls (huitlacoche) are considered a delicacy.',
      pests: 'Fungus (Ustilago maydis)',
      treatment: 'There are no effective fungicides for control once infection occurs. Remove and destroy galls before they rupture to reduce spore release. Practice crop rotation with non-host crops for 2-3 years. Use balanced fertilization to avoid excessive nitrogen which can increase susceptibility.',
      prevention: 'Plant resistant hybrids when available. Avoid mechanical injury to plants during cultivation. Maintain good field drainage. Avoid planting in fields with history of severe smut. Control volunteer corn which may harbor the disease.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/common-smut-corn.jpg',
        'https://www.canr.msu.edu/uploads/images/Plant%20Ag/Smut1_3.jpg'
      ]
    }
  ],
  'Cotton': [
    {
      name: 'Cotton Bollworm',
      symptoms: 'Circular holes in squares (flower buds) and bolls. Damaged seeds and lint inside bolls. Premature boll opening and shedding. Flower damage visible as holes in petals. Young larvae feed on terminal growth and leaves before attacking reproductive structures.',
      pests: 'Insect (Helicoverpa armigera)',
      treatment: 'Apply Bt cotton technology where available. Use pheromone traps at 5-10 traps/ha to monitor populations. Spray insecticides like spinosad at 0.045-0.054 kg/ha or indoxacarb at 0.075-0.1 kg/ha when thresholds are reached (10-15% damaged squares). Release egg parasitoids like Trichogramma spp. at weekly intervals.',
      prevention: 'Practice early termination and destruction of stalks after harvest. Implement area-wide pest management approaches. Maintain beneficial insect populations by selective insecticide use. Use trap crops like okra or sunflower around cotton fields. Avoid excessive nitrogen fertilization which attracts bollworms.',
      images: [
        'https://extension.okstate.edu/fact-sheets/images/bollworm-feeding-in-cotton/large.jpg',
        'https://extension.entm.purdue.edu/publications/pictures/E-series/images/e-218_9.jpg'
      ]
    },
    {
      name: 'Cotton Leaf Curl Virus',
      symptoms: 'Upward or downward curling of leaves with thickened veins. Leaf enations (cup-shaped outgrowths) on undersides of leaves. Stunted growth and reduced boll formation. Plants infected at early stages may remain stunted with few or no bolls.',
      pests: 'Virus (Cotton Leaf Curl Virus) transmitted by whiteflies (Bemisia tabaci)',
      treatment: 'Plant resistant varieties like "LRA-5166" or "RS-2013". Control whitefly vectors with insecticides like diafenthiuron at 0.5-0.6 kg/ha or flonicamid at 0.15 kg/ha. Maintain field hygiene by removing weed hosts and infected plants. Apply yellow sticky traps at 40-50 traps/ha to monitor and trap whiteflies.',
      prevention: 'Establish cotton-free periods in endemic areas. Time planting to avoid peak whitefly populations. Use certified virus-free seeds. Maintain optimal plant density. Control alternative host plants around fields. Apply reflective mulches to repel whiteflies.',
      images: [
        'https://www.intechopen.com/media/chapter/52209/media/F1.png',
        'https://www.researchgate.net/profile/Ashfaq-Siddiqui/publication/339209545/figure/fig1/AS:857673472978944@1581529249005/Cotton-plant-showing-symptoms-of-cotton-leaf-curl-virus-disease-including-upward-curling.jpg'
      ]
    },
    {
      name: 'Bacterial Blight',
      symptoms: 'Angular, water-soaked lesions on leaves that turn brown with age. Dark brown to black lesions on bolls. Premature defoliation in severe cases. Systemic infection causes black arm symptoms on stems and branches.',
      pests: 'Bacteria (Xanthomonas citri pv. malvacearum)',
      treatment: 'Use resistant varieties with B genes. Apply copper-based bactericides like copper oxychloride at 2.5-3.0 kg/ha or copper hydroxide at 1.5-2.0 kg/ha. Avoid intercultural operations when foliage is wet. Remove and destroy infected plant material.',
      prevention: 'Use acid-delinted, disease-free seeds. Treat seeds with antibacterial agents. Practice crop rotation for 2-3 years with non-host crops. Deep plow to bury infected crop residues. Avoid excessive irrigation which creates favorable conditions for disease spread.',
      images: [
        'https://lubbock.tamu.edu/files/2011/11/Fig.4BBlight.jpg',
        'https://extension.okstate.edu/fact-sheets/images/cotton-leaf-with-bacterial-blight-symptoms/large.jpg'
      ]
    }
  ],
  'Brinjal': [
    {
      name: 'Brinjal Fruit and Shoot Borer',
      symptoms: 'Wilting of shoots due to internal boring by larvae. Tunneling in stems and fruits with visible entry holes. Fruit with holes and frass (excrement). Dropping of infested fruits. Stunted plant growth due to repeated shoot damage.',
      pests: 'Insect (Leucinodes orbonalis)',
      treatment: 'Use pheromone traps at 40-50 traps/ha to monitor and mass trap males. Collect and destroy affected shoots and fruits regularly. Apply neem-based insecticides at 3-5 ml/L or spinosad at 0.3-0.4 ml/L at 10-15 day intervals. Release parasitoids like Trichogramma chilonis at weekly intervals.',
      prevention: 'Practice crop rotation with non-solanaceous crops. Use resistant varieties when available. Install nylon net barriers around fields. Avoid ratoon cropping. Use healthy, pest-free seedlings. Maintain field sanitation by removing crop debris after harvest.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlEggplantFruitAndShootBorer300dpiCOI-lg.jpg',
        'https://www.infonet-biovision.org/sites/default/files/styles/600x400/public/plant_health/cropsfruitsvegetables/6344_0.jpeg'
      ]
    },
    {
      name: 'Phomopsis Blight',
      symptoms: 'Circular sunken spots on fruits that enlarge and develop concentric rings. Leaf spots with brown centers and yellow halos. Stem lesions that can cause wilting and death of branches. Infected seeds show reduced germination.',
      pests: 'Fungus (Phomopsis vexans)',
      treatment: 'Rotate crops with non-solanaceous plants for 2-3 years. Apply fungicides like mancozeb at 2.0-2.5 kg/ha or copper oxychloride at 2.5-3.0 kg/ha at 10-15 day intervals. Maintain field sanitation by removing infected plant parts. Use balanced fertilization with adequate potassium.',
      prevention: 'Use disease-free seeds and seedlings. Treat seeds with Trichoderma viride powder at 4 g/kg seed. Provide adequate spacing for good air circulation. Practice mulching to prevent soil splash. Avoid overhead irrigation. Collect and destroy crop debris after harvest.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlPhomopsisBlight300dpiCOI-lg.jpg',
        'https://www.researchgate.net/publication/347991975/figure/fig1/AS:974761882226704@1609062338228/Symptoms-of-Phomopsis-fruit-rot-of-eggplant-blight-in-eggplant-brown-sunken-lesions.jpg'
      ]
    },
    {
      name: 'Little Leaf Disease',
      symptoms: 'Leaves become small, narrow, and clustered giving a bushy appearance. Severe reduction in internodal length. Flowers turn green and do not develop normally. Fruits, if formed, remain small and hard. Overall stunting of plant growth.',
      pests: 'Mycoplasma-like organism transmitted by leafhoppers',
      treatment: 'Apply tetracycline antibiotics at 100-150 ppm at 10-15 day intervals through foliar spray. Control leafhopper vectors with insecticides like imidacloprid at 0.3-0.4 ml/L or thiamethoxam at 0.2-0.25 g/L. Remove and destroy infected plants to prevent spread.',
      prevention: 'Use disease-free seedlings. Control weed hosts around fields. Use yellow sticky traps to monitor and trap leafhoppers. Time planting to avoid peak leafhopper activity. Apply silver or aluminum reflective mulches to repel leafhoppers.',
      images: [
        'https://www.researchgate.net/publication/325820046/figure/fig1/AS:639683865440256@1529893089872/Little-leaf-of-brinjal-a-Affected-plants-showing-small-narrow-leaves-giving-a.png',
        'https://www.researchgate.net/publication/328243664/figure/fig1/AS:678212131282945@1538730506283/Symptoms-of-little-leaf-of-brinjal.png'
      ]
    }
  ],
  'Chilli': [
    {
      name: 'Anthracnose',
      symptoms: 'Sunken circular lesions on fruits with concentric rings. Dark center with orange to pink spore masses. Small black dots (acervuli) may appear in older lesions. Fruits may shrivel and drop. Post-harvest rot is common in infected fruits.',
      pests: 'Fungus (Colletotrichum species, primarily C. capsici)',
      treatment: 'Apply fungicides like carbendazim at 0.1% or mancozeb at 0.25% at flowering and fruiting stages. Practice crop rotation with non-solanaceous crops for 2-3 years. Use disease-free seeds. Remove and destroy infected plant parts. Maintain proper spacing for adequate air circulation.',
      prevention: 'Hot water treatment of seeds at 52°C for 30 minutes. Use resistant varieties when available. Apply balanced fertilization with adequate calcium. Avoid overhead irrigation. Harvest fruits at proper maturity. Handle fruits carefully to avoid injuries during harvest and transport.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlAnthracnoseChilli-lg.jpg',
        'https://www.agrifarming.in/wp-content/uploads/2015/06/Chilli-Anthracnose-Disease-1.jpg'
      ]
    },
    {
      name: 'Thrips',
      symptoms: 'Curled, distorted leaves with silvery patches on leaf surfaces. Scarring on fruits causing downgrading. Stunted growth and reduced yield. Black fecal spots on leaf undersides. Vector for several viral diseases including Tospoviruses.',
      pests: 'Insect (Scirtothrips dorsalis and other species)',
      treatment: 'Apply insecticides like imidacloprid at 0.3-0.4 ml/L or spinosad at 0.3 ml/L. Use reflective mulches like silver or aluminum to repel thrips. Release predatory mites like Amblyseius swirskii. Remove and destroy heavily infested plants. Apply neem oil at 2-3% concentration at 10-day intervals.',
      prevention: 'Use blue sticky traps to monitor and trap thrips. Avoid planting near thrips-susceptible crops. Maintain adequate soil moisture to reduce plant stress. Remove weeds that serve as alternate hosts. Apply floating row covers in small plantings. Use UV-reflective mulches to repel thrips.',
      images: [
        'https://www.agrifarming.in/wp-content/uploads/2015/06/Chilli-Thrips-Pest.png',
        'https://plantix.net/en/library/assets/custom/crop-images/thrips-damage-on-chilli.jpeg'
      ]
    },
    {
      name: 'Powdery Mildew',
      symptoms: 'White powdery growth on upper and lower leaf surfaces. Leaves may turn yellow and fall prematurely. Reduced photosynthesis and plant vigor. In severe cases, white powdery growth may appear on stems and even fruits.',
      pests: 'Fungus (Leveillula taurica)',
      treatment: 'Apply sulfur-based fungicides at 2.0-3.0 kg/ha or wettable sulfur at 0.2-0.3%. Use systemic fungicides like tebuconazole at 0.1% or myclobutanil at 0.05% for established infections. Maintain proper spacing for good air circulation. Remove severely infected leaves.',
      prevention: 'Use resistant varieties when available. Avoid excessive nitrogen fertilization. Apply potassium silicate foliar sprays to strengthen plant resistance. Maintain optimal plant spacing. Avoid overhead irrigation which increases humidity.',
      images: [
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlPowderyMildewChilli20064-lg.jpg',
        'https://www.agrifarming.in/wp-content/uploads/2015/06/Chilli-Powdery-Mildew.jpg'
      ]
    }
  ],
  'Onion': [
    {
      name: 'Purple Blotch',
      symptoms: 'Purple lesions with concentric rings on leaves. Lesions turning brown with age and can girdle the entire leaf. Dieback of leaf tips. Infected bulbs show water-soaked decay in storage. Yield losses can reach 50-90% in severe epidemics.',
      pests: 'Fungus (Alternaria porri)',
      treatment: 'Apply fungicides like mancozeb at 2.0-2.5 kg/ha or azoxystrobin at 0.1-0.15 kg/ha at 10-14 day intervals. Ensure proper spacing of 10-15 cm between plants for good air circulation. Avoid overhead irrigation which promotes disease spread. Remove and destroy infected plant debris.',
      prevention: 'Use disease-free seeds and transplants. Practice crop rotation with non-allium crops for 3-4 years. Maintain balanced fertilization with adequate potassium. Apply mild irrigation during early morning hours to allow foliage to dry quickly. Control onion thrips which create entry points for the fungus.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/purple-blotch-onion.jpg',
        'https://www.researchgate.net/publication/325341453/figure/fig1/AS:651546075160577@1532355154448/Symptoms-of-purple-blotch-of-onion.png'
      ]
    },
    {
      name: 'Onion Thrips',
      symptoms: 'Silvery patches and small white flecks on leaves due to rasping of leaf surface. Distorted growth with leaves becoming curled and twisted. Reduced bulb size. Vector for several viral diseases including Iris Yellow Spot Virus.',
      pests: 'Insect (Thrips tabaci)',
      treatment: 'Apply insecticides like lambda-cyhalothrin at 0.5 ml/L or spinosad at 0.3-0.4 ml/L when thrips populations exceed threshold (10-15 thrips per plant). Use blue sticky traps to monitor and mass trap adults. Maintain field cleanliness by removing crop debris and controlling weeds. Apply neem oil at 2-3% concentration at 10-day intervals.',
      prevention: 'Use aluminum reflective mulches to repel thrips. Plant tolerant varieties with more open growth habit. Use drip irrigation instead of overhead irrigation. Maintain optimal plant nutrition to help plants tolerate damage. Avoid planting downwind from established onion fields.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/onion-thrips.jpg',
        'https://bugwoodcloud.org/images/768x512/5361081.jpg'
      ]
    },
    {
      name: 'Downy Mildew',
      symptoms: 'Pale, elongated patches on leaves that later turn brown. Grayish-violet fuzzy growth on infected areas in humid conditions. Leaves may collapse from the tip. Bulbs may be undersized. Systemic infection can cause plants to produce seed stalks prematurely.',
      pests: 'Oomycete (Peronospora destructor)',
      treatment: 'Apply fungicides like mancozeb at 2.0-2.5 kg/ha or metalaxyl + mancozeb at 2.0 kg/ha preventatively and when conditions favor disease. Improve drainage in fields. Reduce leaf wetness duration by timing irrigation appropriately. Remove and destroy infected plants and crop debris.',
      prevention: 'Use disease-free seeds and transplants. Practice crop rotation with non-allium crops for at least 3 years. Space plants adequately for good air circulation. Plant in areas with good air movement. Time planting to avoid cool, moist conditions favorable for disease development.',
      images: [
        'https://extension.umn.edu/plant-diseases/downy-mildew-vegetables#onion-downy-mildew-1942304',
        'https://www.researchgate.net/profile/Howard-Schwartz-2/publication/281440381/figure/fig1/AS:669404586364928@1536610568797/Early-symptoms-of-onion-downy-mildew-caused-by-Peronospora-destructor-and-characterized.png'
      ]
    }
  ],
  'Cabbage': [
    {
      name: 'Black Rot',
      symptoms: 'V-shaped yellow lesions starting at leaf margins and progressing inward. Blackened veins within the yellow areas. Wilting leaves that may drop prematurely. Stunted plant growth. Internal discoloration of stems. Losses can reach 100% in severe epidemics.',
      pests: 'Bacteria (Xanthomonas campestris pv. campestris)',
      treatment: 'Use disease-free seeds and seedlings. Practice crop rotation with non-cruciferous crops for at least 2 years. Apply copper-based bactericides like copper hydroxide at 1.5-2.0 kg/ha or copper oxychloride at 2.5-3.0 kg/ha. Remove infected plants to prevent spread. Control cruciferous weeds that can harbor the pathogen.',
      prevention: 'Hot water treatment of seeds at 50°C for 30 minutes. Use resistant varieties like "Stonehead" or "Blue Vantage". Avoid overhead irrigation which spreads bacteria. Space plants adequately for good air circulation. Avoid working in fields when foliage is wet.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/black-rot-cabbage.jpg',
        'https://www.plantwise.org/KnowledgeBank/ContentImages/800px-xlBlackrotCabbage-lg.jpg'
      ]
    },
    {
      name: 'Diamondback Moth',
      symptoms: 'Small holes in leaves creating a "window pane" effect initially, later developing into irregular patches. Presence of small green caterpillars (up to 12 mm long) that wriggle rapidly when disturbed. Reduced marketability due to feeding damage and contamination with frass and larvae.',
      pests: 'Insect (Plutella xylostella)',
      treatment: 'Apply Bacillus thuringiensis var. kurstaki at 0.5-1.0 kg/ha, particularly effective against young larvae. Use pheromone traps at 10-15 traps/ha to monitor and mass trap males. Rotate insecticides like spinosad at 0.05-0.1 kg/ha or emamectin benzoate at 0.01-0.015 kg/ha to prevent resistance development. Release parasitoids like Diadegma semiclausum where available.',
      prevention: 'Practice crop rotation with non-cruciferous crops. Use row covers to exclude moths. Maintain field sanitation by removing crop debris after harvest. Control cruciferous weeds that serve as alternate hosts. Use trap crops like mustard around main crop.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/diamondback-moth-larva.jpg',
        'https://extension.entm.purdue.edu/publications/pictures/E-series/images/e-218_20.jpg'
      ]
    },
    {
      name: 'Clubroot',
      symptoms: 'Stunted growth and wilting during hot days. Yellowing and purplish discoloration of older leaves. Distinctive swollen, distorted roots that form "clubs". Reduced head formation. Severely affected plants may die before harvest.',
      pests: 'Protist (Plasmodiophora brassicae)',
      treatment: 'No effective chemical control once plants are infected. Apply lime to raise soil pH to 7.2-7.5 which reduces disease severity. Practice raised bed cultivation in infected fields. Use transplants instead of direct seeding. Plant resistant varieties like "Kilaton" or "Tekila" in infected fields.',
      prevention: 'Practice long crop rotations of 5-7 years without cruciferous crops. Use disease-free transplants. Avoid moving soil from infected fields on equipment or footwear. Improve drainage in fields. Control cruciferous weeds that can maintain the pathogen.',
      images: [
        'https://extension.umn.edu/sites/extension.umn.edu/files/styles/width_480/public/clubroot-cabbage.jpg',
        'https://www.canr.msu.edu/uploads/resources/pdfs/clubroot_(e3200).pdf'
      ]
    }
  ],
  'Carrot': [
    {
      name: 'Alternaria Leaf Blight',
      symptoms: 'Dark brown to black lesions on leaf margins that expand to entire leaf. Lesions often surrounded by yellow halos. Yellowing and death of older leaves. In severe cases, entire foliage may collapse, exposing roots to sunscald. Yield losses can reach 40-60%.',
      pests: 'Fungus (Alternaria dauci)',
      treatment: 'Apply fungicides like azoxystrobin at 0.1-0.15 kg/ha or chlorothalonil at 1.5-2.0 kg/ha at 7-10 day intervals when conditions favor disease. Use disease-free seeds. Practice crop rotation with non-umbelliferous crops for at least 2 years. Remove and destroy infected plant debris after harvest.',
      prevention: 'Use hot water treatment of seeds at 50°C for 20 minutes. Plant resistant or tolerant varieties. Avoid overhead irrigation which creates favorable conditions for disease development. Maintain proper plant spacing for good air circulation. Control weeds that can reduce air movement in the crop.',
      images: [
        'https://extension.umn.edu/plant-diseases/alternaria-diseases-vegetables-carrots#early-alternaria-leaf-blight-of-carrots-1942306',
        'https://www.researchgate.net/profile/Robert-Martin-82/publication/248910425/figure/fig1/AS:298464015478785@1448177466811/Carrot-leaf-blight-caused-by-Alternaria-dauci-Note-the-blackening-and-collapse-of.png'
      ]
    },
    {
      name: 'Carrot Rust Fly',
      symptoms: 'Rusty tunnels in roots caused by larval feeding. Stunted growth and wilting of foliage. Reddish-brown discoloration in root flesh. Secondary rot infections may occur in damaged areas. Damaged roots have reduced marketability and storage quality.',
      pests: 'Insect (Psila rosae)',
      treatment: 'Delay planting until after peak fly activity (typically early spring). Use row covers to exclude adult flies. Apply appropriate insecticides like cypermethrin at 0.01-0.015 kg/ha or spinosad at 0.05-0.1 kg/ha before larvae enter roots. Practice deep plowing after harvest to expose and kill pupae.',
      prevention: 'Rotate crops with non-umbelliferous plants. Time harvesting to avoid periods of high adult activity. Use sticky yellow traps to monitor fly populations. Apply floating row covers immediately after seeding. Place physical barriers around carrot beds. Avoid planting near hedgerows or wooded areas where flies may overwinter.',
      images: [
        'https://bugwoodcloud.org/images/768x512/5499039.jpg',
        'https://www.alamy.com/stock-photo-carrot-rust-fly-damage-on-carrot-psila-rosae-148193353.html'
      ]
    },
    {
      name: 'Bacterial Leaf Blight',
      symptoms: 'Water-soaked lesions on leaves that turn brown with yellow margins. Leaflet curling and distortion. Brown to black streaks on petioles. Reduced photosynthesis leading to smaller roots. Crown may become infected in severe cases.',
      pests: 'Bacteria (Xanthomonas campestris pv. carotae)',
      treatment: 'Apply copper-based bactericides like copper hydroxide at 1.5-2.0 kg/ha or copper oxychloride at 2.5-3.0 kg/ha at 7-10 day intervals. Remove infected plants to reduce inoculum. Use balanced fertilization to maintain plant vigor. Avoid working in fields when foliage is wet.',
      prevention: 'Use disease-free seeds. Hot water treatment of seeds at 52°C for 25 minutes. Practice crop rotation with non-host crops for at least 2 years. Improve field drainage. Time irrigation to minimize leaf wetness duration. Control weeds and volunteer carrots that may harbor the pathogen.',
      images: [
        'https://cropwatch.unl.edu/plantdisease/vegetables/carrot-leaf-blight-bacterial',
        'https://www.researchgate.net/profile/Julie-Pasche/publication/279316045/figure/fig1/AS:669388868612110@1536606049203/Typical-symptoms-of-bacterial-blight-of-carrot-caused-by-Xanthomonas-hortorum-pv-carotae.png'
      ]
    }
  ],
  // Add complete data for more crops here...
  
  // Default case for crops without specific disease data
  'default': [
    {
      name: 'Common Disease',
      symptoms: 'Various symptoms including leaf spots, wilting, or discoloration. Each crop may show different specific symptoms based on the pathogen and environmental conditions.',
      pests: 'Various fungi, bacteria, viruses, or insects may affect crops that don\'t have specific disease information listed. Identification is the first step to proper management.',
      treatment: 'Identify specific cause through expert consultation or diagnostic services. Apply appropriate fungicides, bactericides, or insecticides based on the identified causal agent. Follow integrated pest management practices combining cultural, biological, and chemical control measures.',
      prevention: 'Practice crop rotation with unrelated crops. Maintain field sanitation by removing crop debris. Use disease-free seeds and planting materials. Provide balanced nutrition and irrigation. Monitor crops regularly for early detection of problems.',
      images: [
        'https://www.canr.msu.edu/uploads/resources/pdfs/managing_plant_diseases_(e3169).pdf',
        '/api/placeholder/400/300'
      ]
    }
  ]
};

const CropDiseaseInfo = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    setFilteredCrops(
      cropsData.filter(crop => 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCrop) {
      setDiseases(diseaseData[selectedCrop] || diseaseData['default']);
    } else {
      setDiseases([]);
    }
  }, [selectedCrop]);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop.name);
    setSearchQuery(crop.name);
    setIsDropdownOpen(false);
  };

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleSearchBlur = () => {
    // Delayed closing to allow selection
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handleBackButton = () => {
    setSelectedCrop('');
    setSearchQuery('');
  };

  return (
    <div className="crop-disease-container">
      <h1 className="main-title">Crop Disease & Pest Management</h1>
      
      <div className="search-container">
        <div className="search-box">
          {/* Search icon made with HTML/CSS instead of lucide-react */}
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search for a crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="search-input"
          />
        </div>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop, index) => (
                <div 
                  key={index} 
                  className="dropdown-item"
                  onClick={() => handleCropSelect(crop)}
                >
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="dropdown-item-image" 
                  />
                  <span>{crop.name}</span>
                </div>
              ))
            ) : (
              <div className="dropdown-item no-results">No crops found</div>
            )}
          </div>
        )}
      </div>

      {selectedCrop && (
        <div className="crop-info">
          <button className="back-button" onClick={handleBackButton}>
            ← Back to All Crops
          </button>
          
          <div className="crop-header">
            <img 
              src={cropsData.find(crop => crop.name === selectedCrop)?.image || '/api/placeholder/150/150'} 
              alt={selectedCrop} 
              className="crop-image" 
            />
            <div className="crop-header-info">
              <h2>{selectedCrop}</h2>
              <p className="crop-description">{cropsData.find(crop => crop.name === selectedCrop)?.description}</p>
              <a 
                href={cropsData.find(crop => crop.name === selectedCrop)?.wikiLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="wiki-link"
              >
                Read more on Wikipedia
              </a>
            </div>
          </div>

          <div className="diseases-container">
            <h3>Common Diseases & Pests</h3>
            
            {diseases.map((disease, index) => (
              <div key={index} className="disease-card">
                <h4>{disease.name}</h4>
                
                <div className="disease-images">
                  {disease.images.map((img, imgIndex) => (
                    <a 
                      href={img} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      key={imgIndex} 
                      className="disease-image-link"
                    >
                      <img 
                        src={img} 
                        alt={`${disease.name} symptom ${imgIndex + 1}`} 
                        className="disease-image" 
                      />
                    </a>
                  ))}
                </div>
                
                <div className="disease-details">
                  <div className="detail-section">
                    <h5>Symptoms:</h5>
                    <p>{disease.symptoms}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h5>Causal Agent:</h5>
                    <p>{disease.pests}</p>
                  </div>
                  
                  <div className="detail-section"></div>
                  
                  <div className="detail-section">
                    <h5>Treatment:</h5>
                    <p>{disease.treatment}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h5>Prevention:</h5>
                    <p>{disease.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedCrop && (
        <div className="crop-grid">
          {cropsData.map((crop, index) => (
            <div 
              key={index} 
              className="crop-card"
              onClick={() => handleCropSelect(crop)}
            >
              <img 
                src={crop.image} 
                alt={crop.name} 
                className="crop-card-image" 
              />
              <h3 className="crop-card-title">{crop.name}</h3>
            </div>
          ))}
        </div>
      )}
      
      <div className="footer">
        <p>© 2025 Crop Disease Management System - For educational purposes</p>
      </div>
    </div>
  );
};

export default CropDiseaseInfo;