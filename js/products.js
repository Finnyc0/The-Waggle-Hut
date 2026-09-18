const products = [
  {
    id: 'raw-beef-bundle',
    category: 'raw',
    name: 'Raw Beef Starter Bundle',
    description: 'Perfect for beginners. Includes 10kg of premium ground beef, heart, and liver chunks.',
    price: 45.00,
    image: 'assets/products/raw-beef.jpg'
  },
  {
    id: 'raw-chicken-complete',
    category: 'raw',
    name: 'Chicken & Bone Complete',
    description: 'A finely ground mix of chicken meat and soft bone. High in calcium and natural fats.',
    price: 38.00,
    image: 'assets/products/raw-chicken.jpg'
  },
  {
    id: 'treat-venison-ears',
    category: 'treats',
    name: 'Air-Dried Venison Ears',
    description: 'Long-lasting, single-ingredient chew. Great for dental health and sensitive stomachs.',
    price: 12.50,
    image: 'assets/products/treat-venison.jpg'
  },
  {
    id: 'treat-beef-liver',
    category: 'treats',
    name: 'Crunchy Beef Liver Snaps',
    description: 'Bite-sized training treats. Packed with Vitamin A and high-quality protein.',
    price: 8.00,
    image: 'assets/products/treat-liver.jpg'
  },
  {
    id: 'small-timothy-hay',
    category: 'small-animals',
    name: 'Premium Timothy Hay',
    description: 'Sun-cured, long-strand hay. Essential fiber for rabbits and guinea pigs.',
    price: 15.00,
    image: 'assets/products/hay.jpg'
  },
  {
    id: 'small-herbal-mix',
    category: 'small-animals',
    name: 'Wild Flower Enrichment Mix',
    description: 'A blend of dried dandelion, marigold, and nettle for foraging fun.',
    price: 6.50,
    image: 'assets/products/herbs.jpg'
  },
  {
    id: 'misc-ceramic-bowl',
    category: 'misc',
    name: 'Heavyweight Ceramic Bowl',
    description: 'Non-slip, easy-clean bowl in our signature Sage green.',
    price: 18.00,
    image: 'assets/products/bowl.jpg'
  },
  {
    id: 'misc-rope-lead',
    category: 'misc',
    name: 'Braided Cotton Rope Lead',
    description: 'Durable, hand-spliced lead with solid brass hardware.',
    price: 22.00,
    image: 'assets/products/lead.jpg'
  }
];

if (typeof module !== 'undefined') {
  module.exports = products;
}
