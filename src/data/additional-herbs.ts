import { Herb } from './herbs';

export const additionalHerbs: Herb[] = [
  {
    id: "ginger-digestive",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    category: "digestive-herbs",
    description: "Ginger is a warming herb with powerful anti-inflammatory and digestive properties. It has been used for thousands of years in traditional medicine systems worldwide.",
    benefits: [
      "Relieves nausea and motion sickness",
      "Supports healthy digestion",
      "Reduces inflammation",
      "May help reduce muscle pain and soreness",
      "Supports immune function"
    ],
    usage: "Can be used fresh, dried, powdered, as an oil or juice. Commonly added to foods, teas, and taken as a supplement.",
    cautions: "May interact with blood-thinning medications. Use with caution if you have gallstones or are pregnant (though generally considered safe in small amounts during pregnancy).",
    preparations: [
      {
        type: "Tea",
        description: "Fresh ginger tea is warming and soothing for digestion and colds.",
        dosage: "1-2 teaspoons grated fresh ginger per cup of water",
        steps: [
          "Grate 1-2 teaspoons of fresh ginger root",
          "Place in a cup and pour boiling water over it",
          "Steep for 5-10 minutes",
          "Strain and add honey or lemon if desired",
          "Drink up to 3 cups daily"
        ]
      },
      {
        type: "Tincture",
        description: "Concentrated liquid extract for digestive issues.",
        dosage: "20-30 drops, 2-3 times daily",
        steps: [
          "Take 20-30 drops in a small amount of water",
          "Use 2-3 times daily as needed for digestive support",
          "Best taken before meals to aid digestion"
        ]
      }
    ],
    origin: "Southeast Asia",
    parts: ["Rhizome (root)"],
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "turmeric-antiinflammatory",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "antiinflammatory-herbs",
    description: "Turmeric is a bright yellow spice with powerful anti-inflammatory and antioxidant properties. Its active compound, curcumin, has been extensively studied for its health benefits.",
    benefits: [
      "Reduces inflammation",
      "Powerful antioxidant",
      "Supports joint health",
      "May improve brain function",
      "Supports heart health"
    ],
    usage: "Used as a spice in cooking, as a supplement, or in golden milk preparations.",
    cautions: "May interact with blood thinners, diabetes medications, and acid-reducing medications. Avoid in gallbladder disease.",
    preparations: [
      {
        type: "Golden Milk",
        description: "Traditional Ayurvedic preparation with milk and spices.",
        dosage: "1 cup daily",
        steps: [
          "Heat 1 cup of milk (dairy or plant-based)",
          "Add 1 teaspoon of turmeric powder",
          "Add a pinch of black pepper (improves absorption)",
          "Add optional spices: cinnamon, cardamom, ginger",
          "Sweeten with honey if desired",
          "Simmer for 5-10 minutes on low heat",
          "Drink warm, preferably in the evening"
        ]
      },
      {
        type: "Supplement",
        description: "Standardized curcumin extract for therapeutic use.",
        dosage: "500-1000mg of curcumin daily",
        steps: [
          "Take with a meal containing some fat for better absorption",
          "Look for formulations with black pepper extract (piperine) for enhanced bioavailability",
          "Divide into 2-3 doses throughout the day for best results"
        ]
      }
    ],
    origin: "South Asia (primarily India)",
    parts: ["Rhizome (root)"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "lavender-calming",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    category: "calming-herbs",
    description: "Lavender is a fragrant herb known for its calming and relaxing properties. It's widely used in aromatherapy and herbal medicine for stress, anxiety, and sleep issues.",
    benefits: [
      "Promotes relaxation and reduces anxiety",
      "Improves sleep quality",
      "Relieves headaches",
      "Has antimicrobial properties",
      "May help with mild pain relief"
    ],
    usage: "Used as an essential oil for aromatherapy, in tea blends, as a culinary herb, and in bath products.",
    cautions: "Generally safe, but may cause skin irritation in some individuals. Essential oil should not be ingested.",
    preparations: [
      {
        type: "Tea",
        description: "Calming herbal tea for stress and sleep.",
        dosage: "1-2 teaspoons dried flowers per cup",
        steps: [
          "Place 1-2 teaspoons of dried lavender flowers in a tea infuser",
          "Pour boiling water over the flowers",
          "Steep for 5-7 minutes",
          "Strain and add honey if desired",
          "Drink 1-2 cups daily, especially before bedtime"
        ]
      },
      {
        type: "Essential Oil",
        description: "Concentrated aromatherapy oil for stress and sleep.",
        dosage: "2-3 drops for diffusion",
        steps: [
          "Add 2-3 drops to a diffuser with water",
          "Diffuse for 30 minutes before bedtime",
          "For direct inhalation, place 1-2 drops on a tissue and inhale",
          "For massage, dilute 5 drops in 10ml of carrier oil"
        ]
      }
    ],
    origin: "Mediterranean region",
    parts: ["Flowers", "Leaves"],
    image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "echinacea-immune",
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    category: "immune-herbs",
    description: "Echinacea is a popular herb used to boost the immune system and help fight off infections, particularly colds and flu. It's native to North America and has been used by Native Americans for centuries.",
    benefits: [
      "Supports immune function",
      "May reduce the duration and severity of colds",
      "Has anti-inflammatory properties",
      "Supports upper respiratory health",
      "May help with wound healing"
    ],
    usage: "Commonly taken as a supplement, tincture, or tea at the first sign of illness.",
    cautions: "May interact with immunosuppressant medications. Not recommended for people with autoimmune disorders or allergies to plants in the daisy family.",
    preparations: [
      {
        type: "Tincture",
        description: "Liquid extract for immune support.",
        dosage: "20-30 drops, 3 times daily",
        steps: [
          "Take 20-30 drops in a small amount of water",
          "Use 3 times daily at the first sign of illness",
          "Continue for up to 10 days",
          "Take a break for 1-2 weeks before resuming"
        ]
      },
      {
        type: "Tea",
        description: "Hot infusion of echinacea root and/or aerial parts.",
        dosage: "1-2 teaspoons dried herb per cup, 3 cups daily",
        steps: [
          "Combine 1-2 teaspoons of dried echinacea in a cup",
          "Pour boiling water over the herbs",
          "Cover and steep for 10-15 minutes",
          "Strain and drink up to 3 cups daily",
          "Best used at the first sign of illness for 5-7 days"
        ]
      }
    ],
    origin: "North America",
    parts: ["Root", "Leaves", "Flowers"],
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "valerian-sleep",
    name: "Valerian",
    scientificName: "Valeriana officinalis",
    category: "sleep-herbs",
    description: "Valerian is a powerful herb for promoting sleep and relaxation. It has been used since ancient times for its sedative properties and ability to calm the nervous system.",
    benefits: [
      "Improves sleep quality and reduces insomnia",
      "Reduces anxiety and stress",
      "May help with restlessness",
      "Supports relaxation without morning grogginess",
      "May help with menstrual cramps"
    ],
    usage: "Typically taken as a tea, tincture, or supplement before bedtime.",
    cautions: "May interact with alcohol, sedatives, and certain medications. Can cause drowsiness, so avoid driving or operating machinery after taking. Not recommended during pregnancy or breastfeeding.",
    preparations: [
      {
        type: "Tea",
        description: "Sleep-promoting herbal tea.",
        dosage: "1-2 teaspoons dried root per cup",
        steps: [
          "Place 1-2 teaspoons of dried valerian root in a tea infuser",
          "Pour boiling water over the root",
          "Cover and steep for 10-15 minutes (longer for stronger effect)",
          "Strain and drink 30-60 minutes before bedtime",
          "Note: has a strong, earthy smell that some find unpleasant"
        ]
      },
      {
        type: "Tincture",
        description: "Concentrated liquid extract for sleep and anxiety.",
        dosage: "30-40 drops before bedtime",
        steps: [
          "Take 30-40 drops in a small amount of water",
          "Use 30-60 minutes before bedtime",
          "Can also be used in smaller doses (15-20 drops) during the day for anxiety"
        ]
      }
    ],
    origin: "Europe and Asia",
    parts: ["Root"],
    image: "https://images.unsplash.com/photo-1594631661960-32b1363c61b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];
