import { useContext } from "react";
import { LoginContext } from "../../../context/Auth";

function PersonalInformation() {
  const Api = "https://craft-service.herokuapp.com";
  const context = useContext(LoginContext);
  return (
    <>
      <div>
        <h1>rendaring .....</h1>
        <p>{context.list.username}</p>
        <p>{context.list.id}</p>
        <p>
          {context.list.firstName} {context.list.lastName}
        </p>
        <p>{context.list.workType}</p>
        <p>{context.list.location}</p>
        <p> bio:{context.list2.bio}</p>
        {context.list.profilePicture &&
        context.list.profilePicture.includes("upload") ? (
          <img src={`${Api}/${context.list.profilePicture}`} />
        ) : (
          <img src={context.list.profilePicture} />
        )}
      </div>
    </>
  );
}

export default PersonalInformation;
