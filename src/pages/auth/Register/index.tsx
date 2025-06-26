import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInputs, useRegister } from "../../../api/auth";
function Register() {
  const { register, handleSubmit } = useForm<RegisterInputs>();
  const { mutate: signUp, isLoading: loading, error } = useRegister();
  const onSubmit: SubmitHandler<RegisterInputs> = (values) => {
    signUp(values);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 sm:px-4 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded bg-white p-6 shadow-md">
          <h2 className="my-3 mb-4 text-left text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-left text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register("username")}
                className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-sky-500 sm:text-sm"
                autoComplete="new-name"
                placeholder="name"
              />
            </div>

            <label className="block text-left text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register("email")}
                className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-sky-500 sm:text-sm"
                autoComplete="email"
                placeholder="email"
              />
            </div>

            <label className="block text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                {...register("password")}
                className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-sky-500 sm:text-sm"
                placeholder="password"
                autoComplete="new-password"
              />
            </div>

            <div className="mt-5 flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I have read and agree to the{" "}
                <a href="/terms" className="underline text-blue-600">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div>
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <button
                  type="submit"
                  className="inline-block mt-5 w-full cursor-pointer rounded bg-green-600 px-6 py-3 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105"
                >
                  Sign Up
                </button>
              )}
              {error instanceof Error && (
                <span className="text-sm text-red-700">{error.message}</span>
              )}
            </div>

            <div className="pt-2 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Register;
