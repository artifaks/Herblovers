
export type Recipe = {
  id: string;
  title: string;
  image: string;
  duration: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  category: string;
};

export const featuredRecipes: Recipe[] = [
  {
    id: "calendula-healing-salve",
    title: "Calendula Healing Salve",
    image: "https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//making-pot-marigold-salve-2024-09-16-09-57-02-utc.jpg",
    duration: "3 hours (plus 2-4 weeks for oil infusion)",
    description: "This gentle, all-purpose salve is perfect for minor cuts, burns, and skin irritations. Calendula is known for its skin-healing properties and can help with wound healing, reducing inflammation, and moisturizing dry skin.",
    shortDescription: "A gentle, all-purpose salve for minor cuts, burns, and skin irritations.",
    category: "salve",
    ingredients: [
      "1 cup dried calendula flowers",
      "2 cups olive oil or sweet almond oil",
      "1/4 cup beeswax pellets",
      "10-15 drops lavender essential oil (optional)",
      "5-10 drops tea tree essential oil (optional)",
      "Clean glass jars for storage"
    ],
    instructions: [
      "Infuse the oil: Place dried calendula flowers in a clean, dry glass jar and cover completely with olive oil or sweet almond oil. Seal the jar and place it in a sunny window for 4-6 weeks, shaking occasionally. Alternatively, use a slow cooker on low heat for 24-48 hours.",
      "Strain the infused oil through cheesecloth or a fine mesh strainer into a clean container, pressing to extract all the oil.",
      "In a double boiler, heat the beeswax until melted.",
      "Add the infused calendula oil to the melted beeswax and stir to combine.",
      "Remove from heat and add essential oils if using.",
      "Quickly pour the mixture into clean containers and allow to cool completely and solidify.",
      "Cap tightly and store in a cool, dark place. The salve should keep for up to a year."
    ],
    benefits: [
      "Soothes minor burns, cuts, and skin irritations",
      "Helps heal chapped lips and dry skin",
      "Aids in reducing inflammation of minor wounds",
      "Moisturizes and protects the skin barrier",
      "Made with natural ingredients without harsh chemicals"
    ]
  },
  {
    id: "lavender-tincture",
    title: "Calming Lavender Tincture",
    image: "https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//Calming%20Lavender%20Tincture%20%20(1).jpg",
    duration: "30 minutes (plus 4-6 weeks for extraction)",
    description: "This soothing lavender tincture helps promote relaxation and ease anxiety. The concentrated herbal extract can be taken in small doses to help with sleep issues, nervous tension, and general stress relief.",
    shortDescription: "A soothing tincture to promote relaxation and ease anxiety.",
    category: "tincture",
    ingredients: [
      "1 cup dried lavender flowers",
      "2-3 cups high-proof alcohol (vodka or grain alcohol, 80-100 proof)",
      "1 quart-sized glass jar with tight-fitting lid",
      "Amber glass dropper bottles for storage",
      "Labels for dating and identifying your tincture"
    ],
    instructions: [
      "Fill your glass jar about 1/3 to 1/2 full with dried lavender flowers.",
      "Pour the alcohol over the herbs, making sure they are completely covered with at least 2-3 inches of liquid above the plant material.",
      "Seal the jar tightly and shake well.",
      "Store the jar in a cool, dark place for 4-6 weeks, shaking every few days.",
      "After the extraction period, strain the liquid through cheesecloth or a fine-mesh strainer, pressing to extract all the tincture.",
      "Pour the strained tincture into amber glass dropper bottles and label with the date and contents.",
      "Store in a cool, dark place where it will remain potent for 3-5 years."
    ],
    benefits: [
      "Helps reduce anxiety and promote relaxation",
      "May improve sleep quality when taken before bedtime",
      "Can ease nervous tension and stress",
      "Convenient and fast-acting when needed",
      "Long shelf life makes it economical to produce"
    ]
  },
  {
    id: "rosemary-infused-oil",
    title: "Rosemary Infused Oil",
    image: "https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//Rosemary%20Infused%20Oil%20%20(1).jpg",
    duration: "30 minutes (plus 2 weeks for infusion)",
    description: "This versatile rosemary-infused oil can be used both in the kitchen and as part of your natural beauty routine. The aromatic oil captures rosemary's stimulating properties and can be used to enhance hair growth, improve scalp health, or add flavor to your favorite dishes.",
    shortDescription: "A versatile oil for culinary uses and hair care applications.",
    category: "oil",
    ingredients: [
      "2 cups fresh rosemary sprigs (or 1 cup dried)",
      "2 cups carrier oil (olive oil for culinary use; jojoba or sweet almond oil for cosmetic use)",
      "Clean, dry glass jar with tight-fitting lid",
      "Amber glass bottles for storage"
    ],
    instructions: [
      "If using fresh rosemary, wash the sprigs and pat completely dry. Any moisture can cause the oil to spoil.",
      "Place rosemary in a clean, dry glass jar.",
      "Pour the oil over the herbs, making sure they are completely covered.",
      "Seal the jar tightly and place it in a sunny window for 2-3 weeks, shaking the jar gently every few days.",
      "For a quicker method, place the jar in a slow cooker filled with water on the lowest setting for 5-6 hours.",
      "When the infusion period is complete, strain the oil through cheesecloth or a fine mesh strainer into clean bottles.",
      "Label the bottles with the date and contents.",
      "Store in a cool, dark place. Culinary oils will last 6-12 months; cosmetic oils will last 12-18 months."
    ],
    benefits: [
      "For hair: May stimulate hair follicles and promote growth",
      "For scalp: Helps improve circulation and reduce dandruff",
      "For skin: Has antioxidant properties that protect against damage",
      "For cooking: Adds aromatic flavor to roasted vegetables, meats, and dressings",
      "Versatile for both internal and external use"
    ]
  }
];
