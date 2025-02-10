"use client";

function Error({ error, reset }) {
  console.log(error);
  return (
    <div className="text-center mt-24">
      <h2 className="text-4xl block mb-10">{error.message}</h2>
      <button
        onClick={reset}
        className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-6"
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
