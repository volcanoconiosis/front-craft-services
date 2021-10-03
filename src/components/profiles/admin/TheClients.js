import React, { useEffect, useState } from 'react';
import axios from "axios";
import cookie from "react-cookies";

function TheClients() {
    const [allUsers, setAllUsers] = useState([]);
    const token = cookie.load("token");
    const Api = "https://craft-service.herokuapp.com";


    useEffect(async() => {
        // get users form admin
       await axios
            .get(`${Api}/users`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then(async (res) => {
                await setAllUsers(res.data)
            });
    }, [])





    // ::::::: handleDeleteUser:::::: 
    const handleDeleteUser = async (id) => {
        // /deleteuser/:id

        let res = await axios.delete(`${Api}/deleteuser/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        setAllUsers(res.data);
    }


    return (
        <div>
            {allUsers.length > 0 &&
                allUsers.map((item, indx) => {
                    return item.role === "user" ? (
                        <>
                            <p>{item.username}</p>
                            <p>{item.firstName}</p>
                            <p>{item.lastName}</p>
                            <p>{item.role}</p>
                            <p>{item.id}</p>
                            <p>{item.email}</p>
                            <p>{item.location}</p>
                            <button onClick={() => { handleDeleteUser(item.id) }}>delete user </button>

                        </>
                    ) : ""

                })}
        </div>
    )
}

export default TheClients
