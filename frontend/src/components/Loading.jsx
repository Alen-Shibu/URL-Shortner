import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const Loading = ({children}) => {

    const [serverAwake, setServerAwake] = useState(false)
    const [wakeError, setWakeError] = useState(false)
    const [wakeMessage, setWakeMessage] = useState('Connecting to server...')

    useEffect(()=>{
        let messageTimer;

        messageTimer = setTimeout(()=>{
            setWakeMessage('Waking up the server, this can take up to a minute on first load...')
        },5000)

        const pingServer = async() => {
            try {
                await axios.get(`${API_BASE_URL}/health`,{timeout : 60000})
                setServerAwake(true)
            } catch (error) {
                console.log(error)
                setWakeError(true)
            } finally{
                clearTimeout(messageTimer)
            }
        }

        pingServer()

        return () => clearTimeout(messageTimer)

    },[])

        if (!serverAwake) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        {wakeError ? (
            <>
            <p className="text-error font-medium">Couldn't reach the server.</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Retry
            </button>
            </>
        ) : (
            <>
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-600">{wakeMessage}</p>
            </>
        )}
        </div>
    )
    }

  return children
}

export default Loading
