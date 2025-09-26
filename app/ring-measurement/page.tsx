import { Metadata } from "next";
import BalkrushnaRingMeasurementPage from "./Ring";

export const metadata: Metadata = {
  title: "Ring Measurement | Balkrushna",
  description:
    "Find your perfect ring size with our easy-to-use Ring Measurement Guide. Ensure a comfortable fit for your special moments with Balkrushna Jewellers.",
  alternates:{
    canonical: "https://balkrushnajewellers.com/ring-measurement",
  }
};

export default function Ring() {
  return <BalkrushnaRingMeasurementPage />;
}
