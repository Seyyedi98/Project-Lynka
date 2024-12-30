import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <main className="">
      <section className="flex sm:mr-40 flex-col gap-4 px-4 ">
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
        <p>This is a content 1</p>
        <p>This is a content 2</p>
        <p>This is a content 3</p>
        <p>This is a content 4</p>
        <p>This is a content 5</p>
      </section>
    </main>
  );
};

export default page;
