"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import SearchSection from "@/components/sections/searchsection";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";

export default function LandingPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 pt-20 sm:pt-24 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-orange-900 mb-6 tracking-tight leading-tight"
        >
          HungerHelper
        </motion.h1>

        <p className="text-sm sm:text-base md:text-lg text-orange-800 max-w-2xl mx-auto leading-relaxed px-2">
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

        <div className="flex flex-col items-center text-center gap-4 pt-15 px-4">
          <p className="text-orange-900 text-base sm:text-lg font-medium max-w-2xl">
            You can choose any of the following options! Locate resources on our
            interactive map, plan ahead or find the best food now, or chat with
            our adaptable assistant.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-3 w-full">
            <Link href="/map" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-orange-300 hover:bg-orange-400 text-orange-900 font-semibold w-full sm:w-auto"
              >
                View Map
              </Button>
            </Link>

            <Link href="#find" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full sm:w-auto"
              >
                Find Food Resources
              </Button>
            </Link>

            <Link
              href="https://hungerhelper-ai-assistant-184852063683.us-west1.run.app/"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-yellow-800 hover:bg-yellow-600 text-white font-semibold w-full sm:w-auto"
              >
                Hunger Helper Chatbot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section
        id="find"
        className="w-full max-w-5xl px-4 sm:px-6 py-12 sm:py-16"
      >
        <SearchSection />
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-orange-900 mb-10 sm:mb-12">
          How HungerHelper Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="rounded-2xl border-orange-200">
            <CardContent className="p-6 text-center">
              <MapPin className="mx-auto text-orange-700 mb-4" size={36} />
              <h3 className="font-semibold text-lg mb-2">
                Find Nearby Pantries
              </h3>
              <p className="text-orange-800 text-sm">
                Quickly locate food pantries in the Columbus area using our
                interactive map.
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
      <footer className="w-full py-8 border-t border-orange-300 text-center text-orange-800 text-xs sm:text-sm px-3">
        <p>
          Built with compassion at <strong>GiveBackHack 2025</strong> — Join our
          mission to make food accessibility simple and human.
        </p>
      </footer>
    </div>
  );
}
