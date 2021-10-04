import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {LoginContext} from "../../context/Auth"
function Services() {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [filterlist, setFilterlist] = useState([]);
  const [worktype, setWorktype] = useState('');
  const context= useContext(LoginContext)

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
      setFilterlist(res.data)
      console.log('dddddddddddddddddddddd', res.data);
    });
    axios.get(`${Api}/getWorkersData`).then((res) => {
      setList2(res.data);
      console.log('ssssssssssss', res.data);
    });
    

  }, []);

  const handleChange = (e) => {
    setWorktype(e.target.value)
  }

  const handelSubmit=(e)=>{
    e.preventDefault();
    if (worktype==='all') {
      setFilterlist(list)
    }else{let filter = list.filter(item => {
      return item.workType === worktype ? item.workType : ''
    })
    console.log('worType-->',worktype);
    console.log('filter-->', filter);
    setFilterlist(filter);}
    
  }
  const handelclick= async(item,oo)=>{
    await context.setList(item)
    await context.setList2(oo)
    console.log('oo-->',oo);
    console.log('list22-->',context.list2);
    console.log('list-->',context.list);
     context.setSocketid(oo.userId)
  }

  return (
    <div>
      <form onSubmit={handelSubmit}>
      <label>filter by work type</label> 
      <select name="workType" onChange={handleChange} placeholder="workType">
        <option value="all" name="all">all</option>
        <option value="moserje" name="moserje">moserje</option>
        <option value="khrabje" name="khrabje"> khrabje</option>
        <option value="bleet" name="bleet">bleet</option>
        <option value="dheen" name="dheen">dheen</option>
      </select>
      <button>click</button>
    </form>
    <br></br>

      {list.length > 0 && list2.length > 0 &&
        filterlist.map((item) => {
          let oo = list2.find(o => o.userId === item.id)

          return (
            <>
              
              {

                oo.profilePicture.includes('upload') ?
                  <img src={`${Api}/${oo.profilePicture}`} />

                  : <img src={oo.profilePicture} />
              }

              <p>{item.username}</p>
              <p>{item.id}</p>
              <p>
                {item.firstName} {item.lastName}
              </p>
              <p>{item.workType}</p>
              <p>{item.location}</p>
              <button onClick={()=>{handelclick(item,oo)}}>View Profile</button>
              
              
              <hr />
            </>
          );



        })}
    </div>
  );
}

export default Services;
