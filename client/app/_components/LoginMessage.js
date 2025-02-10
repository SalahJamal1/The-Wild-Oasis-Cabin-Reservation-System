import Link from "next/link";

function LoginMessage() {
  return (
    <div className="bg-primary-700 flex items-center justify-center h-full">
      <p className="text-xl">
        Please
        <Link href="/login" className="text-accent-500 mx-2">
          login
        </Link>
        to reserve this cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
