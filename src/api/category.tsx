import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export type CategoryInput = {
  id: string;
  name: string;
  description: string;
  image: FileList;
  createdAt: string;
}

export type CategoryResponse = {
  message: string;
  data: CategoryInput[];
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await axios.get<CategoryResponse>('categories');
      return res.data.data;
    }
  });
  return query;
}

export const useAddCategory = (onSuccess?: (data: CategoryResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<CategoryResponse, AxiosError<{ server_error: string }>, CategoryInput>({
    mutationFn: async (data: CategoryInput) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image[0]);
        const res = await axios.post<CategoryResponse>('categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


export const useEditCategory = (onSuccess?: (data: CategoryResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CategoryResponse, AxiosError<{ server_error: string }>, CategoryInput>({
    mutationFn: async (data: CategoryInput) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }
        const res = await axios.put<CategoryResponse>(`categories/${data.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

export const useDeleteCategory = (onSuccess?: (data: CategoryResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<CategoryResponse, AxiosError<{ server_error: string }>, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete<CategoryResponse>(`categories/${id}`);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


