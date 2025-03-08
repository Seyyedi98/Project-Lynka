import ExpandableRowCard from "@/app/_components/common/card/expandable-row-card-page";

const PagesList = ({ pages }) => {
  return (
    <section className="h-full w-full overflow-scroll bg-card [scrollbar-width:none] sm:overflow-visible">
      {pages.map((page) => {
        return <ExpandableRowCard page={page} key={page.uri} />;
      })}
    </section>
  );
};

export default PagesList;
