"use client";

import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MapSelector from "../../map";
import { Button } from "@/components/ui/button";

const ElementhrefFormField = ({ form, description, fieldName }) => {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(form.watch("coords"));

  const handleSelectLocation = (latlng) => {
    setLocation(latlng);
    form.setValue(fieldName || "href", `${latlng.lat},${latlng.lng}`);
    setShowMap(false);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName || "href"}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormControl>
              <Input
                className="hidden"
                dir="ltr"
                {...field}
                placeholder="http://url..."
                onKeyDown={(e) => {
                  // Prevent space key
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
            </FormControl>
          </div>
          <Button
            variant="primary_2"
            type="button"
            size="lg"
            className="w-full"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? "پنهان کردن نقشه" : "انتخاب موقعیت از روی نقشه"}
          </Button>
          {showMap && (
            <MapSelector
              savedLocation={location}
              onSelectLocation={handleSelectLocation}
            />
          )}
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ElementhrefFormField;
