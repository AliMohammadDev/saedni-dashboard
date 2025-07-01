
import toast from "react-hot-toast";
import { StatusInput, useDeleteStatus } from "../../api/status";

type Props = {
  status: StatusInput | null;
};

const DeleteStatusModal = ({ status }: Props) => {
  const { mutate, isLoading, error } = useDeleteStatus(() => {
    document.querySelector<HTMLDialogElement>(".delete-status-modal")?.close();
    toast.success("Item deleted successfully");
  });

  const handleDelete = () => {
    if (status?.id) {
      mutate(status.id);
    }
  };

  return (
    <dialog className="delete-status-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-950 mb-4">Delete status</h3>
        <p className="text-gray-800 mb-4">
          Are you sure you want to delete the item{" "}
          <strong className="text-green-600">{status?.name}</strong>?
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

export default DeleteStatusModal;
