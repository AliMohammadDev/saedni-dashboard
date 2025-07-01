import { useState } from "react";

import AddorganizationModal from "./AddOrganizationModal";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Skeleton from "../../components/Skeleton";
import { OrganizationInput, useGetOrganizations } from "../../api/organization";
import EditOrganizationModal from "./EditOrganizationModal";
import DeleteOrganizationModal from "./DeleteOrganizationModal";

const Organization = () => {
  const { data: organization, isLoading, error } = useGetOrganizations();
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationInput | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-red-500">An error occurred while loading categories.</div>;

  const totalPages = organization ? Math.ceil(organization.length / itemsPerPage) : 1;

  const paginatedCategories = organization
    ? organization.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-950">Organizations</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all Organizations available.
          </p>
        </div>
        <button
          onClick={() => {
            document.querySelector<HTMLDialogElement>(".add-organization-modal")?.showModal();
          }}
          className="bg-green-600 hover:bg-green-700 cursor-pointer shadow-md transition-all duration-300 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Add New Organization
        </button>
      </div>

      <AddorganizationModal />

      <div className="relative overflow-x-auto shadow-md rounded-xl border border-green-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase  text-gray-950 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((organization) => (
                <tr key={organization.id} className="border-b border-gray-200 hover:bg-green-50 transition-all">
                  <td className="px-6 py-4">

                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={String(organization.image)}
                          alt={organization.name} />
                      </div>
                    </div>


                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {organization.name}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {organization.email}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {organization.phone}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {organization.address}
                  </td>



                  <td className="px-6 py-4 text-gray-600 text-sm max-w-xs break-words whitespace-normal">
                    {organization.description || <span className="italic text-gray-400">No description</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <EditIcon
                        onClick={() => {
                          setSelectedOrganization(organization);
                          document.querySelector<HTMLDialogElement>(".edit-organization-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setSelectedOrganization(organization);
                          document.querySelector<HTMLDialogElement>(".delete-organization-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400 text-md">
                  <p className="text-lg font-medium mb-2">No organizations found.</p>
                  <p className="text-sm">Click "Add Organization" to create your first one.</p>
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


      <EditOrganizationModal organization={selectedOrganization} />
      <DeleteOrganizationModal organization={selectedOrganization} />
    </div>
  );
};

export default Organization;
