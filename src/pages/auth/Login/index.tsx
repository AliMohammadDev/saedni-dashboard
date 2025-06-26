import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputs, useLogin } from "../../../api/auth";
import { Link } from "react-router-dom";

function Login() {
    const { register, handleSubmit } = useForm<LoginInputs>();
    const { mutate: login, isLoading: loading, error } = useLogin();

    const onSubmit: SubmitHandler<LoginInputs> = (values) => {
        login(values);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 sm:px-4 lg:px-8">
            <div className="w-full max-w-md">
                <div className="rounded bg-white p-6 shadow-md">
                    <h2 className="my-3 mb-4 text-left text-3xl font-bold tracking-tight text-gray-900">
                        Login
                    </h2>
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <label className="block text-left text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                {...register("username")}
                                className="block w-full rounded-md border border-gray-300 px-2 py-3 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                autoComplete="new-name"
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

                        <div className="mt-2 text-right">
                            <a
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <div>
                            {loading ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <button type="submit" className="inline-block w-full cursor-pointer rounded bg-green-600 px-6 py-3 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105">
                                    Login
                                </button>
                            )}
                            {error instanceof Error && (
                                <span className="text-sm text-red-700">{error.message}</span>
                            )}
                        </div>

                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-blue-600 hover:underline">
                                    Create one
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
