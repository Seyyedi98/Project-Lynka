"use clinet";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import SquareButton from "../../common/button/square-button";
import MetaDescriptionForm from "../../common/form/meta-description-form";
import MetaFaviconForm from "../../common/form/meta-favicon-form";
import MetaImageForm from "../../common/form/meta-image-form";
import MetaTitleForm from "../../common/form/meta-title-form";
import { Button } from "@/components/ui/button";
import { submitToGoogleIndexing } from "@/actions/googleIndex";
import { generateSitemap } from "@/actions/generateSitemap";

const PageMetaSettings = () => {
  const metadata = useSelector((store) => store.page.metadata);
  const [category, setCategory] = useState("metaTitle");
  const { uri } = useParams();

  const onClick = async () => {
    // const googleResult = await submitToGoogleIndexing(
    //   `https://miralink.ir/pages/${uri}`,
    // );

    const sitemapResult = await generateSitemap();
    console.log(sitemapResult);
  };

  return (
    <>
      <div className="flex items-center border-b-2 pb-4">
        <Button onClick={onClick}>Index site</Button>
        <SquareButton state={category} action={setCategory} rule="metaTitle">
          عنوان
        </SquareButton>
        <SquareButton
          state={category}
          action={setCategory}
          rule="metaDescription"
        >
          توضیحات
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="metaImage">
          تصویر
        </SquareButton>
        <SquareButton state={category} action={setCategory} rule="favicon">
          آیکون
        </SquareButton>
      </div>

      <div className="max-w-sm">
        {category === "metaTitle" ? (
          <MetaTitleForm uri={uri} title={metadata.metaTitle} />
        ) : null}

        {category === "metaDescription" ? (
          <MetaDescriptionForm
            uri={uri}
            description={metadata.metaDescription}
          />
        ) : null}

        {category === "metaImage" ? (
          <MetaImageForm image={metadata.metaImage} uri={uri} />
        ) : null}

        {category === "favicon" ? (
          <MetaFaviconForm favicon={metadata.favicon} uri={uri} />
        ) : null}
      </div>
    </>
  );
};

export default PageMetaSettings;
