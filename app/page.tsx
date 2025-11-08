"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import SearchSection from "@/components/sections/searchsection";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-6 pt-24 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-extrabold text-orange-900 mb-6 tracking-tight"
        >
          HungerHelper
        </motion.h1>

        <p className="text-base md:text-lg text-orange-800 max-w-2xl mx-auto leading-relaxed">
          HungerHelper makes finding food assistance simple, fast, and
          accessible. Our mission is to connect people in need with nearby
          pantries and meal services that fit their schedule and transportation
          options. We’re starting in the Columbus metropolitan area—where in the
          South Side alone, over{" "}
          <span className="font-semibold">30,000 residents</span> live, and
          nearly <span className="font-semibold">60%</span> fall below the
          national poverty line. By streamlining access to verified, up-to-date
          food resources, HungerHelper helps families spend less time searching
          and more time thriving.
        </p>

        <div className="flex justify-center gap-3">
          <Link href="#find">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Find Food Resources
            </Button>
          </Link>
          <Link href="https://forms.gle/AMwt4WwfDks1VSaE6" target="_blank">
            <Button
              variant="outline"
              size="lg"
              className="border-orange-600 text-orange-700"
            >
              Take Our Survey
            </Button>
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <section id="find" className="w-full max-w-5xl px-6 py-16">
        <SearchSection />
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold text-center text-orange-900 mb-12">
          How HungerHelper Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl border-orange-200">
            <CardContent className="p-6 text-center">
              <MapPin className="mx-auto text-orange-700 mb-4" size={36} />
              <h3 className="font-semibold text-lg mb-2">
                Find Nearby Pantries
              </h3>
              <p className="text-orange-800 text-sm">
                Quickly locate food pantries in your area using zip code or GPS
                data.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-orange-200">
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto text-orange-700 mb-4" size={36} />
              <h3 className="font-semibold text-lg mb-2">Filter by Time</h3>
              <p className="text-orange-800 text-sm">
                Filter by day and hours of operation to match your availability.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-orange-200">
            <CardContent className="p-6 text-center">
              <Phone className="mx-auto text-orange-700 mb-4" size={36} />
              <h3 className="font-semibold text-lg mb-2">Call the Hotline</h3>
              <p className="text-orange-800 text-sm">
                No internet access? Call our hotline to get the same info right
                away.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-orange-300 text-center text-orange-800 text-sm">
        <p>
          Built with compassion at <strong>GiveBackHack 2025</strong> — Join our
          mission to make food accessibility simple and human.
        </p>
      </footer>
    </div>
  );
}
