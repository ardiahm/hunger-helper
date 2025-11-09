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
      <Card className="shadow-xl rounded-2xl bg-transparent/20">
        <CardContent className="p-10 md:p-14 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold text-orange-900 text-center">
            Search for Food Pantries Near You
          </h2>

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
              <div className="bg-white">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-orange-200 p-2 bg-white"
                />
              </div>
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
                  onClick={handleUseCurrentTime}
                >
                  Use Current Time
                </Button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-6">
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

          {/* Map + Other Button Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
            {/* Left: Map Button */}
            <div className="flex flex-col items-center">
              <p className="text-orange-900 font-medium mb-3">
                Prefer to view nearby pantries on a map?
              </p>
              <Link href="/map">
                <Button className="bg-orange-300 hover:bg-orange-400 text-orange-900  font-semibold py-3 px-6 rounded-full transition">
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
        </CardContent>
      </Card>
    </section>
  );
}
