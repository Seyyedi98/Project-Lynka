"use client";

import { UpdatePageTheme } from "@/actions/page";
import ExpandableThemeGridCard from "../common/card/expandable-grid-card-theme";
import GridLayout from "../layout/grid-layout";
import { useTransition } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const themes = [
  { name: "sun" },
  { name: "aurora" },
  { name: "nature" },
  { name: "wooden" },
];

const ThemeSelector = ({ uri }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSelect = async (theme) => {
    startTransition(() =>
      UpdatePageTheme(uri, theme.name).then((data) => {
        if (data.success) router.refresh();
      }),
    );
  };

  return (
    <div className="h-full w-full overflow-y-scroll py-12 sm:px-4">
      <GridLayout>
        {themes.map((theme, index) => (
          <ExpandableThemeGridCard
            key={`${theme}-${index}`}
            isPending={isPending}
            onSelect={onSelect}
            theme={theme}
          />
        ))}
      </GridLayout>
    </div>
  );
};

export default ThemeSelector;
