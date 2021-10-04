import React, { useContext, useState,useRef, useEffect } from 'react'
import { LoginContext } from '../../context/Auth'
import io from 'socket.io-client'
import cookie from 'react-cookies'
function Resever(props) {
    
    const context = useContext(LoginContext);

    const [ message, setMessage ] = useState('')
    const [ chat, setChat ] = useState([])
	const socketRef = useRef()
  
    
   
    let workerID=Number(cookie.load('userID'));
    let clintID=Number(localStorage.getItem('clientID'));
    console.log('clintID----->>>',context);

    useEffect(

        () => {
           
            
			socketRef.current = io.connect("https://craft-service.herokuapp.com/messanger")
            socketRef.current.emit('sendWorkerID',workerID,clintID)
             socketRef.current.emit('get_all');
			 socketRef.current.on('chore', msg=> {
                if (!chat.includes(msg.payload)) {
                    setChat([...chat, msg.payload])
                    
                console.log(chat);
                console.log('msg-->', msg);
                console.log('222222');
                }
                
               
            })
			
            
			return () => socketRef.current.disconnect()
			
		},
		[ chat ,[]]
    )

    const  onTextChange=(e)=>{
        setMessage(e.target.value)
    }

    const onMessageSubmit = async(e) => {
        e.preventDefault()
        let msgdata=[message,workerID,clintID] 
        await socketRef.current.emit("responsMsg",msgdata)
		await setChat([ ...chat, message ])
		
		
	
	}

 

    const renderChat = () => {
		return chat.map((message, index) => (
			<div key={index}>
				<h3>
					<span>{message}</span>
				</h3>
			</div>
		))
	}


    return (
        <>
        <form onSubmit={onMessageSubmit}>
		
        <div>
            <input type="text"  name="name" onChange={onTextChange}/>
            
        </div>
        <button>send</button>
    </form>

        <div>
            {renderChat()}
        </div>
        </>
    )
}

export default Resever
