

import { io } from "socket.io-client"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service.js'

import { useState, useEffect } from "react"

export function UserMsg() {

    const [msg, setMsg] = useState(null)

    const socket = io()



    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(onCloseMsg, 1500)
        })
        
        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
            showSuccessMsg(`New review about me ${review.txt}`)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
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
