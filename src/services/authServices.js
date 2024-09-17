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

const login = async (usernameOrEmail, password) => {
  try {
    const { data } = await axios.post("https://examination-system-backend-production.up.railway.app/api/login", {
      username: usernameOrEmail,
      password,
    });

    if (data && data.jwtToken && data.user) {  // Check if both jwtToken and user exist
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken));
      console.log("authService:login() Success: ", data.user);
      return data;
    } else {
      console.error("authService:login() Error: Missing data in response", data);
      return { error: "Invalid response data" };  // Handle missing data
    }
  } catch (error) {
    // Improved error handling
    const errorMsg = error.response
      ? `${error.response.status} - ${error.response.statusText}`
      : error.message;
    console.error("authService:login() Error: ", errorMsg);
    return { error: errorMsg };
  }
};


const authServices = { register, login };
export default authServices;
