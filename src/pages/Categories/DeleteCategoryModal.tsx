import { CategoryInput } from "../../api/category";
import { useDeleteCategory } from "../../api/category";
import toast from "react-hot-toast";

type Props = {
  category: CategoryInput | null;
};

const DeleteCategoryModal = ({ category }: Props) => {
  const { mutate, isLoading, error } = useDeleteCategory(() => {
    document.querySelector<HTMLDialogElement>(".delete-category-modal")?.close();
    toast.success("Item deleted successfully");
  });

  const handleDelete = () => {
    if (category?.id) {
      mutate(category.id);
    }
  };

  return (
    <dialog className="delete-category-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Delete Item</h3>
        <p className="text-gray-800 mb-4">
          Are you sure you want to delete the item{" "}
          <strong className="text-green-600">{category?.name}</strong>?
        </p>

        {error && <p className="text-sm text-error mb-2">{error.message}</p>}

        <div className="flex justify-end space-x-2">
          <form method="dialog">
            <button className="btn border border-white text-white ">
              Cancel
            </button>
          </form>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="btn bg-red-500 border border-white hover:bg-red-600 text-white"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DeleteCategoryModal;
