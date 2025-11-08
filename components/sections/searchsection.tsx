"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Link from "next/link";

export default function SearchSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [time, setTime] = useState<string>("");

  const handleUseCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}`);
  };

  return (
    <section
      id="find"
      className="w-full max-w-5xl px-6 bg-gradient-to-br from-orange-50 to-amber-100 rounded-3xl shadow-lg"
    >
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-10 md:p-14 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold text-orange-900 text-center">
            Search for Food Pantries Near You
          </h2>

          <div className="flex flex-col gap-10 justify-center items-center">
            {/* Date Picker */}
            <div className="flex flex-col items-center w-full">
              <Label className="mb-2 text-orange-900 font-medium">
                Choose a date (today or a future day)
              </Label>
              <div className="flex items-start gap-3">
                <CalendarIcon className="text-orange-700 mt-2" />
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-orange-200 p-2 bg-white w-fit"
                />
              </div>
            </div>

            {/* Time Picker */}
            <div className="flex flex-col items-center w-full">
              <Label className="mb-2 text-orange-900 font-medium">
                Choose a time (current or later)
              </Label>
              <div className="flex items-center gap-3">
                <Clock className="text-orange-700" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 max-w-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-800 hover:bg-orange-100"
                  onClick={handleUseCurrentTime}
                >
                  Use Current Time
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              className="w-full max-w-xs mx-auto bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold py-3 rounded-full transition"
            >
              <Link
                href={`/search?date=${
                  selectedDate?.toISOString().split("T")[0]
                }&time=${time}`}
              >
                Search Pantries
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
