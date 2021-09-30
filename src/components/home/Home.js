import React, { useState } from 'react'

function Home() {
    /* 

     ::: main :::
    - talk about the site 
    - why to use it 
    - show the fetures 
    - how its work 
    - how can you use it 


    ::: functions ::: 
    - useEffect async 
      - get all workers ("/getAllWorkers") personal information ... workType
    */
   const [list,setList]=useState([])
    useEffect(() => {
       console.log(sss)
       setList(...list,{kk})
    },[])
    return (
        <div>

        </div>
    )
}

export default Home
