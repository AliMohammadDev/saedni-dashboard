import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type StatusInput = {
  id: string;
  name: string;
  description: string;
  categoryId?: string;
  category?: Category;
  organizationId?: string | null;
  createdAt: string;
}

export type StatusResponse = {
  message: string;
  data: StatusInput[];
};

export const useGetStatus = () => {
  const query = useQuery({
    queryKey: ['status'],
    queryFn: async () => {
      const res = await axios.get<StatusResponse>('status');
      return res.data.data;
    }
  });
  return query;
}

export const useAddStatus = (onSuccess?: (data: StatusResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<StatusResponse, AxiosError<{ server_error: string }>, StatusInput>({
    mutationFn: async (data: StatusInput) => {
      try {
        const res = await axios.post<StatusResponse>('status', data);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


export const useEditStatus = (onSuccess?: (data: StatusResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<StatusResponse, AxiosError<{ server_error: string }>, StatusInput>({
    mutationFn: async (data: StatusInput) => {
      try {

        const res = await axios.put<StatusResponse>(`status/${data.id}`, data);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

export const useDeleteStatus = (onSuccess?: (data: StatusResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<StatusResponse, AxiosError<{ server_error: string }>, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete<StatusResponse>(`status/${id}`);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


