import ReviewForm from "../../forms/ReviewForm";
import React, { useContext } from "react";
import { LoginContext } from "../../../context/Auth";
function WorkerReview() {
  const context = useContext(LoginContext);
  return (
    <>
      <div>
        <h3>render the review </h3>.
        <ReviewForm />
        {context.list2.reviews &&
          context.list2.reviews.map((item, indx) => {
            return (
              <div key={indx}>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <p>{item.rate}</p>
                <p>{item.message}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default WorkerReview;
