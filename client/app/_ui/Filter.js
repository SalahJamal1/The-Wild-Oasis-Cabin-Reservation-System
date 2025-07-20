"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filter = searchParams.get("capacity") ?? "all";

  function handelFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params}`);
  }
  return (
    <div className="border border-primary-800">
      <Button onClick={() => handelFilter("all")} filter={filter} active="all">
        all guests
      </Button>
      <Button
        onClick={() => handelFilter("small")}
        filter={filter}
        active="small"
      >
        1-3 guests
      </Button>
      <Button
        onClick={() => handelFilter("medium")}
        filter={filter}
        active="medium"
      >
        4-7 guests
      </Button>
      <Button
        onClick={() => handelFilter("large")}
        filter={filter}
        active="large"
      >
        8-12 guests
      </Button>
    </div>
  );
}

function Button({ children, onClick, active, filter }) {
  return (
    <button
      onClick={onClick}
      className={`capitalize px-5 py-3 transition-all duration-150 hover:bg-primary-900 ${
        filter === active ? "bg-primary-800" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
