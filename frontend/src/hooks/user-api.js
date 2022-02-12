import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1/user",
});

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

      instance.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;
      queryClient.setQueryData(["user-detail"], userData);
      history.push("/");
    },
  });

  return mutation;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const logoutUser = () => {
    return instance.post("/logout/");
  };

  const mutation = useMutation(logoutUser, {
    onSuccess: (response) => {
      console.log(response.data);

      delete instance.defaults.headers.common["Authorization"];
      queryClient.resetQueries(["user-detail"]);
      history.push("/");
    },
  });

  return mutation;
};

export const useGetUserDetail = () => {
  const getUserbyId = async (user) => {
    console.log(user);
    const response = await instance.get(`/${user.id}/`, user);
    return response.data;
  };

  const query = useQuery(["user-detail"], getUserbyId, {
    enabled: false,
  });

  return query;
};

export const useSilentRefresh = () => {
  const [intervalMs, setIntervalMs] = useState(false);
  const queryClient = useQueryClient();

  const silentRefresh = async () => {
    return await instance.post("/silent-refresh/");
  };

  const query = useQuery(["silent-refresh"], silentRefresh, {
    onSuccess: (response) => {
      const userData = response.data.user;
      const jwtToken = response.data.jwtToken;
      const decodedToken = jwt_decode(jwtToken);
      const refetchIntervalTime = (decodedToken.exp - decodedToken.iat) * 1000;
      setIntervalMs(refetchIntervalTime);
      console.log("silentRefresh refetching...!");

      instance.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;
      queryClient.setQueryData(["user-detail"], userData);
    },
    refetchInterval: intervalMs,
  });

  return query;
};
