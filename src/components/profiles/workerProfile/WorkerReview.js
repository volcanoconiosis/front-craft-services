import ReviewForm from "../../forms/ReviewForm";
import { Table } from "react-bootstrap";
import cookie from "react-cookies"
import { useContext } from "react";
import { LoginContext } from "../../../context/Auth";
function WorkerReview() {
 const context=useContext(LoginContext)
  const list2=cookie.load("list2")
  let totalRate = 0;
  return (
    <>
      <div>
        <ReviewForm />
        <section className="reviews-worker-section mt-5">
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
              {list2.reviews &&
               list2.reviews.map((item, indx) => {
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
      </div>
    </>
  );
}

export default WorkerReview;
