import { useEffect, useState } from "react";
import { api } from '../../../axios';
import AdminHeader from "../AdminHeader.js/AdminHeader";
import './AdminHome.css';

function AdminHome() {
    return (
        <>
            <AdminHeader />
            <ActiveUser />
        </>
    );
}

export default AdminHome;

function ActiveUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {}, [users]);

    const loadData = () => {
        getUsers().then(res => {
            const result = res.data.filter(item => item.role === "user").sort((a, b) => b.point - a.point);
            setUsers(result.slice(0,8));
        });
    };

    const getUsers = async () => await api.get('/user/get-all-users', { headers: { Authorization: localStorage.getItem('token') } });

    return <>
        <div className="text-center mt-4 container admin-m-a-u">
            <h2 className='text-success h3 fw-bold'>Most Active Users</h2>
            <div className="d-flex justify-content-center flex-wrap row">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="card m-1 user-card col-md-3 mb-3" style={{ width: '18rem' }}>
                            <div className="card-body p-2 d-flex flex-column">
                                <h5 className="card-title">Name: <strong>{user.name}</strong></h5>
                                <p className="card-text">E-mail: <strong>{user.email}</strong></p>
                                <p className="card-text">Eco-Points: <strong>{user.point}</strong></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No most active users available.</p>
                )}
            </div>
        </div>
    </>
}
