import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Reducers/Slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../Reducers/Slices/profileSlice";
import { resetCart } from "../../Reducers/Slices/cartSlice";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export const sendOTP = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE..........", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOPT API ERROR........", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading.....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      console.log("SIGNUP_API RESPONSE........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR.......", error);
      toast.error("SignUp Failed");
      navigate("/signUp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE.............", response);

      if (!response.data.success) {
        throw new Error(response.data.success);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data?.user?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR....", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})
            console.log("RESET PASSWORD TOKEN RESPONSE.....", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true);
        }catch(error){
            console.log("RESET PASSWORD TOKEN ERROR", error)
            toast.error("Failed to send email for resetting password")
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (password, confirmPassword, token) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
            console.log("RESET PASSWORD RESPONSE....", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password has been reset Successfully");
        }catch(error){
            console.log("RESET PASSWORD TOKEN ERROR", error)
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}