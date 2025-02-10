import Link from "next/link";

function NotFound() {
  return (
    <div className="text-center mt-24">
      <h2 className="text-4xl block mb-10">Page Not Found 🤯</h2>
      <Link
        className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-6"
        href="/"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
