import React, { useContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import cookie from 'react-cookies'
import '../chats/chat.css'
import {Container,Col,Row,Button}from 'react-bootstrap'
import {ProfileContext} from "../../context/ProfileContext"
function Resever(props) {

    const context = useContext(ProfileContext);

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const socketRef = useRef()
    const msClient=cookie.load("chatCookieClient")


    let workerID = Number(cookie.load('userID'));
    let clintID = Number(localStorage.getItem('clientID'))

    useEffect(

        () => {


            socketRef.current = io.connect("https://craft-service.herokuapp.com/messanger")
            socketRef.current.emit('sendWorkerID', workerID, clintID)
            socketRef.current.emit('get_all');
            socketRef.current.on('chore', msg => {
                if (!chat.includes(msg.payload)) {
                    setChat([...chat, msg.payload])

                    console.log(chat);
                    console.log('msg-->', msg);
                    console.log('222222');
                }


            })


            return () => socketRef.current.disconnect()

        },
        [chat, []]
    )

    const onTextChange = (e) => {
        setMessage(e.target.value)
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()

        await context.setChatWorker(message)
        cookie.save("chatCookieWorker",message)


        // let msgdata = [message, workerID, clintID]
        // await socketRef.current.emit("responsMsg", msgdata)
        // await setChat([...chat, message])
        e.target.reset()


    }



    const renderChat = () => {
        return (<div className="chatbox">
            <div className="chatlogs">
                <div className="chat">

                    {/* {chat.map((message, index) => (
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
                    } */}
                    

<>
                     <div className="user-photo"> </div>
                                <p className="chat-message">
                                    {msClient}
                                </p>
                                <div className="user-photo2"> </div>
                                <p className="chat-message2">
                                {context.chatWorker}
                                </p>
                                </>

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
        </div>

        )


    }


    return (
        <div className="chat-div">
            <div>
                {renderChat()}
            </div>
        </div>
    )
}

export default Resever
