import { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Flame,
  Flower2,
  Droplet,
  HeartPulse,
  HelpCircle,
  Mountain,
  Palette,
  Percent,
  Waves,
  ShoppingCart,
  Sun,
  TreeDeciduous,
  Umbrella,
  User,
  Users,
  XCircle,
  Youtube,
  Zap,
  Shield,
} from "lucide-react";

export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  benefits: string[];
  usage: string;
  cautions: string | string[];
  preparations: Preparation[];
  benefitScores?: BenefitScore[] | { [category: string]: number };
  complementaryHerbs?: ComplementaryHerb[];
  origin?: string;
  harvestSeason?: string;
  parts?: string[];
  traditionalUses?: string[];
  constituents?: string[];
  sustainabilityInfo?: string;
  growingInfo?: string;
	image?: string;
  safetyProfile?: SafetyProfile;
  scientificResearch?: ScientificResearch[];
  tags?: string[];
  audience?: string[];
  detailedPreparations?: DetailedPreparation[];
}

export interface HerbCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  herbs: Herb[];
}

export interface Preparation {
  type: string;
  description: string;
  dosage?: string;
  steps?: string[];
}

export interface BenefitScore {
  category: string;
  score: number;
}

export interface ComplementaryHerb {
  name: string;
  description: string;
}

export interface SafetyProfile {
  safetyRating: string;
  sideEffects?: string[];
  contraindications?: string[];
  pregnancySafety?: string;
  childrenSafety?: string;
  pregnancySafe?: boolean;
  interactions?: string[];
  dosageLimit?: string;
}

export interface ScientificResearch {
  title: string;
  summary: string;
	year?: string;
  source?: string;
  type?: string;
  link?: string;
}

export interface DetailedPreparation {
  name: string;
  type: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  steps?: string[];
  details?: string;
  dosage?: string;
  additionalNotes?: string;
  notes?: string;
  color?: string;
  preparationTime?: string;
}

