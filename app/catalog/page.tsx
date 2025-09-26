import { Metadata } from "next";
import CatalogPage from "./Catalog";

export const metadata: Metadata = {
  title: "Catalog | Balkrushna",
  description: "Explore Our Catalog Page",
  alternates:{
    canonical: "https://balkrushnajewellers.com/catalog",
  }
};

export default function Catalog() {
  return <CatalogPage />;
}
