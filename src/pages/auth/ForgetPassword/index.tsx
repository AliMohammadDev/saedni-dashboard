import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { forgotPasswordInput } from "../../../api/auth";



function ForgetPassword() {
  const { register, handleSubmit } = useForm<forgotPasswordInput>();
  // const { mutate: forgotPassword, isLoading: loading, error } = useForgotPassword();

  const onSubmit: SubmitHandler<forgotPasswordInput> = (values) => {
    // forgotPassword(values);
    console.log(values);

  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-green-700 cursor-pointer px-4 py-2 text-white font-semibold shadow-md transition hover:bg-green-800"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
