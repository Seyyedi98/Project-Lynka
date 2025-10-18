import { currentUserSubscription } from "@/lib/auth/user-subscription";
import { idGenerator } from "@/lib/id-generator";
import { cn } from "@/lib/utils";
import { selectIsAnyMenuOpen } from "@/store/modalSlice";
import getImageAddress from "@/utils/get-image-address";
import parseJson from "@/utils/parseJSON";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  PlusIcon,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BackButtonWithConfirmation from "../common/button/NavigationButton/back-button-confirmation";
import PageUrl from "../common/button/page-url";
import SavePageBtn from "../common/button/PrimaryButton/save-page-button";
import BuyPremiumModal from "../common/modal/buy-premium-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../common/modal/diolog";
import { PageElements } from "../controller/page-elements-controller";
import EditorSidebar from "../layout/navbar/editor-sidebar";
import PreviewPageContainer from "../preview/preview-page-container";
import WorkspaceHeroWrapper from "./element/workplace-hero-wrapper";
import WorkspaceElementWrapper from "./element/workspace-element-wrapper";

const MemoizedWorkspaceElementWrapper = memo(WorkspaceElementWrapper);
const MemoizedEditorSidebar = memo(EditorSidebar);

const BuilderWorkspace = () => {
  const dispatch = useDispatch();
  const [activeDragItem, setActiveDragItem] = useState(null);
  const isAnyMenuOpen = useSelector(selectIsAnyMenuOpen);
  const [isPremium, setIsPremium] = useState();
  const [isbuyPremiumModalOpen, setBuyPremiumModalOpen] = useState();

  useEffect(() => {
    const checkPremiumUser = async () => {
      const { isPremium } = await currentUserSubscription();
      setIsPremium(isPremium);
      setBuyPremiumModalOpen(!isPremium);
    };
    checkPremiumUser();
  }, []);

  const { hero, theme, elements } = useSelector(
    (state) => ({
      hero: state.page.hero,
      theme: state.page.theme,
      elements: state.page.elements,
      modalStates: state.modal.modalStates,
    }),
    shallowEqual,
  );

  const backgroundImageUrl =
    theme.backgroundImage && parseJson(theme.backgroundImage)?.key === "no_key"
      ? parseJson(theme.backgroundImage)?.url
      : getImageAddress(parseJson(theme.backgroundImage)?.key);

  const blurryBackgroundImageUrl = hero.extraAttributes.primaryImage
    ? getImageAddress(JSON.parse(hero?.extraAttributes?.primaryImage).key)
    : null;

  const workspaceBlurryBg = useMemo(
    () => ({
      backgroundImage: `url(${blurryBackgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: blurryBackgroundImageUrl
        ? ""
        : hero.extraAttributes.heroValue,
      filter: "blur(50px) opacity(90%)",
      transform: "scale(1.4)",
    }),
    [blurryBackgroundImageUrl, hero?.extraAttributes?.heroValue],
  );

  const colorBgStyle = useMemo(
    () => ({
      backgroundColor:
        theme.backgroundType === "image" ? "" : theme.backgroundColor,
      background: theme.backgroundColor,
    }),
    [theme.backgroundType, theme.backgroundColor],
  );

  const imageBgStyle = useMemo(
    () => ({
      backgroundImage:
        theme.backgroundType === "image" && `url(${backgroundImageUrl})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    [theme.backgroundType, backgroundImageUrl],
  );

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isWorkspaceDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: useCallback((event) => {
      setActiveDragItem(event?.active?.data?.current);
    }, []),

    onDragEnd: useCallback(
      (event) => {
        const { active, over } = event;

        if (!over || active?.id === over?.id) return;

        const draggedData = active.data.current;
        if (draggedData?.isAdderBtn) {
          const type = active.data?.current?.type;
          const newElement = PageElements[type].construct(idGenerator());

          // on drop on workspace element
          if (over?.data?.current.sortable) {
            dispatch({
              type: "page/addElement",
              payload: {
                overId: over.id,
                element: newElement,
                applyPageTheme: true,
              },
            });
          }

          // on drop on workspace add as last item
          if (over?.data?.current?.isWorkspaceDropArea) {
            dispatch({
              type: "page/addElement",
              payload: {
                index: elements.length,
                element: newElement,
                applyPageTheme: true,
              },
            });
          }
        } else {
          dispatch({
            type: "page/sortElement",
            payload: { active: active.id, over: over.id, elements },
          });
        }
        setActiveDragItem(null);
      },
      [elements, dispatch],
    ),

    onDragCancel: () => {
      setActiveDragItem(null);
    },
  });

  return (
    <>
      <BuyPremiumModal
        isbuyPremiumModalOpen={isbuyPremiumModalOpen}
        setBuyPremiumModalOpen={setBuyPremiumModalOpen}
      >
        <p className="mb-1 mt-3 text-right text-sm leading-7 text-white sm:text-base">
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>دسترسی نامحدود به تمامی بلوک‌ها و ابزارهای حرفه‌ای</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>امکانات پیشرفته شخصی‌سازی برای طراحی منحصر به فرد</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>تم‌های اختصاصی و مدرن برای هر سلیقه‌ای</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>انتشار زمان‌بندی شده محتوا</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>رمزگذاری روی لینک‌ها</span>
          </span>
          <span className="my-1 flex items-center">
            <span className="ml-2">•</span>
            <span>ده‌ها ویژگی ویژه و امکانات انحصاری</span>
          </span>
          همین امروز به جمع کاربران پریمیوم بپیوندید!
        </p>
      </BuyPremiumModal>
      <div
        className={cn(
          `h-svh w-full bg-background duration-500`,
          isAnyMenuOpen && "scale-95 md:scale-100",
        )}
      >
        <div className="relative flex h-full w-full transition-all duration-500">
          <MemoizedEditorSidebar isPremium={isPremium} />

          <div
            className="relative h-full w-full overflow-hidden md:grid md:place-content-center"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "page/setSelectedElement", payload: null });
            }}
          >
            {/* 🌆 Blurry Background Layer */}
            <div
              style={workspaceBlurryBg}
              className="absolute left-0 top-0 hidden h-full w-full md:block"
            />

            <div className="absolute right-4 top-4 z-20 flex gap-2">
              {/* Back To Dashboard */}
              <BackButtonWithConfirmation url="/dashboard">
                <div className="flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 p-2 text-sm md:hidden">
                  <span className="text-white">
                    <ChevronRight />
                  </span>
                </div>
              </BackButtonWithConfirmation>

              {/* Page Save Button */}
              <SavePageBtn>
                <div className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-4 text-sm">
                  <span className="text-white">ذخیره</span>
                </div>
              </SavePageBtn>

              {/* Page Preview Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="hidden h-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 px-2 text-sm md:flex">
                    <Eye className="text-white" />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 p-0">
                  <DialogTitle className="hidden"></DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                  <PreviewPageContainer />
                </DialogContent>
              </Dialog>
            </div>
            <div className="absolute left-4 top-4 z-20 flex gap-2">
              <PageUrl />
              <BackButtonWithConfirmation url="/dashboard">
                <div className="hidden cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-20 p-2 text-sm md:flex">
                  <span className="text-white">
                    <ChevronLeft />
                  </span>
                </div>
              </BackButtonWithConfirmation>
            </div>

            {/* Page background */}
            <div
              style={
                theme.backgroundType === "color" ||
                theme.backgroundType === "pattern" ||
                theme.backgroundType === "gradient"
                  ? colorBgStyle
                  : imageBgStyle
              }
              className={cn(
                `relative flex h-svh w-full flex-grow flex-col items-center overflow-y-auto rounded-xl shadow-lg [scrollbar-width:none] md:h-[720px] md:w-[360px]`,
              )}
              ref={droppable.setNodeRef}
            >
              <div className="w-full">
                <WorkspaceHeroWrapper element={hero} />
              </div>

              {elements?.length === 0 && (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  {/* Desktop message */}
                  <p className="mx-4 hidden items-center justify-center text-xl font-medium text-gray-500 md:flex">
                    یک بلوک را از فهرست کناری انتخاب کنید یا آن را مستقیماً به
                    این صفحه بکشید.
                  </p>

                  {/* Mobile message */}
                  <p className="flex items-center justify-center text-xl font-medium text-gray-500 md:hidden">
                    برای افزودن اولین بلوک، دکمه
                    <span className="mx-1 rounded-full bg-gray-200">
                      <PlusIcon />
                    </span>
                    را لمس کنید.
                  </p>
                </div>
              )}

              <SortableContext
                strategy={verticalListSortingStrategy}
                items={elements}
              >
                {elements.map((element) => (
                  <MemoizedWorkspaceElementWrapper
                    isPremium={isPremium}
                    element={element}
                    key={element.id}
                  />
                ))}
              </SortableContext>
              <div className="mt-auto pb-24"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderWorkspace;
