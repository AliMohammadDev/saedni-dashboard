import { useForm } from "react-hook-form";
import { CategoryInput, useEditCategory } from "../../api/category";
import toast from "react-hot-toast";
import { useEffect } from "react";

type Props = {
  category: CategoryInput | null;
};


const EditCategoryModal = ({ category }: Props) => {

  const { register, handleSubmit, reset } = useForm<CategoryInput>();

  const { mutate, isLoading, error } = useEditCategory(() => {
    document.querySelector<HTMLDialogElement>(".edit-category-modal")?.close();
    toast.success("Category updated successfully");
    reset();
  });

  const onSubmit = (data: CategoryInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (category) {
      reset({
        id: category.id,
        name: category.name,
        description: category.description ?? "",
        image: undefined,
      });
    }
  }, [category, reset]);

  return (
    <dialog className="edit-category-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Update Category</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input type="hidden" {...register("id")} />
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
            <span className="label-text mb-1 font-medium text-gray-700">Description</span>
            <textarea
              placeholder="Enter category description"
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
                {...register("image")}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
              />
              <div className="text-white text-center cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Choose Image
              </div>
            </div>

            {category?.image && typeof category.image === "string" && (
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-cover rounded mt-2"
              />
            )}
          </label>


          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">


            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">

              {isLoading ? "Updating..." : "Update Category"}

            </button>



          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}


export default EditCategoryModal;