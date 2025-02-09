import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../axios";
import './ManageUser.css';

function ManageUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState("total");

    useEffect(() => {
        getData().then(response => {
            setUsers(response.data);
        });
    }, []);

    const getData = async () => await api.get("/user/get-all-users", { headers: { Authorization: localStorage.getItem('token') } });

    const filter = (x) => {
        setSelected(x);
        setUsers(users);
    };

    const deleteUser = (id) => {
        console.log(id); // IMPLEMENT THIS
    };

    const showDetails = (user) => {
        if (user.role === "user") navigate(`/admin/userDetail/${user._id}`);
        else navigate(`/admin/VendorDetail/${user._id}`);
    };

    return (
        <>
            <div className="container mt-5 row">
                <div className="col-md-6 row">
                    <button onClick={() => filter("user")} className="btn btn-success col-sm-4">Users</button>
                    <button onClick={() => filter("vendor")} className="btn btn-warning col-sm-4">Vendors</button>
                    <button onClick={() => filter("total")} className="btn btn-info col-sm-4">Total</button>
                </div>
            </div>
            <div className="container mt-5">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr><th>ID</th><th>Name</th> <th>Email</th> <th>Role</th></tr>
                    </thead>
                    <tbody>
                        {users?.filter(item => item.role !== "admin").filter(item => (item.role === selected) || (selected === "total")).map((user, index) => (
                            <tr key={index} onClick={() => showDetails(user)} className="table-row">
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                {/* <td><button onClick={() => deleteUser(user._id)} className="btn btn-outline-danger">Delete</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageUsers;
