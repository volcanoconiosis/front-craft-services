import React, {  useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import cookie from 'react-cookies'
import '../chats/chat.css'
import {Container,Col,Row,Button}from 'react-bootstrap'

function Chat(props) {
    


    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const socketid=cookie.load("socketid")
    const socketRef = useRef()
    const userID = cookie.load('userID')
    let workerID = Number(socketid);
    let clintID = Number(userID);
    // cookie.save("clientIDWorker",clintID)
    localStorage.setItem('clientID', clintID)

    const Api="https://craft-service.herokuapp.com";
  const role=cookie.load("user")
  const list=cookie.load("list")
  const list2=cookie.load("list2")
  const token=cookie.load("token")
  const reqBody={
    id: list.id,
        userId: list2.userId,
        username: list.username,
        firstname: list.firstName,
        workType: list.workType,
        location: list.location,
        lastname: list.lastName,
        profilePicture: list2.profilePicture,
  }

    console.log('fat7e-->', workerID);
    useEffect(

        () => {


            // console.log('useEffect is worek');
            socketRef.current = io.connect("https://craft-service.herokuapp.com/messanger")
            socketRef.current.emit('sendClientID', clintID, workerID)
            socketRef.current.emit('get_all_2');
            socketRef.current.on('chore_2', msg => {
                if (!chat.includes(msg.payload)) {
                    setChat([...chat, msg.payload])

                    // console.log(chat);
                    // console.log('msg-->', msg);
                    // console.log('222222');
                }
                // console.log('otside if ');
            })
            console.log('user------>>>>', clintID);
            return () => socketRef.current.disconnect()

        },

        [chat, []]
    )

    const onTextChange = (e) => {
        setMessage(e.target.value)
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()
        console.log('worker-id-->', socketid);
        console.log('message-->', message);
        let msgdata = [message, clintID, workerID]
        await socketRef.current.emit("new_chore", msgdata)
        await setChat([...chat, message])
        console.log('chat-->', chat);
        console.log('clintID-->', clintID);
        console.log('workerID-->', workerID);
        console.log('msg-->', message);
        if(role==="user"){
            let respose = await axios.get(`${Api}/clientData`, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              });
              let array = respose.data[0].recently.map((item) =>
          item.userId === reqBody.id ? true : false
        );
        if (array.includes(true)) {
            console.log("incloudes true")
          }else{
            await axios.post(`${Api}/client/recently`,reqBody, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              })
              
          }
            
          }else if(role==="worker"){
            let respose = await axios.get(`${Api}/worker`, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              });
              let array = respose.data[0].recently.map((item) =>
          item.userId === reqBody.id ? true : false
        ); 

        if (array.includes(true)) {
           console.log("incloudes true")
          } else{
            await axios.post(`${Api}/worker/recently`,reqBody, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              })
              
            }
          }
            
        e.target.reset()
        // context.setUserid(clintID)

    }
    



    const renderChat = () => {
        return (<div className="chatbox">
            <div className="chatlogs">
                <div className="chat">

                    {
                        chat.map((message, index) => (
                            <div key={index} >
                                
                                {index%2==0? 
                               <> <div className="user-photo"> </div>
                                <p className="chat-message">
                                    {message}
                                </p></>: 
                                <> <div className="user-photo2"> </div>
                                <p className="chat-message2">
                                    {message}
                                </p></>
                                
                                }
                               
                            </div>
                        ))
                    }

                </div>
            </div>
            <form onSubmit={onMessageSubmit} className="chat-form">
                    <Container>
                        <Row className='mt-4'>
                            <Col xs={10}><textarea name="name" onChange={onTextChange}></textarea></Col>
                            <Col xs={2}><Button type="submit">Send</Button></Col>
                        </Row>
                    </Container>
                
            </form>

        </div>)

 
 

    
                }


    return (
        <div className="chat-div">
            <div>
                {renderChat()}
            </div>
        </div>
    )
}

export default Chat
