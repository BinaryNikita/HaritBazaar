import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import store from '../../Redux-Config/Store'

export function Auth({children}){
    const isLoggedIn = useSelector(store=>store.User.isLoggedIn)
    if(isLoggedIn){
        return children
    }
    else {
        return <Navigate to="/user/sign-in"/>
    }
}