import React, { useContext } from "react";
import { LoginContext } from "../../../context/Auth";

function WorkerTools() {
  const Api = "https://craft-service.herokuapp.com";
  const context = useContext(LoginContext);

  return (
    <>
      <div>
        <h1>rendaring .....</h1>
        {context.list2.tools &&
          context.list2.tools.map((item, indx) => {
            return (
              <>
                <div key={indx}>
                  {item.imges &&
                    item.imges.map((el, indx) => {
                      return el.includes("images") ? (
                        <img src={`${Api}/${el}`} alt={indx} />
                      ) : (
                        <img src={el} alt={indx} />
                      );
                    })}

                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default WorkerTools;
