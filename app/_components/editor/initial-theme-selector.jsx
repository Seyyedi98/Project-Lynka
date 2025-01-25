"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ExpandableThemeGridCard from "../common/card/expandable-grid-card-theme";
import GridLayout from "../layout/grid-layout";
import { PageHeroElement } from "../elements/hero/page-hero-element";
import { idGenerator } from "@/lib/id-generator";

const themes = [
  {
    name: "sunny",
    hero: "basic",
    backgroundType: "color",
    backgroundValue: "#fffd7e",
  },
  {
    name: "aurora",
    hero: "basic",
    backgroundType: "image",
    backgroundValue: "#fffd7e",
  },
  {
    name: "nature",
    hero: "normal",
    backgroundType: "color",
    backgroundValue: "#77cf7e",
  },
  {
    name: "wooden",
    hero: "normal",
    backgroundType: "image",
    backgroundValue: "#77cf7e",
  },
];

const InitialThemeSelector = ({ uri }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSelect = async (theme) => {
    const heroElement = PageHeroElement.construct(idGenerator());
    const StyledHeroElemeent = [
      {
        ...heroElement,
        extraAttributes: {
          ...heroElement.extraAttributes,
          style: theme.hero,
          backgroundType,
        },
      },
    ];

    const fullContent = [StyledHeroElemeent, []];
    const JSONElement = JSON.stringify(fullContent);
    const JSONTheme = JSON.stringify(theme);

    startTransition(() => {
      UpdatePageTheme(uri, JSONTheme).then(
        UpdatePageContent(uri, JSONElement).then((data) => {
          if (data.success) router.refresh();
        }),
      );
    });
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

export default InitialThemeSelector;
