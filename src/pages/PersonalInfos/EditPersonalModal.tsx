import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { PersonalInput, useEditPersonal } from "../../api/personal-info";

type Props = {
  personal: PersonalInput | null;
};

const EditPersonalModal = ({ personal }: Props) => {
  const { register, handleSubmit, reset } = useForm<PersonalInput>();
  const { mutate, isLoading, error } = useEditPersonal(() => {
    document.querySelector<HTMLDialogElement>(".edit-personal-modal")?.close();
    toast.success("Personal info updated successfully");
    reset();
  });

  const onSubmit = (data: PersonalInput) => {
    mutate(data);
  };

  useEffect(() => {
    if (personal) {
      reset(personal);
    }
  }, [personal, reset]);

  return (
    <dialog className="edit-personal-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-3xl border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-600">Update Person</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>

        <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">First Name</span>
            <input type="text" className="input input-success bg-white w-full" {...register("firstName")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Last Name</span>
            <input type="text" className="input input-success bg-white w-full" {...register("lastName")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Father Name</span>
            <input type="text" className="input input-success bg-white w-full" {...register("fatherName")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Mother Name</span>
            <input type="text" className="input input-success bg-white w-full" {...register("motherName")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Gender</span>
            <select className="select select-success bg-white w-full" {...register("gender")}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Birth Date</span>
            <input type="date" className="input input-success bg-white w-full" {...register("birthDate")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Place of Birth</span>
            <input type="text" className="input input-success bg-white w-full" {...register("placeOfBirth")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Registration Number</span>
            <input type="number" className="input input-success bg-white w-full" {...register("registrationNumber")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">National ID</span>
            <input type="text" className="input input-success bg-white w-full" {...register("nationalId")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Marital Status</span>
            <select className="select select-success bg-white w-full" {...register("maritalStatus")}>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Nationality</span>
            <input type="text" className="input input-success bg-white w-full" {...register("nationality")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Phone Number</span>
            <input type="text" className="input input-success bg-white w-full" {...register("phoneNumber")} />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Address</span>
            <input type="text" className="input input-success bg-white w-full" {...register("address")} />
          </label>

          {error && (
            <p className="text-sm text-red-500 col-span-4">{error.message}</p>
          )}

          <div className="flex justify-end col-span-4 pt-4">
            <button
              type="submit"
              className="text-white cursor-pointer bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isLoading ? "Updating..." : "Update"}
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

export default EditPersonalModal;
