export const PRODUCTS_DATA = {
  tltreat: {
    slug: 'tltreat',
    cls: 't-treat',
    band: 'AGP REPLACER',
    name: 'TLTREAT',
    cat: 'Natural AGP replacer',
    tagline: 'The ultimate health enhancer for your poultry.',
    lede: 'A spice-based immune stimulant with extracts of ginger, turmeric and nutmeg. TLTREAT replaces antibiotic growth promoters in broiler and layer feed.',
    img: '/assets/img/tltreat.webp',
    keypoints: [
      '2 kg of TLTREAT delivers 20 kg of additional meat',
      'Regular use helps prevent coccidiosis',
      'Eliminates the need for antibiotic growth promoters',
      'Enhances natural immunity',
      'Healthier birds and lower mortality'
    ],
    facts: [
      { label: 'Format', val: 'Feed powder' },
      { label: 'Species', val: 'Broilers, layers' },
      { label: 'Dose', val: '1–2 kg / tonne feed' },
      { label: 'Field claim', val: '2 kg → 20 kg extra meat', highlight: true }
    ],
    whyChooseTitle: 'Why farms choose TLTREAT',
    whyChooseLede: 'Antibiotic growth promoters are being phased out by regulators and buyers. TLTREAT keeps performance up while removing antibiotics from the feed.',
    whyTicks: [
      'Immune system stimulant that boosts immunity',
      'Extracts of natural spices: ginger, turmeric, nutmeg',
      'Effective alternative to antibiotic growth promoters',
      'Extends laying cycles in layers',
      'Ideal for broilers and layers',
      'Simple to use and manage'
    ],
    benefits: [
      { title: 'Disease protection', desc: 'Protects birds from major bacterial, viral and fungal infections.' },
      { title: 'Better FCR', desc: 'Reduces mortality and improves feed conversion ratio.' },
      { title: 'Leaner meat', desc: 'Helps lower fat weight to maximise meat quality.' },
      { title: 'Outperforms AGPs', desc: 'Better performance compared with antibiotic growth promoters, plus higher profitability.' }
    ],
    howLede: 'Spice actives work on the bird\'s own defences and gut, rather than killing all bacteria the way antibiotics do.',
    mechanisms: [
      'Stimulates natural immunity',
      'Supports a healthy gut lining',
      'Antimicrobial spice actives',
      'Extends the laying cycle'
    ],
    composition: [
      { name: 'Curcumin', note: 'From turmeric' },
      { name: 'Ginger extract', note: 'Spice extract' },
      { name: 'Nutmeg extract', note: 'Spice extract' },
      { name: 'Turmeric oil', note: 'Essential oil' },
      { name: 'Grain powder', note: 'Natural carrier' }
    ],
    dosageTable: [
      { use: 'Broilers', rate: '1–2 kg per 1,000 kg feed', prog: 'Day 1 to day 40' },
      { use: 'Layers', rate: '2 kg per 1,000 kg feed', prog: 'Week 60 to week 110, to extend the laying cycle' }
    ],
    specs: [
      { dt: 'Packing', dd: '50 kg PP woven outer laminated bags with HMHDPE liner' },
      { dt: 'Shelf life', dd: '24 months from manufacturing' },
      { dt: 'Storage', dd: 'Cool, dry place, away from sunlight' }
    ],
    rates: {
      "Broilers at 1 kg/t": [1, "kg", "Tonnes of feed", "TLTREAT to mix into this feed"],
      "Broilers at 2 kg/t": [2, "kg", "Tonnes of feed", "TLTREAT to mix into this feed"],
      "Layers at 2 kg/t": [2, "kg", "Tonnes of feed", "TLTREAT to mix into this feed"]
    },
    resultsTitle: 'TLTREAT vs. antibiotic growth promoter',
    resultsLede: 'Body weight, feed conversion and mortality from controlled broiler trials. The full report is available to feed mills, integrators and distributors.',
    faqs: [
      { q: 'Can TLTREAT fully replace antibiotic growth promoters?', a: 'Yes. TLTREAT is designed as a natural alternative to AGPs for broilers and layers at 1–2 kg per tonne of feed.' },
      { q: 'When should layers receive TLTREAT?', a: 'From week 60 to week 110 at 2 kg per tonne of feed, to support an extended laying cycle and better returns.' },
      { q: 'Does TLTREAT help with coccidiosis?', a: 'Regular use helps prevent coccidiosis as part of a good management programme.' },
      { q: 'Is there a withdrawal period?', a: 'Zero withdrawal period. No chemical or antibiotic residues in meat or eggs.' }
    ],
    related: ['curtect-crd', 'tlegg', 'tlrepeal']
  },

  'curtect-crd': {
    slug: 'curtect-crd',
    cls: 't-curtect',
    band: 'RESPIRATORY',
    name: 'CURTECT-CRD',
    cat: 'Respiratory support for CRD',
    tagline: 'Ease respiratory distress and post-vaccination reactions in hours.',
    lede: 'A water-soluble blend of menthol, eucalyptus, rosemary and other essential oils. CURTECT-CRD improves respiratory function and helps flocks recover from environmental and post-vaccination stress.',
    img: '/assets/img/curtect-crd.webp',
    keypoints: [
      'Immediate relief within 24–48 hours',
      'Improves respiration and air passage',
      'Helps birds through post-vaccination reactions',
      'Cooling effect that helps birds cope with heat stress',
      'Non-antibiotic formula with zero withdrawal period'
    ],
    facts: [
      { label: 'Format', val: 'Water-soluble liquid' },
      { label: 'Species', val: 'Broilers, layers, breeders' },
      { label: 'Dose', val: '200 ml / 1,000 L water' },
      { label: 'Speed', val: 'Relief in 24–48 hours', highlight: true }
    ],
    whyChooseTitle: 'Why farms choose CURTECT-CRD',
    whyChooseLede: 'Respiratory issues can quickly cut feed intake and trigger secondary infections. CURTECT-CRD clears the airways without antibiotics.',
    whyTicks: [
      'Immediate relief within 24–48 hours',
      'Clears tracheobronchial mucus quickly',
      'Supports recovery after live vaccines',
      'Reduces panting and heat stress mortality',
      'Water-line compatible without clogging drinkers',
      'Zero withdrawal period before processing'
    ],
    benefits: [
      { title: 'Airway opening', desc: 'Menthol and eucalyptus vapors soothe tracheal lining and loosen thick mucus.' },
      { title: 'Stress reduction', desc: 'Reduces distress after vaccination and during high-temperature periods.' },
      { title: 'Appetite recovery', desc: 'Comfortable breathing restores regular water consumption and feed intake.' },
      { title: 'Natural actives', desc: 'Botanical essential oils that bacteria do not develop resistance against.' }
    ],
    howLede: 'Volatile essential oils evaporate through the respiratory tract, relaxing smooth muscle and thinning mucus.',
    mechanisms: [
      'Mucolytic action',
      'Bronchodilation & cooling sensation',
      'Mild antiseptic essential oils',
      'Electrolyte & hydration balance'
    ],
    composition: [
      { name: 'Menthol oil', note: 'Airway opening & cooling' },
      { name: 'Eucalyptus oil', note: 'Mucus thinning' },
      { name: 'Rosemary oil', note: 'Antioxidant & soothing' },
      { name: 'Plant emulsifiers', note: '100% water solubility' }
    ],
    dosageTable: [
      { use: 'Respiratory prevention', rate: '200 ml per 1,000 L water', prog: 'Twice a week in a 12-hour cycle' },
      { use: 'Post-vaccination (48h later)', rate: '200 ml per 1,000 L water', prog: 'Twice a day for 4 days, 8h between doses' },
      { use: 'Active distress / CRD adjunct', rate: '200 ml per 1,000 L water', prog: 'Twice a day for 4 days, 8h between doses' }
    ],
    specs: [
      { dt: 'Packing', dd: '5 kg and 20 kg HMHDPE bottles' },
      { dt: 'Shelf life', dd: '24 months from manufacturing' },
      { dt: 'Storage', dd: 'Cool place, protect from direct heat' }
    ],
    rates: {
      "Any programme (200 ml per 1,000 L)": [0.2, "ml", "Litres of drinking water", "CURTECT-CRD per dose"]
    },
    resultsTitle: 'Airway recovery timeline',
    resultsLede: 'Audited water-line trials show measurable reduction in wheezing and gasping within 24 to 48 hours of first administration.',
    faqs: [
      { q: 'Can CURTECT-CRD be given through automated dosing pumps?', a: 'Yes. It is fully water-soluble and leaves no gummy residue in nipples or regulator valves.' },
      { q: 'When should it be started after vaccination?', a: 'Start 48 hours after administering live respiratory vaccines for best results.' },
      { q: 'Is it safe during hot summer weather?', a: 'Yes, menthol imparts a mild cooling sensation that helps flocks cope with heat stress.' }
    ],
    related: ['tltreat', 'tlegg', 'tlrepeal']
  },

  tlegg: {
    slug: 'tlegg',
    cls: 't-egg',
    band: 'EGG QUALITY',
    name: 'TLEGG',
    cat: 'Egg yolk colour enhancer',
    tagline: 'Rich golden-orange yolks naturally from marigold carotenoids.',
    lede: 'A powder loaded with carotenoids from marigold flowers and spice extracts. TLEGG enriches yolk colour naturally and keeps it consistent even when maize in the diet is reduced.',
    img: '/assets/img/tlegg.webp',
    keypoints: [
      'Turns egg yolk a rich orange-yellow',
      'Carotenoids extracted from marigold flowers',
      'Keeps yolk colour even with less maize',
      'Simple 1 kg per tonne inclusion',
      'Standardised carotenoid concentration'
    ],
    facts: [
      { label: 'Format', val: 'Feed powder' },
      { label: 'Species', val: 'Layers' },
      { label: 'Dose', val: '1 kg / tonne feed' },
      { label: 'Source', val: 'Marigold carotenoids', highlight: true }
    ],
    whyChooseTitle: 'Why egg producers choose TLEGG',
    whyChooseLede: 'Consumers and bakeries pay premium prices for rich yolk color. TLEGG delivers consistent DSM fan scores without relying on synthetic dyes.',
    whyTicks: [
      'Natural lutein & zeaxanthin from marigold petals',
      'Consistently reaches desired DSM color fan rating (11–13)',
      'Allows formulation flexibility with alternative grain sources',
      'Heat-stable during pelleting and feed extrusion',
      'No synthetic chemical colourants or off-flavours'
    ],
    benefits: [
      { title: 'Golden-orange yolks', desc: 'High bioavailability carotenoids deposit efficiently into developing yolks.' },
      { title: 'Lower feed cost', desc: 'Maintain deep color even when replacing expensive yellow maize with wheat or broken rice.' },
      { title: 'Consumer preference', desc: 'Build premium brand identity on supermarket shelves and pastry kitchens.' }
    ],
    howLede: 'Natural carotenoids absorb directly into the bloodstream and concentrate in the ovarian follicles.',
    mechanisms: [
      'High digestive bioavailability',
      'Uniform follicular deposition',
      'Natural antioxidant protection',
      'Enhanced eggshell integrity support'
    ],
    composition: [
      { name: 'Marigold carotenoid extract', note: 'Standardised lutein & zeaxanthin' },
      { name: 'Botanical spice extracts', note: 'Absorption enhancers' },
      { name: 'Natural grain carrier', note: 'Free-flowing powder' }
    ],
    dosageTable: [
      { use: 'Commercial layers', rate: '1 kg per 1,000 kg feed', prog: 'Continuous feeding in layer mash or pellets' }
    ],
    specs: [
      { dt: 'Packing', dd: '50 kg PP woven laminated bags with inner liner' },
      { dt: 'Shelf life', dd: '24 months' },
      { dt: 'Storage', dd: 'Store in a cool, dry place' }
    ],
    rates: {
      "Layers at 1 kg/t": [1, "kg", "Tonnes of feed", "TLEGG to mix into this feed"]
    },
    resultsTitle: 'Yolk color fan scores',
    resultsLede: 'Field evaluations confirm an increase of 3 to 4 points on the Roche/DSM yolk color fan within 10 to 14 days of inclusion.',
    faqs: [
      { q: 'How quickly does yolk color improve?', a: 'Visible color increase starts within 4–5 days, with full target saturation reached in 10–14 days.' },
      { q: 'Does it affect egg taste or smell?', a: 'Not at all. The taste and aroma of eggs remain clean and fresh.' }
    ],
    related: ['tltreat', 'curtect-crd', 'tlrepeal']
  },

  tlrepeal: {
    slug: 'tlrepeal',
    cls: 't-repeal',
    band: 'MITE CONTROL',
    name: 'TLREPEAL',
    cat: 'Avian red mite solution',
    tagline: 'Dual-action natural protection against Dermanyssus gallinae.',
    lede: 'An all-natural remedy for avian red mites made from plant-based oil extracts. TLREPEAL gives long-term protection and flexible treatment through drinking water or spraying.',
    img: '/assets/img/tlrepeal.webp',
    keypoints: [
      'Natural solution against avian red mites',
      'Use in drinking water or as a nest spray',
      'Long-term protection after application',
      'Safe for birds, humans and the environment',
      'No egg withholding period required'
    ],
    facts: [
      { label: 'Format', val: 'Water-soluble liquid' },
      { label: 'Species', val: 'Layers, breeders' },
      { label: 'Internal', val: '150 ml / 1,000 L' },
      { label: 'External', val: '300 ml / 1,000 L spray' }
    ],
    whyChooseTitle: 'Why farms choose TLREPEAL',
    whyChooseLede: 'Red mites cause anemia, restlessness, reduced lay rates, and dirty egg spots. TLREPEAL stops the cycle without neurotoxic pesticides.',
    whyTicks: [
      'Effective through drinking water and external spraying',
      'Reduces blood loss, agitation and hen cannibalism',
      'Eliminates chemical organophosphate resistance',
      'Completely safe for farm workers during application',
      'Zero chemical residues in table eggs'
    ],
    benefits: [
      { title: 'Drinking water mode', desc: 'Plant bioactives enter the bloodstream, repelling mites when they attempt to feed.' },
      { title: 'Direct nest spray', desc: 'Breaks down mite exoskeleton on contact and repels them from cracks and crevices.' },
      { title: 'Egg cleanlines', desc: 'Eliminates unsightly blood stains on eggshells from squashed mites.' }
    ],
    howLede: 'Terpenoids and phenols disrupt mite sensory receptors and feeding reflexes while irritating their cuticle.',
    mechanisms: [
      'Sensory receptor disruption',
      'Feeding deterrence',
      'Cuticular dehydration on contact',
      'Reproduction cycle interruption'
    ],
    composition: [
      { name: 'Basil oil', note: 'Terpenoid repellent' },
      { name: 'Camphor extract', note: 'Pest deterrent' },
      { name: 'Eucalyptus oil', note: 'Cuticle disruption' },
      { name: 'D-Limonene', note: 'Natural solvent & repellent' }
    ],
    dosageTable: [
      { use: 'Drinking water (internal)', rate: '150 ml per 1,000 L water', prog: 'On alternate weeks' },
      { use: 'Nest & house spray (external)', rate: '300 ml per 1,000 L water', prog: 'Spray walls, slats and nest boxes on alternate weeks' }
    ],
    specs: [
      { dt: 'Packing', dd: '5 kg and 20 kg HMHDPE bottles' },
      { dt: 'Shelf life', dd: '24 months' },
      { dt: 'Storage', dd: 'Store away from direct sunlight' }
    ],
    rates: {
      "Drinking water (150 ml per 1,000 L)": [0.15, "ml", "Litres of drinking water", "TLREPEAL for this water"],
      "Nest spray (300 ml per 1,000 L)": [0.3, "ml", "Litres of spray water", "TLREPEAL for this spray"]
    },
    resultsTitle: 'Mite trap reduction',
    resultsLede: 'Corrugated mite trap counts show up to 85% drop in adult and nymph populations after 2 consecutive cycles of water + spray treatment.',
    faqs: [
      { q: 'Do eggs need to be discarded during treatment?', a: 'No. TLREPEAL is 100% botanical and leaves no synthetic chemical residues.' },
      { q: 'How often should the spraying be done?', a: 'We recommend alternating weekly between drinking water administration and perimeter nest spraying.' }
    ],
    related: ['tltreat', 'curtect-crd', 'tlegg']
  },

  'tl-healer': {
    slug: 'tl-healer',
    cls: 't-healer',
    band: 'WOUND CARE',
    name: 'TL HEALER',
    cat: 'Wounds & tick bites',
    tagline: 'Antiseptic, healing and fly-repelling botanical spray.',
    lede: 'A blend of natural spice extracts, essential oils and fixed oils, crafted for the well-being of animals and birds. Apply TL HEALER directly to wounds, tick bites and external skin injuries.',
    img: '/assets/img/tl-healer.webp',
    keypoints: [
      'Works on septic and non-septic wounds',
      'Can be used on infected wounds & maggot wounds',
      'Excellent fly repellent',
      'Easy to use and administer',
      'Safe for livestock and poultry'
    ],
    facts: [
      { label: 'Format', val: 'Topical spray' },
      { label: 'Species', val: 'Cattle, goats, poultry' },
      { label: 'Use', val: 'Direct wound spray' },
      { label: 'Feature', val: 'Fly & maggot repellent', highlight: true }
    ],
    whyChooseTitle: 'Why veterinarians and farmers choose TL HEALER',
    whyChooseLede: 'Open wounds on cattle, goats and birds attract flies, maggots and secondary bacterial infections. TL HEALER accelerates healing while keeping insects away.',
    whyTicks: [
      'Formulated with cedarwood, neem, curcumin and terpineol',
      'Rapid antiseptic and tissue-healing properties',
      'Strong natural fly repellent preventing maggot infestation',
      'Works on septic wounds, shearing cuts, and castration sites',
      'Safe if licked by animals in small amounts'
    ],
    benefits: [
      { title: 'Tissue regeneration', desc: 'Curcumin and herbal fixed oils accelerate granulation and epithelization.' },
      { title: 'Fly deterrence', desc: 'Strong cedarwood and neem aroma repels blowflies and biting ticks.' },
      { title: 'Broad antiseptic', desc: 'Terpineol and active phenolics inhibit bacterial growth on wound edges.' }
    ],
    howLede: 'Topical application creates a protective herbal film that protects raw tissue, reduces inflammation, and blocks flies.',
    mechanisms: [
      'Antimicrobial protection',
      'Anti-inflammatory tissue soothing',
      'Natural fly repellency',
      'Collagen synthesis stimulation'
    ],
    composition: [
      { name: 'Cedarwood oil', note: 'Essential oil & insect repellent' },
      { name: 'Curcumin', note: 'Anti-inflammatory from turmeric' },
      { name: 'Neem oil', note: 'Fixed oil & tissue healer' },
      { name: 'Terpineol', note: 'Antiseptic terpene' },
      { name: 'Emulsifier', note: 'Uniform skin adhesion' }
    ],
    dosageTable: [
      { use: 'Wounds and tick bites', rate: 'Spray or apply directly', prog: 'On the affected area, repeat daily until healed' }
    ],
    specs: [
      { dt: 'Packing', dd: '5 kg and 20 kg HMHDPE bottles' },
      { dt: 'Shelf life', dd: '24 months' },
      { dt: 'Storage', dd: 'Store in a cool place away from sun' }
    ],
    rates: null, // Uses manual application steps
    resultsTitle: 'Healing progress',
    resultsLede: 'Field veterinary observations demonstrate rapid crusting and dry granulation on cattle and sheep within 3 to 5 days of daily application.',
    faqs: [
      { q: 'Can TL HEALER be used on infected or maggot wounds?', a: 'Yes. Clean the area first and spray thoroughly; it drives out maggots and prevents re-infestation.' },
      { q: 'Is it safe for poultry feather pecking injuries?', a: 'Yes. It soothes raw skin and prevents cannibalism by repelling other birds with its herbal odor.' }
    ],
    related: ['tltreat', 'curtect-crd', 'tlrepeal']
  }
};
