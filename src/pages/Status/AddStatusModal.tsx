import { useForm } from "react-hook-form";
import { useGetCategories } from "../../api/category";
import toast from "react-hot-toast";
import { StatusInput, useAddStatus } from "../../api/status";

const AddStatusModal = () => {
  const { data: categories, isLoading: categoryLoading, error: categoryError } = useGetCategories();
  const { register, handleSubmit, reset } = useForm<StatusInput>();
  const { mutate, isLoading, error } = useAddStatus(() => {
    document.querySelector<HTMLDialogElement>(".add-status-modal")?.close();
    toast.success("Status added successfully");
    reset();
  });

  const onSubmit = (data: StatusInput) => {
    mutate(data);
  };

  return (
    <dialog className="add-status-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add New Status</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Status Name</span>
            <input
              type="text"
              placeholder="Enter StatusName"
              className="input input-success w-full bg-white text-gray-950"
              required
              {...register("name", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Description</span>
            <textarea
              placeholder="Enter a short description"
              className="textarea textarea-success w-full bg-white text-gray-950"
              rows={3}
              {...register("description")}
            ></textarea>
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium text-gray-700">Categories</span>
            <select
              className="select select-success cursor-pointer w-full bg-white text-gray-950"
              {...register("categoryId", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                {categoryLoading
                  ? "Loading categories..."
                  : categoryError
                    ? "Failed to load categories"
                    : "Select Categories"}
              </option>
              {categories?.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>



          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default AddStatusModal;
