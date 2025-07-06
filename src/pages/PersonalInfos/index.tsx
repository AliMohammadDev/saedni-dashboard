import { useState } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Skeleton from "../../components/Skeleton";
import AddPersonalModal from "./AddPersonalModal";
import EditPersonalModal from "./EditPersonalModal";
import DeletePersonalModal from "./DeletePersonalModal";
import { PersonalInput, useGetPersonal } from "../../api/personal-info";
import EyeIcon from "../../assets/icons/EyeIcon";
import { useNavigate } from "react-router-dom";


const PersonalInfo = () => {
  const { data: personalInfos, isLoading, error } = useGetPersonal();
  const navigate = useNavigate();
  const [selectedPersonal, setSelectedPersonal] = useState<PersonalInput | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-red-500">An error occurred while loading personal infos.</div>;

  const totalPages = personalInfos ? Math.ceil(personalInfos.length / itemsPerPage) : 1;

  const paginatedPersonalInfos = personalInfos
    ? personalInfos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-950">Personal Info</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all personal Infos available.
          </p>
        </div>
        <button
          onClick={() => {
            document.querySelector<HTMLDialogElement>(".add-personal-modal")?.showModal();
          }}
          className="bg-green-600 hover:bg-green-700 cursor-pointer shadow-md transition-all duration-300 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Add New Person
        </button>
      </div>

      <AddPersonalModal />

      <div className="relative overflow-x-auto shadow-md rounded-xl border border-green-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase text-gray-950 bg-gray-100">
            <tr>
              <th className="px-6 py-3">firstName</th>
              <th className="px-6 py-3">lastName</th>
              <th className="px-6 py-3">nationalId</th>
              <th className="px-6 py-3">phoneNumber</th>
              <th className="px-6 py-3">createdAt</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPersonalInfos.length > 0 ? (
              paginatedPersonalInfos.map((personal) => (
                <tr key={personal.id} className="border-b border-gray-200 hover:bg-green-50 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{personal.firstName}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{personal.lastName}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{personal.nationalId}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{personal.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(personal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <EyeIcon
                        onClick={() => {
                          navigate(`show/${personal.id}`)
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <EditIcon
                        onClick={() => {
                          setSelectedPersonal(personal);
                          document.querySelector<HTMLDialogElement>(".edit-personal-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setSelectedPersonal(personal);
                          document.querySelector<HTMLDialogElement>(".delete-personal-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={18} className="text-center py-10 text-gray-400 text-md">
                  <p className="text-lg font-medium mb-2">No personal info found.</p>
                  <p className="text-sm">Click "Add New Person" to create your first one.</p>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <nav className="flex justify-end mt-6" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 font-semibold">
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-5 h-10 ms-0 leading-tight text-green-600 bg-white border border-e-0 border-green-400 rounded-s-lg hover:bg-green-100 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(index + 1)}
                className={`flex items-center cursor-pointer justify-center px-5 h-10 leading-tight border ${currentPage === index + 1
                  ? "text-white bg-green-600 border-green-600"
                  : "text-green-600 bg-white border-green-400 hover:bg-green-100 hover:text-green-800"
                  } rounded-none transition`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center cursor-pointer px-5 h-10 leading-tight text-green-600 bg-white border border-green-400 rounded-e-lg hover:bg-green-100 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>


      <EditPersonalModal personal={selectedPersonal} />
      <DeletePersonalModal personal={selectedPersonal} />
    </div>
  );
};

export default PersonalInfo;
