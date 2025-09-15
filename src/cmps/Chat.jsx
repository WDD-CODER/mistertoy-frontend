import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

export function Chat() {
//TODO לסדר פה שיוסיף לצעצעוע את ההודעות הללו!?
    const [msgs, setMsgs] = useState([])
    const [userInput, setUserInput] = useState('')
    const msgsRef = useRef()

    useEffect(() => {
        if (msgsRef.current) {
            msgsRef.current.scrollTo({
                top: msgsRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [msgs])

    function addMsg(text, from) {
        const newMsg = {
            id: Date.now(),
            text,
            from,
            timeStamp: new Date().toLocaleTimeString()
        }
        setMsgs(prevMsg => [...prevMsg, newMsg])
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!userInput) return

        addMsg(userInput, 'user')

        setTimeout(() => {
            addMsg(`Sure thing honey`, 'Support')
        }, 1000)

        setUserInput('')
    }

    return (
        <Container className="chat-container">
            <Stack gap={2} ref={msgsRef} className="chat-msgs">
                {msgs.map(msg => {
                    return <Box key={msg.id} className={`message ${msg.from === 'user' ? 'user' : 'other'}`}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography fontSize={10} color="green" className="timestamp">{msg.timeStamp}</Typography >
                            <Typography fontSize={12} color={msg.from === 'user' ? 'blue' : 'red'} variant="body2">{msg.from === 'user' ? 'You' : msg.from} </Typography>
                            <Typography variant="body1">{msg.text}</Typography>
                        </Paper>
                    </Box>
                })}
            </Stack>
            <Stack gap={1} marginTop={2} direction="column" className="chat-input-form" >
                <TextField
                    type="text"
                    value={userInput}
                    onChange={(ev) => setUserInput(ev.target.value)}
                    placeholder="Type your message..."
                />
                <Button variant="contained" type="submit" onClick={handleSubmit}>Send</Button>
            </Stack>
        </Container>
    )
}