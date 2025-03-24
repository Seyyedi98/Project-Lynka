import { PageElements } from "../../controller/page-elements-controller";
import AddElementButton from "./add-element-button";

const EditorSidebarElements = () => {
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
            <AddElementButton pageElement={PageElements.SocialsField} />
            <AddElementButton pageElement={PageElements.TextField} />
            <AddElementButton pageElement={PageElements.CardField} />
            <AddElementButton pageElement={PageElements.ImageField} />
          </div>
        </section>

        {/* اجزای صفحه‌آرایی */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">
            چیدمان و ساختار
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton pageElement={PageElements.SpaceField} />
            <AddElementButton pageElement={PageElements.DeviderField} />
          </div>
        </section>

        {/* مجموعه‌های رسانه‌ای */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">گالری‌ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton pageElement={PageElements.GalleryField} />
            <AddElementButton pageElement={PageElements.CarouselField} />
            <AddElementButton pageElement={PageElements.VideoField} />
            <AddElementButton pageElement={PageElements.CountdownField} />
          </div>
        </section>

        {/* ابزار های تعاملی */}
        <section>
          <h3 className="mb-3 text-sm text-text/60">ابزار های تعاملی</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton pageElement={PageElements.FormField} />
            <AddElementButton pageElement={PageElements.FaqField} />
          </div>
        </section>

        {/* سرویس ها */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-text/60">سرویس ها</h3>
          <div className="grid grid-cols-1 gap-3">
            <AddElementButton pageElement={PageElements.RssField} />
            <AddElementButton pageElement={PageElements.MapField} />
            {/* <AddElementButton pageElement={PageElements.PostTrackerField} /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditorSidebarElements;
