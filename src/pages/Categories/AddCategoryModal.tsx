import { useForm } from "react-hook-form";
import { CategoryInput, useAddCategory } from "../../api/category";
import toast from "react-hot-toast";

const AddCategoryModal = () => {

  const { register, handleSubmit, reset } = useForm<CategoryInput>();

  const { mutate, isLoading, error } = useAddCategory(() => {
    document.querySelector<HTMLDialogElement>(".add-category-modal")?.close();
    toast.success("Category added successfully");
    reset();
  });

  const onSubmit = (data: CategoryInput) => {
    mutate(data);
  };

  return (
    <dialog className="add-category-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add New Category</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Name</span>
            <input
              type="text"
              placeholder="Enter category name"
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

export default AddCategoryModal;
