import type { Metadata } from "next";
import { ProductList } from "./product-list";

export const metadata: Metadata = {
  title: "Shop handmade mugs and bowls - Demo Ceramics",
  description: "Browse handmade stoneware mugs, bowls and plates.",
};

export default function Products() {
  return (
    <>
      <h1>Shop</h1>
      <ProductList />
    </>
  );
}
