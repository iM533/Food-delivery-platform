import {useEffect, useState} from "react";

export default function Notification({message}: { message: string }){

    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setTimeout(() => {
          setVisible(true)
      },2000)
    },[])

    return (
        <div className='notification-wrap'>
            <div className='notification' hidden={visible} onClick={() => setVisible(true)}>{message}</div>
        </div>
    )
}