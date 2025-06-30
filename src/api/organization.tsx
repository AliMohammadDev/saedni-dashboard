import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export type OrganizationInput = {
  id: string;
  name: string;
  description: string;
  image: FileList;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export type OrganizationResponse = {
  message: string;
  data: OrganizationInput[];
};

export const useGetOrganizations = () => {
  const query = useQuery({
    queryKey: ['organization'],
    queryFn: async () => {
      const res = await axios.get<OrganizationResponse>('organizations');
      return res.data.data;
    }
  });
  return query;
}

export const useAddOrganization = (onSuccess?: (data: OrganizationResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<OrganizationResponse, AxiosError<{ server_error: string }>, OrganizationInput>({
    mutationFn: async (data: OrganizationInput) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('image', data.image[0]);
        const res = await axios.post<OrganizationResponse>('organizations', formData, {
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
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


export const useEditOrganization = (onSuccess?: (data: OrganizationResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<OrganizationResponse, AxiosError<{ server_error: string }>, OrganizationInput>({
    mutationFn: async (data: OrganizationInput) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('description', data.description);
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }
        const res = await axios.put<OrganizationResponse>(`organizations/${data.id}`, formData, {
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
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

export const useDeleteOrganization = (onSuccess?: (data: OrganizationResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<OrganizationResponse, AxiosError<{ server_error: string }>, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete<OrganizationResponse>(`organizations/${id}`);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


