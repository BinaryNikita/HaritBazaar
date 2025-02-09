import { data, Form, useNavigate } from "react-router-dom";
import { api } from "../../../axios";
import { useEffect, useRef, useState } from "react";

function AddProductByFile(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const file = useRef();
    useEffect(()=>{},[msg])
    const handelSubmit = (event)=>{
        event.preventDefault();
        const form = new FormData();
        form.append('excelFile',file.current.files[0])
        const sendFile = async() => await api.post('/vendor/add-product-by-file', form, {headers: {Authorization: localStorage.getItem('token')}})
        sendFile().then(res=>{
            console.log(res.data);
            if(res.data.operation){
                setMsg(res.data.msg)
                setTimeout(()=>navigate("/"),2500);
            }
            else {
                // console.log(res.data.msg)
                setMsg(res.data.msg)
                setTimeout(()=>setMsg(""),4000);
            }
        }).catch(err=>{

            console.log("IN-ERROR")
            console.log(err)
        })
    }
    return <>
        <div className="container">
            <form onSubmit={handelSubmit} className="form-group">
                <input ref={file} name="excelFile" className="form-control" type="file" required/>
                <button type="submit">Add Products</button>
            </form>
            <strong className="text-danger">{msg}</strong>
        </div>
    </>
}

export default AddProductByFile;