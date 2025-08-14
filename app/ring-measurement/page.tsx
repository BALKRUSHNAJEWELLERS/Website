"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler, Hand, Scan, Info, ArrowRight, Circle, Coins, CreditCard } from "lucide-react";

interface RingSize {
  indian: string;
  circumference: number;
  diameter: number;
}

const balkrushnaSizeChart: RingSize[] = [
  { indian: "1", circumference: 41.01, diameter: 13.10 },
  { indian: "2", circumference: 42.70, diameter: 13.30 },
  { indian: "3", circumference: 42.90, diameter: 13.70 },
  { indian: "4", circumference: 43.60, diameter: 13.90 },
  { indian: "5", circumference: 44.80, diameter: 14.30 },
  { indian: "6", circumference: 46.10, diameter: 14.70 },
  { indian: "7", circumference: 47.40, diameter: 15.10 },
  { indian: "8", circumference: 48.00, diameter: 15.30 },
  { indian: "9", circumference: 48.70, diameter: 15.50 },
  { indian: "10", circumference: 50.00, diameter: 15.90 },
  { indian: "11", circumference: 51.20, diameter: 16.30 },
  { indian: "12", circumference: 51.90, diameter: 16.50 },
  { indian: "13", circumference: 53.10, diameter: 16.90 },
  { indian: "14", circumference: 54.40, diameter: 17.30 },
  { indian: "15", circumference: 55.10, diameter: 17.50 },
  { indian: "16", circumference: 56.30, diameter: 17.90 },
  { indian: "17", circumference: 57.00, diameter: 18.10 },
  { indian: "18", circumference: 58.30, diameter: 18.50 },
  { indian: "19", circumference: 58.90, diameter: 18.80 },
  { indian: "20", circumference: 60.20, diameter: 19.20 },
  { indian: "21", circumference: 60.80, diameter: 19.40 },
  { indian: "22", circumference: 62.10, diameter: 19.80 },
  { indian: "23", circumference: 62.70, diameter: 20.00 },
  { indian: "24", circumference: 64.00, diameter: 20.40 },
  { indian: "25", circumference: 64.60, diameter: 20.60 },
  { indian: "26", circumference: 65.90, diameter: 21.00 },
  { indian: "27", circumference: 67.20, diameter: 21.10 },
  { indian: "28", circumference: 67.80, diameter: 21.60 },
  { indian: "29", circumference: 69.10, diameter: 22.00 },
  { indian: "30", circumference: 71.00, diameter: 22.30 },
  { indian: "31", circumference: 72.50, diameter: 23.00 },
  { indian: "32", circumference: 74.00, diameter: 23.50 },
  { indian: "33", circumference: 75.50, diameter: 24.00 },
  { indian: "34", circumference: 77.00, diameter: 24.50 },
  { indian: "35", circumference: 78.50, diameter: 25.00 },
  { indian: "36", circumference: 80.00, diameter: 25.50 },
  { indian: "37", circumference: 81.50, diameter: 26.00 },
  { indian: "38", circumference: 83.00, diameter: 26.50 },
  { indian: "39", circumference: 84.50, diameter: 27.00 },
  { indian: "40", circumference: 86.00, diameter: 27.50 },
  { indian: "41", circumference: 87.50, diameter: 28.00 },
  { indian: "42", circumference: 89.00, diameter: 28.50 },
  { indian: "43", circumference: 90.50, diameter: 29.00 },
  { indian: "44", circumference: 92.00, diameter: 29.50 },
  { indian: "45", circumference: 93.50, diameter: 30.00 },
  { indian: "46", circumference: 95.00, diameter: 30.50 },
  { indian: "47", circumference: 96.50, diameter: 31.00 },
  { indian: "48", circumference: 98.00, diameter: 31.50 },
  { indian: "49", circumference: 99.50, diameter: 32.00 },
  { indian: "50", circumference: 101.00, diameter: 32.50 },
];

