import axios from "axios";

const register = async (user) => {
  try {
    const { data } = await axios.post("https://examination-system-backend-production.up.railway.app/api/register", user);
    if (data && data.userId) {
      console.log(
        "authService:register() Success: ",
        user.username,
        " successfully registered."
      );
      return { isRegistered: true, error: null };
    } else {
      console.error("authService:register() Error: ", data);
      return { isRegistered: false, error: data };
    }
  } catch (error) {
    const errorMsg = error.response ? error.response.statusText : error.message;
    console.error("authService:register() Error: ", errorMsg);
    return { isRegistered: false, error: errorMsg };
  }
};

const login = async (username, password) => {
  try {
    const { data } = await axios.post("https://examination-system-backend-production.up.railway.app/api/login", {
      username: username,
      password: password,
    });

    if (data && data.jwtToken) {  // Check if jwtToken exists
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken));
      console.log("authService:login() Success: ", data.user);
      return data;
    } else {
      console.error("authService:login() Error: No JWT token found", data);
      return { error: "No JWT token found" };  // Handle missing token
    }
  } catch (error) {
    const errorMsg = error.response ? error.response.statusText : error.message;
    console.error("authService:login() Error: ", errorMsg);
    return { error: errorMsg };
  }
};

const authServices = { register, login };
export default authServices;
