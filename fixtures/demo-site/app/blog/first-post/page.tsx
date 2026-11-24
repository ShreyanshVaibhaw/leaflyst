import type { Metadata } from "next";

// Both posts share this title on purpose.
export const metadata: Metadata = { title: "Blog - Demo Ceramics" };

export default function Post() {
  return (
    <article>
      <h1>How we glaze our mugs</h1>
      <p>We dip each mug twice, first in a liner glaze and then in the outer colour, and we wipe the foot clean before firing to cone six.</p>
    </article>
  );
}
