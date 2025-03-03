"use client";

import { UpdatePageContent, UpdatePageTheme } from "@/actions/page/page";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ExpandableThemeGridCard from "../common/card/expandable-grid-card-theme";
import GridLayout from "../layout/grid-layout";
import { PageHeroElement } from "../elements/hero/page-hero-element";
import { idGenerator } from "@/lib/id-generator";
import { themes } from "@/data/themes";

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
          style: theme.heroStyle,
          heroType: theme.heroType,
          heroValue: theme.heroValue,
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
