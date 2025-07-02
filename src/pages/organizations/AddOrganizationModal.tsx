import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { OrganizationInput, useAddOrganization } from "../../api/organization";

const AddOrganizationModal = () => {

  const { register, handleSubmit, reset } = useForm<OrganizationInput>();

  const { mutate, isLoading, error } = useAddOrganization(() => {
    document.querySelector<HTMLDialogElement>(".add-organization-modal")?.close();
    toast.success("Organization added successfully");
    reset();
  });

  const onSubmit = (data: OrganizationInput) => {
    mutate(data);
  };

  return (
    <dialog className="add-organization-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-lg border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add New Organization</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text font-medium text-gray-700">Name</span>
              <input
                type="text"
                placeholder="Enter organization name"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("name", { required: true })}
              />
            </label>

            <label className="form-control w-1/2">
              <span className="label-text font-medium text-gray-700">Email</span>
              <input
                type="email"
                placeholder="example@org.com"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("email", { required: true })}
              />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text font-medium text-gray-700">Phone</span>
              <input
                type="text"
                placeholder="+1234567890"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("phone", { required: true })}
              />
            </label>

            <label className="form-control w-1/2">
              <span className="label-text font-medium text-gray-700">Address</span>
              <input
                type="text"
                placeholder="Enter address"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("address", { required: true })}
              />
            </label>
          </div>

          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Description</span>
            <textarea
              placeholder="Enter a short description"
              className="textarea textarea-success w-full bg-white text-gray-950"
              rows={3}
              {...register("description")}
            ></textarea>
          </label>

          <label className="form-control w-full relative">
            <span className="label-text mb-1 font-medium text-gray-700">Image</span>

            <div className="relative w-full">
              <input
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
              />
              <div className="text-white text-center cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Choose Image
              </div>
            </div>
          </label>

          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="text-white  cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? "Adding..." : "Save"}
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

export default AddOrganizationModal;
