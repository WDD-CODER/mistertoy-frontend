

import { io } from "socket.io-client"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_REVIEW_ABOUT_YOU_REMOVED } from '../services/socket.service.js'

import { useState, useEffect } from "react"

export function UserMsg() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(onCloseMsg, 1500)
        })
        
        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
            showSuccessMsg(`New review about me ${review.txt}`)
        })
        
        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU_REMOVED, review => {
            showSuccessMsg(`review about me ${review.txt} Removed`)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU_REMOVED)
        }
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <section className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
        </section>
    )
}
