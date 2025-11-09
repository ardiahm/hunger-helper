"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import locations, { LocationEntry, Slot, ServiceType } from "@/app/static/data";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date")
      ? new Date(`${searchParams.get("date")}T00:00:00`)
      : new Date()
  );
  const [time, setTime] = useState<string>(searchParams.get("time") || "");
  const [serviceType, setServiceType] = useState<ServiceType | "all">("all");
  const [filteredLocations, setFilteredLocations] = useState<LocationEntry[]>(locations);

  // --- Helpers ---
  const formatTime = (minutes: number | undefined) => {
    if (minutes === undefined) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const suffix = h >= 12 ? "PM" : "AM";
    const hours12 = ((h + 11) % 12) + 1;
    const padded = m.toString().padStart(2, "0");
    return `${hours12}:${padded}${suffix}`;
  };

  const dayToWeekday = (day: number) => {
    const days = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day] || "";
  };

  const getDayNumberFromDate = (date: Date): number => {
    const jsDay = date.getDay(); // Sunday = 0 … Saturday = 6
    return jsDay === 0 ? 1 : jsDay + 1;
  };

  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // --- Core Filtering Logic ---
  useEffect(() => {
    if (!selectedDate && !time && serviceType === "all") {
      setFilteredLocations(locations);
      return;
    }

    const currentDay = selectedDate ? getDayNumberFromDate(selectedDate) : undefined;
    const currentMinutes = time ? timeToMinutes(time) : undefined;

    const matches = locations.filter((loc) => {
      // Filter by service type if not "all"
      if (serviceType !== "all" && loc.ServiceType !== serviceType && loc.ServiceType !== "both") {
        return false;
      }

      // If no date/time filtering, include
      if (!currentDay || !currentMinutes) return true;

      // Check if any slot matches the selected day and time
      const slots = loc.OperationInfo?.slots || [];
      return slots.some((slot) => {
        const isSameDay = slot.Day === currentDay;
        const withinTime =
          currentMinutes >= slot.startTime &&
          (slot.endTime ? currentMinutes <= slot.endTime : true);
        return isSameDay && withinTime;
      });
    });

    setFilteredLocations(matches);
  }, [selectedDate, time, serviceType]);

  const handleReset = () => {
    setSelectedDate(new Date());
    setTime("");
    setServiceType("all");
    setFilteredLocations(locations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center">
      <Navbar />

      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-orange-900 mb-6">
          All Food Pantries
        </h1>
        <p className="text-orange-800 max-w-2xl mx-auto mb-8">
          Browse every listed pantry in the Columbus area and filter by time or service type.
        </p>

        {/* --- Date, Time, and Type Selectors --- */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-4xl mx-auto text-center md:text-left">

          {/* Date Picker */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <CalendarIcon className="text-orange-700 mb-2" />
            <Label className="mb-2 text-orange-900 font-medium">Choose a Date</Label>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-orange-200 p-2 bg-white"
            />
          </div>

          {/* Time Picker */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <Clock className="text-orange-700 mb-2" />
            <Label className="mb-2 text-orange-900 font-medium">Choose a Time</Label>
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

          {/* Service Type Picker */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <Label className="mb-2 text-orange-900 font-medium">Service Type</Label>
            <RadioGroup
              defaultValue="all"
              value={serviceType}
              onValueChange={(v: "all" | ServiceType) => setServiceType(v)}
              className="flex flex-col space-y-2 text-left"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="meal" id="meal" />
                <Label htmlFor="meal">Meal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pantry" id="pantry" />
                <Label htmlFor="pantry">Pantry</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-8">
          <Button
            onClick={handleReset}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Reset Filters
          </Button>
        </div>
      </section>

      {/* --- Filtered Results --- */}
      <section className="w-full max-w-6xl px-6 pb-20">
        <h2 className="text-3xl font-semibold text-orange-900 mb-8 text-center">
          Pantry Directory
        </h2>

        {filteredLocations.length === 0 ? (
  <div className="text-center text-orange-800">
    <p className="mb-4 font-medium">
      No resources are available for the selected date and time.
    </p>
    <Button
      onClick={handleReset}
      className="bg-orange-600 hover:bg-orange-700 text-white"
    >
      Reset Filters
    </Button>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredLocations.map((loc) => (
      <Card
        key={loc.Name}
        className="rounded-2xl border-orange-200 hover:shadow-md transition"
      >
        <CardContent className="p-6 text-left space-y-2">
          <h3 className="font-bold text-lg text-orange-900">{loc.Name}</h3>
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
          </p>
          {loc.Phone && (
            <p className="text-orange-700 text-sm">📞 {loc.Phone}</p>
          )}

          {/* Operation Info Section with Highlighting */}
          {loc.OperationInfo?.slots ? (
            <div className="text-sm text-orange-900 italic space-y-1">
              {Object.entries(
                loc.OperationInfo.slots.reduce((acc, slot) => {
                  const dayName = dayToWeekday(slot.Day);
                  const range = `${formatTime(slot.startTime)}${
                    slot.endTime ? `–${formatTime(slot.endTime)}` : ""
                  }`;
                  if (!acc[dayName]) acc[dayName] = [];
                  acc[dayName].push({
                    range,
                    dayNum: slot.Day,
                    start: slot.startTime,
                    end: slot.endTime ?? slot.startTime,
                  });
                  return acc;
                }, {} as Record<string, { range: string; dayNum: number; start: number; end: number }[]>)
              ).map(([day, slots]) => {
                // Highlight logic
                const isToday =
                  selectedDate &&
                  slots.some(
                    (s) => s.dayNum === getDayNumberFromDate(selectedDate)
                  );
                const isNow =
                  selectedDate &&
                  time &&
                  slots.some((s) => {
                    const nowMin = timeToMinutes(time);
                    return (
                      s.dayNum === getDayNumberFromDate(selectedDate) &&
                      nowMin >= s.start &&
                      nowMin <= s.end
                    );
                  });

                return (
                  <p
                    key={day}
                    className={`${
                      isToday
                        ? isNow
                          ? "font-extrabold text-orange-700"
                          : "font-semibold text-orange-800"
                        : ""
                    }`}
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
            <p className="text-xs text-orange-700">{loc.additionalNotes}</p>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
)}
      </section>

      <footer className="w-full py-8 border-t border-orange-300 text-center text-orange-800 text-sm">
        <Link href="/" className="underline hover:text-orange-700">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
