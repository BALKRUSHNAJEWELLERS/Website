import { Metadata } from "next";
import CatalogPage from "./Catalog";

export const metadata: Metadata = {
  title: "Catalog | Balkrushna",
  description: "Explore Our Catalog Page",
 
};

export default function Catalog() {
  return <CatalogPage />;
}
