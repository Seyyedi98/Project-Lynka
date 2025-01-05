"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-select";
import { Heading } from "lucide-react";

const type = "TitleField";

const ExtraAttributes = {
  title: "عنوان",
};

export const TitleFieldFormElement = {
  type,
  contruct: (id) => ({
    id,
    type,
    ExtraAttributes,
  }),

  ElementAdderBtn: {
    icon: Heading,
    label: "عنوان",
  },

  AdderComponent: AdderComponent,
  PageComponent: PageComponent,
  propertiesComponent: propertiesComponent,
};

function AdderComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.ExtraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>{title}</Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

function PageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.extraAttributes;
  return <p className="bg-sky-400 p-12 text-2xl">{title}</p>;
}

function propertiesComponent({ elementInstance }) {
  return <p>propertiesComponent</p>;
}

const TitleField = () => {
  return <div>TitleField</div>;
};

export default TitleField;
