// Hero is promotional artwork based on the supplied reference; business facts stay in the profile.
export const buddasDesign = {
  description: "Budda’s Hawaiian Bakery & Grill. Island flavors. Local roots. Good food brings people together. Home of the Budda Rolls.",
  heroImage: "/buddas/hero-reference.png",
  featuredBentoImage: "/buddas/bento-reference.png",
  botanicalImage: "/buddas/botanical-reference.png",
  facebookUrl: "https://www.facebook.com/BuddasBakery",
  favorites: [
    { id: "budda-rolls", label: "Budda Rolls", imageUrl: "/buddas/budda-rolls.webp", url: "https://buddashawaiian.com/menu" },
    { id: "loco-moco", label: "Loco Moco", imageUrl: "/buddas/loco-moco.jpg", url: "https://buddashawaiian.com/menu" },
    { id: "hawaiian-plates", label: "Hawaiian Plates", imageUrl: "/buddas/hawaiian-plate.jpg", url: "https://buddashawaiian.com/menu" },
  ],
  locationImages: {
    "pleasant-grove": "/buddas/pleasant-grove-reference.png",
    "salt-lake-city": "/buddas/salt-lake-city-reference.png",
  } as Record<string, string>,
};
