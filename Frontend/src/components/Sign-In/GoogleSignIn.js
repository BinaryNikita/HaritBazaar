import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { api } from "../../axios";

function GoogleRegister({setError}) {
  const handleRegister = async (data) => {
    const { email, name, sub } = data;
    const registrationInfo = {
      name,
      email,
      password: sub
    };
    try {
      const response = await api.post("/user/sign-in", registrationInfo);
      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response.data.message)
    }
  };

  return (
    <GoogleLogin
      onSuccess={(response) => {
        const data = jwtDecode(response.credential);
        console.log(data);
        handleRegister(data);
      }}
      onError={() => {
        console.log("Registration failed");
      }}
    />
  );
}

export default GoogleRegister;
