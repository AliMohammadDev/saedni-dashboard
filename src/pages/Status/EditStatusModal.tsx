import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { StatusInput, useEditStatus } from "../../api/status";

type Props = {
  status: StatusInput | null;
};


const EditStatusModal = ({ status }: Props) => {

  const { register, handleSubmit, reset } = useForm<StatusInput>();

  const { mutate, isLoading, error } = useEditStatus(() => {
    document.querySelector<HTMLDialogElement>(".edit-status-modal")?.close();
    toast.success("Status updated successfully");
    reset();
  });

  const onSubmit = (data: StatusInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (status) {
      reset({
        id: status.id,
        description: status.description ?? "",
        categoryId: status.categoryId
      });
    }
  }, [status, reset]);

  return (
    <dialog className="edit-status-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Update Status</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input type="hidden" {...register("id")} />


          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Description</span>
            <textarea
              placeholder="Enter category description"
              className="textarea textarea-success w-full bg-white text-gray-950"
              rows={3}
              {...register("description")}
            ></textarea>
          </label>

          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">


            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">

              {isLoading ? "Updating..." : "Update Status"}

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


export default EditStatusModal;