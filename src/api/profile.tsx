import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookie from "cookie-universal";


// get profile
export type ProfileResponse = {
  message: string;
  data: {
    userId: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
  }
};

export type Profile = {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export type UserResponse = {
  message: string;
  data: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
  }
}



export const useGetUser = (id?: string) => {
  return useQuery({
    queryKey: ["user", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get<UserResponse>(`/users/${id}`);
      return res.data;
    },
  });
};


export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    retry: 1,
    queryFn: async () => {
      const token = Cookie().get("token");
      if (!token) return null;
      try {
        const res = await axios.get<ProfileResponse>("auth/profile");
        const user = res.data.data;
        const profile: Omit<Profile, "password"> = {
          userId: String(user.userId),
          username: user.username ?? "No Name",
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        };
        return profile;
      } catch (err) {
        Cookie().remove("token");
        throw err;
      }
    },
  });

  return query;
};

export const useEditProfile = (onSuccess?: (data: UserResponse) => void,
  onError?: () => void,) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<UserResponse, AxiosError<{ server_error: string }>, Profile>({
    mutationFn: async (data: Profile) => {
      try {
        const payload: Partial<Profile> = {
          username: data.username,
          fullName: data.fullName,
          email: data.email,
        };
        if (data.password) {
          payload.password = data.password;
        }
        const res = await axios.put<UserResponse>(`users/${data.userId}`, payload);
        return res.data;
      }
      catch (error) {
        const err = error as AxiosError<{ server_error: string }>;
        const message = err.response?.data.server_error;
        throw new Error(message || "there was an error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.data.id] });
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      if (onError) onError();
    }
  });

  return mutation;
}

