import {useContext, useEffect, useState} from "react";
import {UserContext} from './UserContext'

export default function Notification({message}: { message: string }){

    const [hidden, setHidden] = useState(false)

    useEffect(() => {
      setTimeout(() => {
          setHidden(true)
      },2000)
    },[])

    const userData = useContext(UserContext);

    return (
        <div className='notification-wrap'>
            <div className={userData?.isDarkTheme ? 'notification dark' : 'notification'} hidden={hidden} onClick={() => setHidden(true)}>{message}</div>
        </div>
    )
}