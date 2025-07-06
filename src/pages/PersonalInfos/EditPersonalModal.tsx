import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { PersonalInput, useEditPersonal } from "../../api/personal-info";
import { useGetStatus } from "../../api/status";

type Props = {
  personal: PersonalInput | null;
};

const EditPersonalModal = ({ personal }: Props) => {
  const { register, handleSubmit, reset } = useForm<PersonalInput>();
  const { data: status, isLoading: statusLoading } = useGetStatus();

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
      reset({
        ...personal,
        statusId: personal.status?.id ? Number(personal.status.id) : 0
      });
    }
  }, [personal, reset]);


  return (
    <dialog className="edit-personal-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-6xl border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Update Person</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">×</button>
          </form>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">First Name</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("firstName")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Last Name</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("lastName")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Father Name</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("fatherName")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Mother Name</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("motherName")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Gender</span>
            <select
              className="select select-success w-full bg-white text-gray-950 cursor-pointer"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Birth Date</span>
            <input
              type="date"
              className="input input-success w-full bg-white text-gray-950"
              {...register("birthDate")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Place of Birth</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("placeOfBirth")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Registration Number</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("registrationNumber")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">National ID</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("nationalId")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Marital Status</span>
            <select
              className="select select-success w-full bg-white text-gray-950 cursor-pointer"
              {...register("maritalStatus")}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Nationality</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("nationality")}
            />
          </label>
          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Address</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("address")}
            />
          </label>

          <label className="form-control col-span-1">
            <span className="label-text font-medium text-gray-700">Phone Number</span>
            <input
              type="text"
              className="input input-success w-full bg-white text-gray-950"
              {...register("phoneNumber")}
            />
          </label>

          <label className="form-control w-full col-span-1">
            <span className="label-text font-medium text-gray-700">Status</span>
            <select
              {...register("statusId")}
              className="select select-success cursor-pointer w-full bg-white text-gray-950"
              disabled={statusLoading}
            >
              <option value="">Select status</option>
              {status?.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          {/* File upload */}
          <label className="form-control w-full relative col-span-1">
            <span className="label-text mb-1 font-medium text-gray-700">File</span>
            <div className="relative w-full">
              <input
                type="file"
                {...register("file")}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
              />
              <div className="text-white text-center cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Upload File
              </div>
            </div>
          </label>



          {error && (
            <p className="text-sm text-error col-span-4">{error.message}</p>
          )}

          <div className="flex justify-end col-span-4 pt-4">
            <button
              type="submit"
              className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
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
