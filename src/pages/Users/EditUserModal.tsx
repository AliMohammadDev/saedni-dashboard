import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useEditUser, UserInput } from "../../api/user";
import { useGetOrganizations } from "../../api/organization";

type Props = {
  user: UserInput | null;
};


const EditUserModal = ({ user }: Props) => {
  const { register, handleSubmit, reset } = useForm<UserInput>();
  const { data: organizations, isLoading: orgLoading } = useGetOrganizations();

  const { mutate, isLoading, error } = useEditUser(() => {
    document.querySelector<HTMLDialogElement>(".edit-user-modal")?.close();
    toast.success("user updated successfully");
    reset();
  });
  const onSubmit = (data: UserInput) => {

    mutate(data);
  };
  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        organizationId: user.organization?.id ? Number(user.organization.id) : 0
      });
    }
  }, [user, reset]);

  return (
    <dialog className="edit-user-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-lg border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Update User</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />

          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text mb-1 font-medium text-gray-700">User Name</span>
              <input
                type="text"
                placeholder="Enter user name"
                className="input input-success w-full bg-white text-gray-950"
                {...register("username")}
              />
            </label>

            <label className="form-control w-1/2">
              <span className="label-text mb-1 font-medium text-gray-700">Email</span>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-success w-full bg-white text-gray-950"
                {...register("email")}
              />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text mb-1 font-medium text-gray-700">Password</span>
              <input
                type="password"
                placeholder="********"
                className="input input-success w-full bg-white text-gray-950"
                {...register("password")}
              />
            </label>

            <label className="form-control w-1/2">
              <span className="label-text mb-1 font-medium text-gray-700">FullName</span>
              <input
                type="text"
                placeholder="Enter full name"
                className="input input-success w-full bg-white text-gray-950"
                {...register("fullName")}
              />
            </label>
          </div>
          <div className="flex gap-4">
            <label className="form-control w-full">
              <span className="label-text font-medium text-gray-700">Organizations</span>
              <select
                {...register("organizationId", { valueAsNumber: true })}

                className="select select-success cursor-pointer w-full bg-white text-gray-950"
                disabled={orgLoading}
              >
                <option value="">Select organization</option>
                {organizations?.map((org) => (
                  <option key={org.id} value={String(org.id)}>
                    {org.name}
                  </option>
                ))}
              </select>
            </label>


            <label className="form-control w-full">
              <span className="label-text mb-1 font-medium text-gray-700">Role</span>
              <select
                className="select cursor-pointer select-success w-full bg-white text-gray-950"
                {...register("role")}
                defaultValue=""
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="organization">Organization</option>
              </select>
            </label>
          </div>

          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div >

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog >

  )
}


export default EditUserModal;