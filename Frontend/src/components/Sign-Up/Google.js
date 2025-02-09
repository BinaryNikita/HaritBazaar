import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode";
import { api } from "../../axios";
import { useNavigate } from "react-router-dom";


function Googlelogin({setError}) {
  const navigate = useNavigate();
  const details = async(data)=>{
      const {email,name,sub} = data
      const loginInfo = {
        name,email,password:sub
      }
      try{
        const response = await api.post("/user/sign-up",loginInfo)
        console.log("==========");
        console.log(response);
        if(response.data.success){
          console.log("Success")
          navigate("/");
        }
      }
      catch(err){
        setError(err.response.data.error)
        setTimeout(()=>setError(""),4000)
      }
  }

  return (
    <GoogleLogin
      onSuccess={(response) => {
        const data = jwtDecode(response.credential)
        console.log(data)
        details(data)
      }}
      onError={() => {
        console.log("Login fail")
      }} />
  );
}

export default Googlelogin;