import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PopUp } from "./PopUp";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";


export function AppHeader() {

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    function onLogout() {

    }

    return (
        <AppBar position="static" sx={{ padding: 2, marginBottom: 1 }}>
            {/* All h1 styling is handled by the theme */}
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
                        </Box>}
                </Stack>
                <Link to="/" className="btn" >Home</Link>
                <Link to="/toy" className="btn" >Toys</Link>
                <Link to="/toy/dashBoard" className="btn" >DashBoard</Link>
                <Link to="/parts" className="btn" >parts mui</Link>
            </Toolbar>
            <PopUp
                onClose={() => setIsLoginOpen(false)}
                isOpen={isLoginOpen}
            >
                <LoginSignup />
            </PopUp>

        </AppBar>

    );
}