import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGetProfile, Profile } from "../../api/auth";
import toast from "react-hot-toast";

function Setting() {
  const { data: profile, isLoading } = useGetProfile();
  const { register, handleSubmit, reset } = useForm<Profile>();

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = (data: Profile) => {
    console.log("Updated data:", data);
    toast.success("Profile updated successfully");
  };

  if (isLoading) {
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full px-4 py-2 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 bg-gray-100 text-gray-950 border border-gray-300 rounded-lg"
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
              className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg px-8 py-3 hover:scale-105 transition-transform shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setting;
