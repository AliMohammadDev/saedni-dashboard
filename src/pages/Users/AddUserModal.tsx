import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddUser, UserInput } from "../../api/user";

const AddUserModal = () => {

  const { register, handleSubmit, reset } = useForm<UserInput>();

  const { mutate, isLoading, error } = useAddUser(() => {
    document.querySelector<HTMLDialogElement>(".add-user-modal")?.close();
    toast.success("User added successfully");
    reset();
  });

  const onSubmit = (data: UserInput) => {
    const { password, ...rest } = data;
    const payload = password ? { ...rest, password } : rest;
    mutate(payload as UserInput);
  };
  return (
    <dialog className="add-user-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add New User</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">User Name</span>
            <input
              type="text"
              placeholder="username"
              className="input input-success w-full bg-white text-gray-950"
              required
              {...register("username", { required: true })}

            />
          </label>

          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Email</span>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input input-success w-full bg-white text-gray-950"
              required
              {...register("email", { required: true })}
            />
          </label>



          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Password</span>
            <input
              type="password"
              placeholder="********"
              className="input input-success w-full bg-white text-gray-950"
              autoComplete="new-password"
              required
              {...register("password", { required: true })}
            />
          </label>


          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">FullName</span>
            <input
              type="text"
              placeholder="full name"
              className="input input-success w-full bg-white text-gray-950"
              autoComplete="new-email"
              required
              {...register("fullName", { required: true })}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Role</span>
            <select
              className="select cursor-pointer select-success w-full bg-white text-gray-950"
              {...register("role", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="organization">Organization</option>
            </select>
          </label>




          {error && <p className="text-sm text-error">{error.message}</p>}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddUserModal;
