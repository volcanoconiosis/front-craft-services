import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Table } from "react-bootstrap";
function Reviews() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";
  let totalRate = 0;
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

    // get worker
    await axios
      .get(`${Api}/worker`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWorkerList(res.data[0]);
        console.log("setWorkerList=====>", res.data[0]);
      });
  }, []);

  return (
    <>
      <section className="reviews-worker-section">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Rate</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {workerList.reviews &&
              workerList.reviews.map((item, indx) => {
                console.log("item.rate", indx, typeof item.rate);
                if (typeof item.rate !== "undefined") {
                  totalRate += Number(item.rate);
                }
                return (
                  <tr key={indx}>
                    <td>{indx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.rate}</td>
                    <td colSpan="3">{item.message}</td>
                  </tr>
                );
              })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total : {totalRate}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default Reviews;
