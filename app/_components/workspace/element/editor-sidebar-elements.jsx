import { useUserSubscription } from "@/hooks/useUserSubscription";
import { PageElements } from "../../controller/page-elements-controller";
import AddElementButton from "./add-element-button";

const EditorSidebarElements = () => {
  const { isSilver } = useUserSubscription();

  return (
    <div className="w-full">
      <p className="mb-6 place-self-center text-sm text-muted-foreground md:place-self-start md:p-4 md:text-white">
        فیلد ها
      </p>

      <div className="mx-2 max-h-[70svh] space-y-6 overflow-y-auto md:max-h-full md:pb-10 md:[scrollbar-width:none]">
        {/* محتوای پایه */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">
            محتوای پایه
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.SocialsField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.TextField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.CardField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.ImageField}
              isSilver={isSilver}
            />
          </div>
        </section>

        {/* اجزای صفحه‌آرایی */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">
            چیدمان و ساختار
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.SpaceField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.DeviderField}
              isSilver={isSilver}
            />
          </div>
        </section>

        {/* مجموعه‌های رسانه‌ای */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">گالری‌ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.GalleryField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.CarouselField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.VideoField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.CountdownField}
              isSilver={isSilver}
            />
          </div>
        </section>

        {/* ابزار های تعاملی */}
        <section>
          <h3 className="mb-3 text-sm text-text/60">ابزار های تعاملی</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.FormField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.FaqField}
              isSilver={isSilver}
            />
          </div>
        </section>

        {/* سرویس ها */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">سرویس ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.RssField}
              isSilver={isSilver}
            />
            <AddElementButton
              pageElement={PageElements.MapField}
              isSilver={isSilver}
            />
            {/* <AddElementButton pageElement={PageElements.PostTrackerField}  isSilver={isSilver}/> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorSidebarElements;
