"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left side: Logo or site title */}
        <Link href="/" className="text-orange-900 font-extrabold text-2xl tracking-tight">
          HungerHelper
        </Link>

        {/* Right side: Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-3 sm:pt-0 w-full sm:w-auto">
          <Link href="/map" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-orange-300 hover:bg-orange-400 text-orange-900 font-semibold w-full sm:w-auto"
            >
              View Map
            </Button>
          </Link>

          <Link href="/search" className="w-full sm:w-auto">
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
    </nav>
  );
}
