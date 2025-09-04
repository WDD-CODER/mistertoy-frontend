import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function AppHeader() {

    return (
        <AppBar position="static" sx={{ padding: 2, marginBottom: 1 }}>
            <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
                Mister Toy Shope
            </Typography>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Link to="/" className="btn" >Home</Link>
                <Link to="/toy" className="btn" >Toys</Link>
                <Link to="/toy/dashBoard" className="btn" >DashBoard</Link>
                <Link to="/parts" className="btn" >parts mui</Link>
            </Toolbar>
        </AppBar>
    );
}