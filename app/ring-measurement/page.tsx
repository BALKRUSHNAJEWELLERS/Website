"use client"; // This directive is crucial for client-side hooks like useEffect, useRef, useState

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Ruler, Hand, Scan } from "lucide-react"; // Scan icon for ring measurement

// Data from the provided Tanishq Ring Size Chart (Page 4 of PDF)
// Renamed to be generic for Balkrushna
const balkrushnaSizeChart = [
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
];

// Data from Couple Ring Size Calculator (Page 5 of PDF)
const menRingSizes = {
  R: 18.80,
  S: 19.10,
  T: 19.50,
};

const womenRingSizes = {
  L: 16.40,
  M: 16.80,
  N: 17.20,
};

const coupleSizeCodes = [
  { code: 1, individual: "M+R" },
  { code: 2, individual: "M+S" },
  { code: 3, individual: "M+T" },
  { code: 4, individual: "L+R" },
  { code: 5, individual: "L+S" },
  { code: 6, individual: "L+T" },
  { code: 7, individual: "N+R" },
  { code: 8, individual: "N+S" },
  { code: 9, individual: "N+T" },
];

export default function BalkrushnaRingMeasurementPage() {
  const [fingerCircumference, setFingerCircumference] = useState("");
  const [ringDiameter, setRingDiameter] = useState("");
  const [measuredSize, setMeasuredSize] = useState<{ indian: string; circumference: number; diameter: number } | null>(null);
  const [dpi, setDpi] = useState(96); // Default DPI, will be measured on mount
  const fingerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [fingerWidthPx, setFingerWidthPx] = useState(160); // Initial pixel width for finger visual
  const [fingerHeightPx, setFingerHeightPx] = useState(60); // Initial pixel height for finger visual
  const [ringDiameterPx, setRingDiameterPx] = useState(112); // Initial pixel diameter for ring visual

  useEffect(() => {
    // Dynamically measure DPI (Dots Per Inch) of the screen
    // This helps in converting pixel measurements to real-world millimeters.
    const div = document.createElement("div");
    div.style.width = "1in"; // Create a div with a fixed width of 1 inch
    div.style.visibility = "hidden"; // Make it invisible
    document.body.appendChild(div);
    setDpi(div.offsetWidth); // Get the width in pixels, which represents the DPI
    document.body.removeChild(div); // Clean up the temporary div
  }, []);

  // Handler for calculating finger circumference based on screen measurement (pixels to mm)
  const handleFingerScreenMeasure = () => {
    // For finger, we'll use the average of width and height for a more robust circumference estimation
    // This is a simplification, as true finger circumference isn't a simple average of width/height
    // but it provides a visual adjustment.
    const avgPx = (fingerWidthPx + fingerHeightPx) / 2;
    const mm = (avgPx * 25.4) / dpi; // 1 inch = 25.4 mm
    setFingerCircumference(mm.toFixed(2)); // Set to 2 decimal places for precision
  };

  // Handler for calculating ring diameter based on screen measurement (pixels to mm)
  const handleRingScreenMeasure = () => {
    const mm = (ringDiameterPx * 25.4) / dpi; // 1 inch = 25.4 mm
    setRingDiameter(mm.toFixed(2)); // Set to 2 decimal places for precision
  };

  // Logic to find the closest ring size based on finger circumference
  const measureByCircumference = () => {
    const circumference = Number.parseFloat(fingerCircumference);
    if (isNaN(circumference)) { // Check if input is a valid number
      setMeasuredSize(null);
      return;
    }

    // Find the closest size in the chart by minimizing the absolute difference
    const closestSize = balkrushnaSizeChart.reduce((prev, curr) =>
      Math.abs(curr.circumference - circumference) < Math.abs(prev.circumference - circumference) ? curr : prev,
    );
    setMeasuredSize(closestSize);
  };

  // Logic to find the closest ring size based on ring diameter
  const measureByDiameter = () => {
    const diameter = Number.parseFloat(ringDiameter);
    if (isNaN(diameter)) { // Check if input is a valid number
      setMeasuredSize(null);
      return;
    }

    // Find the closest size in the chart by minimizing the absolute difference
    const closestSize = balkrushnaSizeChart.reduce((prev, curr) =>
      Math.abs(curr.diameter - diameter) < Math.abs(prev.diameter - diameter) ? curr : prev,
    );
    setMeasuredSize(closestSize);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="text-center mb-12">
        {/* Balkrushna Branding */}
        {/* Adjusted font sizes for smaller screens */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-300 dark:to-orange-500 mb-2 drop-shadow-lg">BALKRUSHNA</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Ring Size Guide</h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Find your perfect ring size with Balkrushna's comprehensive guide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="finger" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-1 shadow-md">
              <TabsTrigger
                value="finger"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 rounded-md text-sm md:text-lg font-medium
                                data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg
                                dark:data-[state=active]:from-orange-400 dark:data-[state=active]:to-orange-500 dark:data-[state=active]:text-gray-900
                                transition-all duration-300 ease-in-out hover:scale-105"
              >
                <Hand className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> <span className="hidden sm:inline">Method 2:</span> Measure Finger
              </TabsTrigger>
              <TabsTrigger
                value="ring"
                className="flex items-center justify-center gap-2 py-2 px-2 sm:px-4 rounded-md text-sm md:text-lg font-medium
                                data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg
                                dark:data-[state=active]:from-orange-400 dark:data-[state=active]:to-orange-500 dark:data-[state=active]:text-gray-900
                                transition-all duration-300 ease-in-out hover:scale-105"
              >
                <Scan className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> <span className="hidden sm:inline">Method 1:</span> Measure Ring
              </TabsTrigger>
            </TabsList>

            {/* Method 2: The Hands-On Approach (Measure Finger Circumference) */}
            <TabsContent value="finger" className="space-y-6 mt-6">
              <Card className="border-orange-300 dark:border-orange-600 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold">
                    <Hand className="h-7 w-7 md:h-8 md:w-8" /> Measure Your Finger (Circumference)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6 md:p-8">
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    Wrap a measuring tape, string, or strip of paper around the base of the finger you intend to wear the ring on. Mark where the ends meet and then measure the length in millimeters (mm) to find your finger's circumference.
                  </p>
                  <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 p-6 rounded-lg text-center bg-gray-50 dark:bg-gray-700">
                    <p className="mb-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                      **For Screen Measurement (Approximate):** Place your finger on the adjustable rectangle below and use the sliders to visually match its width and height. This provides an estimated circumference. *Note: Screen measurements can vary based on device DPI and browser zoom settings. For best accuracy, keep your browser zoom at 100%.*
                    </p>
                    <div
                      ref={fingerRef}
                      style={{ width: `${fingerWidthPx}px`, height: `${fingerHeightPx}px`, border: '2px solid #f97316', borderRadius: '8px' }}
                      className="mx-auto bg-gray-200 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs overflow-hidden transition-all duration-100 ease-linear" // Reduced text size for finger measurement
                    >
                      <span className="px-2">{`W: ${(fingerWidthPx * 25.4 / dpi).toFixed(2)} mm, H: ${(fingerHeightPx * 25.4 / dpi).toFixed(2)} mm`}</span>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                      <div className="w-full">
                        <label htmlFor="finger-width-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adjust Width:</label>
                        <input
                          id="finger-width-slider"
                          type="range"
                          min="50"
                          max="400"
                          value={fingerWidthPx}
                          onChange={(e) => setFingerWidthPx(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-600 accent-orange-500 dark:accent-orange-400"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="finger-height-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adjust Height:</label>
                        <input
                          id="finger-height-slider"
                          type="range"
                          min="30"
                          max="200"
                          value={fingerHeightPx}
                          onChange={(e) => setFingerHeightPx(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-600 accent-orange-500 dark:accent-orange-400"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-6 w-full md:w-auto border-orange-500 text-orange-700 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={handleFingerScreenMeasure}
                    >
                      Use Finger on Screen Measurement
                    </Button>
                  </div>

                  <Input
                    type="number"
                    placeholder="Or enter finger circumference in mm (e.g., 55.10)"
                    value={fingerCircumference}
                    onChange={(e) => setFingerCircumference(e.target.value)}
                    className="border-orange-300 dark:border-orange-600 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md p-2"
                  />
                  <Button
                    onClick={measureByCircumference}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white dark:from-orange-400 dark:to-orange-500 dark:hover:from-orange-500 dark:hover:to-orange-600 dark:text-gray-900 flex items-center justify-center gap-2 py-3 md:py-4 text-base md:text-lg rounded-md transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
                  >
                    <Ruler className="h-5 w-5 md:h-6 md:w-6" /> Calculate Ring Size by Circumference
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Method 1: Using an Existing Ring (Measure Ring Diameter) */}
            <TabsContent value="ring" className="space-y-6 mt-6">
              <Card className="border-orange-300 dark:border-orange-600 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold">
                    <Scan className="h-7 w-7 md:h-8 md:w-8" /> Measure Existing Ring (Diameter)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6 md:p-8">
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    Choose a ring that already fits your finger well. Measure the inner diameter of the ring in millimeters (mm) using a ruler.
                  </p>
                  <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 p-6 rounded-lg text-center bg-gray-50 dark:bg-gray-700">
                    <p className="mb-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                      **For Screen Measurement (Approximate):** Place your ring on the adjustable ring design below and use the slider to visually match its inner diameter. *Note: Screen measurements can vary based on device DPI and browser zoom settings. For best accuracy, keep your browser zoom at 100%.*
                    </p>
                    <div
                      ref={ringRef}
                      style={{
                        width: `${ringDiameterPx}px`,
                        height: `${ringDiameterPx}px`,
                        borderRadius: '50%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Outer ring appearance with gradient and shadow
                        background: 'linear-gradient(45deg, #fbbf24, #f97316)', // Orange gradient
                        padding: '4px', // This creates the "thickness"
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.2), inset 0 0 0 2px rgba(255,255,255,0.5)', // Subtle shadow and inner highlight
                      }}
                      className="mx-auto text-gray-800 dark:text-gray-100 text-xs overflow-hidden transition-all duration-100 ease-linear" // Reduced text size for ring measurement
                    >
                      {/* Inner transparent part of the ring */}
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          backgroundColor: 'white', // Inner "hole" color
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333', // Darker text for better contrast
                          fontSize: '0.875rem', // text-sm
                          fontWeight: 'bold',
                          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)', // Inner shadow for depth
                        }}
                        className="dark:bg-gray-900 dark:text-gray-300"
                      >
                        {`Approx. ${(ringDiameterPx * 25.4 / dpi).toFixed(2)} mm`}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="200"
                      value={ringDiameterPx}
                      onChange={(e) => setRingDiameterPx(Number(e.target.value))}
                      className="w-full mt-4 h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-600 accent-orange-500 dark:accent-orange-400"
                    />
                    <Button
                      variant="outline"
                      className="mt-6 w-full md:w-auto border-orange-500 text-orange-700 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={handleRingScreenMeasure}
                    >
                      Use Ring on Screen Measurement
                    </Button>
                  </div>

                  <Input
                    type="number"
                    placeholder="Or enter ring inner diameter in mm (e.g., 17.50)"
                    value={ringDiameter}
                    onChange={(e) => setRingDiameter(e.target.value)}
                    className="border-orange-300 dark:border-orange-600 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md p-2"
                  />
                  <Button
                    onClick={measureByDiameter}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white dark:from-orange-400 dark:to-orange-500 dark:hover:from-orange-500 dark:hover:to-orange-600 dark:text-gray-900 flex items-center justify-center gap-2 py-3 md:py-4 text-base md:text-lg rounded-md transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
                  >
                    <Ruler className="h-5 w-5 md:h-6 md:w-6" /> Calculate Ring Size by Diameter
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {measuredSize && (
            <Card className="mt-8 border-orange-500 dark:border-orange-400 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
                <CardTitle className="text-2xl md:text-3xl font-bold">Your Balkrushna Ring Size</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div>
                    <Badge variant="secondary" className="mb-3 bg-gray-100 dark:bg-gray-700 text-orange-700 dark:text-orange-300 text-base md:text-lg px-4 py-2 rounded-full shadow-sm">Indian Size</Badge>
                    <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mt-2">{measuredSize.indian}</div>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-3 bg-gray-100 dark:bg-gray-700 text-orange-700 dark:text-orange-300 text-base md:text-lg px-4 py-2 rounded-full shadow-sm">Measurements</Badge>
                    <div className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mt-2">
                      <strong>Diameter:</strong> {measuredSize.diameter} mm <br />
                      <strong>Circumference:</strong> {measuredSize.circumference} mm
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm md:text-base text-center text-gray-600 dark:text-gray-400 leading-relaxed">
                  This is the closest Balkrushna size based on your measurement.
                  Use this to buy your chosen ring online at Balkrushna.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Important Measurement Tips - Moved here */}
          <Card className="mt-8 border-orange-500 dark:border-orange-400 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl font-bold">Important Measurement Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base p-6 md:p-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>✔️ Measure during the end of the day, as your finger may be at its largest.</p>
              <p>✔️ To maintain accuracy, avoid zooming your browser when using screen measurement. Keep the browser zoom at 100%.</p>
              <p>✔️ Avoid measuring when your hands are very cold or hot, as finger size can fluctuate.</p>
              <p>✔️ If the ring style is wide, consider going up half a size for a more comfortable fit.</p>
              <p>✔️ When in doubt, it's generally better to choose a slightly larger size than one that is too small.</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart & Couple Calculator Section */}
        <div>
          <Card className="border-orange-300 dark:border-orange-600 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl font-bold">Balkrushna Ring Size Chart</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 lg:max-h-[600px] overflow-y-auto p-0">
              <div className="grid grid-cols-3 gap-2 text-sm md:text-base font-semibold border-b border-orange-300 dark:border-orange-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-4 sticky top-0 z-10">
                <div>Indian Size</div>
                <div>Circumference (mm)</div>
                <div>Diameter (mm)</div>
              </div>
              {balkrushnaSizeChart.map((size, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-2 text-sm md:text-base py-2 px-4
                    ${measuredSize?.indian === size.indian
                      ? "bg-orange-50 dark:bg-orange-900/30 font-bold text-orange-700 dark:text-orange-300"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    } transition-colors duration-150`}
                >
                  <div className="font-medium">{size.indian}</div>
                  <div>{size.circumference}</div>
                  <div>{size.diameter}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-8 border-orange-300 dark:border-orange-600 rounded-xl shadow-lg dark:shadow-none bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white rounded-t-xl p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl font-bold">Couple Ring Size Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="font-semibold text-lg md:text-xl text-orange-700 dark:text-orange-400 mb-3">Men's Ring Sizes:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {Object.entries(menRingSizes).map(([key, value]) => (
                    <li key={key}>
                      Size {key}: <span className="font-medium">{value} mm</span> (Diameter)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg md:text-xl text-orange-700 dark:text-orange-400 mb-3">Women's Ring Sizes:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {Object.entries(womenRingSizes).map(([key, value]) => (
                    <li key={key}>
                      Size {key}: <span className="font-medium">{value} mm</span> (Diameter)
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="font-semibold text-lg md:text-xl text-orange-700 dark:text-orange-400 mb-4">Couple Size Codes:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm md:text-base text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                <div className="font-bold text-orange-700 dark:text-orange-400 py-1 border-b border-gray-300 dark:border-gray-600">Couple Size Code</div>
                <div className="font-bold text-orange-700 dark:text-orange-400 py-1 border-b border-gray-300 dark:border-gray-600">Individual Sizes</div>
                {coupleSizeCodes.map((pair) => (
                  <div key={pair.code} className="contents"> {/* Use contents to avoid extra div that breaks grid */}
                    <div className="py-1">{pair.code}</div>
                    <div className="py-1 font-medium">{pair.individual}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}