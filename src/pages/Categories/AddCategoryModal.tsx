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
          <h3 className="text-lg font-semibold text-green-600">Add New Category</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Category Name</span>
            <input
              type="text"
              placeholder="Enter category name"
              className="input input-success w-full bg-white text-gray-950"
              required
              {...register("name", { required: true })}

            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Image</span>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="file-input file-input-success  w-full file-input-bordered  text-brown-700 bg-white text-gray-950 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400"
            />
          </label>

          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn btn-success shadow-md transition duration-300 ease-in-out  hover:scale-105 text-white font-semibold"
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
