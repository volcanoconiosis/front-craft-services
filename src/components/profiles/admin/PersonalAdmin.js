import React, { useEffect, useState } from 'react';
import axios from "axios";
import cookie from "react-cookies";

function PersonalAdmin() {
    const [userList, setUserList] = useState({});
    const [adminList, setAdminList] = useState({});
    const [values, setValues] = useState([]);
    const token = cookie.load("token");
    const Api = "https://craft-service.herokuapp.com";
    useEffect(async () => {
        // get information personal
        await axios
            .get(`${Api}/getCurrentUser`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUserList(res.data);
                console.log(res.data);
            });

        // get admin
        await axios
            .get(`${Api}/adminData`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAdminList(res.data[0]);
                console.log("setAdminList=====>", res);
            });

    }, []);
    // :::::::::: delete account ::::::::::
    const handleDeleteAccount = async () => {
        let res = await axios.delete(`${Api}/deleteaccount`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
    };




    // ::::::::: update admin account ::::::: 😝
    function handleChange(e) {
        setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
        console.log("from sign client:", values);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        const reqBody = {
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: userList.role,
            workType: userList.workType,
            phone: values.phone,
            store: userList.store,
            location: values.location,
            id: userList.id,
        };
        await axios
            .put(`${Api}/updateaccount`, reqBody, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
            });
    };




    return (
        <>
            <button onClick={handleDeleteAccount}>delete account</button>

            {/* form for update account  */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    defaultValue={userList.username}
                />
                <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    defaultValue={userList.firstName}
                />
                <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    defaultValue={userList.lastName}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    defaultValue={userList.password}
                />
                <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    defaultValue={userList.phone}
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    defaultValue={userList.email}
                />
                <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    defaultValue={userList.location}
                />

                <button type="submit"> update</button>
            </form>






            <div>
                <p>{userList.username}</p>
                <p>{userList.id}</p>

                {adminList.profilePicture &&
                    adminList.profilePicture.includes("upload") ? (
                    <img
                        src={`${Api}/${adminList.profilePicture}`}
                        alt={adminList.id}
                    />
                ) : (
                    <img src={adminList.profilePicture} alt={adminList.id} />
                )}

            </div>
        </>
    )
}

export default PersonalAdmin
