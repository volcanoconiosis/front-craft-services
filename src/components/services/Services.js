import { useEffect, useState } from "react";
import axios from "axios";
function Services() {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  const Api = "https://craft-service.herokuapp.com";
  /* 
    :::functions::: 
    - useEffect async 
      - get all workers ( get,"/getAllWorkers") personal information ... workType
      - get all data( get,"/getWorkersData")the arrays for worker we will loop ... 
    
      
    ::: information ::: display :::
    - slide for workers 
    - show the works that the did it 
    - option for filter with type of works that we have 
    - card for showing the workers button add to fav 
    - another filter for  
      - loction   
      - workType 

    ::: links :::   dont forget Routes to transform between pages
     */
    

  useEffect(() => {
   axios.get(`${Api}/getAllWorkers`).then((res) => {
      setList(res.data);
      console.log('dddddddddddddddddddddd',res.data);
    });
   axios.get(`${Api}/getWorkersData`).then((res) => {
      setList2(res.data);
      console.log('ssssssssssss',res.data);
    });
    

  }, []);

  return (
    <div>
      {list.length>0&&list2.length>0&&
      list.map((item) => {
      let oo=  list2.find(o => o.userId === item.id)
        return (
          <>  

          {
            
          oo.profilePicture.includes('upload')?
          <img src={`${Api}/${oo.profilePicture}`} / >

            :<img src={oo.profilePicture} / >
          }
           
            <p>{item.username}</p>
            <p>{item.id}</p>
            <p>
              {item.firstName} {item.lastName}
            </p>
            <p>{item.workType}</p>
            <p>{item.location}</p>
            <hr />
          </>
        );
      })}
    </div>
  );
}

export default Services;
