import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <main className="">
      <div className="flex sm:mr-20 xl:mr-56 flex-col gap-4 px-4 sm:h-full h-[91dvh]">
        <section className="overflow-scroll sm:overflow-visible h-full">
          <p>This is a content 1</p>
          <p>This is a content 2</p>
          <p>This is a content 3</p>
          <p>This is a content 4</p>
          <p>This is a content 5</p>
          <p>This is a content 1</p>
          <p>This is a content 2</p>
        </section>
      </div>
    </main>
  );
};

export default page;
