import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export type UserInput = {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  createdAt: string;
}

export type UserResponse = {
  message: string;
  data: UserInput[];
};

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get<UserResponse>('users');
      return res.data.data;
    }
  });
  return query;
}

export const useAddUser = (onSuccess?: (data: UserResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<UserResponse, AxiosError<{ server_error: string }>, UserInput>({
    mutationFn: async (data: UserInput) => {
      try {
        const res = await axios.post<UserResponse>('users', data);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


export const useEditUser = (onSuccess?: (data: UserResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<UserResponse, AxiosError<{ server_error: string }>, UserInput>({
    mutationFn: async (data: UserInput) => {
      try {
        const payload: Partial<UserInput> = {
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
        };
        if (data.password) {
          payload.password = data.password;
        }
        const res = await axios.put<UserResponse>(`users/${data.id}`, payload);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

export const useDeleteUser = (onSuccess?: (data: UserResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<UserResponse, AxiosError<{ server_error: string }>, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete<UserResponse>(`users/${id}`);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


