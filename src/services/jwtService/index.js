import axios from "axios";

class JwtService {
  setSession = (res) => {
    if (res) {
      console.log("user----", res);
      localStorage.setItem("data", JSON.stringify(res));
      localStorage.setItem("leadId", res?.data?.data?.leadId);
      localStorage.setItem("accessToken", res?.data?.data?.token?.accessToken);
      localStorage.setItem(
        "refreshToken",
        res?.data?.data?.token?.refreshToken
      );
      // localStorage.setItem("token",JSON.stringify(res))
      axios.defaults.headers.common.Authorization = `Bearer ${res?.data?.data?.token?.accessToken}`;
    } else {
      localStorage.removeItem("leadId");
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common.Authorization;
    }
  };
}

const instance = new JwtService();

export default instance;
