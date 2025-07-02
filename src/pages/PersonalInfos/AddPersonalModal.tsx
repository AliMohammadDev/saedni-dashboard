import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PersonalInput, useAddPersonal } from "../../api/personal-info";

const AddPersonalModal = () => {
  const { register, handleSubmit, reset } = useForm<PersonalInput>();

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
      <div className="modal-box bg-white rounded-2xl shadow-lg w-full max-w-2xl border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-950">Add Personal Info</h3>
          <form method="dialog">
            <button className="text-xl text-gray-400 hover:text-red-500">×</button>
          </form>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

          {/* الاسم الأول والكنية */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">First Name</span>
              <input type="text" className="input input-bordered" {...register("firstName", { required: true })} />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Last Name</span>
              <input type="text" className="input input-bordered" {...register("lastName", { required: true })} />
            </label>
          </div>

          {/* اسم الأب واسم الأم */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">Father Name</span>
              <input type="file" className="file-input file-input-bordered w-full" {...register("fatherName", { required: true })} />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Mother Name</span>
              <input type="text" className="input input-bordered" {...register("motherName", { required: true })} />
            </label>
          </div>

          {/* الجنس وتاريخ الميلاد */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">Gender</span>
              <select className="select select-bordered" {...register("gender", { required: true })}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Birth Date</span>
              <input type="date" className="input input-bordered" {...register("birthDate", { required: true })} />
            </label>
          </div>

          {/* مكان الولادة ورقم القيد */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">Place of Birth</span>
              <input type="file" className="file-input file-input-bordered w-full" {...register("placeOfBirth", { required: true })} />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Registration Number</span>
              <input type="text" className="input input-bordered" {...register("registrationNumber", { required: true })} />
            </label>
          </div>

          {/* الرقم الوطني وجواز السفر */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">National ID</span>
              <input type="text" className="input input-bordered" {...register("nationalId", { required: true })} />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Passport Number</span>
              <input type="text" className="input input-bordered" {...register("passportNumber")} />
            </label>
          </div>

          {/* الحالة الاجتماعية والجنسية */}
          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">Marital Status</span>
              <select className="select select-bordered" {...register("maritalStatus", { required: true })}>
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Nationality</span>
              <input type="text" className="input input-bordered" {...register("nationality", { required: true })} />
            </label>
          </div>

          {/* العنوان ورقم الهاتف */}
          <label className="form-control">
            <span className="label-text">Address</span>
            <input type="text" className="input input-bordered" {...register("address", { required: true })} />
          </label>

          <div className="flex gap-4">
            <label className="form-control w-1/2">
              <span className="label-text">Phone Number</span>
              <input type="tel" className="input input-bordered" {...register("phoneNumber", { required: true })} />
            </label>
            <label className="form-control w-1/2">
              <span className="label-text">Alternate Phone</span>
              <input type="tel" className="input input-bordered" {...register("alternatePhone")} />
            </label>
          </div>

          {/* الحالة (statusId) */}
          <label className="form-control">
            <span className="label-text">Status ID</span>
            <input type="text" className="input input-bordered" {...register("statusId", { required: true })} />
          </label>

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              {isLoading ? "Submitting..." : "Submit"}
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
