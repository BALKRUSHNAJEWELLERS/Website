"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Ruler, Hand, BellRingIcon as Ring } from "lucide-react"

interface SizeChart {
  indian: string
  uk: string
  us: string
  diameter: number
  circumference: number
}

export default function RingMeasurementPage() {
  const [fingerCircumference, setFingerCircumference] = useState("")
  const [ringDiameter, setRingDiameter] = useState("")
  const [measuredSize, setMeasuredSize] = useState<SizeChart | null>(null)
  const [dpi, setDpi] = useState(96)
  const fingerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [fingerWidthPx, setFingerWidthPx] = useState(160)
  const [ringDiameterPx, setRingDiameterPx] = useState(112)

  const sizeChart: SizeChart[] = [
    { indian: "4", uk: "F", us: "3", diameter: 14.1, circumference: 44.2 },
    { indian: "5", uk: "G", us: "3.25", diameter: 14.5, circumference: 45.5 },
    { indian: "6", uk: "H", us: "3.5", diameter: 14.9, circumference: 46.8 },
    { indian: "7", uk: "H½", us: "3.75", diameter: 15.3, circumference: 48.0 },
    { indian: "8", uk: "I", us: "4", diameter: 15.7, circumference: 49.3 },
    { indian: "9", uk: "I½", us: "4.25", diameter: 16.1, circumference: 50.6 },
    { indian: "10", uk: "J", us: "4.5", diameter: 16.5, circumference: 51.9 },
    { indian: "11", uk: "J½", us: "4.75", diameter: 16.9, circumference: 53.1 },
    { indian: "12", uk: "K", us: "5", diameter: 17.3, circumference: 54.4 },
    { indian: "13", uk: "K½", us: "5.25", diameter: 17.7, circumference: 55.7 },
    { indian: "14", uk: "L", us: "5.5", diameter: 18.1, circumference: 57.0 },
    { indian: "15", uk: "L½", us: "5.75", diameter: 18.5, circumference: 58.3 },
    { indian: "16", uk: "M", us: "6", diameter: 18.9, circumference: 59.5 },
    { indian: "17", uk: "M½", us: "6.25", diameter: 19.4, circumference: 60.8 },
    { indian: "18", uk: "N", us: "6.5", diameter: 19.8, circumference: 62.1 },
    { indian: "19", uk: "N½", us: "6.75", diameter: 20.2, circumference: 63.4 },
    { indian: "20", uk: "O", us: "7", diameter: 20.6, circumference: 64.6 },
    { indian: "21", uk: "O½", us: "7.25", diameter: 21.0, circumference: 65.9 },
    { indian: "22", uk: "P", us: "7.5", diameter: 21.4, circumference: 67.2 },
    { indian: "23", uk: "P½", us: "7.75", diameter: 21.8, circumference: 68.5 },
    { indian: "24", uk: "Q", us: "8", diameter: 22.2, circumference: 69.7 },
    { indian: "25", uk: "Q½", us: "8.25", diameter: 22.6, circumference: 71.0 },
    { indian: "26", uk: "R", us: "8.5", diameter: 23.0, circumference: 72.3 },
    { indian: "27", uk: "R½", us: "8.75", diameter: 23.4, circumference: 73.5 },
    { indian: "28", uk: "S", us: "9", diameter: 23.8, circumference: 74.8 },
  ]

  useEffect(() => {
    const div = document.createElement("div")
    div.style.width = "1in"
    div.style.visibility = "hidden"
    document.body.appendChild(div)
    setDpi(div.offsetWidth)
    document.body.removeChild(div)
  }, [])

  const handleFingerScreenMeasure = () => {
    const mm = (fingerWidthPx * 25.4) / dpi
    setFingerCircumference(mm.toFixed(1))
  }

  const handleRingScreenMeasure = () => {
    const mm = (ringDiameterPx * 25.4) / dpi
    setRingDiameter(mm.toFixed(1))
  }

  const measureByFinger = () => {
    const circumference = Number.parseFloat(fingerCircumference)
    if (!circumference) return
    const closestSize = sizeChart.reduce((prev, curr) =>
      Math.abs(curr.circumference - circumference) < Math.abs(prev.circumference - circumference) ? curr : prev,
    )
    setMeasuredSize(closestSize)
  }

  const measureByRing = () => {
    const diameter = Number.parseFloat(ringDiameter)
    if (!diameter) return
    const closestSize = sizeChart.reduce((prev, curr) =>
      Math.abs(curr.diameter - diameter) < Math.abs(prev.diameter - diameter) ? curr : prev,
    )
    setMeasuredSize(closestSize)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ring Size Measurement</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Place your finger or ring on screen and use slider to match size for accurate measurement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="finger" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finger" className="flex items-center gap-2">
                <Hand className="h-4 w-4" /> By Finger
              </TabsTrigger>
              <TabsTrigger value="ring" className="flex items-center gap-2">
                <Ring className="h-4 w-4" /> By Ring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="finger" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hand className="h-5 w-5 text-orange-500" /> Measure Your Finger
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed p-6 rounded text-center">
                    <p className="mb-2 text-sm">Place your finger on box and use slider to match size</p>
                    <div ref={fingerRef} style={{ width: fingerWidthPx, height: 60 }} className="mx-auto bg-gray-200 dark:bg-gray-700" />
                    <input
                      type="range"
                      min="80"
                      max="300"
                      value={fingerWidthPx}
                      onChange={(e) => setFingerWidthPx(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                    <p className="text-xs mt-1">Width: {(fingerWidthPx * 25.4 / dpi).toFixed(1)} mm</p>
                    <Button variant="outline" className="mt-4" onClick={handleFingerScreenMeasure}>
                      Use Finger on Screen
                    </Button>
                  </div>

                  <Input
                    type="number"
                    placeholder="Or enter finger circumference in mm"
                    value={fingerCircumference}
                    onChange={(e) => setFingerCircumference(e.target.value)}
                  />
                  <Button onClick={measureByFinger} className="w-full bg-orange-500 hover:bg-orange-600">
                    <Ruler className="h-4 w-4 mr-2" /> Calculate Ring Size
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ring className="h-5 w-5 text-orange-500" /> Measure Existing Ring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed p-6 rounded text-center">
                    <p className="mb-2 text-sm">Place your ring on circle and use slider to match size</p>
                    <div ref={ringRef} style={{ width: ringDiameterPx, height: ringDiameterPx }} className="mx-auto rounded-full bg-gray-200 dark:bg-gray-700" />
                    <input
                      type="range"
                      min="40"
                      max="160"
                      value={ringDiameterPx}
                      onChange={(e) => setRingDiameterPx(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                    <p className="text-xs mt-1">Diameter: {(ringDiameterPx * 25.4 / dpi).toFixed(1)} mm</p>
                    <Button variant="outline" className="mt-4" onClick={handleRingScreenMeasure}>
                      Use Ring on Screen
                    </Button>
                  </div>

                  <Input
                    type="number"
                    placeholder="Or enter ring diameter in mm"
                    value={ringDiameter}
                    onChange={(e) => setRingDiameter(e.target.value)}
                  />
                  <Button onClick={measureByRing} className="w-full bg-orange-500 hover:bg-orange-600">
                    <Ruler className="h-4 w-4 mr-2" /> Calculate Ring Size
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {measuredSize && (
            <Card className="mt-6 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-orange-600">Your Ring Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Badge variant="outline" className="mb-2">Indian</Badge>
                    <div className="text-2xl font-bold text-orange-600">{measuredSize.indian}</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">UK</Badge>
                    <div className="text-2xl font-bold text-orange-600">{measuredSize.uk}</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">US</Badge>
                    <div className="text-2xl font-bold text-orange-600">{measuredSize.us}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-center">
                  <strong>Diameter:</strong> {measuredSize.diameter}mm | <strong>Circumference:</strong> {measuredSize.circumference}mm
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        {/* Chart & Tips */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ring Size Chart</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold border-b pb-2">
                <div>Indian</div>
                <div>UK</div>
                <div>US</div>
                <div>Diameter</div>
              </div>
              {sizeChart.map((size, index) => (
                <div key={index} className={`grid grid-cols-4 gap-2 text-sm py-1 px-2 rounded ${
                  measuredSize?.indian === size.indian
                    ? "bg-orange-100 dark:bg-orange-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}>
                  <div className="font-medium">{size.indian}</div>
                  <div>{size.uk}</div>
                  <div>{size.us}</div>
                  <div>{size.diameter}mm</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Measurement Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>✔️ Measure your finger at the end of the day when it's largest.</p>
              <p>✔️ Avoid measuring when your hands are cold.</p>
              <p>✔️ Wider rings may require a larger size.</p>
              <p>✔️ If you're between sizes, choose the larger one.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
