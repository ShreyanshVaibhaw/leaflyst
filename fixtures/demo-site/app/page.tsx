import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Ceramics - Handmade mugs and bowls",
  description: "Handmade stoneware mugs, bowls and plates, thrown and glazed in a small studio.",
};

export default function Home() {
  return (
    <>
      <h1>Handmade ceramics for everyday use</h1>
      <p>
        Every mug and bowl is thrown on the wheel, trimmed by hand and fired twice. We make small batches in
        stoneware clay with food safe glazes, so each piece is a little different from the last one.
      </p>
      <ul>
        <li><a href="/about">About the studio</a></li>
        <li><a href="/blog/first-post">How we glaze our mugs</a></li>
        <li><a href="/blog/second-post">Caring for stoneware</a></li>
        <li><a href="/products">Shop the collection</a></li>
        <li><a href="/old-page">Our old wholesale page</a></li>
        <li><a href="/legacy">Studio history</a></li>
        <li><a href="/landing">Spring sale</a></li>
      </ul>
    </>
  );
}
