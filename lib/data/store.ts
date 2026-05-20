export type Product = {
  slug: string;
  sku: string;
  name: string;
  price: number;
  category: "Tees" | "Hoodies" | "Headwear";
  variants: string[];
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "t-1-dark",
    sku: "T-1 Dark",
    name: "T-1 Tee — Dark",
    price: 30,
    category: "Tees",
    variants: ["Black heather", "Charcoal", "Navy"],
    description: "Classic unisex staple. Heavyweight cotton, dropped seams.",
  },
  {
    slug: "t-1-light",
    sku: "T-1 Light",
    name: "T-1 Tee — Light",
    price: 30,
    category: "Tees",
    variants: ["Athletic heather", "Light blue", "Bone"],
    description: "Classic unisex staple. Heavyweight cotton, dropped seams.",
  },
  {
    slug: "h-1-dark",
    sku: "H-1 Dark",
    name: "H-1 Hoodie — Dark",
    price: 50,
    category: "Hoodies",
    variants: ["Black", "Navy", "Charcoal", "Vintage black", "Team royal"],
    description: "Premium fleece. Reinforced cuffs. Wears in over a season.",
  },
  {
    slug: "h-1-light",
    sku: "H-1 Light",
    name: "H-1 Hoodie — Light",
    price: 50,
    category: "Hoodies",
    variants: ["Sky blue", "Military green", "Dusty rose", "Carbon grey", "Bone"],
    description: "Premium fleece. Reinforced cuffs. Wears in over a season.",
  },
  {
    slug: "c-1-dark",
    sku: "C-1 Dark",
    name: "C-1 Dad Hat — Dark",
    price: 30,
    category: "Headwear",
    variants: ["Black", "Navy", "Spruce", "Dark grey", "Green camo"],
    description: "Unstructured 6-panel. Adjustable. Made to break in.",
  },
  {
    slug: "c-1-light",
    sku: "C-1 Light",
    name: "C-1 Dad Hat — Light",
    price: 30,
    category: "Headwear",
    variants: ["Khaki", "Stone", "Pink", "Light blue", "White"],
    description: "Unstructured 6-panel. Adjustable. Made to break in.",
  },
  {
    slug: "v-1-dark",
    sku: "V-1 Dark",
    name: "V-1 V-Neck — Dark",
    price: 32,
    category: "Tees",
    variants: ["Black"],
    description: "Fitted V-neck. Stays in shape after 50 washes.",
  },
  {
    slug: "v-1-light",
    sku: "V-1 Light",
    name: "V-1 V-Neck — Light",
    price: 32,
    category: "Tees",
    variants: ["White"],
    description: "Fitted V-neck. Stays in shape after 50 washes.",
  },
];
