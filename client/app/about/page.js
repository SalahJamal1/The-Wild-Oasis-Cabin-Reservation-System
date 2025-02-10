import Image from "next/image";
import about_1 from "@/public/about-1.jpg";
import about_2 from "@/public/about-2.jpg";
import Link from "next/link";
import { getCabins } from "../_lib/apiService";
export const metadata = {
  title: "About",
};
export const revalidate = 3600;
async function page() {
  const cabins = await getCabins();
  return (
    <section>
      <div className="grid grid-cols-5 gap-x-24 gap-y-36 items-center py-12">
        <div className="col-span-3 space-y-10">
          <h2 className="text-4xl text-accent-400 font-medium">
            Welcome to The Wild Oasis
          </h2>
          <p className="text-base font-normal">
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it's not just about the luxury cabins.
            It's about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p className="text-base font-normal">
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you'll find in the surrounding mountains. Wander
            through lush forests, breathe in the fresh air, and watch the stars
            twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p className="text-base font-normal">
            This is where memorable moments are made, surrounded by nature's
            splendor. It's a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
        <div className="col-span-2">
          <Image src={about_1} alt="about-1" placeholder="blur" />
        </div>

        <div className="col-span-2 relative flex aspect-square">
          <Image fill src={about_2} alt="about-2" placeholder="blur" />
        </div>
        <div className="col-span-3 space-y-10">
          <h2 className="text-4xl text-accent-400 font-medium">
            Managed by our family since 1962
          </h2>
          <p className="text-base font-normal">
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p className="text-base font-normal">
            Over the years, we've maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you're not just a
            guest; you're part of our extended family. So join us at The Wild
            Oasis soon, where tradition meets tranquility, and every visit is
            like coming home.
          </p>
          <Link
            className="bg-accent-500 text-primary-800 font-semibold text-base px-8 py-6 inline-block mt-4"
            href="/cabins"
          >
            Explore luxury cabins
          </Link>
        </div>
      </div>
    </section>
  );
}

export default page;
