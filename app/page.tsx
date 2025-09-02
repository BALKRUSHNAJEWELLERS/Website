import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Home | Balkrushna",
  description:
    "Explore Balkrushna Jewellery, a premier Gold & Diamond jewellery store in Gujarat. Find the latest designs for every special moment",
};

export default function Home() {
  return <HomePage />;
}
