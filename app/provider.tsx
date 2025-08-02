import { GoldRatesProvider } from "@/context/GoldRatesContext";
import { Toaster } from "@/components/ui/toaster";
import { ChatBot } from "@/components/chatbot";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GoldRatesProvider>
      {children}
    
      <Toaster />
    </GoldRatesProvider>
  );
}
