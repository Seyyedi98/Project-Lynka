"use clinet";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import SquareButton from "../../common/button/square-button";
import MetaDescriptionForm from "../../common/form/meta-description-form";
import MetaFaviconForm from "../../common/form/meta-favicon-form";
import MetaImageForm from "../../common/form/meta-image-form";
import MetaTitleForm from "../../common/form/meta-title-form";

const PageDataSettings = () => {
  const metadata = useSelector((store) => store.page.metadata);
  const [category, setCategory] = useState("metaTitle");
  const { uri } = useParams();


  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-4">
          <SquareButton state={category} action={setCategory} rule="metaTitle">
            title
          </SquareButton>
          <SquareButton
            state={category}
            action={setCategory}
            rule="metaDescription"
          >
            Description
          </SquareButton>
          <SquareButton state={category} action={setCategory} rule="metaImage">
            Image
          </SquareButton>
          <SquareButton state={category} action={setCategory} rule="favicon">
            favicon
          </SquareButton>
        </div>

        {category === "metaTitle" ? (
          <MetaTitleForm uri={uri} title={metadata.metaTitle} />
        ) : null}

        {category === "metaDescription" ? (
          <MetaDescriptionForm
            uri={uri}
            description={metadata.metaDescription}
          />
        ) : null}

        {category === "metaImage" ? <MetaImageForm uri={uri} /> : null}

        {category === "favicon" ? (
          <MetaFaviconForm favicon={metadata.favicon} uri={uri} />
        ) : null}
      </div>
    </>
  );
};

export default PageDataSettings;
