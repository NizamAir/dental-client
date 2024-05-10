import axios from "../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { cookies } = useAuth();

  const refresh = async () => {
    console.log(
      "accessToken in cookie before refresh",
      cookies.get("accessToken")
    );
    console.log(
      "refreshToken in cookie before refresh",
      cookies.get("refreshToken")
    );
    const response = await axios.post(
      "token/refresh",
      JSON.stringify({
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      }),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    console.log("accessToken in response", response.data.accessToken);
    console.log("refreshToken in response", response.data.refreshToken);
    cookies.set("accessToken", response.data.accessToken);
    cookies.set("refreshToken", response.data.refreshToken);

    console.log(
      "accessToken in cookie after refresh",
      cookies.get("accessToken")
    );
    console.log(
      "refreshToken in cookie after refresh",
      cookies.get("refreshToken")
    );

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
