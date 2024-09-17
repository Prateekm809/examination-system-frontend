import axios from "axios";

const register = async (user) => {
  try {
    const { data } = await axios.post("https://examination-system-backend-production.up.railway.app/api/register", user);
    
    if (data && data.userId) {
      console.log("authService:register() Success: ", user.username, " successfully registered.");
      return { isRegistered: true, error: null };
    } else {
      console.error("authService:register() Error: Unexpected response data", data);
      return { isRegistered: false, error: "Unexpected response format from server" };
    }
  } catch (error) {
    let errorMsg = "An unexpected error occurred";
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 409) {
        // Conflict status code, handle specific user-related errors
        switch (error.response.data.message) {
          case "Username already exists":
            errorMsg = "Username already exists. Please choose a different one.";
            break;
          case "Email already exists":
            errorMsg = "Email already exists. Please use a different email.";
            break;
          case "Phone number already exists":
            errorMsg = "Phone number already exists. Please use a different number.";
            break;
          default:
            errorMsg = "User already exists";
        }
      } else {
        errorMsg = `${error.response.status} - ${error.response.data.message || error.response.statusText}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMsg = "No response received from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsg = error.message;
    }
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

    // Check if both jwtToken and user exist in the response
    if (data && data.jwtToken && data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken));
      console.log("authService:login() Success: ", data.user);
      return { ...data, error: null }; // Return the data along with a null error
    } else {
      console.error("authService:login() Error: Missing data in response", data);
      return { error: "Invalid response data" };
    }
  } catch (error) {
    // Improved error handling
    let errorMsg = "An unexpected error occurred";
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMsg = `${error.response.status} - ${error.response.data.message || error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMsg = "No response received from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsg = error.message;
    }
    console.error("authService:login() Error: ", errorMsg);
    return { error: errorMsg };
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwtToken");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authServices = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authServices;
