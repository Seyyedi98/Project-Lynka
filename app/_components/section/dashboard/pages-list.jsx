import ExpandableRowCard from "@/app/_components/common/card/expandable-row-card-page";

const PagesList = ({ pages }) => {
  return (
    <section className="h-full w-full overflow-scroll pb-8 pt-4 [scrollbar-width:none] sm:overflow-visible">
      {pages.map((page) => {
        return <ExpandableRowCard page={page} key={page.uri} />;
      })}
    </section>
  );
};

export default PagesList;
