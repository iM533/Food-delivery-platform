import {useEffect, useState} from "react";

export default function Notification({message}: { message: string }){

    const [hidden, setHidden] = useState(false)

    useEffect(() => {
      setTimeout(() => {
          setHidden(true)
      },2000)
    },[])

    return (
        <div className='notification-wrap'>
            <div className='notification' hidden={hidden} onClick={() => setHidden(true)}>{message}</div>
        </div>
    )
}