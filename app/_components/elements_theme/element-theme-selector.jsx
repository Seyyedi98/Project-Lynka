import { useState } from "react";
import { useDispatch } from "react-redux";
import { ElementThemeController } from "../controller/element-theme-controller";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";

const ElementThemeSelector = ({ elementInstance }) => {
  const dispatch = useDispatch();
  const element = elementInstance;
  const elementType = elementInstance?.type;
  const { isPremium } = useUserSubscription();

  // Get array of current element theme
  const Themes = ElementThemeController[elementType];

  if (!Themes) return;
  const themesList = Object.keys(Themes);

  return (
    <div>
      <div className="grid grid-cols-1 justify-start gap-2 px-2 pt-12 sm:grid-cols-2 xl:grid-cols-3">
        {themesList.map((theme, index) => {
          const isPremiumTheme = Themes[theme][2].isPremium;
          const isAllowedToApplyTheme = isPremiumTheme
            ? isPremium
              ? true
              : false
            : true;

          const RenderedElement =
            ElementThemeController[element.type][theme][0];

          return (
            <div
              key={(index, theme)}
              className={cn(
                `relative scale-[0.85] transition-all duration-200 hover:scale-[0.87] hover:shadow-xl`,
                !isAllowedToApplyTheme
                  ? "pointer-events-none"
                  : "cursor-pointer",
              )}
              onClick={() => {
                const payload = {
                  id: element.id,
                  updatedElement: {
                    ...element,
                    extraAttributes: {
                      ...element.extraAttributes,
                      theme: isAllowedToApplyTheme
                        ? theme
                        : element.extraAttributes.theme,
                    },
                  },
                };
                dispatch({ type: "page/updateElement", payload });

                dispatch({ type: "modal/closeMenu" });

                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
              }}
            >
              <div
                className={cn(
                  `left-2 top-1 rounded-full bg-[#CE8946] px-2 py-1 text-xs text-white opacity-100`,
                  !isAllowedToApplyTheme ? "absolute" : "hidden",
                )}
              >
                <p>نیازمند اشتراک ویژه</p>
              </div>
              <div
                className={cn(
                  "pointer-events-none",
                  !isAllowedToApplyTheme ? "opacity-60" : "",
                )}
              >
                <RenderedElement
                  theme={element.extraAttributes?.theme}
                  bgColor={element.extraAttributes?.bgColor}
                  textColor={element.extraAttributes?.element}
                  title="عنوان"
                  subtitleDescription="توضیحات بیشتر"
                  font={element.extraAttributes?.font}
                  borderRadius={element.extraAttributes?.borderRadius}
                  href={element.extraAttributes?.href}
                  countdownDate="1404-12-31T20:34:16.000Z"
                  questions={[
                    { question: "سوال اول", answer: "پاسخ اول" },
                    { question: "سوال دوم", answer: "پاسخ دوم" },
                  ]} //faq
                  socials={[
                    { platform: "telegram", userId: "seyyedi" },
                    { platform: "youtube", userId: "seyyedi" },
                    { platform: "instagram", userId: "seyyedi" },
                    { platform: "github", userId: "seyyedi" },
                  ]} // socials
                  fields={[
                    {
                      type: "text",
                      label: "شماره تماس",
                      required: false,
                      placeholder: "0914...",
                    },
                    {
                      type: "textarea",
                      label: "توضیحات",
                      required: false,
                      placeholder: "...",
                    },
                  ]} // contact form
                  slides={element.extraAttributes?.slides} // carousel
                  image={element.extraAttributes?.slides} // image
                  images={element.extraAttributes?.images} // gallery
                  coords={
                    element.extraAttributes?.coords ||
                    "38.07409248693424,46.29629876442778"
                  } // map
                  isLive={false}
                  isPremium={true}
                  layout="basic"
                />
                {/* {console.log(element.extraAttributes)} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementThemeSelector;
