import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
function TheContact() {
    const [adminList, setAdminList] = useState({});
    const token = cookie.load("token");
    const Api = "https://craft-service.herokuapp.com";

    useEffect(async () => {

        // get admin
        await axios
            .get(`${Api}/adminData`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAdminList(res.data[0]);
                console.log("contactUs=====>", res);
            });

    }, []);



    //   name: values.name,
    //   Subject: values.Subject,

    //   email: values.email,
    //   message: values.message,



    return (
        <div>
            {adminList.support && adminList.support.map(item => {
                return (
                    <>

                        <p>{item.name}</p>
                        <p>{item.message}</p>
                        <p>{item.Subject}</p>
                        <p>{item.email}</p>
                    </>
                )
            })}


        </div>

    )
}

export default TheContact
