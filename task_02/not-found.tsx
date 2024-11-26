import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-blue-500 text-white">
      <div className="max-w-md text-center bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-lime-300 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 mb-4">
          We couldn't find the page you were looking for. It might have been
          moved or deleted.
        </p>
        <p>
          <Link
            href="/"
            className="text-lime-300 hover:text-lime-400 underline transition-colors duration-200"
          >
            Return to the main page
          </Link>
        </p>
      </div>
    </main>
  );
}
