import React, { useContext, useState } from 'react'
import { LoginContext } from '../../context/Auth'


function ViewProfile(props) {
  /*
  :::functions::: 
  - useEffect async 
    - get data endPoint( get,"/workerForClient/:id")information that the client will see it  
  
  ::: information ::: display :::
  - data from api
  - button add to fav 
  
  */
  const Api = "https://craft-service.herokuapp.com";
  const context = useContext(LoginContext);

  // const [show, setShow] = useState(true),
  //   handelclick = (e) => {
  //     //  setShow(false);
  //   }
 
  const handelclick= async(id)=>{
    // await context.setSocketid(id)
    console.log(id);
  }
  return (
    
    <div>
      <p>{context.list.username}</p>
      <p>{context.list.id}</p>
      <p>
        {context.list.firstName} {context.list.lastName}
      </p>
      <p>{context.list.workType}</p>
      <p>{context.list.location}</p>
      {

        context.list2.profilePicture && context.list2.profilePicture.includes('upload')?
          <img src={`${Api}/${context.list2.profilePicture}`} />

          : <img src={context.list2.profilePicture} />
      }
      <button onClick={()=>{handelclick(context.list.id)}}>start conversation</button>
    </div>
  )
}

export default ViewProfile
