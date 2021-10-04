import React, { useContext, useState, useRef, useEffect } from 'react'
import { LoginContext } from '../../context/Auth'
import io from 'socket.io-client'
import cookie from 'react-cookies'
import '../chats/chat.css'
import {Container,Col,Row,Button}from 'react-bootstrap'

function Testchat(props) {
    const context = useContext(LoginContext);


    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    const socketRef = useRef()
    const userID = cookie.load('userID')
    let workerID = Number(context.socketid);
    let clintID = Number(userID);
    localStorage.setItem('clientID', clintID)

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
        console.log('worker-id-->', context.socketid);
        console.log('message-->', message);
        let msgdata = [message, clintID, workerID]
        await socketRef.current.emit("new_chore", msgdata)
        await setChat([...chat, message])
        console.log('chat-->', chat);
        console.log('msg-->', message);
        context.setUserid(clintID)

    }



    const renderChat = () => {
        return (<div className="chatbox">
            <div className="chatlogs">
                <div className="chat">

                    {
                        chat.map((message, index) => (
                            <div key={index} >
                                <div className="user-photo"> </div>
                                <p className="chat-message">
                                    {message}
                                </p>
                            </div>
                        ))
                    }

                </div>
            </div>
            <form onSubmit={onMessageSubmit} className="chat-form">
                    <Container>
                        <Row className='mt-4'>
                            <Col xs={10}><textarea name="name" onChange={onTextChange}></textarea></Col>
                            <Col xs={2}><Button>Send</Button></Col>
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

export default Testchat
