const PRODUCTS = [
  { name: "Speckled morning mug", description: "A twelve ounce mug in speckled oatmeal glaze with a wide comfortable handle that fits three fingers.", price: "$32" },
  { name: "Deep ramen bowl", description: "A deep stoneware bowl for noodles and soups, glazed in a dark celadon green that pools in the throwing lines.", price: "$48" },
  { name: "Dinner plate set", description: "Four ten inch plates with an unglazed rim and a satin white centre that shows off every meal.", price: "$140" },
  { name: "Pour over coffee dripper", description: "A cone dripper that fits standard filters, with three holes for an even pour and a saucer for the counter.", price: "$38" },
];

export function GET() {
  return Response.json(PRODUCTS);
}
