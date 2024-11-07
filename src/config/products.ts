interface ProductCategory {
  title: string;
  subCategories: ProductSubCategory[];
}

interface ProductSubCategory {
  title: string;
  description: string;
  slug: string;
}

export const sortOptions = [
  { label: "Date: Old to new", value: "date.asc" },
  { label: "Date: New to old", value: "date.desc" },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  { label: "Alphabetical: A to Z", value: "name.asc" },
  { label: "Alphabetical: Z to A", value: "name.desc" },
];

export const productsCategories: ProductCategory[] = [
  {
    title: "clothing",
    subCategories: [
      {
        title: "T-shirts",
        description: "Cool and comfy tees for effortless style.",
        slug: "t-shirts",
      },
      {
        title: "Hoodies",
        description: "Cozy up in trendy hoodies.",
        slug: "hoodies",
      },
      {
        title: "Pants",
        description: "Relaxed and stylish pants for everyday wear.",
        slug: "pants",
      },
      {
        title: "Shorts",
        description: "Stay cool with casual and comfortable shorts.",
        slug: "shorts",
      },
      {
        title: "Hats",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "hats",
      },
    ],
  },
  {
    title: "electronics",
    subCategories: [
      {
        title: "Phones",
        description: "Stay connected with the latest smartphones.",
        slug: "phones",
      },
      {
        title: "Laptops",
        description: "Work and play with the latest laptops.",
        slug: "laptops",
      },
      {
        title: "Tablets",
        description: "Stay connected with the latest tablets.",
        slug: "tablets",
      },
      {
        title: "Headphones",
        description:
          "Listen to your favorite music with the latest headphones.",
        slug: "headphones",
      },
      {
        title: "Speakers",
        description: "Listen to your favorite music with the latest speakers.",
        slug: "speakers",
      },
    ],
  },
  {
    title: "watches",
    subCategories: [
      {
        title: "Smartwatches",
        description: "Stay connected with the latest smartwatches.",
        slug: "smartwatches",
      },
      {
        title: "Analog",
        description: "Stay on time with the latest analog watches.",
        slug: "analog",
      },
      {
        title: "Digital",
        description: "Stay on time with the latest digital watches.",
        slug: "digital",
      },
      {
        title: "Sports",
        description: "Stay on time with the latest sports watches.",
        slug: "sports",
      },
      {
        title: "Luxury",
        description: "Stay on time with the latest luxury watches.",
        slug: "luxury",
      },
    ],
  },
  {
    title: "shoes",
    subCategories: [
      {
        title: "Low Tops",
        description: "Rad low tops shoes for a stylish low-profile look.",
        slug: "low-tops",
      },
      {
        title: "High Tops",
        description: "Elevate your style with rad high top shoes.",
        slug: "high-tops",
      },
      {
        title: "Slip-ons",
        description: "Effortless style with rad slip-on shoes.",
        slug: "slip-ons",
      },
      {
        title: "Pros",
        description: "Performance-driven rad shoes for the pros.",
        slug: "pros",
      },
      {
        title: "Sneakers",
        description: "Classic and comfy rad sneakers.",
        slug: "sneakers",
      },
    ],
  },
];

export function getSubcategories(category?: string) {
  if (!category) return [];

  const subcategories =
    productsCategories
      .find((c) => c.title.toLowerCase() === category.toLowerCase())
      ?.subCategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}
