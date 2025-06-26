import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInputs, useRegister } from "../../../api/auth";
import avatarSvg from "../../../assets/undraw_success-factors_i417.svg";

function Register() {
  const { register, handleSubmit } = useForm<RegisterInputs>();
  const { mutate: signUp, isLoading: loading, error } = useRegister();
  const onSubmit: SubmitHandler<RegisterInputs> = (values) => {
    signUp(values);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 lg:flex-row">

      <div className="hidden h-full w-full items-center justify-center p-4 lg:flex lg:w-1/2">
        <img src={avatarSvg} alt="Register illustration" className="max-h-[500px] w-auto" />
      </div>

      <div className="flex h-full w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Create an account</h2>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("username")}
              className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-green-600 sm:text-sm"
              autoComplete="new-name"
              placeholder="name"
            />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-green-600 sm:text-sm"
              autoComplete="email"
              placeholder="email"
            />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-green-600 sm:text-sm"
              placeholder="password"
              autoComplete="new-password"
            />

            <div className="mt-5 flex items-center">
              <input id="terms" type="checkbox" className="mr-2 h-4 w-4" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <a href="/terms" className="underline text-blue-600">Terms and Conditions</a>
              </label>
            </div>

            <div>
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <button
                  type="submit"
                  className="mt-5 w-full rounded bg-green-600 px-6 py-3 text-white font-semibold shadow-md transition hover:scale-105 hover:bg-green-700"
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
              <a href="/login" className="text-blue-600 underline">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