export default function BalkrushnaRingMeasurementPage() {
  const [fingerCircumference, setFingerCircumference] = useState("");
  const [ringDiameter, setRingDiameter] = useState("");
  const [measuredSize, setMeasuredSize] = useState<RingSize | null>(null);

  // ===== Calibration / unit conversion =====
  const [dpi, setDpi] = useState(96); // css px/in
  const [calibrationFactor, setCalibrationFactor] = useState(1); // multiplies css->device px to match true mm

  // Finger on-screen measurement state
  const [fingerWidthPx, setFingerWidthPx] = useState(100); // controlled by the new finger adjuster (horizontal only)

  // Ring-on-screen measurement state (kept from your original Ring tab)
  const [ringDiameterPx, setRingDiameterPx] = useState(94);

  const [activeTab, setActiveTab] = useState("finger");
  const [showHelp, setShowHelp] = useState(false);
  const [showCalibration, setShowCalibration] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  // New: dedicated credit-card calibration modal for finger flow
  const [showCardCalib, setShowCardCalib] = useState(false);
  const [cardWidthPx, setCardWidthPx] = useState(320); // resizable outline width (keeps 85.60:53.98 ratio)

  const fingerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // --- Utils: px <-> mm with calibration ---
  const pixelsToMm = (pixels: number) => (pixels * 25.4 * calibrationFactor) / dpi;
  const mmToPixels = (mm: number) => (mm * dpi) / (25.4 * calibrationFactor);

  // Prevent vertical scroll while measuring (mobile friendly)
  useEffect(() => {
    const elFinger = fingerRef.current;
    const elRing = ringRef.current;
    if (elFinger) elFinger.style.touchAction = "none";
    if (elRing) elRing.style.touchAction = "none";

    const onTouchMove = (e: TouchEvent) => {
      const targetInFinger = elFinger?.contains(e.target as Node);
      const targetInRing = elRing?.contains(e.target as Node);
      if (targetInFinger || targetInRing) e.preventDefault();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", onTouchMove);
  }, []);

  // Lock body scroll while actively adjusting
  useEffect(() => {
    if (isAdjusting) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isAdjusting]);

  // Measure DPI + account for devicePixelRatio for better baseline
  useEffect(() => {
    const div = document.createElement("div");
    div.style.width = "1in";
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    const cssInPx = div.offsetWidth; // CSS pixels per inch
    document.body.removeChild(div);
    setDpi(cssInPx * (window.devicePixelRatio || 1));
  }, []);

  // --- Calibration: 2 rupee coin (kept for Ring tab) or manual ---
  const calibrateWithCoin = () => {
    const actualDiameterMm = 25; // 2 rupee coin
    const measuredDiameterMm = (ringDiameterPx * 25.4 * calibrationFactor) / dpi;
    if (measuredDiameterMm > 0) {
      const newCalibrationFactor = actualDiameterMm / measuredDiameterMm;
      setCalibrationFactor(newCalibrationFactor);
    }
    setShowCalibration(false);
  };

  // --- NEW: Credit card calibration (for Finger tab) ---
  const confirmCardCalibration = () => {
    const CARD_MM = 85.60; // ISO/IEC 7810 ID-1 width in mm
    // ensure our conversion makes pixelsToMm(cardWidthPx) === CARD_MM
    const newCal = (CARD_MM * dpi) / (25.4 * cardWidthPx);
    setCalibrationFactor(newCal);
    setShowCardCalib(false);
  };

  // --- Measuring actions ---
  const handleFingerScreenMeasure = () => {
    // width-only approach -> circumference ≈ π * width
    const widthMm = pixelsToMm(fingerWidthPx);
    const circumference = Math.PI * widthMm;
    setFingerCircumference(circumference.toFixed(2));
    measureByCircumference(circumference);
  };

  const handleRingScreenMeasure = () => {
    const mm = pixelsToMm(ringDiameterPx);
    setRingDiameter(mm.toFixed(2));
    measureByDiameter(mm);
  };

  const measureByCircumference = (val?: number) => {
    const circumference = typeof val === "number" ? val : Number.parseFloat(fingerCircumference);
    if (isNaN(circumference)) {
      setMeasuredSize(null);
      return;
    }
    const closestSize = balkrushnaSizeChart.reduce((prev, curr) =>
      Math.abs(curr.circumference - circumference) < Math.abs(prev.circumference - circumference) ? curr : prev
    );
    setMeasuredSize(closestSize);
  };

  const measureByDiameter = (val?: number) => {
    const diameter = typeof val === "number" ? val : Number.parseFloat(ringDiameter);
    if (isNaN(diameter)) {
      setMeasuredSize(null);
      return;
    }
    const closestSize = balkrushnaSizeChart.reduce((prev, curr) =>
      Math.abs(curr.diameter - diameter) < Math.abs(prev.diameter - diameter) ? curr : prev
    );
    setMeasuredSize(closestSize);
  };

  // --- Components ---
  // Horizontal-only finger adjuster: clear visibility + easy operation
  const FingerAdjuster = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [radiusPx, setRadiusPx] = useState(fingerWidthPx / 2);

    useEffect(() => setRadiusPx(fingerWidthPx / 2), [fingerWidthPx]);

    const startDrag = (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsAdjusting(true);
    };
    const endDrag = (e: React.PointerEvent) => {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsAdjusting(false);
    };

    const onMoveLeft = (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const x = e.clientX;
      let newRadius = Math.max(Math.min(cx - x, mmToPixels(25)), mmToPixels(5)); // clamp 10–50mm diameter
      setRadiusPx(newRadius);
      setFingerWidthPx(newRadius * 2);
    };

    const onMoveRight = (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const x = e.clientX;
      let newRadius = Math.max(Math.min(x - cx, mmToPixels(25)), mmToPixels(5));
      setRadiusPx(newRadius);
      setFingerWidthPx(newRadius * 2);
    };

    const diameterMmStr = pixelsToMm(radiusPx * 2).toFixed(1);

    return (
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[520px] aspect-square bg-white dark:bg-gray-900 rounded-xl shadow-inner flex items-center justify-center select-none"
        style={{ touchAction: "none" }}
      >
        {/* High-contrast ring outline (visually obvious) */}
        <div
          className="absolute rounded-full border-4 border-orange-500/80 shadow"
          style={{ width: radiusPx * 2, height: radiusPx * 2 }}
        />

        {/* Vertical guide lines to align finger edges */}
        <div className="absolute top-6 bottom-6 w-1 bg-orange-500/60" style={{ left: `calc(50% - ${radiusPx}px)` }} />
        <div className="absolute top-6 bottom-6 w-1 bg-orange-500/60" style={{ left: `calc(50% + ${radiusPx}px)` }} />

        {/* Center dot */}
        <div className="absolute w-1.5 h-1.5 bg-orange-600 rounded-full" />

        {/* Place-finger hint */}
        <div className="absolute text-xs px-2 py-1 rounded bg-white/80 dark:bg-gray-900/80">
          Place finger here & match width
        </div>

        {/* Left handle */}
        <div
          role="slider"
          aria-label="Adjust left"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerMove={(e) => isAdjusting && onMoveLeft(e)}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-12 rounded-xl border-2 border-orange-600 bg-white dark:bg-gray-800 shadow cursor-ew-resize"
          style={{ left: `calc(50% - ${radiusPx}px)`, top: "50%" }}
        />

        {/* Right handle */}
        <div
          role="slider"
          aria-label="Adjust right"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerMove={(e) => isAdjusting && onMoveRight(e)}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-12 rounded-xl border-2 border-orange-600 bg-white dark:bg-gray-800 shadow cursor-ew-resize"
          style={{ left: `calc(50% + ${radiusPx}px)`, top: "50%" }}
        />

        {/* Live readout */}
        <div className="absolute bottom-3 px-3 py-1 rounded bg-white/90 dark:bg-gray-900/80 text-xs font-medium">
          {diameterMmStr} mm (width)
        </div>
      </div>
    );
  };

  // Existing ring adjuster retained for Ring tab use
  const RingAdjuster = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [radiusPx, setRadiusPx] = useState(ringDiameterPx / 2);
    useEffect(() => setRadiusPx(ringDiameterPx / 2), [ringDiameterPx]);

    const startDrag = (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsAdjusting(true);
    };
    const endDrag = (e: React.PointerEvent) => {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsAdjusting(false);
      handleRingScreenMeasure();
    };
    const onMoveLeft = (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const x = e.clientX;
      let newRadius = Math.min(Math.max(cx - x, 10), mmToPixels(25));
      setRadiusPx(newRadius);
      setRingDiameterPx(newRadius * 2);
    };
    const onMoveRight = (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const x = e.clientX;
      let newRadius = Math.min(Math.max(x - cx, 10), mmToPixels(25));
      setRadiusPx(newRadius);
      setRingDiameterPx(newRadius * 2);
    };
    const diameterMmStr = pixelsToMm(radiusPx * 2).toFixed(1);

    return (
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[520px] aspect-square bg-white dark:bg-gray-900 rounded-xl shadow-inner flex items-center justify-center select-none"
        style={{ touchAction: "none" }}
      >
        <div
          className="absolute rounded-full border-2 border-dashed border-orange-500/70"
          style={{ width: radiusPx * 2, height: radiusPx * 2 }}
        />
        <div className="absolute w-1 h-1 bg-orange-500 rounded-full" />
        <div
          role="slider"
          aria-label="Adjust left"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerMove={(e) => isAdjusting && onMoveLeft(e)}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-10 rounded-xl border-2 border-orange-500 bg-white dark:bg-gray-800 shadow cursor-ew-resize"
          style={{ left: `calc(50% - ${radiusPx}px)`, top: "50%" }}
        />
        <div
          role="slider"
          aria-label="Adjust right"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerMove={(e) => isAdjusting && onMoveRight(e)}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-10 rounded-xl border-2 border-orange-500 bg-white dark:bg-gray-800 shadow cursor-ew-resize"
          style={{ left: `calc(50% + ${radiusPx}px)`, top: "50%" }}
        />
        <div className="absolute top-4 bottom-4 w-0.5 bg-orange-500/50" style={{ left: `calc(50% - ${radiusPx}px)` }} />
        <div className="absolute top-4 bottom-4 w-0.5 bg-orange-500/50" style={{ left: `calc(50% + ${radiusPx}px)` }} />
        <div className="absolute bottom-3 px-3 py-1 rounded bg-white/80 dark:bg-gray-900/80 text-xs">{diameterMmStr} mm</div>
      </div>
    );
  };

  const maxRingDiameterPx = mmToPixels(50);

  const calibrationSummary = () => {
    const pxPerMm = dpi / (25.4 / calibrationFactor);
    return `${pxPerMm.toFixed(1)} px/mm`;
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-300 dark:to-orange-500 mb-2">
          BALKRUSHNA
        </h1>
        <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">Precision Ring Sizing Tool</h2>
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">Calibration: {calibrationSummary()}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-700">
              <TabsTrigger value="finger" className="flex items-center gap-2">
                <Hand size={18} /> Finger
              </TabsTrigger>
              <TabsTrigger value="ring" className="flex items-center gap-2">
                <Scan size={18} /> Ring
              </TabsTrigger>
            </TabsList>

            {/* ===== Finger Measurement (Calibrated) ===== */}
            <TabsContent value="finger" className="mt-4">
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-orange-50 dark:bg-orange-900/30">
                  <CardTitle className="flex items-center gap-3">
                    <Hand size={24} /> Finger Measurement (Calibrate → Adjust → Size)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Step 1: Credit-card calibration */}
                  <div className="rounded-lg border border-dashed border-orange-300 dark:border-orange-700 p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CreditCard size={16} />
                        <span>Step 1 — Calibrate screen with a real credit/ATM card (85.60 × 53.98 mm).</span>
                      </div>
                      <Button variant="outline" onClick={() => setShowCardCalib(true)} className="border-orange-500 text-orange-600">
                        Open Calibration
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Place finger & adjust horizontally */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-dashed border-orange-300 dark:border-orange-700">
                    <div className="flex flex-col items-center mb-4 w-full" ref={fingerRef}>
                      <div className="w-full">
                        <FingerAdjuster />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleFingerScreenMeasure} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                        Use This Finger Width
                      </Button>
                      <div className="flex-1 flex items-center gap-2">
                        <Ruler size={16} className="text-gray-600" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Width: {pixelsToMm(fingerWidthPx).toFixed(2)} mm
                        </div>
                      </div>
                    </div>

                    {/* Fine adjust slider (horizontal only) */}
                    <div className="pt-4">
                      <label className="block text-sm font-medium mb-1">Fine Adjust (10–50 mm)</label>
                      <input
                        type="range"
                        min={mmToPixels(10)}
                        max={mmToPixels(50)}
                        value={fingerWidthPx}
                        onChange={(e) => setFingerWidthPx(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {pixelsToMm(fingerWidthPx).toFixed(2)} mm
                      </div>
                    </div>
                  </div>

                  {/* Optional: manual entry */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Or enter circumference (mm)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="e.g., 55.10"
                        value={fingerCircumference}
                        onChange={(e) => setFingerCircumference(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => measureByCircumference()} className="bg-orange-500 hover:bg-orange-600 text-white">
                        Calculate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== Ring Measurement (existing, with coin calibration) ===== */}
            <TabsContent value="ring" className="mt-4">
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-orange-50 dark:bg-orange-900/30">
                  <CardTitle className="flex items-center gap-3">
                    <Scan size={24} /> Ring Measurement Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-dashed border-orange-300 dark:border-orange-700">
                    <div className="flex flex-col items-center mb-4 w-full" ref={ringRef}>
                      <div className="w-full">
                        <RingAdjuster />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleRingScreenMeasure} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                        Use This Measurement
                      </Button>
                      <Button variant="outline" onClick={() => setShowCalibration(true)} className="flex items-center gap-1">
                        <Coins size={16} /> Calibrate (₹2 coin)
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Or enter diameter (mm)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="e.g., 17.50"
                        value={ringDiameter}
                        onChange={(e) => setRingDiameter(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => measureByDiameter()} className="bg-orange-500 hover:bg-orange-600 text-white">
                        Calculate
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium mb-1">Fine Adjust (up to 50mm)</label>
                    <input
                      type="range"
                      min={mmToPixels(5)}
                      max={Math.max(mmToPixels(10), maxRingDiameterPx)}
                      value={ringDiameterPx}
                      onChange={(e) => setRingDiameterPx(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{pixelsToMm(ringDiameterPx).toFixed(2)} mm</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* ===== Credit Card Calibration Modal ===== */}
          {showCardCalib && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard size={20} /> Calibrate with Credit/ATM Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hold a real card against the screen and resize the orange outline until it exactly matches your
                    card's width. The height keeps the correct ratio automatically (ID-1 standard 85.60 × 53.98 mm).
                  </p>

                  <div className="flex justify-center">
                    <div
                      className="relative rounded-xl border-2 border-orange-500 bg-white/60 dark:bg-gray-900/40"
                      style={{ width: `${cardWidthPx}px`, height: `${(cardWidthPx * 53.98) / 85.6}px` }}
                    >
                      <div className="absolute inset-2 rounded-lg border border-dashed border-orange-400" />
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded">
                        Width: {pixelsToMm(cardWidthPx).toFixed(1)} mm
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={mmToPixels(60)}
                    max={mmToPixels(120)}
                    value={cardWidthPx}
                    onChange={(e) => setCardWidthPx(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />

                  <div className="flex gap-2">
                    <Button onClick={confirmCardCalibration} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      Confirm Calibration
                    </Button>
                    <Button variant="outline" onClick={() => setShowCardCalib(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ===== 2 Rupee Coin Calibration (Ring tab) ===== */}
          {showCalibration && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins size={20} /> Calibrate with 2 Rupee Coin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Place a ₹2 coin (25 mm) on the screen and drag until the orange guides touch the coin's edges. Then
                    confirm.
                  </p>
                  <div className="flex justify-center">
                    <div
                      style={{ width: ringDiameterPx, height: ringDiameterPx }}
                      className="relative rounded-full border-2 border-orange-500"
                    >
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded">
                        {pixelsToMm(ringDiameterPx).toFixed(1)} mm
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={mmToPixels(10)}
                    max={maxRingDiameterPx}
                    value={ringDiameterPx}
                    onChange={(e) => setRingDiameterPx(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex gap-2">
                    <Button onClick={calibrateWithCoin} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      Confirm Calibration
                    </Button>
                    <Button variant="outline" onClick={() => setShowCalibration(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ===== Results ===== */}
          {measuredSize && (
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <CardTitle className="text-xl">Your Ring Size</CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Indian Size</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{measuredSize.indian}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Diameter</div>
                  <div className="text-xl font-semibold">{measuredSize.diameter} mm</div>
                </div>
                <div className="col-span-2 text-center">
                  <Button variant="outline" className="border-orange-500 text-orange-600">
                    View International Sizes <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ===== Help ===== */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 cursor-pointer" onClick={() => setShowHelp(!showHelp)}>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info size={20} /> Measurement Tips
                </div>
                <div className="text-sm font-normal">{showHelp ? "Hide" : "Show"}</div>
              </CardTitle>
            </CardHeader>
            {showHelp && (
              <CardContent className="p-6 space-y-3 text-sm">
                <p className="flex items-start gap-2">
                  <Circle size={12} className="mt-1 flex-shrink-0 text-blue-500" />
                  <span>Measure at the end of the day when fingers are typically largest.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Circle size={12} className="mt-1 flex-shrink-0 text-blue-500" />
                  <span>Keep browser zoom at 100% and calibrate with a card for best accuracy.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Circle size={12} className="mt-1 flex-shrink-0 text-blue-500" />
                  <span>For wide bands, consider going up half a size for comfort.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Circle size={12} className="mt-1 flex-shrink-0 text-blue-500" />
                  <span>Measure 3–4 times and take the most frequent result.</span>
                </p>
              </CardContent>
            )}
          </Card>
        </div>

        {/* ===== Size Chart Sidebar ===== */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-orange-50 dark:bg-orange-900/30">
              <CardTitle>Balkrushna Size Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left">Size</th>
                      <th className="p-3 text-left">Diameter (mm)</th>
                      <th className="p-3 text-left">Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balkrushnaSizeChart.map((size) => (
                      <tr
                        key={size.indian}
                        className={`border-t border-gray-200 dark:border-gray-700 ${
                          measuredSize?.indian === size.indian
                            ? "bg-orange-50 dark:bg-orange-900/20 font-medium"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <td className="p-3">{size.indian}</td>
                        <td className="p-3">{size.diameter}</td>
                        <td className="p-3">{size.circumference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
              <CardTitle>International Conversions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">US & Canada</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">Add 0.5 to Balkrushna size for approximate US size</div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">UK & Australia</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">Subtract 1.5 from Balkrushna size for approximate UK size</div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Europe</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">Multiply Balkrushna size by 1.25 for approximate EU size</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
