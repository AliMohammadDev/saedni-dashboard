import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type Status = {
  id: string,
  name: string,
  description: string,
}

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
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nationality: string;
  address: string;
  phoneNumber: string;
  file: FileList;
  statusId: number;
  status?: Status;
  createdAt: string;
}

export type PersonalResponse = {
  message: string;
  data: PersonalInput[];
};

export type showPersonalResponse = {
  message: string;
  data: PersonalInput;
}
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
export const useGetPerson = (id?: string) => {
  return useQuery({
    queryKey: ["person", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get<showPersonalResponse>(`/personal-infos/${id}`);
      return res.data.data;
    },
  });
};


export const useAddPersonal = (onSuccess?: (data: PersonalResponse) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<PersonalResponse, AxiosError<{ server_error: string }>, PersonalInput>({
    mutationFn: async (data: PersonalInput) => {
      try {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("fatherName", data.fatherName);
        formData.append("motherName", data.motherName);
        formData.append("gender", data.gender);
        formData.append("birthDate", data.birthDate.toISOString());
        formData.append("placeOfBirth", data.placeOfBirth);
        formData.append("registrationNumber", data.registrationNumber);
        formData.append("nationalId", data.nationalId);
        formData.append("maritalStatus", data.maritalStatus);
        formData.append("nationality", data.nationality);
        formData.append("address", data.address);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("statusId", data.statusId.toString());

        if (data.file && data.file.length > 0) {
          formData.append("file", data.file[0]);
        }
        const res = await axios.post<PersonalResponse>(`personal-infos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return res.data;


      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        console.error("Server Error:", err.response?.data);
        throw new Error(
          err.response?.data?.server_error ||
          (typeof err.response?.data === "string" ? err.response.data : "there was an error")
        );

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
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("fatherName", data.fatherName);
        formData.append("motherName", data.motherName);
        formData.append("gender", data.gender);
        formData.append("birthDate", data.birthDate.toISOString());
        formData.append("placeOfBirth", data.placeOfBirth);
        formData.append("registrationNumber", data.registrationNumber);
        formData.append("nationalId", data.nationalId);
        formData.append("maritalStatus", data.maritalStatus);
        formData.append("nationality", data.nationality);
        formData.append("address", data.address);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("statusId", data.statusId.toString());
        if (data.file && data.file.length > 0) {
          formData.append("image", data.file[0]);
        }
        const res = await axios.put<PersonalResponse>(
          `personal-infos/${data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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


