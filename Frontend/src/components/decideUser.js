import { useSelector } from "react-redux"
import HomePage from "./FrontPage/HomePage";
import VendorHome from "./Vendor/Vendor Home/VendorHome";
import AdminHome from "./Admin/Admin Home/AdminHome"
function DecideUser(){
    const user = useSelector(state=>state.User.user);
    console.log(user.role)
    if( (!user.role) || user.role=="user" ){
        return <><HomePage/></>
    }
    else if (user.role=="admin"){
        return <><AdminHome/></>
    }
    else{
        return <><VendorHome/></>
    }
}

export default DecideUser;