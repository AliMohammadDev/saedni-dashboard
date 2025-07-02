import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export type PersonalInput = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  gender: 'male' | 'female';
  birthDate: Date;
  placeOfBirth: string;
  registrationNumber: string;
  nationalId: string;
  passportNumber: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nationality: string;
  address: string;
  phoneNumber: string;
  alternatePhone: string;
  statusId: string;
}

export type PersonalResponse = {
  message: string;
  data: PersonalInput[];
};

export const useGetPersonal = () => {
  const query = useQuery({
    queryKey: ['personal'],
    queryFn: async () => {
      const res = await axios.get<PersonalResponse>('personal-infos');
      return res.data.data;
    }
  });
  return query;
}

export const useAddPersonal = (onSuccess?: (data: PersonalResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<PersonalResponse, AxiosError<{ server_error: string }>, PersonalInput>({
    mutationFn: async (data: PersonalInput) => {
      try {
        const res = await axios.post<PersonalResponse>('personal-infos', data);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


export const useEditPersonal = (onSuccess?: (data: PersonalResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<PersonalResponse, AxiosError<{ server_error: string }>, PersonalInput>({
    mutationFn: async (data: PersonalInput) => {
      try {
        const res = await axios.put<PersonalResponse>(`personal-infos/${data.id}`, data);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

export const useDeletePersonal = (onSuccess?: (data: PersonalResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<PersonalResponse, AxiosError<{ server_error: string }>, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete<PersonalResponse>(`personal-infos/${id}`);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
      if (onSuccess) onSuccess(data);
    },
  });
  return mutation;
}


