"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";

/** ============================
 *  Context: GoldRates
 * =============================*/

interface MetalRate {
  gold: number;
  silver: number;
  lastUpdated: string;
}

const GoldRatesContext = createContext<MetalRate | null>(null);

export function useGoldRates() {
  const context = useContext(GoldRatesContext);
  if (!context) {
    console.warn("useGoldRates must be used within a GoldRatesProvider. Using fallback values.");
    return { gold: 0, silver: 0, lastUpdated: new Date().toISOString() };
  }
  return context;
}

export function GoldRatesProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<MetalRate>({
    gold: 6250,
    silver: 78,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/rates");
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        } else {
          console.error("Server error while fetching rates");
        }
      } catch (err) {
        console.error("Network error while fetching rates:", err);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  return <GoldRatesContext.Provider value={rates}>{children}</GoldRatesContext.Provider>;
}

/** ============================
 *  ChatBot Component
 * =============================*/

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <Bot className="h-6 w-6 text-amber-500" />
    <span className="text-sm text-gray-500 dark:text-gray-400">Balkrushna AI is typing</span>
    <div className="flex space-x-1">
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
    </div>
  </div>
);

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const rates = useGoldRates();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to Balkrushna Jewellers! I'm your personal assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickActions = [
    "What are the live gold rates?",
    "Tell me about the Gold Scheme",
    "Where is the store located?",
  ];

  const generateBotResponse = (input: string): string => {
    const lower = input.toLowerCase();

    if (lower.includes("gold rate") || lower.includes("gold price")) {
      return `Current **Gold Rate**: ₹${rates.gold}/gram (24K)\nLast Updated: ${new Date(
        rates.lastUpdated
      ).toLocaleTimeString()}`;
    }

    if (lower.includes("silver rate") || lower.includes("silver price")) {
      return `Current **Silver Rate**: ₹${rates.silver}/gram\nLast Updated: ${new Date(
        rates.lastUpdated
      ).toLocaleTimeString()}`;
    }

    if (lower.includes("scheme") || lower.includes("gold scheme")) {
      return `We have a wonderful **Gold Scheme** that allows you to invest in gold monthly and redeem it for jewelry. More details on our [Gold Scheme page](/gold-scheme).`;
    }

    if (lower.includes("store") || lower.includes("location") || lower.includes("address")) {
      return `Our store is located Gandhi Rd, Ganotri Society,Himatnagar, Gujarat 380001 India**. We'd love to welcome you!`;
    }

    if (lower.includes("timing") || lower.includes("hours") || lower.includes("open")) {
      return `Our store hours are **10:00 AM to 8:00 PM, Monday to Saturday**. Closed on Sundays.`;
    }

    if (lower.includes("hello") || lower.includes("hi")) {
      return `Hello there! How can I assist you with your jewelry needs today?`;
    }

    if (lower.includes("thank")) {
      return `You're welcome! Let me know if there's anything else.`;
    }

    return `I'm not sure how to answer that yet. Please ask me about gold rates, store info, or our schemes.`;
  };

  const handleSendMessage = (text: string) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 bg-amber-500 hover:bg-amber-600 text-white shadow-lg"
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] rounded-2xl shadow-2xl bg-white dark:bg-zinc-900">
            <CardHeader className="bg-amber-500 p-4 rounded-t-2xl text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6" />
                <CardTitle className="text-lg">Balkrushna Assistant</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white rounded-bl-none"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={chatEndRef} />
              {messages.length > 0 && messages[messages.length - 1].sender === "bot" && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickActions.map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>

            <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about gold..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="rounded-full w-10 h-10 p-0 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
