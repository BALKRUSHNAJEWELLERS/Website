import { Metadata } from "next";
import About from "./About";

export const metadata: Metadata = {
  title: "About | Balkrushna",
  description:
    "Learn more about Balkrushna Jewellers, our heritage, craftsmanship, and commitment to excellence in creating exquisite jewelry pieces.",
  alternates:{
    canonical:"https://balkrushnajewellers.com/about"
  }
};

export default function AboutPage() {
  return <About />;
}
