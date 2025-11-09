"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import locations, { LocationEntry } from "@/app/static/data";
import { ArrowLeft, Phone, MapPin, Clock, Info } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/sections/Navbar";

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-orange-50">
      <p className="text-orange-700">Loading map...</p>
    </div>
  ),
});

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationEntry | null>(null);

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />

      {/* Map and Sidebar Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>

        {/* Sidebar - Location Details */}
        {selectedLocation && (
          <aside className="w-96 bg-white border-l border-orange-200 overflow-y-auto shadow-lg">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 text-orange-700 hover:text-orange-900"
              >
                ✕
              </button>

              {/* Location Name */}
              <h2 className="text-2xl font-bold text-orange-900 mb-4 pr-8">
                {selectedLocation.Name}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium text-orange-800">Address</p>
                  <p className="text-orange-700">{selectedLocation.Address}</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      selectedLocation.Address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-800 text-sm underline mt-1 inline-block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Phone */}
              {selectedLocation.Phone && (
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-orange-800">Phone</p>
                    <a
                      href={`tel:${selectedLocation.Phone}`}
                      className="text-orange-700 hover:text-orange-900 hover:underline"
                    >
                      {formatPhoneNumber(selectedLocation.Phone)}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours of Operation */}
              {selectedLocation.OperationInfo && (
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-orange-800 mb-1">Hours</p>
                    <p className="text-orange-700">
                      {selectedLocation.OperationInfo.text}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {selectedLocation.additionalNotes && (
                <div className="flex items-start gap-3 mb-4">
                  <Info className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-orange-800 mb-1">
                      Additional Info
                    </p>
                    <p className="text-orange-700">
                      {selectedLocation.additionalNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Detailed Schedule */}
              {selectedLocation.OperationInfo?.slots &&
                selectedLocation.OperationInfo.slots.length > 0 && (
                  <Card className="mt-6 border-orange-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-orange-900 mb-3">
                        Weekly Schedule
                      </h3>
                      <div className="space-y-2">
                        {getGroupedSchedule(selectedLocation.OperationInfo.slots).map(
                          (item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-orange-800 font-medium">
                                {item.day}
                              </span>
                              <span className="text-orange-700">{item.time}</span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// Helper function to format phone numbers
function formatPhoneNumber(phone: number): string {
  const phoneStr = phone.toString();
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(
      6
    )}`;
  }
  return phoneStr;
}

// Helper function to get day name from day number (1-7, where 1 = Sunday)
function getDayName(day: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day - 1] || "Unknown";
}

// Helper function to convert minutes to time string
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${mins.toString().padStart(2, "0")}${ampm}`;
}

// Helper function to group schedule by day
function getGroupedSchedule(
  slots: Array<{ Day: number; startTime: number; endTime?: number }>
) {
  const grouped: { [key: number]: string[] } = {};

  slots.forEach((slot) => {
    if (!grouped[slot.Day]) {
      grouped[slot.Day] = [];
    }
    const timeRange = slot.endTime
      ? `${minutesToTime(slot.startTime)} - ${minutesToTime(slot.endTime)}`
      : minutesToTime(slot.startTime);
    grouped[slot.Day].push(timeRange);
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([day, times]) => ({
      day: getDayName(Number(day)),
      time: times.join(", "),
    }));
}
