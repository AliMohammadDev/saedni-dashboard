import { useState } from "react";
import { CategoryInput, useGetCategories } from "../../api/category";

import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Skeleton from "../../components/Skeleton";

const Category = () => {
  const { data: categories, isLoading, error } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInput | null>(null);
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
          <h2 className="text-3xl font-bold text-gray-950">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all categories available.
          </p>
        </div>
        <button
          onClick={() => {
            document.querySelector<HTMLDialogElement>(".add-category-modal")?.showModal();
          }}
          className="bg-green-600 hover:bg-green-700 cursor-pointer shadow-md transition-all duration-300 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      <AddCategoryModal />

      <div className="relative overflow-x-auto shadow-md rounded-xl border border-green-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase  text-gray-950 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-200 hover:bg-green-50 transition-all">
                  <td className="px-6 py-4">


                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={String(category.image)}
                          alt={category.name} />
                      </div>
                    </div>

                  </td>


                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600 text-sm max-w-xs break-words whitespace-normal">
                    {category.description || <span className="italic text-gray-400">No description</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <EditIcon
                        onClick={() => {
                          setSelectedCategory(category);
                          document.querySelector<HTMLDialogElement>(".edit-category-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-700 transition"
                      />
                      <DeleteIcon
                        onClick={() => {
                          setSelectedCategory(category);
                          document.querySelector<HTMLDialogElement>(".delete-category-modal")?.showModal();
                        }}
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400 text-md">
                  <p className="text-lg font-medium mb-2">No categories found.</p>
                  <p className="text-sm">Click "Add Category" to create your first one.</p>
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


      <EditCategoryModal category={selectedCategory} />
      <DeleteCategoryModal category={selectedCategory} />
    </div>
  );
};

export default Category;