export const herbCategories: HerbCategory[] = [
  {
    id: "brain-herbs",
    name: "Brain Herbs",
    description: "Herbs that support cognitive function and brain health",
    icon: "🧠",
    color: "#8B5CF6",
    herbs: [
      {
        id: "ashwagandha-brain",
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        category: "brain-herbs",
        description: "Ashwagandha is an adaptogenic herb that helps reduce stress and anxiety while supporting cognitive function and memory.",
        benefits: [
          "Reduces stress and anxiety",
          "Improves memory and cognitive function",
          "Supports focus and concentration",
          "May help with neurodegenerative conditions"
        ],
        usage: "Commonly taken as a supplement in capsule or powder form, or as a tea.",
        cautions: "May interact with thyroid medications, sedatives, and immunosuppressants. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "300-500mg daily",
            steps: [
              "Take 1 capsule (300-500mg) with water in the morning after breakfast",
              "For enhanced results, you may take an additional capsule in the evening",
              "Consistent daily use for 4-8 weeks is recommended for optimal benefits",
              "Store in a cool, dry place away from direct sunlight"
            ]
          },
          {
            type: "Powder",
            description: "Can be mixed into warm milk or water with honey.",
            dosage: "1/4 to 1/2 teaspoon daily",
            steps: [
              "Heat 1 cup of milk or plant-based alternative until warm (not boiling)",
              "Add 1/4 to 1/2 teaspoon of ashwagandha powder",
              "Add 1 teaspoon of honey or maple syrup to taste",
              "Optionally add a pinch of cinnamon or cardamom for flavor",
              "Stir well and drink in the evening, 1-2 hours before bedtime"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Cognitive Function", score: 90 },
          { category: "Stress Relief", score: 95 },
          { category: "Memory", score: 85 },
          { category: "Focus", score: 80 }
        ],
        origin: "India",
        parts: ["Root", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ashwagandha_plant.jpg/640px-Ashwagandha_plant.jpg",
        tags: ["adaptogen", "cognitive", "stress", "memory"]
      },
      {
        id: "holy-basil-brain",
        name: "Holy Basil",
        scientificName: "Ocimum sanctum",
        category: "brain-herbs",
        description: "Holy Basil, also known as Tulsi, is a sacred herb in Ayurvedic medicine known for its ability to enhance clarity, focus, and cognitive function.",
        benefits: [
          "Enhances mental clarity",
          "Reduces stress and anxiety",
          "Improves memory and focus",
          "Supports overall brain health"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with blood-thinning medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water.",
            dosage: "1-2 cups daily",
            steps: [
              "Bring 1 cup of water to a boil, then let it cool for 1-2 minutes",
              "Add 1-2 teaspoons of dried Holy Basil leaves to a tea infuser",
              "Pour the hot water over the leaves and cover",
              "Steep for 5-10 minutes depending on desired strength",
              "Remove the infuser, add honey or lemon if desired"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "20-30 drops, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Cognitive Function", score: 85 },
          { category: "Stress Relief", score: 90 },
          { category: "Memory", score: 80 },
          { category: "Focus", score: 85 }
        ],
        origin: "India",
        parts: ["Leaves", "Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ocimum_tenuiflorum_002.JPG/640px-Ocimum_tenuiflorum_002.JPG",
        tags: ["adaptogen", "cognitive", "stress", "ayurvedic"]
      },
      {
        id: "lemon-balm-brain",
        name: "Lemon Balm",
        scientificName: "Melissa officinalis",
        category: "brain-herbs",
        description: "Lemon balm is a calming herb that helps reduce anxiety and improve cognitive function while promoting better sleep quality.",
        benefits: [
          "Reduces anxiety and stress",
          "Improves cognitive function",
          "Enhances mood and mental clarity",
          "Promotes better sleep quality"
        ],
        usage: "Used as a tea, tincture, or in capsule form. Also used in aromatherapy.",
        cautions: "May interact with sedatives and thyroid medications. Use with caution if you have thyroid issues.",
        preparations: [
          {
            type: "Tea",
            description: "Fresh or dried leaves steeped in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Bring 1 cup of water to a boil",
              "Add 1-2 tablespoons of fresh lemon balm leaves or 1-2 teaspoons of dried leaves",
              "Cover and steep for 5-10 minutes",
              "Strain and add honey if desired",
              "Drink 30 minutes before bedtime for sleep support"
            ]
          },
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "2-3 ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Cognitive Function", score: 75 },
          { category: "Stress Relief", score: 90 },
          { category: "Memory", score: 70 },
          { category: "Focus", score: 75 }
        ],
        origin: "Mediterranean region",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg/640px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg",
        tags: ["calming", "cognitive", "sleep", "mood"]
      },
      {
        id: "gotu-kola-brain",
        name: "Gotu Kola",
        scientificName: "Centella asiatica",
        category: "brain-herbs",
        description: "Gotu Kola is a rejuvenating herb that enhances cognitive function, improves memory, and supports overall brain health and longevity.",
        benefits: [
          "Enhances memory and cognitive function",
          "Reduces anxiety and stress",
          "Improves circulation to the brain",
          "Supports nervous system health"
        ],
        usage: "Taken as a supplement in capsule form, as a tea, or as a tincture.",
        cautions: "May interact with medications that affect blood sugar or cholesterol. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg daily",
            steps: [
              "Take 1 capsule (400mg) with water in the morning",
              "Take a second capsule in the afternoon if needed",
              "Best taken with food to avoid stomach upset",
              "Consistent use for 8-12 weeks is recommended for optimal results"
            ]
          },
          {
            type: "Tea",
            description: "Dried leaves steeped in hot water.",
            dosage: "1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Cognitive Function", score: 85 },
          { category: "Stress Relief", score: 75 },
          { category: "Memory", score: 90 },
          { category: "Focus", score: 80 }
        ],
        origin: "India, Southeast Asia",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Centella_asiatica_2017.jpg/640px-Centella_asiatica_2017.jpg",
        tags: ["cognitive", "memory", "longevity", "ayurvedic"]
      },
      {
        id: "rosemary-brain",
        name: "Rosemary",
        scientificName: "Rosmarinus officinalis",
        category: "brain-herbs",
        description: "Rosemary is an aromatic herb that enhances memory and concentration while protecting brain cells from damage.",
        benefits: [
          "Improves memory and concentration",
          "Increases blood flow to the brain",
          "Contains antioxidants that protect brain cells",
          "Enhances mental clarity and alertness"
        ],
        usage: "Used as a culinary herb, essential oil for aromatherapy, or as a tea.",
        cautions: "High doses may cause digestive upset. The essential oil should not be taken internally.",
        preparations: [
          {
            type: "Tea",
            description: "Fresh or dried leaves steeped in hot water.",
            dosage: "1-2 cups daily",
            steps: [
              "Bring water to a boil",
              "Add 1-2 teaspoons of dried rosemary leaves or 1 tablespoon fresh leaves",
              "Cover and steep for 5-10 minutes",
              "Strain and add honey if desired",
              "Drink before study sessions or mentally demanding tasks"
            ]
          },
          {
            type: "Aromatherapy",
            description: "Essential oil used for inhalation.",
            dosage: "As needed",
            steps: [
              "Add 3-5 drops of rosemary essential oil to a diffuser",
              "Diffuse for 30-60 minutes in your workspace or study area",
              "Alternatively, add 1-2 drops to a tissue and inhale deeply",
              "Can also add a drop to your palms, rub together, and inhale",
              "Use during study sessions or when mental fatigue sets in"
            ]
          }
        ],
        benefitScores: [
          { category: "Memory", score: 85 },
          { category: "Concentration", score: 90 },
          { category: "Mental Clarity", score: 85 },
          { category: "Antioxidant Protection", score: 80 }
        ],
        origin: "Mediterranean region",
        parts: ["Leaves", "Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rosemary_bush.jpg/640px-Rosemary_bush.jpg",
        tags: ["cognitive", "memory", "aromatic", "antioxidant"]
      },
      {
        id: "periwinkle-brain",
        name: "Periwinkle",
        scientificName: "Vinca minor",
        category: "brain-herbs",
        description: "Periwinkle contains vinpocetine, which enhances cerebral blood flow and is used to support cognitive function and memory.",
        benefits: [
          "Improves cerebral blood flow",
          "Enhances memory and cognitive function",
          "Supports brain metabolism",
          "May help with age-related cognitive decline"
        ],
        usage: "Typically taken as a supplement in extract or tablet form.",
        cautions: "May interact with blood thinners and blood pressure medications. Not recommended during pregnancy or breastfeeding.",
        preparations: [
          {
            type: "Extract",
            description: "Standardized vinpocetine extract.",
            dosage: "5-10mg, 3 times daily",
            steps: [
              "Take 5-10mg of vinpocetine extract with food",
              "Take 3 times daily for optimal effects",
              "Best taken with meals to enhance absorption",
              "Consistent use for 6-12 weeks is recommended for cognitive benefits",
              "Monitor for any side effects like headache or digestive upset"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract of periwinkle herb.",
            dosage: "20-40 drops, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Cerebral Blood Flow", score: 90 },
          { category: "Memory", score: 85 },
          { category: "Cognitive Function", score: 80 },
          { category: "Brain Metabolism", score: 85 }
        ],
        origin: "Europe",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Vinca_minor_04.jpg/640px-Vinca_minor_04.jpg",
        tags: ["cognitive", "cerebral", "memory", "circulation"]
      },
      {
        id: "cordyceps-brain",
        name: "Cordyceps",
        scientificName: "Cordyceps sinensis",
        category: "brain-herbs",
        description: "Cordyceps is a medicinal mushroom that enhances energy, mental clarity, and cognitive function while supporting the body's stress response.",
        benefits: [
          "Enhances mental energy and clarity",
          "Improves oxygen utilization in the brain",
          "Supports stress resilience and adaptation",
          "Boosts overall vitality and stamina"
        ],
        usage: "Taken as a supplement in capsule, powder, or tincture form.",
        cautions: "May interact with immunosuppressant medications and blood thinners. Use with caution if you have autoimmune conditions.",
        preparations: [
          {
            type: "Powder",
            description: "Dried and powdered mushroom.",
            dosage: "1-3 grams daily",
            steps: [
              "Start with 1 gram (approximately 1/2 teaspoon) daily",
              "Mix into coffee, tea, smoothies, or other beverages",
              "Can also be added to soups or broths",
              "Take consistently for 4-8 weeks for best results",
              "May gradually increase dosage up to 3 grams daily if needed"
            ]
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 1-2 times daily"
          }
        ],
        benefitScores: [
          { category: "Mental Energy", score: 85 },
          { category: "Cognitive Function", score: 80 },
          { category: "Stress Adaptation", score: 90 },
          { category: "Oxygen Utilization", score: 85 }
        ],
        origin: "Tibet, China",
        parts: ["Fruiting body", "Mycelium"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cordyceps_sinensis_-_Caterpillar_Fungus_-_Yartsa_Gunbu.JPG/640px-Cordyceps_sinensis_-_Caterpillar_Fungus_-_Yartsa_Gunbu.JPG",
        tags: ["adaptogen", "mushroom", "energy", "cognitive"]
      },
      {
        id: "skullcap-brain",
        name: "Skullcap",
        scientificName: "Scutellaria lateriflora",
        category: "brain-herbs",
        description: "Skullcap is a nervine herb that calms the nervous system, reduces anxiety, and supports cognitive function without sedation.",
        benefits: [
          "Calms the nervous system without sedation",
          "Reduces anxiety and stress",
          "Supports focus and concentration",
          "Helps with nervous tension and restlessness"
        ],
        usage: "Used as a tea, tincture, or in capsule form.",
        cautions: "May interact with sedatives and anti-anxiety medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tincture",
            description: "Alcohol-based extract for fast-acting effects.",
            dosage: "20-40 drops, 2-3 times daily",
            steps: [
              "Take 20-40 drops of skullcap tincture in a small amount of water",
              "For acute anxiety or tension, take as needed",
              "For general nervous system support, take 2-3 times daily",
              "Can be taken 30 minutes before mentally demanding tasks",
              "For sleep support, take 40-60 drops 30-60 minutes before bedtime"
            ]
          },
          {
            type: "Tea",
            description: "Dried herb steeped in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Add 1-2 teaspoons of dried skullcap to a cup",
              "Pour boiling water over the herb",
              "Cover and steep for 10-15 minutes",
              "Strain and drink as needed for nervous tension",
              "Can add honey or lemon to improve the bitter taste"
            ]
          }
        ],
        benefitScores: [
          { category: "Anxiety Relief", score: 90 },
          { category: "Nervous System Support", score: 95 },
          { category: "Focus", score: 75 },
          { category: "Stress Reduction", score: 85 }
        ],
        origin: "North America",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scutellaria_lateriflora_WFNY-142A.jpg/640px-Scutellaria_lateriflora_WFNY-142A.jpg",
        tags: ["nervine", "anxiety", "focus", "calming"]
      },
      {
        id: "holy-basil",
        name: "Holy Basil",
        scientificName: "Ocimum sanctum",
        category: "brain-herbs",
        description: "Holy Basil, also known as Tulsi, is a sacred herb in Ayurvedic medicine known for its ability to enhance clarity, focus, and cognitive function.",
        benefits: [
          "Enhances mental clarity",
          "Reduces stress and anxiety",
          "Improves memory and focus",
          "Supports overall brain health"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with blood-thinning medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water.",
            dosage: "1-2 cups daily",
            steps: [
              "Bring 1 cup of water to a boil, then let it cool for 1-2 minutes",
              "Add 1-2 teaspoons of dried Holy Basil leaves to a tea infuser",
              "Pour the hot water over the leaves and cover",
              "Steep for 5-10 minutes depending on desired strength",
              "Remove the infuser, add honey or lemon if desired",
              "Drink 1-2 cups daily, preferably in the morning or afternoon"
            ]
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "300-600mg daily",
            steps: [
              "Take 1 capsule (300-600mg) with a full glass of water",
              "For best results, take with food to minimize stomach discomfort",
              "Take once daily, preferably in the morning",
              "For enhanced stress relief, a second capsule may be taken in the afternoon",
              "Allow 2-4 weeks of consistent use for optimal benefits"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "20-40 drops, 2-3 times daily",
            steps: [
              "Shake the tincture bottle well before each use",
              "Place 20-40 drops under your tongue using the dropper",
              "Hold for 30-60 seconds before swallowing",
              "Take 2-3 times daily, ideally between meals",
              "For stress relief, take a dose during stressful situations as needed",
              "Store in a cool, dark place away from direct sunlight"
            ]
          }
        ],
        benefitScores: [
          { category: "Mental Clarity", score: 90 },
          { category: "Stress Relief", score: 85 },
          { category: "Focus", score: 80 },
          { category: "Memory", score: 75 }
        ],
        origin: "India",
        parts: ["Leaves", "Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Holy_Basil_Plant.jpg/640px-Holy_Basil_Plant.jpg",
        tags: ["adaptogen", "cognitive", "stress", "focus"]
      },
      {
        id: "lemon-balm",
        name: "Lemon Balm",
        scientificName: "Melissa officinalis",
        category: "brain-herbs",
        description: "Lemon Balm is a calming herb that helps reduce anxiety and improve cognitive function, particularly memory and attention.",
        benefits: [
          "Reduces anxiety and stress",
          "Improves memory and concentration",
          "Enhances mood",
          "Promotes better sleep"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with sedatives and thyroid medications. Use with caution if you have thyroid issues.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Bring 1 cup of filtered water to just below boiling (around 200°F)",
              "Add 1-2 tablespoons of fresh lemon balm leaves or 1 tablespoon of dried leaves",
              "Cover and steep for 5-7 minutes",
              "Strain the leaves and add honey or lemon if desired",
              "Drink warm, up to 3 cups daily",
              "For sleep support, drink 1 cup 30-60 minutes before bedtime"
            ]
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "300-600mg, 2-3 times daily",
            steps: [
              "Take 1 capsule (300-600mg) with a full glass of water",
              "For anxiety relief, take 2-3 times daily with meals",
              "For sleep support, take 1-2 capsules 30-60 minutes before bedtime",
              "Do not exceed the recommended dosage on the product label",
              "Store in a cool, dry place away from direct sunlight"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-3ml, 2-3 times daily",
            steps: [
              "Shake the tincture bottle well before each use",
              "Add 2-3ml (40-60 drops) to a small amount of water",
              "Take 2-3 times daily between meals",
              "For acute anxiety, take an additional dose as needed",
              "For sleep support, take one dose 30 minutes before bedtime",
              "Store in a cool, dark place away from direct sunlight"
            ]
          }
        ],
        benefitScores: [
          { category: "Anxiety Relief", score: 90 },
          { category: "Memory", score: 80 },
          { category: "Concentration", score: 75 },
          { category: "Sleep", score: 85 }
        ],
        origin: "Mediterranean region",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg/640px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
        tags: ["calming", "cognitive", "anxiety", "memory"]
      },
      {
        id: "periwinkle",
        name: "Periwinkle",
        scientificName: "Vinca minor",
        category: "brain-herbs",
        description: "Periwinkle contains vinpocetine, which is known to enhance cerebral blood flow and improve cognitive function and memory.",
        benefits: [
          "Enhances cerebral blood flow",
          "Improves memory and cognitive function",
          "May help with age-related cognitive decline",
          "Supports overall brain health"
        ],
        usage: "Typically used in extract or supplement form.",
        cautions: "May interact with blood-thinning medications and blood pressure medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "5-10mg of vinpocetine, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Cerebral Blood Flow", score: 90 },
          { category: "Memory", score: 85 },
          { category: "Cognitive Function", score: 80 },
          { category: "Neuroprotection", score: 75 }
        ],
        origin: "Europe",
        parts: ["Leaves", "Stems"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Vinca_minor_flor.jpg/640px-Vinca_minor_flor.jpg",
        tags: ["cognitive", "memory", "cerebral", "neuroprotective"]
      },
      {
        id: "gotu-kola",
        name: "Gotu Kola",
        scientificName: "Centella asiatica",
        category: "brain-herbs",
        description: "Gotu Kola is a traditional Ayurvedic herb known for its ability to enhance memory, concentration, and overall cognitive function.",
        benefits: [
          "Enhances memory and concentration",
          "Reduces anxiety and stress",
          "Supports overall brain health",
          "May help with age-related cognitive decline"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with sedatives and medications for diabetes. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried leaves in hot water.",
            dosage: "1-2 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Memory", score: 90 },
          { category: "Concentration", score: 85 },
          { category: "Anxiety Relief", score: 80 },
          { category: "Cognitive Function", score: 85 }
        ],
        origin: "Asia",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Centella_asiatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg/640px-Centella_asiatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg",
        tags: ["cognitive", "memory", "concentration", "ayurvedic"]
      },
      {
        id: "rosemary",
        name: "Rosemary",
        scientificName: "Rosmarinus officinalis",
        category: "brain-herbs",
        description: "Rosemary contains compounds that improve memory, concentration, and overall cognitive function. It's also known to enhance alertness.",
        benefits: [
          "Improves memory and concentration",
          "Enhances alertness",
          "Supports overall cognitive function",
          "May help protect against age-related cognitive decline"
        ],
        usage: "Can be used as a culinary herb, consumed as a tea, or used as an essential oil for aromatherapy.",
        cautions: "Essential oil should not be ingested. May interact with blood-thinning medications and medications for high blood pressure.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried leaves in hot water.",
            dosage: "1-2 cups daily"
          },
          {
            type: "Culinary",
            description: "Add fresh or dried leaves to food.",
            dosage: "As desired in cooking"
          },
          {
            type: "Aromatherapy",
            description: "Use essential oil in a diffuser or inhale directly.",
            dosage: "As needed for aromatherapy"
          }
        ],
        benefitScores: [
          { category: "Memory", score: 85 },
          { category: "Concentration", score: 80 },
          { category: "Alertness", score: 90 },
          { category: "Cognitive Function", score: 85 }
        ],
        origin: "Mediterranean region",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rosmarinus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-254.jpg/640px-Rosmarinus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-254.jpg",
        tags: ["cognitive", "memory", "alertness", "culinary"]
      },
      {
        id: "cordyceps",
        name: "Cordyceps",
        scientificName: "Cordyceps sinensis",
        category: "brain-herbs",
        description: "Cordyceps is a medicinal mushroom that enhances energy, mental clarity, and cognitive function while supporting overall brain health.",
        benefits: [
          "Enhances energy and mental clarity",
          "Improves cognitive function",
          "Supports overall brain health",
          "May help with fatigue and mental exhaustion"
        ],
        usage: "Typically consumed in capsule, powder, or tincture form.",
        cautions: "May interact with blood-thinning medications and immunosuppressants. Use with caution if you have autoimmune conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg daily"
          },
          {
            type: "Powder",
            description: "Can be mixed into smoothies, drinks, or food.",
            dosage: "1-2 teaspoons daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Energy", score: 90 },
          { category: "Mental Clarity", score: 85 },
          { category: "Cognitive Function", score: 80 },
          { category: "Focus", score: 75 }
        ],
        origin: "Tibet and China",
        parts: ["Fruiting body"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cordyceps_militaris.jpg/640px-Cordyceps_militaris.jpg",
        tags: ["mushroom", "energy", "cognitive", "clarity"]
      },
      {
        id: "skullcap",
        name: "Skullcap",
        scientificName: "Scutellaria lateriflora",
        category: "brain-herbs",
        description: "Skullcap is a nervine herb that helps calm the nervous system, reduce anxiety, and improve focus and concentration.",
        benefits: [
          "Reduces anxiety and stress",
          "Improves focus and concentration",
          "Supports overall nervous system health",
          "May help with insomnia and restlessness"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with sedatives and anti-anxiety medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried leaves in hot water.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "300-500mg, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Anxiety Relief", score: 90 },
          { category: "Focus", score: 80 },
          { category: "Nervous System Support", score: 85 },
          { category: "Sleep", score: 75 }
        ],
        origin: "North America",
        parts: ["Leaves", "Stems"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scutellaria_lateriflora_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-131.jpg/640px-Scutellaria_lateriflora_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-131.jpg",
        tags: ["nervine", "anxiety", "focus", "calming"]
      }
    ]
  },
  {
    id: "adaptogens",
    name: "Adaptogens",
    description: "helping the body resist stressors of all kinds",
    icon: "⛰️",
    color: "#A3E635",
    herbs: [
      {
        id: "ashwagandha",
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        category: "adaptogens",
        description: "Ashwagandha is a powerful adaptogen used in traditional Ayurvedic medicine to help the body manage stress, increase energy levels, and improve concentration.",
        benefits: [
          "Reduces stress and anxiety",
          "Boosts energy levels",
          "Improves cognitive function",
          "Supports healthy sleep"
        ],
        usage: "Commonly taken in capsule or powder form, or as a tea.",
        cautions: "May affect thyroid hormone levels; consult a healthcare provider if you have thyroid issues. Not recommended for pregnant women.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "300-500mg daily"
          },
          {
            type: "Powder",
            description: "Can be mixed into smoothies, drinks, or food.",
            dosage: "1-2 teaspoons daily"
          },
          {
            type: "Tea",
            description: "Simmer the root in water for 15-20 minutes.",
            dosage: "Drink 1-2 cups daily",
            steps: [
              "Add 1 teaspoon of dried ashwagandha root to 1.5 cups of water",
              "Bring to a gentle boil, then reduce heat and simmer for 15-20 minutes",
              "Strain the liquid and discard the root material",
              "Add honey, cinnamon, or cardamom to taste (helps mask the bitter flavor)",
              "Drink 1 cup in the morning and/or evening",
              "Can be stored in the refrigerator for up to 2 days"
            ]
          }
        ],
        benefitScores: [
          { category: "Stress Relief", score: 95 },
          { category: "Energy", score: 90 },
          { category: "Cognitive Function", score: 85 },
          { category: "Sleep", score: 80 }
        ],
        complementaryHerbs: [
          {
            name: "Rhodiola",
            description: "Enhances stress-reducing effects."
          },
          {
            name: "Holy Basil",
            description: "Supports adrenal function and reduces anxiety."
          }
        ],
        origin: "India",
        harvestSeason: "Autumn",
        parts: ["Root", "Leaves"],
        traditionalUses: ["Reducing stress", "Improving energy", "Enhancing cognitive function"],
        constituents: ["Withanolides", "Alkaloids", "Saponins"],
        sustainabilityInfo: "Generally sustainable; ensure sourcing from reputable suppliers.",
        growingInfo: "Prefers well-drained soil and full sun.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ashwagandha_plant.jpg/640px-Ashwagandha_plant.jpg",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["Mild drowsiness", "Stomach upset"],
          contraindications: ["Pregnancy", "Thyroid disorders"],
          pregnancySafety: "Not recommended",
          childrenSafety: "Consult a pediatrician",
          pregnancySafe: false,
          interactions: ["Immunosuppressants", "Thyroid medications"],
          dosageLimit: "Do not exceed recommended dosage."
        },
        scientificResearch: [
          {
            title: "Ashwagandha in reducing stress and anxiety",
            summary: "A study showed significant reduction in stress and anxiety levels with regular ashwagandha use.",
						year: "2019",
            source: "Journal of Alternative and Complementary Medicine",
            type: "Clinical Trial",
            link: "https://example.com/ashwagandha-stress-study"
          }
        ],
        tags: ["adaptogen", "stress", "energy", "cognitive"],
        audience: ["adults", "students", "professionals"]
      },
      {
        id: "rhodiola",
        name: "Rhodiola",
        scientificName: "Rhodiola rosea",
        category: "adaptogens",
        description: "Rhodiola is a potent adaptogen known for its ability to enhance mental and physical performance, reduce fatigue, and help the body adapt to stress.",
        benefits: [
          "Enhances mental performance",
          "Reduces fatigue",
          "Improves physical endurance",
          "Helps with stress adaptation"
        ],
        usage: "Typically taken in capsule or tincture form.",
        cautions: "May cause insomnia or irritability in some individuals. Consult a healthcare provider if you have bipolar disorder.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "200-400mg daily",
            steps: [
              "Take 1 capsule (200-400mg) with a full glass of water",
              "For optimal results, take in the morning on an empty stomach",
              "Avoid taking in the evening as it may interfere with sleep",
              "Start with a lower dose (200mg) and gradually increase if needed",
              "Allow 2-3 weeks of consistent use to experience full benefits"
            ]
          },
          {
            type: "Tincture",
            description: "Liquid extract taken directly or mixed with water.",
            dosage: "1-2 ml daily"
          },
          {
            type: "Tea",
            description: "Simmer the root in water for 10-15 minutes.",
            dosage: "Drink 1 cup daily",
            steps: [
              "Add 1-2 teaspoons of dried rhodiola root to 2 cups of water",
              "Bring to a gentle boil, then reduce heat and simmer for 10-15 minutes",
              "Strain the liquid and discard the root material",
              "Add honey or lemon to taste (helps balance the bitter flavor)",
              "Drink 1 cup in the morning for best results",
              "Refrigerate any leftover tea and consume within 24 hours"
            ]
          }
        ],
        benefitScores: [
          { category: "Mental Performance", score: 92 },
          { category: "Fatigue Reduction", score: 90 },
          { category: "Physical Endurance", score: 88 },
          { category: "Stress Adaptation", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Eleuthero",
            description: "Supports adrenal function and enhances energy levels."
          },
          {
            name: "Schisandra",
            description: "Improves mental clarity and reduces stress."
          }
        ],
        origin: "Arctic and mountainous regions of Europe and Asia",
        harvestSeason: "Summer",
        parts: ["Root"],
        traditionalUses: ["Enhancing physical endurance", "Reducing fatigue", "Improving mental performance"],
        constituents: ["Rosavin", "Salidroside"],
        sustainabilityInfo: "Ensure sustainable harvesting practices to protect wild populations.",
        growingInfo: "Prefers cold climates and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rhodiola_rosea_170705.jpg/640px-Rhodiola_rosea_170705.jpg",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["Insomnia", "Irritability"],
          contraindications: ["Bipolar disorder"],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Not recommended",
          pregnancySafe: false,
          interactions: ["Stimulants", "MAO inhibitors"],
          dosageLimit: "Do not exceed recommended dosage."
        },
        scientificResearch: [
          {
            title: "Rhodiola rosea for mental fatigue",
            summary: "A study demonstrated that Rhodiola rosea significantly reduces mental fatigue and improves cognitive function.",
						year: "2015",
            source: "Phytomedicine",
            type: "Clinical Trial",
            link: "https://example.com/rhodiola-fatigue-study"
          }
        ],
        tags: ["adaptogen", "mental performance", "fatigue", "stress"],
        audience: ["adults", "athletes", "students"]
      },
      {
        id: "holy-basil",
        name: "Holy Basil",
        scientificName: "Ocimum sanctum",
        category: "adaptogens",
        description: "Holy Basil, also known as Tulsi, is revered in Ayurveda for its adaptogenic properties, helping the body cope with stress, supporting immune function, and promoting overall well-being.",
        benefits: [
          "Reduces stress and anxiety",
          "Supports immune function",
          "Promotes mental clarity",
          "Balances blood sugar levels"
        ],
        usage: "Commonly consumed as a tea, capsule, or tincture.",
        cautions: "May lower blood sugar levels; monitor if you have diabetes. Avoid if pregnant or planning to become pregnant.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water for 5-10 minutes.",
            dosage: "Drink 2-3 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "300-500mg daily"
          },
          {
            type: "Tincture",
            description: "Liquid extract taken directly or mixed with water.",
            dosage: "1-2 ml daily"
          }
        ],
        benefitScores: [
          { category: "Stress Relief", score: 90 },
          { category: "Immune Support", score: 88 },
          { category: "Mental Clarity", score: 85 },
          { category: "Blood Sugar Balance", score: 82 }
        ],
        complementaryHerbs: [
          {
            name: "Ashwagandha",
            description: "Enhances stress-reducing and adaptogenic effects."
          },
          {
            name: "Turmeric",
            description: "Supports immune function and reduces inflammation."
          }
        ],
        origin: "India",
        harvestSeason: "Summer",
        parts: ["Leaves", "Flowers"],
        traditionalUses: ["Reducing stress", "Supporting immune function", "Promoting mental clarity"],
        constituents: ["Eugenol", "Ursolic acid"],
        sustainabilityInfo: "Easy to grow and generally sustainable.",
        growingInfo: "Prefers warm climates and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Ocimum_tenuiflorum_in_West_Bengal_India.JPG/640px-Ocimum_tenuiflorum_in_West_Bengal_India.JPG",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["May lower blood sugar"],
          contraindications: ["Diabetes", "Pregnancy"],
          pregnancySafety: "Not recommended",
          childrenSafety: "Consult a pediatrician",
          pregnancySafe: false,
          interactions: ["Diabetes medications", "Anticoagulants"],
          dosageLimit: "Monitor blood sugar levels."
        },
        scientificResearch: [
          {
            title: "Holy basil for stress and anxiety",
            summary: "A study showed that holy basil significantly reduces stress and anxiety levels.",
						year: "2014",
            source: "Journal of Ayurveda and Integrative Medicine",
            type: "Clinical Trial",
            link: "https://example.com/holy-basil-stress-study"
          }
        ],
        tags: ["adaptogen", "stress", "immune", "mental clarity"],
        audience: ["adults", "individuals with stress", "those seeking immune support"]
      }
    ]
  },
  {
    id: "nervines",
    name: "Nervines",
    description: "calming the nervous system and promoting relaxation",
    icon: "🧠",
    color: "#6366F1",
    herbs: [
      {
        id: "lavender",
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        category: "nervines",
        description: "Lavender is well-known for its calming and relaxing properties, making it an excellent herb for reducing anxiety, promoting sleep, and easing tension.",
        benefits: [
          "Reduces anxiety and stress",
          "Promotes relaxation",
          "Improves sleep quality",
          "Eases headaches"
        ],
        usage: "Used in aromatherapy, teas, and topical applications.",
        cautions: "Generally safe; some people may experience mild skin irritation with topical use.",
        preparations: [
          {
            type: "Essential Oil",
            description: "Used in diffusers or diluted for topical application.",
            dosage: "A few drops in a diffuser or diluted in a carrier oil."
          },
          {
            type: "Tea",
            description: "Steep dried flowers in hot water for 5-10 minutes.",
            dosage: "Drink 1 cup before bed."
          },
          {
            type: "Bath",
            description: "Add essential oil or dried flowers to a warm bath.",
            dosage: "A few drops of essential oil or a handful of dried flowers."
          }
        ],
        benefitScores: [
          { category: "Anxiety Reduction", score: 95 },
          { category: "Relaxation", score: 92 },
          { category: "Sleep Improvement", score: 90 },
          { category: "Headache Relief", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Chamomile",
            description: "Enhances relaxation and sleep-promoting effects."
          },
          {
            name: "Lemon Balm",
            description: "Reduces anxiety and improves mood."
          }
        ],
        origin: "Mediterranean region",
        harvestSeason: "Summer",
        parts: ["Flowers"],
        traditionalUses: ["Reducing anxiety", "Promoting sleep", "Easing tension headaches"],
        constituents: ["Linalool", "Linalyl acetate"],
        sustainabilityInfo: "Easy to grow and generally sustainable.",
        growingInfo: "Prefers full sun and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Lavandula_angustifolia_flowers.jpg/640px-Lavandula_angustifolia_flowers.jpg",
        safetyProfile: {
          safetyRating: "Safe",
          sideEffects: ["Skin irritation (topical)"],
          contraindications: [],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: ["Sedatives"],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Lavender for anxiety disorders",
            summary: "A meta-analysis showed that lavender is effective in reducing symptoms of anxiety disorders.",
						year: "2013",
            source: "International Journal of Psychiatry in Clinical Practice",
            type: "Meta-Analysis",
            link: "https://example.com/lavender-anxiety-study"
          }
        ],
        tags: ["nervine", "anxiety", "relaxation", "sleep", "headache"],
        audience: ["adults", "individuals with anxiety", "those seeking relaxation"]
      },
      {
        id: "chamomile",
        name: "Chamomile",
        scientificName: "Matricaria chamomilla",
        category: "nervines",
        description: "Chamomile is a gentle and soothing herb known for its calming and anti-inflammatory properties. It is commonly used to promote relaxation, reduce anxiety, and aid sleep.",
        benefits: [
          "Promotes relaxation and calmness",
          "Reduces anxiety",
          "Aids sleep",
          "Soothes digestive upset"
        ],
        usage: "Typically consumed as a tea or used in aromatherapy.",
        cautions: "Generally safe; some people may be allergic, especially those allergic to ragweed.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried flowers in hot water for 5-10 minutes.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Essential Oil",
            description: "Used in diffusers or diluted for topical application.",
            dosage: "A few drops in a diffuser or diluted in a carrier oil."
          },
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "300-500mg daily"
          }
        ],
        benefitScores: [
          { category: "Relaxation", score: 94 },
          { category: "Anxiety Reduction", score: 90 },
          { category: "Sleep Aid", score: 88 },
          { category: "Digestive Soother", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Lavender",
            description: "Enhances relaxation and sleep-promoting effects."
          },
          {
            name: "Lemon Balm",
            description: "Reduces anxiety and improves mood."
          }
        ],
        origin: "Europe and Asia",
        harvestSeason: "Summer",
        parts: ["Flowers"],
        traditionalUses: ["Promoting relaxation", "Reducing anxiety", "Aiding sleep", "Soothing digestive upset"],
        constituents: ["Apigenin", "Bisabolol"],
        sustainabilityInfo: "Easy to grow and generally sustainable.",
        growingInfo: "Prefers full sun and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Matricaria_chamomilla_-_Köhler–s_Medizinal-Pflanzen-136.jpg/640px-Matricaria_chamomilla_-_Köhler–s_Medizinal-Pflanzen-136.jpg",
        safetyProfile: {
          safetyRating: "Safe",
          sideEffects: ["Allergic reaction (rare)"],
          contraindications: ["Ragweed allergy"],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: ["Sedatives", "Anticoagulants"],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Chamomile for generalized anxiety disorder",
            summary: "A study showed that chamomile significantly reduces symptoms of generalized anxiety disorder.",
						year: "2016",
            source: "Journal of Clinical Psychopharmacology",
            type: "Clinical Trial",
            link: "https://example.com/chamomile-anxiety-study"
          }
        ],
        tags: ["nervine", "relaxation", "anxiety", "sleep", "digestion"],
        audience: ["adults", "individuals with anxiety", "those seeking relaxation"]
      },
      {
        id: "lemon-balm",
        name: "Lemon Balm",
        scientificName: "Melissa officinalis",
        category: "nervines",
        description: "Lemon Balm is a calming herb known for its ability to reduce anxiety, improve mood, and enhance cognitive function. It is also used to soothe digestive issues and promote restful sleep.",
        benefits: [
          "Reduces anxiety and stress",
          "Improves mood",
          "Enhances cognitive function",
          "Soothes digestive issues"
        ],
        usage: "Commonly consumed as a tea, tincture, or capsule.",
        cautions: "Generally safe; may interact with thyroid medications.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water for 5-10 minutes.",
            dosage: "Drink 2-3 cups daily"
          },
          {
            type: "Tincture",
            description: "Liquid extract taken directly or mixed with water.",
            dosage: "1-2 ml daily"
          },
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "300-600mg daily"
          }
        ],
        benefitScores: [
          { category: "Anxiety Reduction", score: 92 },
          { category: "Mood Improvement", score: 90 },
          { category: "Cognitive Enhancement", score: 88 },
          { category: "Digestive Soother", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Lavender",
            description: "Enhances relaxation and sleep-promoting effects."
          },
          {
            name: "Chamomile",
            description: "Promotes relaxation and reduces anxiety."
          }
        ],
        origin: "Europe and Mediterranean region",
        harvestSeason: "Summer",
        parts: ["Leaves"],
        traditionalUses: ["Reducing anxiety", "Improving mood", "Enhancing cognitive function", "Soothing digestive issues"],
        constituents: ["Citronellal", "Geraniol"],
        sustainabilityInfo: "Easy to grow and generally sustainable.",
        growingInfo: "Prefers full sun and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Melissa_officinalis_CDP.jpg/640px-Melissa_officinalis_CDP.jpg",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: [],
          contraindications: ["Thyroid disorders"],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: ["Thyroid medications"],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Lemon balm for anxiety and mood",
            summary: "A study showed that lemon balm significantly reduces anxiety and improves mood.",
						year: "2014",
            source: "Journal of Alternative and Complementary Medicine",
            type: "Clinical Trial",
            link: "https://example.com/lemon-balm-anxiety-study"
          }
        ],
        tags: ["nervine", "anxiety", "mood", "cognitive", "digestion"],
        audience: ["adults", "individuals with anxiety", "those seeking cognitive enhancement"]
      }
    ]
  },
  {
    id: "digestive-aids",
    name: "Digestive Aids",
    description: "supporting healthy digestion and relieving digestive discomfort",
    icon: "🔥",
    color: "#F472B6",
    herbs: [
      {
        id: "ginger",
        name: "Ginger",
        scientificName: "Zingiber officinale",
        category: "digestive-aids",
        description: "Ginger is a well-known digestive aid that helps to relieve nausea, reduce inflammation, and improve overall digestive function.",
        benefits: [
          "Relieves nausea",
          "Reduces inflammation",
          "Improves digestion",
          "Eases stomach discomfort"
        ],
        usage: "Used in cooking, teas, and capsules.",
        cautions: "Generally safe; high doses may cause mild stomach upset.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried ginger in hot water for 5-10 minutes.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extracts in capsule form for consistent dosing.",
            dosage: "500-1000mg daily"
          },
          {
            type: "Fresh Ginger",
            description: "Add fresh ginger to meals or smoothies.",
            dosage: "1-2 teaspoons daily"
          }
        ],
        benefitScores: [
          { category: "Nausea Relief", score: 95 },
          { category: "Inflammation Reduction", score: 92 },
          { category: "Digestion Improvement", score: 90 },
          { category: "Stomach Comfort", score: 88 }
        ],
        complementaryHerbs: [
          {
            name: "Peppermint",
            description: "Enhances nausea relief and soothes digestive discomfort."
          },
          {
            name: "Chamomile",
            description: "Reduces inflammation and promotes relaxation."
          }
        ],
        origin: "Southeast Asia",
        harvestSeason: "Autumn",
        parts: ["Rhizome"],
        traditionalUses: ["Relieving nausea", "Reducing inflammation", "Improving digestion"],
        constituents: ["Gingerol", "Shogaol"],
        sustainabilityInfo: "Widely cultivated and generally sustainable.",
        growingInfo: "Prefers warm climates and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Zingiber_officinale_close-up.jpg/640px-Zingiber_officinale_close-up.jpg",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["Mild stomach upset (high doses)"],
          contraindications: [],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: ["Anticoagulants"],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Ginger for nausea and vomiting",
            summary: "A meta-analysis showed that ginger is effective in reducing nausea and vomiting.",
						year: "2015",
            source: "American Journal of Obstetrics and Gynecology",
            type: "Meta-Analysis",
            link: "https://example.com/ginger-nausea-study"
          }
        ],
        tags: ["digestive aid", "nausea", "inflammation", "digestion", "stomach"],
        audience: ["adults", "pregnant women (with caution)", "individuals with digestive issues"]
      },
      {
        id: "peppermint",
        name: "Peppermint",
        scientificName: "Mentha piperita",
        category: "digestive-aids",
        description: "Peppermint is a refreshing herb known for its ability to soothe digestive discomfort, relieve bloating, and ease muscle tension.",
        benefits: [
          "Soothes digestive discomfort",
          "Relieves bloating and gas",
          "Eases muscle tension",
          "Freshens breath"
        ],
        usage: "Used in teas, essential oils, and capsules.",
        cautions: "May worsen heartburn in some individuals.",
        preparations: [
          {
            type: "Tea",
            description: "Steep fresh or dried leaves in hot water for 5-10 minutes.",
            dosage: "Drink 1-3 cups daily",
            steps: [
              "Bring 1 cup of water to a boil, then remove from heat",
              "Add 1-2 teaspoons of dried peppermint leaves or 3-4 fresh leaves",
              "Cover and steep for 5-10 minutes (longer for stronger tea)",
              "Strain the leaves and add honey or lemon if desired",
              "Drink after meals to aid digestion or as needed for stomach discomfort",
              "Can be enjoyed hot or cold (makes excellent iced tea)"
            ]
          },
          {
            type: "Essential Oil",
            description: "Used in diffusers or diluted for topical application.",
            dosage: "A few drops in a diffuser or diluted in a carrier oil."
          },
          {
            type: "Capsule",
            description: "Enteric-coated capsules for targeted release in the intestines.",
            dosage: "1-2 capsules daily",
            steps: [
              "Take 1 enteric-coated capsule with a full glass of water",
              "For IBS or digestive discomfort, take 30 minutes before meals",
              "May take up to 2 capsules daily if needed for symptom relief",
              "Swallow capsules whole - do not crush or chew (breaks enteric coating)",
              "If experiencing heartburn, discontinue use and consult healthcare provider",
              "Store in a cool, dry place away from direct sunlight"
            ]
          }
        ],
        benefitScores: [
          { category: "Digestive Soother", score: 94 },
          { category: "Bloating Relief", score: 92 },
          { category: "Muscle Relaxant", score: 88 },
          { category: "Breath Freshener", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Ginger",
            description: "Enhances nausea relief and soothes digestive discomfort."
          },
          {
            name: "Fennel",
            description: "Reduces bloating and gas."
          }
        ],
        origin: "Europe and Middle East",
        harvestSeason: "Summer",
        parts: ["Leaves"],
        traditionalUses: ["Soothing digestive discomfort", "Relieving bloating", "Easing muscle tension"],
        constituents: ["Menthol", "Menthone"],
        sustainabilityInfo: "Easy to grow and generally sustainable.",
        growingInfo: "Prefers full sun and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mentha_x_piperita_0005.JPG/640px-Mentha_x_piperita_0005.JPG",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["May worsen heartburn"],
          contraindications: [],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: [],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Peppermint oil for irritable bowel syndrome",
            summary: "A meta-analysis showed that peppermint oil is effective in reducing symptoms of irritable bowel syndrome.",
						year: "2014",
            source: "BMC Complementary and Alternative Medicine",
            type: "Meta-Analysis",
            link: "https://example.com/peppermint-ibs-study"
          }
        ],
        tags: ["digestive aid", "digestion", "bloating", "muscle tension", "breath"],
        audience: ["adults", "individuals with digestive issues", "those seeking muscle relaxation"]
      },
      {
        id: "fennel",
        name: "Fennel",
        scientificName: "Foeniculum vulgare",
        category: "digestive-aids",
        description: "Fennel is an aromatic herb known for its ability to relieve bloating, reduce gas, and support healthy digestion.",
        benefits: [
          "Relieves bloating and gas",
          "Supports healthy digestion",
          "Freshens breath",
          "Eases menstrual cramps"
        ],
        usage: "Used in cooking, teas, and capsules.",
        cautions: "Generally safe; may cause allergic reactions in some individuals.",
        preparations: [
          {
            type: "Tea",
            description: "Steep seeds in hot water for 5-10 minutes.",
            dosage: "Drink 1-3 cups daily",
            steps: [
              "Crush 1-2 teaspoons of fennel seeds slightly to release more flavor",
              "Bring 1 cup of water to a boil, then remove from heat",
              "Add the crushed fennel seeds to the hot water",
              "Cover and steep for 5-10 minutes",
              "Strain the seeds and add honey if desired",
              "Drink after meals to aid digestion or when experiencing bloating"
            ]
          },
          {
            type: "Seeds",
            description: "Chew seeds after meals to aid digestion.",
            dosage: "1/2-1 teaspoon after meals",
            steps: [
              "Measure 1/2-1 teaspoon of whole fennel seeds",
              "Chew the seeds thoroughly after meals",
              "For enhanced flavor, you can lightly toast the seeds in a dry pan first",
              "Store seeds in an airtight container in a cool, dark place",
              "Can be combined with anise or cardamom seeds for variety",
              "Helps freshen breath while aiding digestion"
            ]
          },
          {
            type: "Essential Oil",
            description: "Used in diffusers or diluted for topical application.",
            dosage: "A few drops in a diffuser or diluted in a carrier oil."
          }
        ],
        benefitScores: [
          { category: "Bloating Relief", score: 92 },
          { category: "Digestion Support", score: 90 },
          { category: "Breath Freshener", score: 88 },
          { category: "Menstrual Cramp Relief", score: 85 }
        ],
        complementaryHerbs: [
          {
            name: "Ginger",
            description: "Enhances nausea relief and soothes digestive discomfort."
          },
          {
            name: "Peppermint",
            description: "Soothes digestive discomfort and relieves bloating."
          }
        ],
        origin: "Mediterranean region",
        harvestSeason: "Autumn",
        parts: ["Seeds", "Leaves", "Bulb"],
        traditionalUses: ["Relieving bloating", "Supporting digestion", "Freshening breath"],
        constituents: ["Anethole", "Fenchone"],
        sustainabilityInfo: "Widely cultivated and generally sustainable.",
        growingInfo: "Prefers full sun and well-drained soil.",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Foeniculum_vulgare_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-121.jpg/640px-Foeniculum_vulgare_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-121.jpg",
        safetyProfile: {
          safetyRating: "Generally Safe",
          sideEffects: ["Allergic reaction (rare)"],
          contraindications: [],
          pregnancySafety: "Consult a healthcare provider",
          childrenSafety: "Use with caution",
          pregnancySafe: false,
          interactions: [],
          dosageLimit: "Follow recommended dosages."
        },
        scientificResearch: [
          {
            title: "Fennel for infantile colic",
            summary: "A study showed that fennel is effective in reducing symptoms of infantile colic.",
						year: "2003",
            source: "Alternative Therapies in Health and Medicine",
            type: "Clinical Trial",
            link: "https://example.com/fennel-colic-study"
          }
        ],
        tags: ["digestive aid", "digestion", "bloating", "breath", "menstrual cramps"],
        audience: ["adults", "individuals with digestive issues", "women with menstrual cramps"]
      }
    ]
  },
  {
    id: "stomach-herbs",
    name: "Stomach Herbs",
    description: "Herbs that support digestive health and function",
    icon: "🍃",
    color: "#10B981",
    herbs: [
      {
        id: "marshmallow-root-stomach",
        name: "Marshmallow Root",
        scientificName: "Althaea officinalis",
        category: "stomach-herbs",
        description: "Marshmallow root contains mucilage that forms a protective layer on the lining of the digestive tract, soothing irritation and inflammation.",
        benefits: [
          "Soothes digestive tract irritation",
          "Relieves heartburn and acid reflux",
          "Helps heal leaky gut",
          "Reduces inflammation in the digestive system"
        ],
        usage: "Commonly taken as a tea, tincture, or in capsule form.",
        cautions: "May slow the absorption of other medications. Take at least 2 hours apart from other medications.",
        preparations: [
          {
            type: "Cold Infusion",
            description: "Cold extraction preserves the mucilage content.",
            dosage: "1-2 cups daily",
            steps: [
              "Add 1-2 tablespoons of dried marshmallow root to a jar",
              "Fill with 2 cups of cold water",
              "Cover and let sit for 4-8 hours or overnight in the refrigerator",
              "Strain and drink throughout the day",
              "Store unused portion in the refrigerator for up to 3 days"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "2-4 ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Digestive Soothing", score: 95 },
          { category: "Inflammation Reduction", score: 85 },
          { category: "Mucous Membrane Support", score: 90 },
          { category: "Gut Healing", score: 80 }
        ],
        origin: "Europe, Western Asia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Althaea_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg/640px-Althaea_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg",
        tags: ["demulcent", "digestive", "soothing", "mucilage"]
      },
      {
        id: "meadowsweet-stomach",
        name: "Meadowsweet",
        scientificName: "Filipendula ulmaria",
        category: "stomach-herbs",
        description: "Meadowsweet contains natural salicylates that help reduce inflammation and pain in the digestive tract while protecting the stomach lining.",
        benefits: [
          "Reduces excess stomach acid",
          "Soothes gastritis and ulcers",
          "Relieves digestive discomfort",
          "Helps with diarrhea and indigestion"
        ],
        usage: "Used as a tea, tincture, or in capsule form.",
        cautions: "Avoid if allergic to aspirin or salicylates. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Tea",
            description: "Dried flowers and leaves steeped in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Add 1-2 teaspoons of dried meadowsweet to a cup",
              "Pour boiling water over the herbs",
              "Cover and steep for 10-15 minutes",
              "Strain and drink after meals for digestive support",
              "Add honey if desired to offset the bitter taste"
            ]
          },
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "2-4 ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Acid Reduction", score: 90 },
          { category: "Inflammation Reduction", score: 85 },
          { category: "Digestive Comfort", score: 85 },
          { category: "Ulcer Protection", score: 80 }
        ],
        origin: "Europe, Western Asia",
        parts: ["Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Filipendula_ulmaria_inflorescence.jpg/640px-Filipendula_ulmaria_inflorescence.jpg",
        tags: ["digestive", "anti-inflammatory", "antacid", "astringent"]
      },
      {
        id: "slippery-elm-stomach",
        name: "Slippery Elm",
        scientificName: "Ulmus rubra",
        category: "stomach-herbs",
        description: "Slippery elm contains mucilage that coats and soothes the digestive tract, making it beneficial for various digestive conditions.",
        benefits: [
          "Soothes irritated digestive tract",
          "Relieves symptoms of IBS and IBD",
          "Helps with acid reflux and GERD",
          "Supports overall digestive health"
        ],
        usage: "Taken as a powder mixed with water, in lozenges, or in capsule form.",
        cautions: "May slow absorption of medications. Take at least 2 hours apart from other medications.",
        preparations: [
          {
            type: "Gruel",
            description: "Powder mixed with water to form a soothing paste.",
            dosage: "1-2 tablespoons, 1-3 times daily",
            steps: [
              "Mix 1-2 tablespoons of slippery elm powder with a small amount of cold water",
              "Stir to form a paste",
              "Add 1 cup of hot water or milk while stirring",
              "Optionally add honey and cinnamon for flavor",
              "Drink immediately before it thickens too much"
            ]
          },
          {
            type: "Capsule",
            description: "Powdered herb in capsule form.",
            dosage: "400-500mg, 3-4 times daily"
          }
        ],
        benefitScores: [
          { category: "Digestive Soothing", score: 95 },
          { category: "Inflammation Reduction", score: 80 },
          { category: "Mucous Membrane Support", score: 90 },
          { category: "Gut Healing", score: 85 }
        ],
        origin: "North America",
        parts: ["Inner bark"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Ulmus_rubra_leaves.jpg/640px-Ulmus_rubra_leaves.jpg",
        tags: ["demulcent", "digestive", "soothing", "mucilage"]
      },
      {
        id: "cardamom-stomach",
        name: "Cardamom",
        scientificName: "Elettaria cardamomum",
        category: "stomach-herbs",
        description: "Cardamom is an aromatic spice that aids digestion, relieves gas and bloating, and adds a pleasant flavor to digestive remedies.",
        benefits: [
          "Relieves gas and bloating",
          "Stimulates digestion",
          "Freshens breath",
          "Soothes stomach discomfort"
        ],
        usage: "Used as a culinary spice, in tea, or as a supplement.",
        cautions: "Generally safe in food amounts. Large medicinal doses may interact with certain medications.",
        preparations: [
          {
            type: "Tea",
            description: "Crushed seeds steeped in hot water.",
            dosage: "1-2 cups after meals",
            steps: [
              "Crush 3-5 cardamom pods to release the seeds",
              "Add to 1 cup of boiling water",
              "Cover and steep for 5-10 minutes",
              "Strain and drink after meals to aid digestion",
              "Can add honey or combine with ginger for enhanced benefits"
            ]
          },
          {
            type: "Culinary",
            description: "Added to foods as a digestive aid.",
            dosage: "As needed in cooking",
            steps: [
              "Add ground cardamom to curries, stews, or baked goods",
              "Use whole pods in rice dishes or teas",
              "Chew 1-2 seeds after meals to freshen breath and aid digestion",
              "Combine with fennel and cumin for a traditional digestive spice mix"
            ]
          }
        ],
        benefitScores: [
          { category: "Gas Relief", score: 85 },
          { category: "Digestive Stimulation", score: 90 },
          { category: "Breath Freshening", score: 95 },
          { category: "Stomach Comfort", score: 80 }
        ],
        origin: "India, Sri Lanka",
        parts: ["Seeds", "Pods"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg/640px-Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg",
        tags: ["carminative", "digestive", "aromatic", "spice"]
      },
      {
        id: "gentian-root-stomach",
        name: "Gentian Root",
        scientificName: "Gentiana lutea",
        category: "stomach-herbs",
        description: "Gentian root is one of the most bitter herbs used in herbalism, stimulating digestive function and increasing digestive secretions.",
        benefits: [
          "Stimulates digestive secretions",
          "Improves appetite",
          "Supports liver function",
          "Helps with malabsorption issues"
        ],
        usage: "Used as a tincture, in digestive bitters formulas, or occasionally as a tea.",
        cautions: "May worsen acid reflux or gastritis. Not recommended during pregnancy or for those with peptic ulcers.",
        preparations: [
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "5-10 drops before meals",
            steps: [
              "Take 5-10 drops of gentian tincture in a small amount of water",
              "Take 10-15 minutes before meals to stimulate digestion",
              "Start with a lower dose and increase gradually",
              "The bitter taste is therapeutic and should not be masked completely",
              "Can combine with aromatic herbs like ginger or orange peel to improve flavor"
            ]
          },
          {
            type: "Digestive Bitters",
            description: "Combination of bitter herbs for digestive support.",
            dosage: "1/4 teaspoon before meals"
          }
        ],
        benefitScores: [
          { category: "Digestive Stimulation", score: 95 },
          { category: "Appetite Support", score: 90 },
          { category: "Liver Support", score: 80 },
          { category: "Nutrient Absorption", score: 85 }
        ],
        origin: "Europe, Asia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Gentiana_lutea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-089.jpg/640px-Gentiana_lutea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-089.jpg",
        tags: ["bitter", "digestive", "tonic", "hepatic"]
      },
      {
        id: "angelica-root-stomach",
        name: "Angelica Root",
        scientificName: "Angelica archangelica",
        category: "stomach-herbs",
        description: "Angelica root is a warming digestive herb that relieves gas, bloating, and digestive discomfort while stimulating appetite.",
        benefits: [
          "Relieves gas and bloating",
          "Stimulates digestion and appetite",
          "Reduces digestive cramping",
          "Warms the digestive system"
        ],
        usage: "Used as a tincture, tea, or in culinary applications.",
        cautions: "May increase sensitivity to sunlight. Not recommended during pregnancy or for those with bleeding disorders.",
        preparations: [
          {
            type: "Tea",
            description: "Dried root steeped in hot water.",
            dosage: "1 cup, 2-3 times daily",
            steps: [
              "Add 1-2 teaspoons of dried, chopped angelica root to a cup",
              "Pour boiling water over the herb",
              "Cover and steep for 10-15 minutes",
              "Strain and drink before or after meals",
              "Add honey if desired to offset the bitter taste"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "20-40 drops, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Gas Relief", score: 85 },
          { category: "Digestive Warming", score: 90 },
          { category: "Appetite Stimulation", score: 85 },
          { category: "Antispasmodic", score: 80 }
        ],
        origin: "Northern Europe, Russia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Angelica_archangelica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-016.jpg/640px-Angelica_archangelica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-016.jpg",
        tags: ["carminative", "digestive", "warming", "bitter"]
      },
      {
        id: "agrimony-stomach",
        name: "Agrimony",
        scientificName: "Agrimonia eupatoria",
        category: "stomach-herbs",
        description: "Agrimony is a gentle astringent herb that helps tone the digestive tract, reduce inflammation, and support liver function.",
        benefits: [
          "Tones the digestive tract",
          "Reduces mild diarrhea",
          "Supports liver function",
          "Helps with digestive inflammation"
        ],
        usage: "Used as a tea or tincture.",
        cautions: "May increase the effects of blood thinning medications. Use with caution if taking anticoagulants.",
        preparations: [
          {
            type: "Tea",
            description: "Dried herb steeped in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Add 1-2 teaspoons of dried agrimony to a cup",
              "Pour boiling water over the herb",
              "Cover and steep for 10-15 minutes",
              "Strain and drink between meals",
              "For digestive issues, drink after meals"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "20-30 drops, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Digestive Toning", score: 85 },
          { category: "Astringent Action", score: 90 },
          { category: "Liver Support", score: 75 },
          { category: "Anti-inflammatory", score: 80 }
        ],
        origin: "Europe, Asia",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Agrimonia_eupatoria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-006.jpg/640px-Agrimonia_eupatoria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-006.jpg",
        tags: ["astringent", "digestive", "hepatic", "anti-inflammatory"]
      },
      {
        id: "marshmallow-root",
        name: "Marshmallow Root",
        scientificName: "Althaea officinalis",
        category: "stomach-herbs",
        description: "Marshmallow root contains mucilage that forms a protective layer on the digestive tract, soothing inflammation and irritation.",
        benefits: [
          "Soothes digestive tract inflammation",
          "Relieves heartburn and acid reflux",
          "Helps heal leaky gut",
          "Relieves constipation"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May slow absorption of other medications. Take at least 2 hours apart from other medications.",
        preparations: [
          {
            type: "Tea",
            description: "Cold infusion is best to extract mucilage. Steep in cold water for 4-8 hours.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-1600mg, 3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-5ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Digestive Soothing", score: 95 },
          { category: "Acid Reflux Relief", score: 90 },
          { category: "Gut Healing", score: 85 },
          { category: "Constipation Relief", score: 75 }
        ],
        origin: "Europe and Western Asia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Althaea_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-008.jpg/640px-Althaea_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-008.jpg",
        tags: ["digestive", "soothing", "mucilage", "inflammation"]
      },
      {
        id: "meadowsweet",
        name: "Meadowsweet",
        scientificName: "Filipendula ulmaria",
        category: "stomach-herbs",
        description: "Meadowsweet contains natural salicylates that help reduce inflammation and pain in the digestive tract, particularly for conditions like gastritis and ulcers.",
        benefits: [
          "Reduces digestive tract inflammation",
          "Helps heal gastritis and ulcers",
          "Relieves acid reflux and heartburn",
          "Balances stomach acid production"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "Contains salicylates (similar to aspirin). Avoid if you have aspirin sensitivity or are taking blood thinners.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried flowers and leaves in hot water.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Inflammation Reduction", score: 90 },
          { category: "Ulcer Healing", score: 85 },
          { category: "Acid Balance", score: 90 },
          { category: "Pain Relief", score: 80 }
        ],
        origin: "Europe and Western Asia",
        parts: ["Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Filipendula_ulmaria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-059.jpg/640px-Filipendula_ulmaria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-059.jpg",
        tags: ["digestive", "anti-inflammatory", "ulcer", "acid reflux"]
      },
      {
        id: "cardamom",
        name: "Cardamom",
        scientificName: "Elettaria cardamomum",
        category: "stomach-herbs",
        description: "Cardamom is a warming spice that stimulates digestion, reduces gas and bloating, and helps with nausea and indigestion.",
        benefits: [
          "Stimulates digestion",
          "Reduces gas and bloating",
          "Relieves nausea and indigestion",
          "Freshens breath"
        ],
        usage: "Can be used as a culinary spice, consumed as a tea, or in capsule form.",
        cautions: "Generally safe for most people. May interact with medications for gallstones.",
        preparations: [
          {
            type: "Tea",
            description: "Steep crushed pods in hot water.",
            dosage: "1-2 cups daily"
          },
          {
            type: "Culinary",
            description: "Add ground seeds to food and beverages.",
            dosage: "As desired in cooking"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg daily"
          }
        ],
        benefitScores: [
          { category: "Digestive Stimulation", score: 85 },
          { category: "Gas Relief", score: 90 },
          { category: "Nausea Relief", score: 80 },
          { category: "Breath Freshening", score: 75 }
        ],
        origin: "India and Sri Lanka",
        parts: ["Seeds", "Pods"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg/640px-Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg",
        tags: ["digestive", "spice", "carminative", "aromatic"]
      },
      {
        id: "slippery-elm",
        name: "Slippery Elm",
        scientificName: "Ulmus rubra",
        category: "stomach-herbs",
        description: "Slippery elm contains mucilage that forms a gel-like substance when mixed with water, coating and soothing the digestive tract.",
        benefits: [
          "Soothes digestive tract inflammation",
          "Relieves heartburn and acid reflux",
          "Helps with IBS symptoms",
          "Relieves constipation"
        ],
        usage: "Commonly consumed as a powder mixed with water, in lozenge form, or as capsules.",
        cautions: "May slow absorption of other medications. Take at least 2 hours apart from other medications.",
        preparations: [
          {
            type: "Powder",
            description: "Mix with water to form a gruel or add to smoothies.",
            dosage: "1-2 tablespoons mixed with water, 1-3 times daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-500mg, 3-4 times daily"
          },
          {
            type: "Lozenge",
            description: "Slowly dissolve in mouth for throat and digestive relief.",
            dosage: "As needed for symptom relief"
          }
        ],
        benefitScores: [
          { category: "Digestive Soothing", score: 95 },
          { category: "Acid Reflux Relief", score: 90 },
          { category: "IBS Relief", score: 85 },
          { category: "Constipation Relief", score: 80 }
        ],
        origin: "North America",
        parts: ["Inner bark"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Ulmus_rubra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-274.jpg/640px-Ulmus_rubra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-274.jpg",
        tags: ["digestive", "mucilage", "soothing", "inflammation"]
      },
      {
        id: "gentian-root",
        name: "Gentian Root",
        scientificName: "Gentiana lutea",
        category: "stomach-herbs",
        description: "Gentian root is one of the most bitter herbs, which stimulates digestive secretions, improves appetite, and enhances overall digestion.",
        benefits: [
          "Stimulates digestive secretions",
          "Improves appetite",
          "Enhances nutrient absorption",
          "Relieves bloating and gas"
        ],
        usage: "Commonly consumed as a tincture, in capsule form, or as a tea.",
        cautions: "May worsen acid reflux in some individuals. Not recommended for those with stomach ulcers or high blood pressure.",
        preparations: [
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "5-10 drops in water before meals"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "250-500mg, 15-30 minutes before meals"
          },
          {
            type: "Tea",
            description: "Steep dried root in hot water.",
            dosage: "Small amounts (1/4 cup) before meals"
          }
        ],
        benefitScores: [
          { category: "Digestive Stimulation", score: 95 },
          { category: "Appetite Improvement", score: 90 },
          { category: "Nutrient Absorption", score: 85 },
          { category: "Gas Relief", score: 80 }
        ],
        origin: "Europe and Western Asia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gentiana_lutea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-062.jpg/640px-Gentiana_lutea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-062.jpg",
        tags: ["digestive", "bitter", "appetite", "stimulant"]
      },
      {
        id: "angelica-root",
        name: "Angelica Root",
        scientificName: "Angelica archangelica",
        category: "stomach-herbs",
        description: "Angelica root is a warming herb that stimulates digestion, relieves gas and bloating, and helps with digestive spasms and cramps.",
        benefits: [
          "Stimulates digestion",
          "Relieves gas and bloating",
          "Eases digestive spasms and cramps",
          "Improves appetite"
        ],
        usage: "Commonly consumed as a tea, in tincture form, or as a culinary herb.",
        cautions: "May increase sensitivity to sunlight. Not recommended during pregnancy or for those with diabetes or blood clotting disorders.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried root in hot water.",
            dosage: "1-2 cups daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "1-2ml, 3 times daily"
          },
          {
            type: "Culinary",
            description: "Add to soups, stews, or as a flavoring.",
            dosage: "As desired in cooking"
          }
        ],
        benefitScores: [
          { category: "Digestive Stimulation", score: 85 },
          { category: "Gas Relief", score: 90 },
          { category: "Spasm Relief", score: 85 },
          { category: "Appetite Improvement", score: 80 }
        ],
        origin: "Northern Europe and Russia",
        parts: ["Root", "Seeds"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Angelica_archangelica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg/640px-Angelica_archangelica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg",
        tags: ["digestive", "carminative", "warming", "antispasmodic"]
      },
      {
        id: "agrimony",
        name: "Agrimony",
        scientificName: "Agrimonia eupatoria",
        category: "stomach-herbs",
        description: "Agrimony is an astringent herb that helps with diarrhea, mild digestive bleeding, and inflammation of the digestive tract.",
        benefits: [
          "Helps with diarrhea",
          "Reduces mild digestive bleeding",
          "Soothes digestive tract inflammation",
          "Supports liver function"
        ],
        usage: "Commonly consumed as a tea or in tincture form.",
        cautions: "May increase effects of blood-thinning medications. Use with caution if you have diabetes as it may lower blood sugar.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried herb in hot water.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Diarrhea Relief", score: 90 },
          { category: "Bleeding Control", score: 85 },
          { category: "Inflammation Reduction", score: 80 },
          { category: "Liver Support", score: 75 }
        ],
        origin: "Europe, Asia, and North America",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Agrimonia_eupatoria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-005.jpg/640px-Agrimonia_eupatoria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-005.jpg",
        tags: ["digestive", "astringent", "anti-inflammatory", "liver"]
      },
      {
        id: "wild-yam",
        name: "Wild Yam",
        scientificName: "Dioscorea villosa",
        category: "stomach-herbs",
        description: "Wild yam contains diosgenin, which helps with digestive spasms, inflammation, and pain, particularly for conditions like diverticulitis and gallbladder issues.",
        benefits: [
          "Relieves digestive spasms and cramps",
          "Reduces digestive inflammation",
          "Helps with gallbladder issues",
          "Supports hormone balance"
        ],
        usage: "Commonly consumed in capsule form, as a tincture, or as a tea.",
        cautions: "May interact with hormone medications. Not recommended during pregnancy or for those with hormone-sensitive conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 3 times daily"
          },
          {
            type: "Tea",
            description: "Steep dried root in hot water.",
            dosage: "1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Spasm Relief", score: 90 },
          { category: "Inflammation Reduction", score: 85 },
          { category: "Gallbladder Support", score: 80 },
          { category: "Hormone Balance", score: 75 }
        ],
        origin: "North America",
        parts: ["Root", "Rhizome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-045.jpg/640px-Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-045.jpg",
        tags: ["digestive", "antispasmodic", "anti-inflammatory", "hormonal"]
      }
    ]
  },
  {
    id: "heart-herbs",
    name: "Heart Herbs",
    description: "Herbs that support heart health and circulation",
    icon: "❤️",
    color: "#EF4444",
    herbs: [
      {
        id: "linden-heart",
        name: "Linden",
        scientificName: "Tilia cordata",
        category: "heart-herbs",
        description: "Linden flowers and leaves have been used traditionally to support heart health, reduce blood pressure, and calm anxiety.",
        benefits: [
          "Helps reduce high blood pressure",
          "Supports healthy circulation",
          "Calms anxiety and nervous tension",
          "Has mild sedative properties"
        ],
        usage: "Commonly consumed as a tea or tincture.",
        cautions: "Generally safe, but may interact with diuretic medications and sedatives.",
        preparations: [
          {
            type: "Tea",
            description: "Dried flowers and leaves steeped in hot water.",
            dosage: "1-3 cups daily",
            steps: [
              "Add 1-2 teaspoons of dried linden flowers to a cup",
              "Pour boiling water over the herbs",
              "Cover and steep for 10-15 minutes",
              "Strain and drink, especially in the evening for relaxation",
              "Add honey if desired for sweetness"
            ]
          },
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "2-4 ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Blood Pressure Support", score: 85 },
          { category: "Circulation", score: 80 },
          { category: "Anxiety Relief", score: 90 },
          { category: "Heart Health", score: 85 }
        ],
        origin: "Europe, Western Asia",
        parts: ["Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Tilia_cordata_flowers.jpg/640px-Tilia_cordata_flowers.jpg",
        tags: ["cardiovascular", "nervine", "hypotensive", "sedative"]
      },
      {
        id: "motherwort-heart",
        name: "Motherwort",
        scientificName: "Leonurus cardiaca",
        category: "heart-herbs",
        description: "Motherwort has a long history of use for heart conditions, particularly those with a nervous component, such as heart palpitations due to anxiety.",
        benefits: [
          "Helps regulate heart rhythm",
          "Reduces heart palpitations",
          "Lowers blood pressure",
          "Calms anxiety and stress"
        ],
        usage: "Used as a tincture, tea, or in capsule form.",
        cautions: "May interact with heart medications and sedatives. Not recommended during pregnancy as it can stimulate uterine contractions.",
        preparations: [
          {
            type: "Tincture",
            description: "Preferred method due to the bitter taste of tea.",
            dosage: "1-2 ml, 3 times daily",
            steps: [
              "Take 1-2 ml of motherwort tincture",
              "Add to a small amount of water",
              "Take 3 times daily, especially during periods of stress or anxiety",
              "For acute heart palpitations, take an additional dose as needed",
              "Continue regular use for 3-4 weeks for best results"
            ]
          },
          {
            type: "Tea",
            description: "Dried herb steeped in hot water, quite bitter.",
            dosage: "1 cup, 1-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Heart Rhythm", score: 90 },
          { category: "Blood Pressure", score: 80 },
          { category: "Anxiety Relief", score: 85 },
          { category: "Heart Health", score: 85 }
        ],
        origin: "Europe, Central Asia",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Leonurus_cardiaca_flowers.jpg/640px-Leonurus_cardiaca_flowers.jpg",
        tags: ["cardiovascular", "nervine", "hypotensive", "antispasmodic"]
      },
      {
        id: "hawthorn-heart",
        name: "Hawthorn",
        scientificName: "Crataegus species",
        category: "heart-herbs",
        description: "Hawthorn is considered one of the most valuable herbs for the cardiovascular system, supporting overall heart function and health.",
        benefits: [
          "Strengthens heart muscle",
          "Improves coronary blood flow",
          "Helps regulate blood pressure",
          "Supports overall cardiovascular health"
        ],
        usage: "Used as a tincture, tea, or in capsule form.",
        cautions: "May interact with heart medications, especially digitalis. Consult with a healthcare provider if taking cardiovascular medications.",
        preparations: [
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "2-5 ml, 3 times daily",
            steps: [
              "Take 2-5 ml of hawthorn tincture",
              "Add to a small amount of water",
              "Take 3 times daily with meals",
              "Consistent use for 4-8 weeks is recommended for noticeable benefits",
              "May be used long-term for cardiovascular support"
            ]
          },
          {
            type: "Tea",
            description: "Dried berries, flowers, and/or leaves steeped in hot water.",
            dosage: "1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Heart Strength", score: 95 },
          { category: "Circulation", score: 90 },
          { category: "Blood Pressure", score: 85 },
          { category: "Heart Health", score: 95 }
        ],
        origin: "Europe, North America, Asia",
        parts: ["Berries", "Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Crataegus_monogyna_flowers.jpg/640px-Crataegus_monogyna_flowers.jpg",
        tags: ["cardiovascular", "cardiotonic", "hypotensive", "antioxidant"]
      },
      {
        id: "night-blooming-cereus-heart",
        name: "Night-Blooming Cereus",
        scientificName: "Selenicereus grandiflorus",
        category: "heart-herbs",
        description: "Night-Blooming Cereus is a cactus with flowers that have been traditionally used to support heart function and rhythm.",
        benefits: [
          "Supports healthy heart rhythm",
          "Strengthens heart contractions",
          "May help with angina symptoms",
          "Supports overall cardiovascular function"
        ],
        usage: "Typically used as a tincture or in homeopathic preparations.",
        cautions: "May interact with heart medications. Not recommended for self-treatment of heart conditions without professional guidance.",
        preparations: [
          {
            type: "Tincture",
            description: "Alcohol-based extract of the flowers.",
            dosage: "5-10 drops, 3 times daily",
            steps: [
              "Take 5-10 drops of night-blooming cereus tincture in water",
              "Start with lower doses and increase gradually",
              "Take 3 times daily between meals",
              "Use consistently for at least 4-6 weeks",
              "Always use under professional guidance for heart conditions"
            ]
          },
          {
            type: "Homeopathic",
            description: "Diluted preparation used in homeopathy.",
            dosage: "As directed by a homeopathic practitioner"
          }
        ],
        benefitScores: [
          { category: "Heart Rhythm", score: 90 },
          { category: "Heart Strength", score: 85 },
          { category: "Angina Relief", score: 80 },
          { category: "Heart Health", score: 85 }
        ],
        origin: "Mexico, Caribbean, Central America",
        parts: ["Flowers", "Stems"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Selenicereus_grandiflorus_-_Queen_of_the_Night_Cactus.jpg/640px-Selenicereus_grandiflorus_-_Queen_of_the_Night_Cactus.jpg",
        tags: ["cardiotonic", "antispasmodic", "heart", "rhythm"]
      },
      {
        id: "dan-shen-heart",
        name: "Dan Shen",
        scientificName: "Salvia miltiorrhiza",
        category: "heart-herbs",
        description: "Dan Shen, also known as Red Sage, is a key herb in Traditional Chinese Medicine for supporting heart health and improving circulation.",
        benefits: [
          "Improves blood circulation",
          "Supports healthy cholesterol levels",
          "Protects heart tissue",
          "Helps with chest pain and palpitations"
        ],
        usage: "Used as a tincture, in capsule form, or as a decoction.",
        cautions: "May interact with blood thinners and certain heart medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Decoction",
            description: "Traditional Chinese preparation method.",
            dosage: "1 cup, 2-3 times daily",
            steps: [
              "Add 1-2 teaspoons of dried dan shen root to 2 cups of water",
              "Bring to a boil, then reduce heat and simmer for 15-20 minutes",
              "Strain and drink 1 cup 2-3 times daily",
              "Best taken between meals",
              "May add a small amount of honey to improve taste"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "2-4 ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Circulation", score: 95 },
          { category: "Cholesterol Support", score: 85 },
          { category: "Heart Protection", score: 90 },
          { category: "Blood Thinning", score: 80 }
        ],
        origin: "China",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Salvia_miltiorrhiza_-_Flickr_-_peganum.jpg/640px-Salvia_miltiorrhiza_-_Flickr_-_peganum.jpg",
        tags: ["cardiovascular", "blood-moving", "TCM", "circulation"]
      },
      {
        id: "coleus-heart",
        name: "Coleus",
        scientificName: "Coleus forskohlii",
        category: "heart-herbs",
        description: "Coleus contains forskolin, a compound that helps relax blood vessels, lower blood pressure, and support overall cardiovascular health.",
        benefits: [
          "Helps lower blood pressure",
          "Relaxes blood vessels",
          "Supports healthy heart function",
          "May help with asthma symptoms"
        ],
        usage: "Typically taken as a standardized extract in capsule form.",
        cautions: "May interact with blood pressure medications and blood thinners. Not recommended for those with bleeding disorders or before surgery.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "50-100mg of standardized extract (10-20% forskolin), twice daily",
            steps: [
              "Take 1 capsule (50-100mg standardized extract) with water",
              "Take twice daily with meals",
              "Use consistently for 8-12 weeks to evaluate effectiveness",
              "Monitor blood pressure regularly when using this herb",
              "Consult with healthcare provider if taking medications"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract of the root.",
            dosage: "30-40 drops, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Blood Pressure", score: 90 },
          { category: "Vasodilation", score: 95 },
          { category: "Heart Function", score: 85 },
          { category: "Respiratory Support", score: 80 }
        ],
        origin: "India",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Coleus_forskohlii_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-050.jpg/640px-Coleus_forskohlii_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-050.jpg",
        tags: ["hypotensive", "vasodilator", "heart", "ayurvedic"]
      },
      {
        id: "arjuna-heart",
        name: "Arjuna",
        scientificName: "Terminalia arjuna",
        category: "heart-herbs",
        description: "Arjuna is an Ayurvedic herb traditionally used to support heart function, strengthen the heart muscle, and maintain healthy cholesterol levels.",
        benefits: [
          "Strengthens heart muscle",
          "Supports healthy cholesterol levels",
          "Maintains healthy blood pressure",
          "Protects heart tissue"
        ],
        usage: "Used as a powder, decoction, or in capsule form.",
        cautions: "May interact with heart medications and blood thinners. Consult with a healthcare provider if taking medications.",
        preparations: [
          {
            type: "Powder",
            description: "Traditional Ayurvedic preparation.",
            dosage: "1-3 grams, twice daily",
            steps: [
              "Mix 1/2-1 teaspoon (1-3 grams) of arjuna powder with warm water or milk",
              "Add a small amount of honey if desired",
              "Take twice daily, preferably morning and evening",
              "Best taken on an empty stomach",
              "Use consistently for 3-6 months for heart health benefits"
            ]
          },
          {
            type: "Capsule",
            description: "Powdered herb in capsule form.",
            dosage: "500-1000mg, twice daily"
          }
        ],
        benefitScores: [
          { category: "Heart Strength", score: 90 },
          { category: "Cholesterol Support", score: 85 },
          { category: "Blood Pressure", score: 80 },
          { category: "Heart Protection", score: 95 }
        ],
        origin: "India",
        parts: ["Bark"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Arjuna_tree.jpg/640px-Arjuna_tree.jpg",
        tags: ["cardiotonic", "ayurvedic", "heart", "cholesterol"]
      },
      {
        id: "linden",
        name: "Linden",
        scientificName: "Tilia cordata",
        category: "heart-herbs",
        description: "Linden is a gentle herb that supports heart health by relaxing blood vessels, reducing blood pressure, and calming the nervous system.",
        benefits: [
          "Helps reduce high blood pressure",
          "Relaxes and dilates blood vessels",
          "Calms anxiety and stress that affect heart health",
          "Supports overall cardiovascular function"
        ],
        usage: "Commonly consumed as a tea or in tincture form.",
        cautions: "May interact with blood pressure medications. Use with caution if you have a history of heart disease.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried flowers in hot water.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Blood Pressure", score: 85 },
          { category: "Vessel Relaxation", score: 90 },
          { category: "Anxiety Relief", score: 80 },
          { category: "Heart Health", score: 85 }
        ],
        origin: "Europe and North America",
        parts: ["Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Tilia_cordata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-271.jpg/640px-Tilia_cordata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-271.jpg",
        tags: ["cardiovascular", "relaxant", "blood pressure", "anxiety"]
      },
      {
        id: "motherwort",
        name: "Motherwort",
        scientificName: "Leonurus cardiaca",
        category: "heart-herbs",
        description: "Motherwort has a long history of use for heart conditions, particularly those with a nervous component. It helps regulate heart rhythm and reduce palpitations.",
        benefits: [
          "Helps regulate heart rhythm",
          "Reduces heart palpitations",
          "Calms anxiety that affects heart function",
          "Mildly lowers blood pressure"
        ],
        usage: "Commonly consumed as a tea, in tincture form, or as capsules.",
        cautions: "May interact with heart medications and blood thinners. Not recommended during pregnancy as it can stimulate uterine contractions.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried herb in hot water.",
            dosage: "1-3 cups daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "1-2ml, 3 times daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-600mg, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Heart Rhythm", score: 90 },
          { category: "Palpitation Relief", score: 85 },
          { category: "Anxiety Relief", score: 80 },
          { category: "Blood Pressure", score: 75 }
        ],
        origin: "Europe and Asia",
        parts: ["Aerial parts"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Leonurus_cardiaca_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-102.jpg/640px-Leonurus_cardiaca_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-102.jpg",
        tags: ["cardiovascular", "nervine", "rhythm", "palpitations"]
      },
      {
        id: "night-blooming-cereus",
        name: "Night-Blooming Cereus",
        scientificName: "Selenicereus grandiflorus",
        category: "heart-herbs",
        description: "Night-Blooming Cereus is a traditional heart tonic that helps strengthen heart contractions, regulate heart rhythm, and improve overall cardiac function.",
        benefits: [
          "Strengthens heart contractions",
          "Helps regulate heart rhythm",
          "Improves overall cardiac function",
          "May help with angina symptoms"
        ],
        usage: "Typically used in tincture or homeopathic form due to its potency.",
        cautions: "Should only be used under professional supervision. May interact with heart medications. Not for self-prescription.",
        preparations: [
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "5-10 drops, 2-3 times daily (professional guidance required)"
          },
          {
            type: "Homeopathic",
            description: "Diluted preparation according to homeopathic principles.",
            dosage: "As directed by a healthcare professional"
          }
        ],
        benefitScores: [
          { category: "Heart Strength", score: 85 },
          { category: "Rhythm Regulation", score: 80 },
          { category: "Cardiac Function", score: 85 },
          { category: "Angina Relief", score: 75 }
        ],
        origin: "Central and South America",
        parts: ["Stems", "Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Selenicereus_grandiflorus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg/640px-Selenicereus_grandiflorus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg",
        tags: ["cardiovascular", "cardiac", "tonic", "rhythm"]
      },
      {
        id: "dan-shen",
        name: "Dan Shen",
        scientificName: "Salvia miltiorrhiza",
        category: "heart-herbs",
        description: "Dan Shen, or Red Sage, is a powerful Chinese herb that improves circulation, reduces blood clotting, and protects the heart during stress or injury.",
        benefits: [
          "Improves coronary blood flow",
          "Reduces blood clotting",
          "Protects the heart during stress or injury",
          "Helps with chest pain and angina"
        ],
        usage: "Commonly used in capsule, tablet, or tincture form.",
        cautions: "May interact with blood thinners and other heart medications. Not recommended before surgery due to its blood-thinning effects.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "250-500mg, 2-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          },
          {
            type: "Decoction",
            description: "Traditional Chinese method of simmering the root in water.",
            dosage: "1 cup, 1-2 times daily"
          }
        ],
        benefitScores: [
          { category: "Coronary Blood Flow", score: 90 },
          { category: "Blood Thinning", score: 85 },
          { category: "Heart Protection", score: 85 },
          { category: "Angina Relief", score: 80 }
        ],
        origin: "China",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Salvia_miltiorrhiza_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-257.jpg/640px-Salvia_miltiorrhiza_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-257.jpg",
        tags: ["cardiovascular", "Chinese medicine", "circulation", "blood thinning"]
      },
      {
        id: "lily-of-the-valley",
        name: "Lily of the Valley",
        scientificName: "Convallaria majalis",
        category: "heart-herbs",
        description: "Lily of the Valley contains cardiac glycosides that strengthen heart contractions and regulate heart rhythm, similar to the drug digitalis but milder.",
        benefits: [
          "Strengthens heart contractions",
          "Regulates heart rhythm",
          "Improves blood circulation",
          "Helps with heart failure symptoms"
        ],
        usage: "Only used under strict professional supervision due to its potency and potential toxicity.",
        cautions: "TOXIC if improperly used. Contains cardiac glycosides that can cause serious heart problems if misused. NEVER self-prescribe.",
        preparations: [
          {
            type: "Professional Preparation",
            description: "Should only be prepared and prescribed by qualified healthcare professionals.",
            dosage: "As directed by a healthcare professional only"
          }
        ],
        benefitScores: [
          { category: "Heart Strength", score: 90 },
          { category: "Rhythm Regulation", score: 85 },
          { category: "Circulation", score: 80 },
          { category: "Heart Failure Support", score: 85 }
        ],
        origin: "Europe and Asia",
        parts: ["Flowers", "Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Convallaria_majalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-042.jpg/640px-Convallaria_majalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-042.jpg",
        tags: ["cardiovascular", "cardiac glycosides", "professional use only", "toxic"]
      },
      {
        id: "coleus",
        name: "Coleus",
        scientificName: "Coleus forskohlii",
        category: "heart-herbs",
        description: "Coleus contains forskolin, which helps dilate blood vessels, lower blood pressure, and improve heart function by increasing cellular energy production.",
        benefits: [
          "Dilates blood vessels",
          "Lowers blood pressure",
          "Improves heart function",
          "Increases cellular energy production"
        ],
        usage: "Commonly used in capsule or extract form.",
        cautions: "May interact with blood pressure medications and blood thinners. Not recommended before surgery or for those with bleeding disorders.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "50-100mg of forskolin (10% extract), 2 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "As directed on product, typically 0.5-1ml, 2 times daily"
          }
        ],
        benefitScores: [
          { category: "Vessel Dilation", score: 85 },
          { category: "Blood Pressure", score: 80 },
          { category: "Heart Function", score: 85 },
          { category: "Energy Production", score: 80 }
        ],
        origin: "India",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Coleus_forskohlii_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg/640px-Coleus_forskohlii_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg",
        tags: ["cardiovascular", "forskolin", "blood pressure", "vasodilator"]
      },
      {
        id: "khella",
        name: "Khella",
        scientificName: "Ammi visnaga",
        category: "heart-herbs",
        description: "Khella contains compounds that dilate coronary blood vessels, reduce spasms, and improve blood flow to the heart, helping with angina and other heart conditions.",
        benefits: [
          "Dilates coronary blood vessels",
          "Reduces vessel spasms",
          "Improves blood flow to the heart",
          "Helps with angina symptoms"
        ],
        usage: "Typically used in extract or capsule form.",
        cautions: "May increase sensitivity to sunlight. May interact with blood thinners and other heart medications.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "100-150mg, 2-3 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Coronary Dilation", score: 90 },
          { category: "Spasm Reduction", score: 85 },
          { category: "Blood Flow", score: 85 },
          { category: "Angina Relief", score: 80 }
        ],
        origin: "Mediterranean region",
        parts: ["Seeds"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ammi_visnaga_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-009.jpg/640px-Ammi_visnaga_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-009.jpg",
        tags: ["cardiovascular", "vasodilator", "antispasmodic", "angina"]
      },
      {
        id: "arjuna",
        name: "Arjuna",
        scientificName: "Terminalia arjuna",
        category: "heart-herbs",
        description: "Arjuna is an Ayurvedic herb that strengthens heart muscle, improves coronary circulation, and supports overall cardiovascular health.",
        benefits: [
          "Strengthens heart muscle",
          "Improves coronary circulation",
          "Supports healthy cholesterol levels",
          "Helps maintain normal blood pressure"
        ],
        usage: "Commonly used in powder, capsule, or extract form.",
        cautions: "May interact with heart medications and blood pressure medications. Use with caution if taking other cardiac medications.",
        preparations: [
          {
            type: "Powder",
            description: "Traditional Ayurvedic preparation, can be mixed with warm milk or water.",
            dosage: "1-3g, 2-3 times daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 2-3 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Heart Strength", score: 90 },
          { category: "Coronary Circulation", score: 85 },
          { category: "Cholesterol Support", score: 80 },
          { category: "Blood Pressure", score: 75 }
        ],
        origin: "India",
        parts: ["Bark"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Terminalia_arjuna_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-267.jpg/640px-Terminalia_arjuna_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-267.jpg",
        tags: ["cardiovascular", "ayurvedic", "heart tonic", "circulation"]
      }
    ]
  },
  {
    id: "womens-herbs",
    name: "Women's Herbs",
    description: "Herbs that support women's health and hormonal balance",
    icon: "👸",
    color: "#EC4899",
    herbs: [
      {
        id: "maca-root-womens",
        name: "Maca Root",
        scientificName: "Lepidium meyenii",
        category: "womens-herbs",
        description: "Maca root is an adaptogenic herb that helps balance hormones, increase energy, and support women's reproductive health.",
        benefits: [
          "Balances hormones naturally",
          "Increases energy and vitality",
          "Supports fertility and reproductive health",
          "Helps manage menopausal symptoms"
        ],
        usage: "Commonly taken as a powder added to foods or in capsule form.",
        cautions: "May not be suitable for women with hormone-sensitive conditions. Start with small doses to assess tolerance.",
        preparations: [
          {
            type: "Powder",
            description: "Can be added to smoothies, oatmeal, or other foods.",
            dosage: "1-3 teaspoons daily",
            steps: [
              "Start with 1/2 teaspoon daily and gradually increase to 1-3 teaspoons",
              "Add to smoothies, yogurt, oatmeal, or other foods",
              "Best taken with breakfast or before exercise",
              "Consistent daily use for 6-12 weeks is recommended for hormonal benefits",
              "Store in a cool, dry place away from direct sunlight"
            ]
          },
          {
            type: "Capsule",
            description: "Convenient form for consistent dosing.",
            dosage: "500-1500mg daily"
          }
        ],
        benefitScores: [
          { category: "Hormonal Balance", score: 90 },
          { category: "Energy", score: 85 },
          { category: "Fertility Support", score: 80 },
          { category: "Menopause Support", score: 85 }
        ],
        origin: "Peru",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Maca_root_on_black.jpg/640px-Maca_root_on_black.jpg",
        tags: ["adaptogen", "hormonal", "energy", "fertility"]
      },
      {
        id: "shatavari-womens",
        name: "Shatavari",
        scientificName: "Asparagus racemosus",
        category: "womens-herbs",
        description: "Shatavari is an Ayurvedic herb known as the 'Queen of Herbs' for its ability to support women's health throughout all stages of life.",
        benefits: [
          "Supports female reproductive system",
          "Helps balance hormones",
          "Enhances fertility and libido",
          "Supports lactation in nursing mothers"
        ],
        usage: "Used as a powder, tincture, or in capsule form.",
        cautions: "May not be suitable for those with allergies to asparagus. Consult a healthcare provider if pregnant or taking medications.",
        preparations: [
          {
            type: "Powder",
            description: "Traditional Ayurvedic preparation.",
            dosage: "1/4 to 1/2 teaspoon twice daily",
            steps: [
              "Mix 1/4 to 1/2 teaspoon of shatavari powder with warm water or milk",
              "Add a small amount of honey or ghee to enhance absorption",
              "Take twice daily, preferably morning and evening",
              "Best taken with meals to avoid digestive discomfort",
              "For enhanced benefits, can be combined with ashwagandha for stress support"
            ]
          },
          {
            type: "Tincture",
            description: "Liquid extract for faster absorption.",
            dosage: "30-60 drops, 1-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Reproductive Health", score: 95 },
          { category: "Hormonal Balance", score: 90 },
          { category: "Fertility", score: 85 },
          { category: "Lactation Support", score: 90 }
        ],
        origin: "India",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Asparagus_racemosus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg/640px-Asparagus_racemosus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg",
        tags: ["adaptogen", "hormonal", "fertility", "ayurvedic"]
      },
      {
        id: "vitex-womens",
        name: "Vitex",
        scientificName: "Vitex agnus-castus",
        category: "womens-herbs",
        description: "Vitex, also known as Chaste Tree Berry, helps regulate female hormones and is particularly beneficial for PMS and menopause symptoms.",
        benefits: [
          "Helps regulate menstrual cycles",
          "Reduces PMS symptoms",
          "Supports hormonal balance",
          "May help with menopausal symptoms"
        ],
        usage: "Typically taken as a tincture or in capsule form.",
        cautions: "May interact with hormone medications. Not recommended during pregnancy or for those with hormone-sensitive conditions.",
        preparations: [
          {
            type: "Tincture",
            description: "Concentrated liquid extract.",
            dosage: "40-80 drops daily",
            steps: [
              "Take 40-80 drops of vitex tincture in water",
              "Take once daily in the morning on an empty stomach",
              "Consistent use for 3-6 months is recommended for hormonal balance",
              "Effects are gradual and cumulative",
              "Best results when used as part of a holistic approach to women's health"
            ]
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "225-500mg daily"
          }
        ],
        benefitScores: [
          { category: "Hormonal Balance", score: 95 },
          { category: "PMS Relief", score: 90 },
          { category: "Menstrual Regulation", score: 85 },
          { category: "Menopause Support", score: 80 }
        ],
        origin: "Mediterranean, Central Asia",
        parts: ["Berries"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Vitex_agnus-castus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-294.jpg/640px-Vitex_agnus-castus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-294.jpg",
        tags: ["hormonal", "women's health", "PMS", "menopause"]
      },
      {
        id: "evening-primrose-womens",
        name: "Evening Primrose",
        scientificName: "Oenothera biennis",
        category: "womens-herbs",
        description: "Evening Primrose oil is rich in gamma-linolenic acid (GLA), which helps balance hormones and reduce inflammation related to women's health issues.",
        benefits: [
          "Helps reduce PMS symptoms",
          "Supports breast health",
          "May help with menopausal hot flashes",
          "Supports skin health and elasticity"
        ],
        usage: "Typically taken as oil in capsule form.",
        cautions: "May interact with blood thinners and certain psychiatric medications. Not recommended before surgery.",
        preparations: [
          {
            type: "Oil Capsule",
            description: "Concentrated oil in capsule form.",
            dosage: "500-1000mg, 1-2 times daily",
            steps: [
              "Take 1-2 capsules (500-1000mg) with food",
              "Take once or twice daily with meals",
              "Use consistently for at least 8-12 weeks to evaluate effectiveness",
              "Store capsules in a cool, dark place",
              "May combine with vitamin E for enhanced benefits"
            ]
          },
          {
            type: "Topical Oil",
            description: "Applied directly to the skin for local benefits.",
            dosage: "Apply as needed to affected areas",
            steps: [
              "Apply a few drops of evening primrose oil to clean skin",
              "Gently massage into the affected area",
              "Can be applied to breasts during PMS for tenderness relief",
              "May mix with a carrier oil like jojoba for easier application",
              "Apply 1-2 times daily as needed"
            ]
          }
        ],
        benefitScores: [
          { category: "PMS Relief", score: 85 },
          { category: "Breast Health", score: 80 },
          { category: "Skin Health", score: 90 },
          { category: "Hormone Balance", score: 75 }
        ],
        origin: "North America, Europe",
        parts: ["Seeds"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Oenothera_biennis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-200.jpg/640px-Oenothera_biennis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-200.jpg",
        tags: ["GLA", "women's health", "anti-inflammatory", "skin"]
      },
      {
        id: "wild-yam-womens",
        name: "Wild Yam",
        scientificName: "Dioscorea villosa",
        category: "womens-herbs",
        description: "Wild Yam contains compounds that may help with hormone balance and has traditionally been used for menstrual cramps and menopausal symptoms.",
        benefits: [
          "May help with menstrual cramps",
          "Supports hormone balance",
          "Traditionally used for menopausal symptoms",
          "Has anti-inflammatory properties"
        ],
        usage: "Used as a tincture, cream, or in capsule form.",
        cautions: "Not recommended during pregnancy. May interact with hormone medications and birth control.",
        preparations: [
          {
            type: "Tincture",
            description: "Alcohol-based extract for internal use.",
            dosage: "2-4 ml, 3 times daily",
            steps: [
              "Take 2-4 ml of wild yam tincture in water",
              "Take 3 times daily between meals",
              "For menstrual cramps, begin taking 2-3 days before expected period",
              "May combine with cramp bark for enhanced relief",
              "Use as needed for symptom relief"
            ]
          },
          {
            type: "Cream",
            description: "Topical preparation for local application.",
            dosage: "Apply to skin 1-2 times daily",
            steps: [
              "Apply a small amount of wild yam cream to thin-skinned areas",
              "Common application sites include inner wrists, inner arms, neck, or abdomen",
              "Apply 1-2 times daily as needed",
              "Rotate application sites to prevent skin sensitization",
              "Wash hands after application"
            ]
          }
        ],
        benefitScores: [
          { category: "Menstrual Comfort", score: 85 },
          { category: "Hormone Support", score: 80 },
          { category: "Anti-inflammatory", score: 75 },
          { category: "Menopause Relief", score: 70 }
        ],
        origin: "North America",
        parts: ["Root", "Rhizome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-060.jpg/640px-Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-060.jpg",
        tags: ["women's health", "antispasmodic", "hormone", "menopause"]
      },
      {
        id: "mugwort-womens",
        name: "Mugwort",
        scientificName: "Artemisia vulgaris",
        category: "womens-herbs",
        description: "Mugwort has been traditionally used to regulate menstrual cycles, ease menstrual pain, and support women's reproductive health.",
        benefits: [
          "Helps regulate menstrual cycles",
          "May ease menstrual pain and cramping",
          "Traditionally used for delayed menstruation",
          "Supports digestive health"
        ],
        usage: "Used as a tea, tincture, or in dream pillows for enhancing dreams.",
        cautions: "Not recommended during pregnancy. May cause allergic reactions in those sensitive to plants in the Asteraceae family.",
        preparations: [
          {
            type: "Tea",
            description: "Dried herb steeped in hot water.",
            dosage: "1 cup, 1-3 times daily",
            steps: [
              "Add 1-2 teaspoons of dried mugwort to a cup",
              "Pour boiling water over the herb",
              "Cover and steep for 5-10 minutes",
              "Strain and drink 1-3 times daily, preferably between meals",
              "For menstrual support, begin drinking 5-7 days before expected period"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "15-30 drops, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Menstrual Regulation", score: 85 },
          { category: "Cramp Relief", score: 80 },
          { category: "Digestive Support", score: 75 },
          { category: "Dream Enhancement", score: 90 }
        ],
        origin: "Europe, Asia, North America",
        parts: ["Leaves", "Flowering tops"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Artemisia_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-022.jpg/640px-Artemisia_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-022.jpg",
        tags: ["women's health", "menstrual", "bitter", "nervine"]
      },
      {
        id: "black-cohosh-womens",
        name: "Black Cohosh",
        scientificName: "Actaea racemosa",
        category: "womens-herbs",
        description: "Black Cohosh is widely used for menopausal symptoms, particularly hot flashes and mood disturbances, and may help with menstrual discomfort.",
        benefits: [
          "Helps reduce hot flashes and night sweats",
          "May alleviate mood swings during menopause",
          "Can help with menstrual discomfort",
          "Supports hormonal balance during perimenopause"
        ],
        usage: "Typically taken as a standardized extract in capsule or tincture form.",
        cautions: "Not recommended during pregnancy or for those with liver disorders. May interact with hormone medications and certain antidepressants.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "20-40mg of standardized extract (2.5% triterpene glycosides), twice daily",
            steps: [
              "Take 1 capsule (20-40mg standardized extract) with water",
              "Take twice daily with meals",
              "Use consistently for 8-12 weeks to evaluate effectiveness",
              "Monitor for any liver-related symptoms",
              "Discontinue use if rash, jaundice, or abdominal pain occurs"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for convenient use.",
            dosage: "2-4 ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Hot Flash Relief", score: 90 },
          { category: "Mood Support", score: 85 },
          { category: "Menstrual Comfort", score: 80 },
          { category: "Hormonal Balance", score: 85 }
        ],
        origin: "North America",
        parts: ["Root", "Rhizome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cimicifuga_racemosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-041.jpg/640px-Cimicifuga_racemosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-041.jpg",
        tags: ["menopause", "women's health", "hot flashes", "phytoestrogenic"]
      },
      {
        id: "maca-root",
        name: "Maca Root",
        scientificName: "Lepidium meyenii",
        category: "womens-herbs",
        description: "Maca root is an adaptogenic herb that helps balance hormones, increase energy, and support reproductive health in women.",
        benefits: [
          "Balances hormones",
          "Increases energy and vitality",
          "Supports reproductive health",
          "May help reduce menopausal symptoms"
        ],
        usage: "Commonly consumed in powder or capsule form.",
        cautions: "May interact with hormone medications. Not recommended for those with thyroid conditions.",
        preparations: [
          {
            type: "Powder",
            description: "Can be added to smoothies, drinks, or food.",
            dosage: "1-3 teaspoons daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 1-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Hormone Balance", score: 85 },
          { category: "Energy", score: 90 },
          { category: "Reproductive Health", score: 80 },
          { category: "Menopause Support", score: 75 }
        ],
        origin: "Peru",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Maca_root.jpg/640px-Maca_root.jpg",
        tags: ["adaptogen", "hormonal", "energy", "reproductive"]
      },
      {
        id: "shatavari",
        name: "Shatavari",
        scientificName: "Asparagus racemosus",
        category: "womens-herbs",
        description: "Shatavari is an Ayurvedic herb known as the 'Queen of Herbs' that supports female reproductive health, hormonal balance, and lactation.",
        benefits: [
          "Supports female reproductive health",
          "Balances hormones",
          "Enhances lactation in nursing mothers",
          "May help with menopausal symptoms"
        ],
        usage: "Commonly consumed in powder, capsule, or tincture form.",
        cautions: "May not be suitable for those with estrogen-sensitive conditions. Consult a healthcare provider if pregnant.",
        preparations: [
          {
            type: "Powder",
            description: "Can be mixed with warm milk or water with honey.",
            dosage: "1-2 teaspoons daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 2 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Reproductive Health", score: 90 },
          { category: "Hormone Balance", score: 85 },
          { category: "Lactation Support", score: 95 },
          { category: "Menopause Support", score: 80 }
        ],
        origin: "India",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Asparagus_racemosus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-018.jpg/640px-Asparagus_racemosus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-018.jpg",
        tags: ["ayurvedic", "hormonal", "reproductive", "lactation"]
      },
      {
        id: "evening-primrose",
        name: "Evening Primrose",
        scientificName: "Oenothera biennis",
        category: "womens-herbs",
        description: "Evening primrose oil contains gamma-linolenic acid (GLA), which helps with hormonal balance, PMS symptoms, and breast pain.",
        benefits: [
          "Helps with PMS symptoms",
          "Reduces breast pain and tenderness",
          "Supports hormonal balance",
          "May help with menopausal symptoms"
        ],
        usage: "Typically used in oil form in capsules.",
        cautions: "May interact with blood-thinning medications and anti-seizure medications. Not recommended before surgery.",
        preparations: [
          {
            type: "Oil Capsule",
            description: "Standardized oil in capsule form.",
            dosage: "500-1000mg, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "PMS Relief", score: 85 },
          { category: "Breast Pain Relief", score: 90 },
          { category: "Hormone Balance", score: 80 },
          { category: "Menopause Support", score: 75 }
        ],
        origin: "North America and Europe",
        parts: ["Seeds"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Oenothera_biennis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-199.jpg/640px-Oenothera_biennis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-199.jpg",
        tags: ["hormonal", "PMS", "breast pain", "GLA"]
      },
      {
        id: "vitex",
        name: "Vitex",
        scientificName: "Vitex agnus-castus",
        category: "womens-herbs",
        description: "Vitex, also known as Chaste Tree Berry, helps regulate the pituitary gland, balancing hormones and supporting reproductive health.",
        benefits: [
          "Balances hormones",
          "Helps with PMS symptoms",
          "Supports menstrual regularity",
          "May help with fertility issues"
        ],
        usage: "Commonly consumed in capsule, tincture, or tea form.",
        cautions: "May interact with hormone medications and dopamine-related medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-500mg daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml daily"
          },
          {
            type: "Tea",
            description: "Steep dried berries in hot water.",
            dosage: "1 cup daily"
          }
        ],
        benefitScores: [
          { category: "Hormone Balance", score: 90 },
          { category: "PMS Relief", score: 85 },
          { category: "Menstrual Regularity", score: 85 },
          { category: "Fertility Support", score: 80 }
        ],
        origin: "Mediterranean region",
        parts: ["Berries"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Vitex_agnus-castus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-142.jpg/640px-Vitex_agnus-castus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-142.jpg",
        tags: ["hormonal", "PMS", "menstrual", "fertility"]
      },
      {
        id: "wild-yam-womens",
        name: "Wild Yam",
        scientificName: "Dioscorea villosa",
        category: "womens-herbs",
        description: "Wild yam contains diosgenin, which is a precursor to progesterone and helps with menstrual cramps, hormonal balance, and menopausal symptoms.",
        benefits: [
          "Helps with menstrual cramps",
          "Supports hormonal balance",
          "May help with menopausal symptoms",
          "Reduces inflammation in the reproductive system"
        ],
        usage: "Commonly consumed in capsule, cream, or tincture form.",
        cautions: "May interact with hormone medications. Not recommended during pregnancy or for those with hormone-sensitive conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg, 2-3 times daily"
          },
          {
            type: "Cream",
            description: "Topical application for hormonal support.",
            dosage: "Apply as directed on product"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 3 times daily"
          }
        ],
        benefitScores: [
          { category: "Menstrual Cramp Relief", score: 85 },
          { category: "Hormone Balance", score: 80 },
          { category: "Menopause Support", score: 85 },
          { category: "Inflammation Reduction", score: 80 }
        ],
        origin: "North America",
        parts: ["Root", "Rhizome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-045.jpg/640px-Dioscorea_villosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-045.jpg",
        tags: ["hormonal", "menstrual", "menopause", "progesterone"]
      },
      {
        id: "mugwort",
        name: "Mugwort",
        scientificName: "Artemisia vulgaris",
        category: "womens-herbs",
        description: "Mugwort has been traditionally used to regulate menstruation, relieve menstrual cramps, and support overall reproductive health.",
        benefits: [
          "Helps regulate menstruation",
          "Relieves menstrual cramps",
          "Supports reproductive health",
          "May help with menopausal symptoms"
        ],
        usage: "Commonly consumed as a tea, in tincture form, or used in dream pillows.",
        cautions: "Not recommended during pregnancy as it can stimulate uterine contractions. May cause allergic reactions in those sensitive to plants in the Asteraceae family.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried herb in hot water.",
            dosage: "1 cup, 1-2 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          },
          {
            type: "Dream Pillow",
            description: "Dried herb placed in a small pillow for enhancing dreams.",
            dosage: "Place under regular pillow"
          }
        ],
        benefitScores: [
          { category: "Menstrual Regulation", score: 85 },
          { category: "Cramp Relief", score: 80 },
          { category: "Reproductive Health", score: 75 },
          { category: "Menopause Support", score: 70 }
        ],
        origin: "Europe, Asia, and North America",
        parts: ["Leaves", "Flowering tops"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Artemisia_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-016.jpg/640px-Artemisia_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-016.jpg",
        tags: ["menstrual", "reproductive", "dreams", "emmenagogue"]
      },
      {
        id: "black-cohosh",
        name: "Black Cohosh",
        scientificName: "Actaea racemosa",
        category: "womens-herbs",
        description: "Black cohosh is primarily known for its ability to reduce menopausal symptoms, particularly hot flashes, night sweats, and mood changes.",
        benefits: [
          "Reduces hot flashes and night sweats",
          "Helps with mood changes during menopause",
          "May help with menstrual cramps",
          "Supports hormonal balance"
        ],
        usage: "Commonly consumed in capsule or tincture form.",
        cautions: "Not recommended for those with liver disorders, hormone-sensitive conditions, or during pregnancy. May interact with hormone medications.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "20-40mg of standardized extract, 2 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Hot Flash Relief", score: 90 },
          { category: "Mood Support", score: 85 },
          { category: "Menstrual Support", score: 75 },
          { category: "Hormone Balance", score: 80 }
        ],
        origin: "North America",
        parts: ["Root", "Rhizome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Actaea_racemosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-003.jpg/640px-Actaea_racemosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-003.jpg",
        tags: ["menopause", "hot flashes", "mood", "hormonal"]
      },
      {
        id: "damiana",
        name: "Damiana",
        scientificName: "Turnera diffusa",
        category: "womens-herbs",
        description: "Damiana is traditionally used as a female aphrodisiac, helping to increase sexual desire, reduce anxiety, and support hormonal balance.",
        benefits: [
          "Increases sexual desire and libido",
          "Reduces anxiety and stress",
          "Supports hormonal balance",
          "May help with mild depression"
        ],
        usage: "Commonly consumed as a tea, in capsule form, or as a tincture.",
        cautions: "May interact with medications for diabetes. Not recommended during pregnancy or for those with hormone-sensitive conditions.",
        preparations: [
          {
            type: "Tea",
            description: "Steep dried leaves in hot water.",
            dosage: "1 cup, 1-3 times daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "400-800mg, 1-3 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-4ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Libido Enhancement", score: 90 },
          { category: "Anxiety Relief", score: 80 },
          { category: "Hormone Balance", score: 75 },
          { category: "Mood Support", score: 75 }
        ],
        origin: "Central and South America",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Turnera_diffusa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-273.jpg/640px-Turnera_diffusa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-273.jpg",
        tags: ["aphrodisiac", "libido", "anxiety", "hormonal"]
      }
    ]
  },
  {
    id: "mens-herbs",
    name: "Men's Herbs",
    description: "Herbs that support men's health and vitality",
    icon: "👨",
    color: "#3B82F6",
    herbs: [
      {
        id: "tongkat-ali-mens",
        name: "Tongkat Ali",
        scientificName: "Eurycoma longifolia",
        category: "mens-herbs",
        description: "Tongkat Ali is a powerful herb traditionally used to enhance male vitality, support testosterone levels, and improve physical performance.",
        benefits: [
          "Supports healthy testosterone levels",
          "Enhances libido and sexual function",
          "Improves energy and physical performance",
          "Helps reduce stress and cortisol levels"
        ],
        usage: "Typically taken as a supplement in capsule or extract form.",
        cautions: "May interact with medications that affect hormone levels. Not recommended for those with hormone-sensitive conditions or those taking blood thinners.",
        preparations: [
          {
            type: "Extract",
            description: "Standardized extract in capsule or powder form.",
            dosage: "200-400mg daily",
            steps: [
              "Take 200-400mg of standardized extract once daily",
              "Best taken in the morning with breakfast",
              "Cycle usage: 5 days on, 2 days off for optimal results",
              "Continue for 4-8 weeks, then take a 2-week break",
              "May combine with other adaptogens like ashwagandha for enhanced benefits"
            ]
          },
          {
            type: "Tea",
            description: "Traditional preparation method, though less potent than extracts.",
            dosage: "1 cup daily"
          }
        ],
        benefitScores: [
          { category: "Testosterone Support", score: 90 },
          { category: "Sexual Function", score: 85 },
          { category: "Energy", score: 80 },
          { category: "Stress Reduction", score: 75 }
        ],
        origin: "Southeast Asia (Malaysia, Indonesia, Thailand)",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Eurycoma_longifolia_-_Tongkat_Ali_-_Pasak_Bumi_2.jpg/640px-Eurycoma_longifolia_-_Tongkat_Ali_-_Pasak_Bumi_2.jpg",
        tags: ["adaptogen", "testosterone", "vitality", "energy"]
      },
      {
        id: "horny-goat-weed-mens",
        name: "Horny Goat Weed",
        scientificName: "Epimedium species",
        category: "mens-herbs",
        description: "Horny Goat Weed is a traditional Chinese herb known for its ability to enhance sexual function, increase energy, and support overall men's health.",
        benefits: [
          "Enhances sexual function and libido",
          "Supports testosterone levels",
          "Improves circulation and energy",
          "Supports bone and joint health"
        ],
        usage: "Used as a supplement in capsule form, tincture, or as a tea.",
        cautions: "May interact with medications for high blood pressure, heart conditions, or hormone therapy. May increase bleeding risk when taken with blood thinners.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg daily",
            steps: [
              "Take 500-1000mg daily, divided into 2 doses",
              "Best taken with meals to minimize digestive discomfort",
              "For sexual function support, take 1-2 hours before activity",
              "Consistent use for 4-6 weeks is recommended for noticeable benefits",
              "May combine with other herbs like ginseng for enhanced effects"
            ]
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption.",
            dosage: "2-3 ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Sexual Function", score: 90 },
          { category: "Testosterone Support", score: 80 },
          { category: "Circulation", score: 85 },
          { category: "Energy", score: 75 }
        ],
        origin: "China",
        parts: ["Leaf"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Epimedium_grandiflorum_var._thunbergianum1.jpg/640px-Epimedium_grandiflorum_var._thunbergianum1.jpg",
        tags: ["aphrodisiac", "circulation", "vitality", "testosterone"]
      },
      {
        id: "nettle-root-mens",
        name: "Nettle Root",
        scientificName: "Urtica dioica",
        category: "mens-herbs",
        description: "Nettle root is a powerful herb for men's health, particularly for supporting prostate health and hormonal balance.",
        benefits: [
          "Supports prostate health",
          "Helps manage benign prostatic hyperplasia (BPH) symptoms",
          "Supports healthy testosterone levels",
          "Has anti-inflammatory properties"
        ],
        usage: "Typically taken as a supplement in capsule form, tincture, or as a tea.",
        cautions: "May interact with medications for high blood pressure, diabetes, or blood thinners. May enhance the effects of diuretics.",
        preparations: [
          {
            type: "Capsule",
            description: "Root extract in capsule form.",
            dosage: "500-600mg, 1-2 times daily",
            steps: [
              "Take 500-600mg once or twice daily with water",
              "Best taken with meals to minimize digestive discomfort",
              "Morning and evening dosing is recommended for BPH symptom management",
              "Consistent use for 4-6 months is recommended for prostate health benefits",
              "May combine with saw palmetto for enhanced prostate support"
            ]
          },
          {
            type: "Tea",
            description: "Dried root steeped in hot water.",
            dosage: "1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Prostate Health", score: 95 },
          { category: "Hormone Balance", score: 85 },
          { category: "Anti-inflammatory", score: 80 },
          { category: "Urinary Health", score: 90 }
        ],
        origin: "Europe, Asia, North America",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Brennnessel_1.JPG/640px-Brennnessel_1.JPG",
        tags: ["prostate", "anti-inflammatory", "hormonal", "urinary"]
      },
      {
        id: "tribulus-terrestris",
        name: "Tribulus Terrestris",
        scientificName: "Tribulus terrestris",
        category: "mens-herbs",
        description: "Tribulus terrestris is known for supporting testosterone levels, enhancing libido, and improving athletic performance in men.",
        benefits: [
          "Supports healthy testosterone levels",
          "Enhances libido and sexual function",
          "May improve athletic performance",
          "Supports prostate health"
        ],
        usage: "Commonly consumed in capsule or extract form.",
        cautions: "May interact with medications for diabetes, high blood pressure, and heart conditions. Not recommended for those with hormone-sensitive conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "250-750mg, 2-3 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Testosterone Support", score: 85 },
          { category: "Libido Enhancement", score: 90 },
          { category: "Athletic Performance", score: 80 },
          { category: "Prostate Health", score: 75 }
        ],
        origin: "Europe, Asia, Africa, and Australia",
        parts: ["Fruit", "Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Tribulus_terrestris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-272.jpg/640px-Tribulus_terrestris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-272.jpg",
        tags: ["testosterone", "libido", "athletic", "prostate"]
      },
      {
        id: "tongkat-ali",
        name: "Tongkat Ali",
        scientificName: "Eurycoma longifolia",
        category: "mens-herbs",
        description: "Tongkat Ali, also known as Malaysian Ginseng, is traditionally used to enhance male vitality, boost testosterone levels, and improve sexual function.",
        benefits: [
          "Boosts testosterone levels",
          "Enhances libido and sexual function",
          "Improves energy and reduces fatigue",
          "May help with stress management"
        ],
        usage: "Commonly consumed in capsule, extract, or tea form.",
        cautions: "May interact with medications for diabetes and high blood pressure. Not recommended for those with hormone-sensitive conditions or liver disease.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "200-400mg daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 1-2 times daily"
          },
          {
            type: "Tea",
            description: "Steep root pieces in hot water.",
            dosage: "1 cup daily"
          }
        ],
        benefitScores: [
          { category: "Testosterone Support", score: 90 },
          { category: "Libido Enhancement", score: 85 },
          { category: "Energy", score: 80 },
          { category: "Stress Management", score: 75 }
        ],
        origin: "Southeast Asia",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Eurycoma_longifolia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-056.jpg/640px-Eurycoma_longifolia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-056.jpg",
        tags: ["testosterone", "libido", "energy", "adaptogen"]
      },
      {
        id: "horny-goat-weed",
        name: "Horny Goat Weed",
        scientificName: "Epimedium sagittatum",
        category: "mens-herbs",
        description: "Horny Goat Weed, also known as Epimedium, is traditionally used to enhance sexual function, boost testosterone, and improve erectile function.",
        benefits: [
          "Enhances sexual function",
          "Supports testosterone levels",
          "Improves erectile function",
          "Increases energy and stamina"
        ],
        usage: "Commonly consumed in capsule, extract, or tea form.",
        cautions: "May interact with medications for high blood pressure, heart conditions, and hormone therapies. May cause dizziness or rapid heartbeat in some individuals.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 1-2 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 1-2 times daily"
          },
          {
            type: "Tea",
            description: "Steep dried leaves in hot water.",
            dosage: "1 cup daily"
          }
        ],
        benefitScores: [
          { category: "Sexual Function", score: 90 },
          { category: "Testosterone Support", score: 85 },
          { category: "Erectile Function", score: 85 },
          { category: "Energy", score: 80 }
        ],
        origin: "China",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Epimedium_sagittatum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-052.jpg/640px-Epimedium_sagittatum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-052.jpg",
        tags: ["sexual", "testosterone", "erectile", "energy"]
      },
      {
        id: "muira-puama",
        name: "Muira Puama",
        scientificName: "Ptychopetalum olacoides",
        category: "mens-herbs",
        description: "Muira Puama, also known as 'potency wood,' is traditionally used in Brazilian folk medicine to enhance male sexual function, libido, and overall vitality.",
        benefits: [
          "Enhances sexual function and libido",
          "Improves erectile function",
          "Increases energy and vitality",
          "Supports cognitive function"
        ],
        usage: "Commonly consumed in capsule, extract, or tea form.",
        cautions: "Limited safety data available. Use with caution if you have high blood pressure or heart conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg, 2 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          },
          {
            type: "Tea",
            description: "Steep bark or root in hot water.",
            dosage: "1 cup, 1-2 times daily"
          }
        ],
        benefitScores: [
          { category: "Sexual Function", score: 85 },
          { category: "Erectile Function", score: 80 },
          { category: "Energy", score: 80 },
          { category: "Cognitive Function", score: 75 }
        ],
        origin: "Brazil and Amazon rainforest",
        parts: ["Bark", "Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ptychopetalum_olacoides_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-244.jpg/640px-Ptychopetalum_olacoides_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-244.jpg",
        tags: ["sexual", "erectile", "energy", "cognitive"]
      },
      {
        id: "nettle-root",
        name: "Nettle Root",
        scientificName: "Urtica dioica",
        category: "mens-herbs",
        description: "Nettle root is widely used to support prostate health, reduce symptoms of benign prostatic hyperplasia (BPH), and support healthy testosterone levels.",
        benefits: [
          "Supports prostate health",
          "Reduces symptoms of BPH",
          "Supports healthy testosterone levels",
          "May help with urinary flow and function"
        ],
        usage: "Commonly consumed in capsule, extract, or tea form.",
        cautions: "May interact with medications for high blood pressure, diabetes, and blood thinners. May enhance the effects of diuretics.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "250-500mg, 2-3 times daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          },
          {
            type: "Tea",
            description: "Steep dried root in hot water.",
            dosage: "1 cup, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Prostate Health", score: 90 },
          { category: "BPH Symptom Relief", score: 85 },
          { category: "Testosterone Support", score: 75 },
          { category: "Urinary Function", score: 85 }
        ],
        origin: "Europe, Asia, and North America",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Urtica_dioica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-140.jpg/640px-Urtica_dioica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-140.jpg",
        tags: ["prostate", "BPH", "testosterone", "urinary"]
      },
      {
        id: "pine-pollen",
        name: "Pine Pollen",
        scientificName: "Pinus spp.",
        category: "mens-herbs",
        description: "Pine pollen is a natural source of phyto-androgens, including testosterone, and is used to support hormone balance, vitality, and overall health in men.",
        benefits: [
          "Natural source of phyto-androgens",
          "Supports hormone balance",
          "Increases energy and vitality",
          "Supports immune function"
        ],
        usage: "Commonly consumed in powder, tincture, or capsule form.",
        cautions: "May not be suitable for those with pine allergies or hormone-sensitive conditions. Tinctures have higher potency than powders.",
        preparations: [
          {
            type: "Powder",
            description: "Can be added to smoothies, drinks, or food.",
            dosage: "1/2 to 1 teaspoon, 1-2 times daily"
          },
          {
            type: "Tincture",
            description: "Alcohol-based extract for faster absorption and higher potency.",
            dosage: "5-10 drops, 1-2 times daily"
          },
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg daily"
          }
        ],
        benefitScores: [
          { category: "Hormone Balance", score: 85 },
          { category: "Energy", score: 80 },
          { category: "Vitality", score: 85 },
          { category: "Immune Support", score: 75 }
        ],
        origin: "Worldwide",
        parts: ["Pollen"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pine_pollen.jpg/640px-Pine_pollen.jpg",
        tags: ["androgens", "hormonal", "energy", "immune"]
      },
      {
        id: "cordyceps-mens",
        name: "Cordyceps",
        scientificName: "Cordyceps sinensis",
        category: "mens-herbs",
        description: "Cordyceps is a medicinal mushroom that enhances energy, stamina, athletic performance, and may support reproductive health in men.",
        benefits: [
          "Enhances energy and stamina",
          "Improves athletic performance",
          "Supports reproductive health",
          "May enhance libido and sexual function"
        ],
        usage: "Commonly consumed in capsule, powder, or extract form.",
        cautions: "May interact with blood-thinning medications and immunosuppressants. Use with caution if you have autoimmune conditions.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-1000mg daily"
          },
          {
            type: "Powder",
            description: "Can be added to smoothies, drinks, or food.",
            dosage: "1-2 teaspoons daily"
          },
          {
            type: "Extract",
            description: "Liquid extract for faster absorption.",
            dosage: "1-2ml, 2-3 times daily"
          }
        ],
        benefitScores: [
          { category: "Energy", score: 90 },
          { category: "Athletic Performance", score: 85 },
          { category: "Reproductive Health", score: 80 },
          { category: "Sexual Function", score: 75 }
        ],
        origin: "Tibet and China",
        parts: ["Fruiting body"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cordyceps_militaris.jpg/640px-Cordyceps_militaris.jpg",
        tags: ["mushroom", "energy", "athletic", "reproductive"]
      },
      {
        id: "fenugreek",
        name: "Fenugreek",
        scientificName: "Trigonella foenum-graecum",
        category: "mens-herbs",
        description: "Fenugreek seeds are used to support healthy testosterone levels, enhance libido, and improve muscle strength and athletic performance.",
        benefits: [
          "Supports healthy testosterone levels",
          "Enhances libido and sexual function",
          "Improves muscle strength",
          "Supports healthy blood sugar levels"
        ],
        usage: "Commonly consumed in capsule, powder, or tea form.",
        cautions: "May interact with medications for diabetes and blood thinners. May cause digestive discomfort in some individuals. Has a distinct maple syrup-like odor that may be noticeable in sweat and urine.",
        preparations: [
          {
            type: "Capsule",
            description: "Standardized extract in capsule form.",
            dosage: "500-600mg, 2-3 times daily"
          },
          {
            type: "Powder",
            description: "Can be added to food or drinks.",
            dosage: "1-2 teaspoons daily"
          },
          {
            type: "Tea",
            description: "Steep seeds in hot water.",
            dosage: "1 cup, 1-2 times daily"
          }
        ],
        benefitScores: [
          { category: "Testosterone Support", score: 80 },
          { category: "Libido Enhancement", score: 85 },
          { category: "Muscle Strength", score: 80 },
          { category: "Blood Sugar Support", score: 85 }
        ],
        origin: "Mediterranean region and Asia",
        parts: ["Seeds"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Trigonella_foenum-graecum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-136.jpg/640px-Trigonella_foenum-graecum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-136.jpg",
        tags: ["testosterone", "libido", "muscle", "blood sugar"]
      }
    ]
  },
  {
    id: "herbal-teas",
    name: "Herbal Teas",
    description: "Herbs that make delicious and therapeutic teas",
    icon: "",
    color: "#F59E0B",
    herbs: [
      {
        id: "rooibos-tea",
        name: "Rooibos Tea",
        scientificName: "Aspalathus linearis",
        category: "herbal-teas",
        description: "Rooibos is a caffeine-free herbal tea known for its rich antioxidant content and soothing properties. It has a naturally sweet, nutty flavor.",
        benefits: [
          "Rich in antioxidants",
          "Caffeine-free alternative to black tea",
          "Supports heart health",
          "May help with digestive issues"
        ],
        usage: "Brewed as a tea, can be enjoyed hot or cold.",
        cautions: "Generally safe for most people. Rare allergic reactions may occur.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1 teaspoon of loose leaves or 1 tea bag in hot water.",
            dosage: "Steep for 5-7 minutes, drink 1-3 cups daily"
          },
          {
            type: "Cold Brew",
            description: "Steep in cold water for a longer period.",
            dosage: "Steep for 6-12 hours in refrigerator, drink as desired"
          },
          {
            type: "Sun Tea",
            description: "Steep in room temperature water in sunlight.",
            dosage: "Steep for 2-4 hours in sunlight, drink as desired"
          }
        ],
        benefitScores: [
          { category: "Antioxidant", score: 90 },
          { category: "Heart Health", score: 80 },
          { category: "Digestive Support", score: 75 },
          { category: "Caffeine-Free", score: 100 }
        ],
        origin: "South Africa",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Rooibos_dried_and_infused.jpg/640px-Rooibos_dried_and_infused.jpg",
        tags: ["caffeine-free", "antioxidant", "digestive", "relaxing"]
      },
      {
        id: "tulsi-tea",
        name: "Tulsi Tea",
        scientificName: "Ocimum sanctum",
        category: "herbal-teas",
        description: "Tulsi, also known as Holy Basil, is a sacred herb in Ayurvedic medicine that makes a fragrant tea with adaptogenic properties.",
        benefits: [
          "Reduces stress and anxiety",
          "Supports immune function",
          "Enhances mental clarity",
          "Helps with respiratory issues"
        ],
        usage: "Brewed as a tea, can be combined with other herbs.",
        cautions: "May interact with blood-thinning medications. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1-2 teaspoons of dried leaves or 1 tea bag in hot water.",
            dosage: "Steep for 5-7 minutes, drink 1-3 cups daily"
          },
          {
            type: "Blended Tea",
            description: "Combine with other herbs like ginger or lemon grass.",
            dosage: "Steep for 5-7 minutes, drink 1-3 cups daily"
          },
          {
            type: "Iced Tea",
            description: "Brew strong and pour over ice.",
            dosage: "Drink as desired throughout the day"
          }
        ],
        benefitScores: [
          { category: "Stress Relief", score: 90 },
          { category: "Immune Support", score: 85 },
          { category: "Mental Clarity", score: 80 },
          { category: "Respiratory Support", score: 85 }
        ],
        origin: "India",
        parts: ["Leaves", "Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Holy_Basil_Plant.jpg/640px-Holy_Basil_Plant.jpg",
        tags: ["adaptogen", "ayurvedic", "stress", "immune"]
      },
      {
        id: "hibiscus-tea",
        name: "Hibiscus Tea",
        scientificName: "Hibiscus sabdariffa",
        category: "herbal-teas",
        description: "Hibiscus tea is made from the vibrant red calyces of the hibiscus flower, creating a tart, cranberry-like flavor with cardiovascular benefits.",
        benefits: [
          "Supports healthy blood pressure",
          "Rich in antioxidants",
          "May help lower cholesterol",
          "Refreshing and hydrating"
        ],
        usage: "Brewed as a tea, can be enjoyed hot or cold.",
        cautions: "May interact with certain blood pressure medications and may have mild diuretic effects. Not recommended during pregnancy.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1-2 teaspoons of dried hibiscus or 1 tea bag in hot water.",
            dosage: "Steep for 5-7 minutes, drink 1-3 cups daily"
          },
          {
            type: "Cold Brew",
            description: "Steep in cold water for a longer period.",
            dosage: "Steep for 6-12 hours in refrigerator, drink as desired"
          },
          {
            type: "Agua de Jamaica",
            description: "Traditional Mexican hibiscus drink with sugar and lime.",
            dosage: "Drink as desired, typically sweetened"
          }
        ],
        benefitScores: [
          { category: "Blood Pressure", score: 85 },
          { category: "Antioxidant", score: 90 },
          { category: "Cholesterol Support", score: 80 },
          { category: "Hydration", score: 85 }
        ],
        origin: "Africa and Asia",
        parts: ["Calyces (flower sepals)"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Hibiscus_sabdariffa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-073.jpg/640px-Hibiscus_sabdariffa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-073.jpg",
        tags: ["cardiovascular", "antioxidant", "blood pressure", "hydrating"]
      },
      {
        id: "lemon-balm-tea",
        name: "Lemon Balm Tea",
        scientificName: "Melissa officinalis",
        category: "herbal-teas",
        description: "Lemon balm tea has a gentle lemony flavor and is known for its calming effects on the nervous system and digestive tract.",
        benefits: [
          "Calms anxiety and stress",
          "Aids digestion and relieves bloating",
          "Supports healthy sleep",
          "May help with cognitive function"
        ],
        usage: "Brewed as a tea, can be combined with other calming herbs.",
        cautions: "May interact with sedatives and thyroid medications. Use with caution if you have thyroid issues.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1-2 teaspoons of dried leaves or 1 tea bag in hot water.",
            dosage: "Steep for 5-10 minutes, drink 1-3 cups daily"
          },
          {
            type: "Sleep Blend",
            description: "Combine with chamomile and lavender for enhanced sleep benefits.",
            dosage: "Drink 1 cup before bedtime"
          },
          {
            type: "Digestive Blend",
            description: "Combine with peppermint and fennel for digestive support.",
            dosage: "Drink 1 cup after meals"
          }
        ],
        benefitScores: [
          { category: "Anxiety Relief", score: 90 },
          { category: "Digestive Support", score: 85 },
          { category: "Sleep Support", score: 85 },
          { category: "Cognitive Function", score: 75 }
        ],
        origin: "Mediterranean region",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg/640px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
        tags: ["calming", "digestive", "sleep", "cognitive"]
      },
      {
        id: "dandelion-root-tea",
        name: "Dandelion Root Tea",
        scientificName: "Taraxacum officinale",
        category: "herbal-teas",
        description: "Dandelion root tea has a rich, earthy flavor similar to coffee and is known for its detoxifying properties and liver support.",
        benefits: [
          "Supports liver function and detoxification",
          "Acts as a gentle diuretic",
          "Aids digestion",
          "Rich in vitamins and minerals"
        ],
        usage: "Brewed as a tea, often roasted for a coffee-like flavor.",
        cautions: "May interact with certain medications including diuretics, antibiotics, and lithium. Not recommended for those with gallbladder issues or bile duct obstruction.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Simmer 1-2 teaspoons of dried root in water for 10-15 minutes.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Roasted Tea",
            description: "Use roasted dandelion root for a coffee-like flavor.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Detox Blend",
            description: "Combine with burdock root and yellow dock for enhanced detoxification.",
            dosage: "Drink 1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Liver Support", score: 90 },
          { category: "Detoxification", score: 85 },
          { category: "Digestive Support", score: 80 },
          { category: "Nutritional Value", score: 85 }
        ],
        origin: "Europe and Asia, now worldwide",
        parts: ["Root"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg/640px-Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg",
        tags: ["liver", "detox", "digestive", "diuretic"]
      },
      {
        id: "elderflower-tea",
        name: "Elderflower Tea",
        scientificName: "Sambucus nigra",
        category: "herbal-teas",
        description: "Elderflower tea has a sweet, floral flavor and is traditionally used for respiratory support, particularly during cold and flu season.",
        benefits: [
          "Supports immune function",
          "Helps with cold and flu symptoms",
          "Reduces fever and inflammation",
          "Supports respiratory health"
        ],
        usage: "Brewed as a tea, often combined with honey and lemon.",
        cautions: "The flowers are safe, but other parts of the elder plant can be toxic if not properly prepared. Not recommended during pregnancy without professional guidance.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1-2 teaspoons of dried flowers or 1 tea bag in hot water.",
            dosage: "Steep for 5-10 minutes, drink 2-3 cups daily during illness"
          },
          {
            type: "Cold and Flu Blend",
            description: "Combine with peppermint and yarrow for enhanced benefits during illness.",
            dosage: "Drink 1 cup every 2-3 hours during acute illness"
          },
          {
            type: "Elderflower Cordial",
            description: "Traditional sweet syrup made with elderflowers, can be added to hot water or sparkling water.",
            dosage: "1-2 tablespoons in hot or cold water as desired"
          }
        ],
        benefitScores: [
          { category: "Immune Support", score: 85 },
          { category: "Cold and Flu Relief", score: 90 },
          { category: "Fever Reduction", score: 85 },
          { category: "Respiratory Support", score: 80 }
        ],
        origin: "Europe and North America",
        parts: ["Flowers"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Sambucus_nigra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-258.jpg/640px-Sambucus_nigra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-258.jpg",
        tags: ["immune", "respiratory", "cold and flu", "fever"]
      },
      {
        id: "nettle-tea",
        name: "Nettle Tea",
        scientificName: "Urtica dioica",
        category: "herbal-teas",
        description: "Nettle tea has a rich, earthy flavor and is highly nutritious, supporting overall health, reducing inflammation, and helping with seasonal allergies.",
        benefits: [
          "Rich in vitamins and minerals",
          "Helps with seasonal allergies",
          "Reduces inflammation",
          "Supports kidney and urinary health"
        ],
        usage: "Brewed as a tea, often combined with other herbs.",
        cautions: "May interact with medications for high blood pressure, diabetes, and blood thinners. May enhance the effects of diuretics.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Steep 1-2 teaspoons of dried leaves or 1 tea bag in hot water.",
            dosage: "Steep for 10-15 minutes, drink 1-3 cups daily"
          },
          {
            type: "Allergy Blend",
            description: "Combine with elderflower and peppermint for seasonal allergy relief.",
            dosage: "Drink 1-3 cups daily during allergy season"
          },
          {
            type: "Nutritive Infusion",
            description: "Steep a larger amount for a longer time to extract more nutrients.",
            dosage: "Steep 1 ounce in a quart of water for 4-8 hours, drink 1-2 cups daily"
          }
        ],
        benefitScores: [
          { category: "Nutritional Value", score: 95 },
          { category: "Allergy Relief", score: 85 },
          { category: "Inflammation Reduction", score: 80 },
          { category: "Urinary Health", score: 85 }
        ],
        origin: "Europe, Asia, and North America",
        parts: ["Leaves"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Urtica_dioica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-140.jpg/640px-Urtica_dioica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-140.jpg",
        tags: ["nutritive", "allergy", "inflammation", "urinary"]
      },
      {
        id: "rose-hip-tea",
        name: "Rose Hip Tea",
        scientificName: "Rosa canina",
        category: "herbal-teas",
        description: "Rose hip tea has a tart, fruity flavor and is exceptionally high in vitamin C, supporting immune function and skin health.",
        benefits: [
          "High in vitamin C and antioxidants",
          "Supports immune function",
          "Promotes skin health",
          "Supports joint health"
        ],
        usage: "Brewed as a tea, can be combined with other herbs.",
        cautions: "Generally safe for most people. May interact with certain medications including blood thinners and diabetes medications.",
        preparations: [
          {
            type: "Hot Tea",
            description: "Simmer 1-2 teaspoons of dried rose hips in water for 10-15 minutes.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Vitamin C Blend",
            description: "Combine with hibiscus and lemon for enhanced vitamin C content.",
            dosage: "Drink 1-3 cups daily"
          },
          {
            type: "Cold Brew",
            description: "Steep in cold water for a longer period to preserve more vitamin C.",
            dosage: "Steep for 6-12 hours in refrigerator, drink as desired"
          }
        ],
        benefitScores: [
          { category: "Vitamin C", score: 95 },
          { category: "Immune Support", score: 90 },
          { category: "Skin Health", score: 85 },
          { category: "Joint Health", score: 80 }
        ],
        origin: "Europe, Asia, and North America",
        parts: ["Fruit (hip)"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_canina_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-252.jpg/640px-Rosa_canina_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-252.jpg",
        tags: ["vitamin C", "immune", "skin", "antioxidant"]
      }
    ]
  },
  {
    id: "immune-support",
    name: "Immune Support",
    description: "strengthening immune response and fighting infections",
    icon: "🛡️",
    color: "#F59E0B",
    herbs: []
  }
]

export type BenefitScoreObject = { [category: string]: number };
