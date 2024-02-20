import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 font-satoshi text-3xl font-bold">
        404 Error - Page Not Found
      </h1>
      <p className="mb-6 font-satoshi text-3xl font-bold">
        Sorry, the page you are looking for cannot be found
      </p>
      <div>
        <Link
          href="/"
          className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
