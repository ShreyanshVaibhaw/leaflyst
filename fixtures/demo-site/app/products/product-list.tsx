"use client";

import { useEffect, useState } from "react";

interface Product {
  name: string;
  description: string;
  price: string;
}

// Loads products in the browser on purpose, so crawlers that skip JavaScript see an empty page.
export function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);
  if (!products) return <p>Loading</p>;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.name}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <p>{p.price}</p>
        </li>
      ))}
    </ul>
  );
}
