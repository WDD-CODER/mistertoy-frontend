import { AppBar, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { customTheme } from "../assets/style/theme/theme";

export function AppHeader() {

    return (
        <AppBar position="static" sx={{ padding: 2, marginBottom: 1 }}>
            {/* All h1 styling is handled by the theme */}
            <Typography margin={0} variant="h2" sx={{ textAlign: 'center' }}>
                Mister Toy Shope
            </Typography>
            <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
                <Link to="/" className="btn" >Home</Link>
                <Link to="/toy" className="btn" >Toys</Link>
                <Link to="/toy/dashBoard" className="btn" >DashBoard</Link>
                <Link to="/parts" className="btn" >parts mui</Link>
            </Toolbar>
        </AppBar>
    );
}