import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Table ,Button} from "react-bootstrap";
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


<Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {adminList.support && adminList.support.map(item => {
            return(
                <>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.Subject}</td>
                    <td>{item.message}</td>
                    <td>{item.email}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>


        </div>

    )
}

export default TheContact
