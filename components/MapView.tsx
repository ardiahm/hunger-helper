"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationEntry } from "@/app/static/data";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom orange marker icon
const orangeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjZWE1ODBjIiBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDkuNCAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIxLjkgMjUgMTIuNUMyNSA1LjYgMTkuNCAMCAxMi41IDB6bTAgMTcuNWMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1eiIvPjwvc3ZnPg==",
  iconRetinaUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjZWE1ODBjIiBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDkuNCAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIxLjkgMjUgMTIuNUMyNSA1LjYgMTkuNCAwIDEyLjUgMHptMCAxNy41Yy0yLjggMC01LTIuMi01LTVzMi4yLTUgNS01IDUgMi4yIDUgNS0yLjIgNS01IDV6Ii8+PC9zdmc+",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  locations: LocationEntry[];
  selectedLocation: LocationEntry | null;
  onLocationSelect: (location: LocationEntry | null) => void;
}

// Component to handle map centering when a location is selected
function MapController({
  selectedLocation,
}: {
  selectedLocation: LocationEntry | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(
        [selectedLocation.Location[0], selectedLocation.Location[1]],
        15,
        {
          duration: 1,
        }
      );
    }
  }, [selectedLocation, map]);

  return null;
}

export default function MapView({
  locations,
  selectedLocation,
  onLocationSelect,
}: MapViewProps) {
  // Calculate center of all locations (Columbus, OH area)
  const centerLat = 39.9612;
  const centerLng = -82.9988;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedLocation={selectedLocation} />

      {locations.map((location, idx) => {
        const [lat, lng] = location.Location;
        
        // Skip invalid coordinates
        if (!lat || !lng || lat === 40.758) {
          return null;
        }

        return (
          <Marker
            key={idx}
            position={[lat, lng]}
            icon={orangeIcon}
            eventHandlers={{
              click: () => {
                onLocationSelect(location);
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-orange-900 mb-2">
                  {location.Name}
                </h3>
                <p className="text-sm text-gray-700 mb-2">{location.Address}</p>
                {location.OperationInfo && (
                  <p className="text-xs text-gray-600">
                    {location.OperationInfo.text}
                  </p>
                )}
                <button
                  onClick={() => onLocationSelect(location)}
                  className="mt-2 text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  View Details →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
