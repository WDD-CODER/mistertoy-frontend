import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PopUp } from "./PopUp";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.actions";
import { showSuccessMsg } from "../services/event-bus.service";


export function AppHeader() {

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    function onLogout() {
        logout()
        showSuccessMsg(' User logged out')
    }

    return (
        <AppBar position="static" sx={{ padding: 2, marginBottom: 1 }}>
            <Typography margin={0} variant="h2" sx={{ textAlign: 'center' }}>
                Mister Toy Shope
            </Typography>
            <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
                <Stack marginInlineEnd={'auto'} >
                    {!loggedinUser ?
                        <Button variant="contained" onClick={() => setIsLoginOpen(true)}> Login </Button>
                        :
                        <Box display={"flex"} gap={2} alignItems={"center"} className="logged-user">
                            <Typography>{loggedinUser.fullname}</Typography>
                            <Button variant="contained" onClick={onLogout}>logout</Button>
                        </Box>
                    }
                    
                </Stack>
                <Link to="/" className="btn" >Home</Link>
                <Link to="/toy" className="btn" >Toys</Link>
                <Link to="/toy/dashBoard" className="btn" >DashBoard</Link>
            </Toolbar>
            <PopUp
                onClose={() => setIsLoginOpen(false)}
                isOpen={isLoginOpen}
            >
                <LoginSignup setIsLoginOpen={setIsLoginOpen} />
            </PopUp>
        </AppBar>

    );
}