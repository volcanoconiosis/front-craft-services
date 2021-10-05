import React, { useEffect, useState } from 'react';
import axios from "axios";
import cookie from "react-cookies";
import { Col, Form, Row ,Button} from 'react-bootstrap';
import PersonalInfo from '../worker/PersonalInfo';

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
           <PersonalInfo/>
            <Button variant="danger" onClick={handleDeleteAccount}>delete account</Button>
        </>
    )
}

export default PersonalAdmin
