import { useQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1/user",
});

export const useGetUserDetail = () => {
  const getUserbyId = async (user) => {
    console.log(user);
    const response = await instance.get(`/${user.id}/`, user);
    return response.data;
  };

  const query = useQuery(["user-detail"], getUserbyId, {
    enabled: false,
  });

  return { ...query };
};

export const useSignup = () => {
  const history = useHistory();

  const craeteUser = (formData) => {
    return instance.post("/register/", formData);
  };

  const mutation = useMutation(craeteUser, {
    onSuccess: (response) => {
      console.log(response);
      history.push("/login");
    },
  });

  return mutation;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const loginUser = (formData) => {
    return instance.post("/login/", formData);
  };

  const mutation = useMutation(loginUser, {
    onSuccess: (response) => {
      console.log(response.data);
      const jwtToken = response.data.jwtToken;
      const userData = response.data.user;

      axios.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;
      queryClient.setQueryData(["user-detail"], userData);
      history.push("/");
    },
  });

  return mutation;
};
