"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import locations, { LocationEntry, Slot } from "@/app/static/data";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );
  const [time, setTime] = useState<string>(searchParams.get("time") || "");

  // Update URL params when date/time changes (for consistency)
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate)
      params.set("date", selectedDate.toISOString().split("T")[0]);
    if (time) params.set("time", time);
    router.replace(`/search?${params.toString()}`);
  }, [selectedDate, time, router]);

  // Convert minutes → readable time
  const formatTime = (minutes: number | undefined) => {
    if (minutes === undefined) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const suffix = h >= 12 ? "PM" : "AM";
    const hours12 = ((h + 11) % 12) + 1;
    const padded = m.toString().padStart(2, "0");
    return `${hours12}:${padded}${suffix}`;
  };

  // Convert day number → weekday
  const dayToWeekday = (day: number) => {
    const days = [
      "Sunday", // index 0 unused since we start at 1
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day] || "";
  };

  // Format all operation slots into readable strings
  const formatOperationSlots = (slots: Slot[]) => {
    if (!slots || slots.length === 0) return "No schedule available";
    const grouped = slots
      .map(
        (s) =>
          `${dayToWeekday(s.Day)}: ${formatTime(s.startTime)}${
            s.endTime ? `–${formatTime(s.endTime)}` : ""
          }`
      )
      .join("; ");
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center">
      {/* Header */}
      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-orange-900 mb-6">
          All Food Pantries
        </h1>
        <p className="text-orange-800 max-w-2xl mx-auto mb-10">
          Browse every listed pantry in the Columbus area. Operating days and
          hours are displayed in a clear, human-readable format.
        </p>

        {/* Date & Time Selector (kept for future use) */}
        <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          {/* Date Picker */}
          <div className="flex flex-col items-center w-full">
            <Label className="mb-2 text-orange-900 font-medium">
              Choose a date
            </Label>
            <div className="flex items-center justify-center gap-2">
              <CalendarIcon className="text-orange-700" />
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-orange-200 p-2 bg-white"
              />
            </div>
          </div>

          {/* Time Picker */}
          <div className="flex flex-col items-center w-full">
            <Label className="mb-2 text-orange-900 font-medium">
              Choose a time
            </Label>
            <div className="flex items-center justify-center gap-2">
              <Clock className="text-orange-700" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 max-w-[160px]"
              />
              <Button
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-800 hover:bg-orange-100"
                onClick={() => {
                  const now = new Date();
                  const hours = now.getHours().toString().padStart(2, "0");
                  const minutes = now.getMinutes().toString().padStart(2, "0");
                  setTime(`${hours}:${minutes}`);
                }}
              >
                Use Current Time
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="w-full max-w-6xl px-6 pb-20">
        <h2 className="text-3xl font-semibold text-orange-900 mb-8 text-center">
          Pantry Directory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc: LocationEntry) => (
            <Card
              key={loc.Name}
              className="rounded-2xl border-orange-200 hover:shadow-md transition"
            >
              <CardContent className="p-6 text-left space-y-2">
                <h3 className="font-bold text-lg text-orange-900">
                  {loc.Name}
                </h3>
                <p className="text-orange-800 text-sm">{loc.Address}</p>
                {loc.Phone && (
                  <p className="text-orange-700 text-sm">
                    📞 {loc.Phone.toString()}
                  </p>
                )}
                {loc.OperationInfo?.slots ? (
                  <p className="text-sm text-orange-900 italic">
                    {formatOperationSlots(loc.OperationInfo.slots)}
                  </p>
                ) : (
                  <p className="text-sm text-orange-700 italic">
                    Schedule not available
                  </p>
                )}
                {loc.additionalNotes && (
                  <p className="text-xs text-orange-700">
                    {loc.additionalNotes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-orange-300 text-center text-orange-800 text-sm">
        <Link href="/" className="underline hover:text-orange-700">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
