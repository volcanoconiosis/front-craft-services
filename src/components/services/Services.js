import { useEffect, useState  } from "react";
import axios from "axios";
import "./services.css"
import "./SelectForm.css"
import RenderWorker from "./RenderWorker";
import {Row ,Col,Container} from "react-bootstrap"
function Services() {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [filterlist, setFilterlist] = useState([]);
 

  const Api = "https://craft-service.herokuapp.com";

  useEffect(async () => {
    await axios.get(`${Api}/getAllWorkers`).then((res) => {
      setList(res.data);
      setFilterlist(res.data);
    });
    await axios.get(`${Api}/getWorkersData`).then((res) => {
      setList2(res.data);
      console.log("ssssssssssss", res.data);
    });
  }, []);

  const handleChange = (e) => {
  
    let worktype=e.target.value
    
    if (worktype === "all"||worktype==="") {
      setFilterlist(list);
    } else  {
      let filter = list.filter((item) => {
        return item.workType === worktype ? item.workType : "";
      });
      console.log("worType-->", worktype);
      console.log("filter-->", filter);
      setFilterlist(filter);
    }
  };

 
  

  return (
    <div >
         <div className="services-div">
         <a style={{color:"white"}} id="uniqueid" > Home <i class="fas fa-angle-double-right" style={{color:"#03a9f4","&:hover":"red" }} ></i></a>
          <h2>Services <i class="fas fa-angle-double-right" style={{color:"#03a9f4"}}></i></h2>
       
        </div>
        <div className="services-div2">
            <h3> Our Services</h3>
            <h4>Customized Solution for Every Needed Services</h4>


        </div>
     
   <Container >
     <Row >
     <Col xs={4}></Col>
       <Col xs={4} style={{display:"flex",justifyContent:"center"}}>
      <div className="for-Work-type">
        <div class="select" >
           <select name="workType"  onChange={handleChange}>
              <option selected disabled>Choose the Work Type </option>
              <option value="all" name="all">All workers</option>
              <option value="moserje" name="moserje">Moserje</option>
              <option value="khrabje" name="khrabje">Khrabje</option>
              <option value="bleet" name="bleet">Bleet</option>
              <option value="dheen" name="dheen">Dheen</option>
           </select>
        </div>
        </div>
        </Col>
        <Col xs={4}></Col>
        </Row>


        </Container>
      

      <RenderWorker  filterlist={filterlist} list={list} list2={list2}/>



    </div>
  );
}

export default Services;
