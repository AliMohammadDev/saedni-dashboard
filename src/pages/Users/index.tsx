import { useState } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Skeleton from "../../components/Skeleton";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import { useGetUsers, UserInput } from "../../api/user";

const User = () => {
  const { data: categories, isLoading, error } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState<UserInput | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-red-500">An error occurred while loading categories.</div>;

  const totalPages = categories ? Math.ceil(categories.length / itemsPerPage) : 1;

  const paginatedCategories = categories
    ? categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-950">Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all users available.
          </p>
        </div>
        <button
          onClick={() => {
            document.querySelector<HTMLDialogElement>(".add-user-modal")?.showModal();
          }}
          className="bg-green-600 hover:bg-green-700 cursor-pointer shadow-md transition-all duration-300 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Add New User
        </button>
      </div>

      <AddUserModal />

      <div className="relative overflow-x-auto shadow-md rounded-xl border border-green-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase  text-gray-950 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">FullName</th>
              <th scope="col" className="px-6 py-3">role</th>
              <th scope="col" className="px-6 py-3">Organization</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-green-50 transition-all">

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {user.username}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
      ${user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "organization"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {user.organization?.name}
                  </td>



                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <EditIcon
                        onClick={() => {
                          setSelectedUser(user);
                          document.querySelector<HTMLDialogElement>(".edit-user-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setSelectedUser(user);
                          document.querySelector<HTMLDialogElement>(".delete-user-modal")?.showModal();
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
                  <p className="text-lg font-medium mb-2">No users found.</p>
                  <p className="text-sm">Click "Add User" to create your first one.</p>
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


      <EditUserModal user={selectedUser} />
      <DeleteUserModal user={selectedUser} />
    </div>
  );
};

export default User;
