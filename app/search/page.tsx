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
import Navbar from "@/components/sections/Navbar";
import { Nav } from "react-day-picker";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date")
      ? new Date(`${searchParams.get("date")}T00:00:00`)
      : new Date()
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

  // Convert JS Date to your 1–7 convention (Sunday = 1)
  const getDayNumberFromDate = (date: Date): number => {
    const jsDay = date.getDay(); // JS: Sunday=0 … Saturday=6
    return jsDay === 0 ? 1 : jsDay + 1; // Your convention: Sunday=1 … Saturday=7
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center">
      <Navbar />
      {/* Header */}
      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-orange-900 mb-6">
          All Food Pantries
        </h1>
        <p className="text-orange-800 max-w-2xl mx-auto mb-10">
          Browse every listed pantry in the Columbus area. Operating days and
          hours are displayed in a clear, human-readable format.
        </p>
        <p className="text-orange-800 max-w-2xl mx-auto mb-10">
          Input a date and time below to filter pantries. All changes are updated automatically. You can use today's date and the current time, or plan ahead!
        </p>

        {/* Date & Time Selector (centered layout) */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-start gap-12 w-full max-w-4xl mx-auto text-center md:text-left">
          {/* Date Picker */}
          <div className="flex flex-col items-center md:items-center w-full md:w-1/2">
            <div className="flex flex-col items-center">
              <CalendarIcon className="text-orange-700 mb-2" />
              <Label className="mb-2 text-orange-900 font-medium">
                Choose a date
              </Label>
            </div>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-orange-200 p-2 bg-white"
            />
          </div>

          {/* Time Picker */}
          <div className="flex flex-col items-center md:items-center w-full md:w-1/2">
            <div className="flex flex-col items-center">
              <Clock className="text-orange-700 mb-2" />
              <Label className="mb-2 text-orange-900 font-medium">
                Choose a time
              </Label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 max-w-[160px] bg-white"
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

        {/* Map + Other Button Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
            {/* Left: Map Button */}
            <div className="flex flex-col items-center">
              <p className="text-orange-900 font-medium mb-3">
                Prefer to view nearby pantries on a map?
              </p>
              <Link href="/map">
                <Button className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-full transition">
                  View Map
                </Button>
              </Link>
            </div>

            {/* Right: Duplicate or New Section */}
            <div className="flex flex-col items-center">
              <p className="text-orange-900 font-medium mb-3">
                Would you rather chat with our assistant?
              </p>
              <Link href="https://hungerhelper-ai-assistant-184852063683.us-west1.run.app/">
                <Button className="bg-yellow-800 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full transition">
                    Hunger Helper Chatbot
                </Button>
              </Link>
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
                <p className="text-orange-800 text-sm">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      loc.Address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-orange-600 transition-colors"
                  >
                    {loc.Address}
                  </a>
                </p>{" "}
                {loc.Phone && (
                  <p className="text-orange-700 text-sm">
                    📞 {loc.Phone.toString()}
                  </p>
                )}
                {loc.OperationInfo?.slots ? (
                  <div className="text-sm text-orange-900 italic space-y-1">
                    {Object.entries(
                      loc.OperationInfo.slots.reduce((acc, slot) => {
                        const dayName = dayToWeekday(slot.Day);
                        const timeRange = `${formatTime(slot.startTime)}${
                          slot.endTime ? `–${formatTime(slot.endTime)}` : ""
                        }`;
                        if (!acc[dayName]) acc[dayName] = [];
                        acc[dayName].push({
                          range: timeRange,
                          dayNum: slot.Day,
                        });
                        return acc;
                      }, {} as Record<string, { range: string; dayNum: number }[]>)
                    ).map(([day, slots]) => {
                      const isToday =
                        selectedDate &&
                        slots.some(
                          (s) => s.dayNum === getDayNumberFromDate(selectedDate)
                        );
                      return (
                        <p
                          key={day}
                          className={isToday ? "italic font-semibold" : ""}
                        >
                          <span className="font-semibold">{day}:</span>{" "}
                          {slots.map((s) => s.range).join("; ")}
                        </p>
                      );
                    })}
                  </div>
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
