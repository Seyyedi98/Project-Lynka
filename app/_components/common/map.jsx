/* eslint-disable react-hooks/exhaustive-deps */
import { useGeolocation } from "@/hooks/useGeoLocation";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2Icon, LocateFixed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const MapSelector = ({ onSelectLocation, savedLocation }) => {
  const [position, setPosition] = useState(null);
  const [isLocationSaved, setIsLocationSaved] = useState(false); // Track if location is saved
  const {
    isLoading,
    position: userPosition,
    error,
    getPosition,
  } = useGeolocation();
  const mapRef = useRef();
  const [initialCenterSet, setInitialCenterSet] = useState(false);

  const parsedSavedLocation = (() => {
    try {
      if (savedLocation && typeof savedLocation === "string") {
        const [lat, lng] = savedLocation.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          return [lat, lng];
        }
      }
    } catch (error) {
      console.error("Error parsing savedLocation:", error);
    }
    return null;
  })();

  const handleCenterMap = () => {
    if (userPosition) {
      const map = mapRef.current;
      if (map) {
        map.setView([userPosition.lat, userPosition.lng], 13);
      }
    } else {
      getPosition();
    }
  };

  const MapCenterUpdater = () => {
    const map = useMap();

    useEffect(() => {
      if (!initialCenterSet) {
        if (parsedSavedLocation) {
          map.setView(parsedSavedLocation, 13);
        } else if (userPosition) {
          map.setView([userPosition.lat, userPosition.lng], 13);
        }
        setInitialCenterSet(true);
      }
    }, [parsedSavedLocation, userPosition, map, initialCenterSet]);

    return null;
  };

  const LocationMarker = () => {
    const map = useMap();

    useMapEvents({
      click(e) {
        if (!isLocationSaved) {
          setPosition(e.latlng);
        }
      },
    });

    const customIcon = new Icon({
      iconUrl: "https://img.icons8.com/ios/452/map-pin.png", // map pin PNG URL
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>You selected this location</Popup>
      </Marker>
    );
  };

  const handleSaveLocation = () => {
    if (position) {
      onSelectLocation(position);
      setIsLocationSaved(true);
    }
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <MapContainer
        center={parsedSavedLocation || [35.6892, 51.389]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater />
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]}>
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <LocationMarker />
      </MapContainer>

      <div className="absolute bottom-4 flex h-10 w-full justify-center gap-1 px-4">
        {/* Save Location Button */}
        <div
          onClick={handleSaveLocation}
          className="right-4 z-[999] flex w-full cursor-pointer items-center justify-center rounded-md bg-green-500 text-white"
        >
          انتخاب موقعیت
        </div>

        {/* Center button */}
        <div
          className="left-4 z-[999] flex cursor-pointer items-center justify-center rounded-md bg-background p-2 hover:bg-background/70"
          onClick={handleCenterMap}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <LocateFixed />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
