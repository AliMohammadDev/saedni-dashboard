import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Profile, useEditProfile, useGetProfile, useGetUser } from "../../api/profile";

function Setting() {
  const { data: profile } = useGetProfile();
  const userId = profile?.userId;
  const role = profile?.role;

  const { data: userData, isLoading: isUserLoading } = useGetUser(userId);

  const { register, handleSubmit, reset } = useForm<Profile>();

  const { mutate, isLoading: isUpdating, error } = useEditProfile((data) => {
    toast.success("Profile updated successfully");
    reset({
      userId: data.data.id,
      username: data.data.username,
      fullName: data.data.fullName,
      email: data.data.email,
      password: "",
      role: data.data.role,
    });
  });
  const onSubmit = (data: Profile) => {
    const { password, ...rest } = data;
    const payload = password ? { ...rest, password } : rest;
    mutate(payload as Profile);
  };

  useEffect(() => {
    if (userData) {
      reset({
        userId: userData.data.id,
        username: userData.data.username,
        fullName: userData.data.fullName,
        email: userData.data.email,
        password: "",
        role: userData.data.role,
      });
    }
  }, [userData, reset]);


  if (isUserLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  }


  if (!profile) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-white  rounded-xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-950 mb-10">Account Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 text-gray-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Username</label>
            <input
              type="text"
              disabled={role !== "admin"}
              {...register("username", { required: true })}
              className={`w-full px-4 py-2 border border-gray-300
                 text-gray-950 rounded-lg focus:outline-none focus:ring-2
                  focus:ring-green-300 ${role !== "admin" ? "cursor-not-allowed" : ""
                }`} />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              autoComplete="new-password"
              {...register("password")}
              className="w-full px-4 py-2 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Role</label>
            <input
              type="text"
              {...register("role")}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border text-gray-950 border-gray-300 rounded-lg  cursor-not-allowed"
            />
          </div>

          <div className="col-span-full flex justify-end mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 cursor-pointer via-green-500 to-green-600 text-white font-semibold rounded-lg px-8 py-3 hover:scale-105 transition-transform shadow-md"
            >
              {isUpdating ? "Updating..." : "Update Profile"}

            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-sm col-span-full">
            {error.message || "there was an error"}
          </p>
        )}

      </div>
    </div>
  );
}

export default Setting;
