import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spring sale on handmade mugs - Demo Ceramics",
  description: "Twenty percent off every mug this spring.",
};

export default function Landing() {
  return (
    <>
      <h1>Spring sale</h1>
      <p>Twenty percent off every mug until the end of April. Free shipping on orders over sixty dollars.</p>
    </>
  );
}
