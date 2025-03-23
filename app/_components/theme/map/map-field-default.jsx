/* eslint-disable @next/next/no-img-element */
"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const MapFieldDefault = (props) => {
  const { location, title } = props;
  const { isSilver } = useUserSubscription();
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Resolve the shortened URL to get the original link
        const response = await fetch(location);
        const originalUrl = response.url;

        // Extract coordinates from the original URL
        const urlParams = new URLSearchParams(new URL(originalUrl).search);
        const lat = urlParams.get("lat");
        const lng = urlParams.get("lng");

        if (lat && lng) {
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (location) {
      fetchCoordinates();
    }
  }, [location]);

  return (
    <div className="relative w-full">
      {!isSilver && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        {title}
      </div>
      {coordinates.lat && coordinates.lng && (
        <img
          src={`https://static-maps.yandex.ru/1.x/?ll=${coordinates.lng},${coordinates.lat}&z=15&l=map&size=600,300&lang=fa_IR`}
          alt="نقشه ایران"
          className="mt-4 w-full rounded-md"
        />
      )}
    </div>
  );
};

export default MapFieldDefault;
