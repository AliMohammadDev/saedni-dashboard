import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PersonalInput, useAddPersonal } from "../../api/personal-info";
import { useGetStatus } from "../../api/status";

const AddPersonalModal = () => {
  const { register, handleSubmit, reset } = useForm<PersonalInput>();
  const { data: status, isLoading: statusLoading, error: statusError } = useGetStatus();

  const { mutate, isLoading, error } = useAddPersonal(() => {
    document.querySelector<HTMLDialogElement>(".add-personal-modal")?.close();
    toast.success("Personal info added successfully");
    reset();
  });

  const onSubmit = (data: PersonalInput) => {
    mutate(data);
  };

  return (
    <dialog className="add-personal-modal modal">
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-6xl border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add New Personal</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none">
              ×
            </button>
          </form>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">First Name</span>
              <input
                type="text"
                placeholder="Enter FirstName"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("firstName", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Last Name</span>
              <input
                type="text"
                placeholder="Enter LastName"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("lastName", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Father Name</span>
              <input
                type="text"
                placeholder="Enter FatherName"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("fatherName", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Mother Name</span>
              <input
                type="text"
                placeholder="Enter MotherName"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("motherName", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Gender</span>
              <select
                className="select cursor-pointer select-success w-full bg-white text-gray-950"
                {...register("gender", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Birth Date</span>
              <input
                type="date"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("birthDate", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Place of Birth</span>
              <input
                type="text"
                placeholder="Enter placeOfBirth"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("placeOfBirth", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Registration Number</span>
              <input
                type="text"
                placeholder="Enter registrationNumber"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("registrationNumber", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">National ID</span>
              <input
                type="text"
                placeholder="Enter National ID"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("nationalId", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Marital Status</span>
              <select
                className="select cursor-pointer select-success w-full bg-white text-gray-950"
                {...register("maritalStatus", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>Select Status</option>
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
                placeholder="Enter Nationality"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("nationality", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Address</span>
              <input
                type="text"
                placeholder="Enter address"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("address", { required: true })}
              />
            </label>
            <label className="form-control col-span-1">
              <span className="label-text font-medium text-gray-700">Phone Number</span>
              <input
                type="text"
                placeholder="Enter phoneNumber"
                className="input input-success w-full bg-white text-gray-950"
                required
                {...register("phoneNumber", { required: true })}
              />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text font-medium text-gray-700">Status</span>
              <select
                className="select select-success cursor-pointer w-full bg-white text-gray-950"
                {...register("statusId", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  {statusLoading
                    ? "Loading status..."
                    : statusError
                      ? "Failed to load status"
                      : "Select Status"}
                </option>
                {status?.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
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

export default AddPersonalModal;
