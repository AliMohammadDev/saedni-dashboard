import { Link } from "react-router-dom";


const ErrorFallback = () => {
  return (
    <section className="flex h-svh items-center bg-white p-16 text-secondary">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center text-gray-950">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mb-8 mt-4 text-base">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
            <Link
            to="/"
            className="inline-block rounded bg-green-700 px-6 py-3 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:bg-green-800 hover:scale-105"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorFallback;
