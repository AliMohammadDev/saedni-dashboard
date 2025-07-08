import { useState } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Skeleton from "../../components/Skeleton";
import { StatusInput, useGetStatus } from "../../api/status";
import AddStatusModal from "./AddStatusModal";
import EditStatusModal from "./EditStatusModal";
import DeleteStatusModal from "./DeleteStatusModal";


const Status = () => {
  const { data, isLoading, error } = useGetStatus();
  const statusList = data?.data ?? [];

  const [selectedStatus, setSelectedStatus] = useState<StatusInput | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-red-500">An error occurred while loading status.</div>;

  const totalPages = statusList ? Math.ceil(statusList.length / itemsPerPage) : 1;

  const paginatedCategories = statusList
    ? statusList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-950">Status</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all status available.
          </p>
        </div>
        <button
          onClick={() => {
            document.querySelector<HTMLDialogElement>(".add-status-modal")?.showModal();
          }}
          className="bg-green-600 hover:bg-green-700 cursor-pointer shadow-md transition-all duration-300 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Add Status
        </button>
      </div>

      <AddStatusModal />

      <div className="relative overflow-x-auto shadow-md rounded-xl border border-green-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase  text-gray-950 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((status) => (
                <tr key={status.id} className="border-b border-gray-200 hover:bg-green-50 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {status.category?.name || <span className="italic text-gray-400">No category</span>}
                  </td>

                  <td className="px-6 py-4 text-gray-600 text-sm max-w-xs break-words whitespace-normal">
                    {status.description || <span className="italic text-gray-400">No description</span>}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {status.process ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
        ${status.process === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                          }`}
                      >
                        {status.process}
                      </span>
                    ) : (
                      <span className="italic text-gray-400">No process</span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(status.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <EditIcon
                        onClick={() => {
                          setSelectedStatus(status);
                          document.querySelector<HTMLDialogElement>(".edit-status-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setSelectedStatus(status);
                          document.querySelector<HTMLDialogElement>(".delete-status-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400 text-md">
                  <p className="text-lg font-medium mb-2">No status found.</p>
                  <p className="text-sm">Click "Add Status" to create your first one.</p>
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


      <EditStatusModal status={selectedStatus} />
      <DeleteStatusModal status={selectedStatus} />
    </div>
  );
};

export default Status;
