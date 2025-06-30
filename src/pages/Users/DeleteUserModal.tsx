
import toast from "react-hot-toast";
import { useDeleteUser, UserInput } from "../../api/user";

type Props = {
  user: UserInput | null;
};

const DeleteUserModal = ({ user }: Props) => {
  const { mutate, isLoading, error } = useDeleteUser(() => {
    document.querySelector<HTMLDialogElement>(".delete-user-modal")?.close();
    toast.success("Item deleted successfully");
  });

  const handleDelete = () => {
    if (user?.id) {
      mutate(user.id);
    }
  };

  return (
    <dialog className="delete-user-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-950 mb-4">Delete Item</h3>
        <p className="text-gray-800 mb-4">
          Are you sure you want to delete the item{" "}
          <strong className="text-green-600">{user?.username}</strong>?
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

export default DeleteUserModal;
