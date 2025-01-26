"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ExpandableThemeGridCard from "../common/card/expandable-grid-card-theme";
import GridLayout from "../layout/grid-layout";
import { PageHeroElement } from "../elements/hero/page-hero-element";
import { idGenerator } from "@/lib/id-generator";

const themes = [
  { name: "sunny", hero: "basic" },
  { name: "aurora", hero: "basic" },
  { name: "nature", hero: "normal" },
  { name: "wooden", hero: "normal" },
];

const ThemeSelector = ({ uri }) => {
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
        },
      },
    ];

    const fullContent = [StyledHeroElemeent, []];
    const JSONElement = JSON.stringify(fullContent);

    startTransition(() => {
      UpdatePageTheme(uri, theme.name).then(
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

export default ThemeSelector;
