import { useNavigate, useParams } from "react-router-dom";
import { useGetPerson } from "../../api/personal-info";
import Skeleton from "../../components/Skeleton";
import BackIcon from "../../assets/icons/BackIcon";
import InfoItem from "./InfoItem";

function ShowPersonalInfo() {
  const { personalId } = useParams();
  const navigate = useNavigate();
  const { data: personalData, isLoading, error } = useGetPerson(personalId);

  if (isLoading) return <Skeleton />;
  if (error || !personalData)
    return (
      <div className="text-red-600 bg-red-100 p-4 rounded-md max-w-md mx-auto mt-10 text-center font-semibold shadow-sm">
        Error loading personal info.
      </div>
    );

  const personal = personalData;

  return (

    <div className="min-h-screen">
      <div className="bg-white  rounded-xl p-7 border border-gray-200">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-green-700 tracking-tight">
            Personal Information
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center text-green-600 hover:text-green-800 font-semibold"
          >
            <BackIcon />
            Back
          </button>
        </div>
        <p className="text-gray-600 text-lg mb-6">
          Detailed personal information and application data.
        </p>


        <dl className="grid mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-900">
          <InfoItem label="Full Name" value={`${personal.firstName} ${personal.lastName}`} />
          <InfoItem label="Father's Name" value={personal.fatherName} />
          <InfoItem label="Mother's Name" value={personal.motherName} />
          <InfoItem label="Gender" value={personal.gender} />
          <InfoItem label="Birth Date" value={new Date(personal.birthDate).toLocaleDateString()} />
          <InfoItem label="Place of Birth" value={personal.placeOfBirth} />
          <InfoItem label="Registration Number" value={personal.registrationNumber} />
          <InfoItem label="National ID" value={personal.nationalId} />
          <InfoItem label="Marital Status" value={personal.maritalStatus} />
          <InfoItem label="Nationality" value={personal.nationality} />
          <InfoItem label="Address" value={personal.address} isMultiline={true} />
          <InfoItem label="Phone Number" value={personal.phoneNumber} />
          <InfoItem label="Status" value={personal.status?.name || 'N/A'} />
        </dl>
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-green-500 pb-2">
            Attachments
          </h3>

        </section>
      </div>
    </div>
  );

}

export default ShowPersonalInfo;
