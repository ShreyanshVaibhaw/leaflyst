import type { Metadata } from "next";

// Both posts share this title on purpose.
export const metadata: Metadata = { title: "Blog - Demo Ceramics" };

export default function Post() {
  return (
    <article>
      <h1>Caring for stoneware</h1>
      <p>Stoneware is dishwasher safe, but sudden temperature changes can crack it, so let a cold mug warm up before pouring in boiling water.</p>
    </article>
  );
}
