import { PageElements } from "../../controller/page-elements-controller";
import AddElementButton from "./add-element-button";

const EditorSidebarElements = ({ isPremium }) => {
  console.log(isPremium);
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
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.CardField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.TextField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.ImageField}
              isPremium={isPremium}
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
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.DeviderField}
              isPremium={isPremium}
            />
          </div>
        </section>

        {/* مجموعه‌های رسانه‌ای */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">گالری‌ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.GalleryField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.CarouselField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.VideoField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.CountdownField}
              isPremium={isPremium}
            />
          </div>
        </section>

        {/* ابزار های تعاملی */}
        <section>
          <h3 className="mb-3 text-sm text-text/60">ابزار های تعاملی</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.FormField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.FaqField}
              isPremium={isPremium}
            />
          </div>
        </section>

        {/* سرویس ها */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">سرویس ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton
              pageElement={PageElements.RssField}
              isPremium={isPremium}
            />
            <AddElementButton
              pageElement={PageElements.MapField}
              isPremium={isPremium}
            />
            {/* <AddElementButton pageElement={PageElements.PostTrackerField}  isPremium={isPremium}/> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorSidebarElements;
