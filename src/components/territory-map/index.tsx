"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { sergipeGeoJSON } from "@/data/sergipe-geojson";

interface TerritoryMapProps {
  center?: [number, number];
  zoom?: number;
}

export function TerritoryMap({
  center = [-10.5, -37.1],
  zoom = 8,
}: TerritoryMapProps) {
  useEffect(() => {
    // Fix for map not displaying correctly
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const geoJsonStyle = {
    fillColor: "#9333ea",
    fillOpacity: 0.5,
    color: "#7e22ce",
    weight: 3,
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution=''
        />
        <GeoJSON data={sergipeGeoJSON as unknown as GeoJSON.GeoJsonObject} style={geoJsonStyle} />
      </MapContainer>
      <div className="mt-2 text-center">
        <p className="text-sm text-purple-600 font-medium">
          Estado de Sergipe - Área de atuação do MMTR-SE
        </p>
      </div>
    </div>
  );
}
