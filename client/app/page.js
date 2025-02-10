import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";
function Page() {
  return (
    <section className="mt-24">
      <Image
        src={bg}
        alt="bg"
        fill
        placeholder="blur"
        className="object-cover object-top"
      />
      <div className="text-center z-10 relative">
        <h2 className="text-7xl block mb-10">Welcome to paradise.</h2>
        <Link
          className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-6"
          href="/cabins"
        >
          Explore luxury cabins
        </Link>
      </div>
    </section>
  );
}

export default Page;
