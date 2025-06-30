import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { OrganizationInput, useEditOrganization } from "../../api/organization";

type Props = {
  organization: OrganizationInput | null;
};


const EditOrganizationModal = ({ organization }: Props) => {

  const { register, handleSubmit, reset } = useForm<OrganizationInput>();

  const { mutate, isLoading, error } = useEditOrganization(() => {
    document.querySelector<HTMLDialogElement>(".edit-organization-modal")?.close();
    toast.success("Category updated successfully");
    reset();
  });

  const onSubmit = (data: OrganizationInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (organization) {
      reset({
        id: organization.id,
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        address: organization.address,
        description: organization.description ?? "",
        image: undefined,
      });
    }
  }, [organization, reset]);

  return (
    <dialog className="edit-organization-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Update Organization</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input type="hidden" {...register("id")} />
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium text-gray-700">Name</span>
            <input
              type="text"
              placeholder="Enter category name"
              className="input input-success w-full bg-white text-gray-950"
              {...register("name")}

            />
          </label>


          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Email</span>
            <input
              type="email"
              placeholder="example@org.com"
              className="input input-success w-full bg-white text-gray-950"
              {...register("email")}

            />
          </label>

          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Phone</span>
            <input
              type="text"
              placeholder="+1234567890"
              className="input input-success w-full bg-white text-gray-950"
              {...register("phone")}

            />
          </label>

          <label className="form-control w-full">
            <span className="label-text  font-medium text-gray-700">Address</span>
            <input
              type="text"
              placeholder="Enter address"
              className="input input-success w-full bg-white text-gray-950"
              {...register("address")}

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

            {organization?.image && typeof organization.image === "string" && (
              <img
                src={organization.image}
                alt={organization.name}
                className="w-20 h-20 object-cover rounded mt-2"
              />
            )}
          </label>


          {error && <p className="text-sm text-error">{error.message}</p>}

          <div className="flex justify-end pt-2">


            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">

              {isLoading ? "Updating..." : "Update Organization"}

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


export default EditOrganizationModal;