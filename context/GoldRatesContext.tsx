"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface MetalRate {
  gold: number;
  silver: number;
  lastUpdated: string;
}

const GoldRatesContext = createContext<MetalRate | null>(null);

export function useGoldRates() {
  return useContext(GoldRatesContext);
}

export function GoldRatesProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<MetalRate>({
    gold: 0,
    silver: 0,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/rates");
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched rates:", data);

          setRates(data);
        }
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GoldRatesContext.Provider value={rates}>
      {children}
    </GoldRatesContext.Provider>
  );
}
