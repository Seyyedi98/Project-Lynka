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

  WorkspaceComponent: WorkspaceComponent,
  PageComponent: PageComponent,
  propertiesComponent: propertiesComponent,
};

function WorkspaceComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.ExtraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-pink-500">
      <p>
        {title} {elementInstance.id}
      </p>
      {/* <Input readOnly disabled /> */}
    </div>
  );
}

function PageComponent({ elementInstance }) {
  const element = elementInstance;
  const { title } = element.ExtraAttributes;
  return <p className="bg-sky-400 p-12 text-2xl">{title}</p>;
}

function propertiesComponent({ elementInstance }) {
  return <p>propertiesComponent</p>;
}

const TitleField = () => {
  return <div>TitleField</div>;
};

export default TitleField;
