import { AppBar, Container, Typography } from '@mui/material';

export function AppFooter() {
  return (
    <AppBar className="full" sx={{position:'static' ,padding: 1, borderRadius: 1, textAlign: 'center', border: '1px solid black', backgroundColor: 'secondary.main' }}>
      <Typography variant='h6' sx={{ color: 'primary.main', }}> Mister Toy Shope  Created By DanDan Weibren</Typography>
    </AppBar>
  );
}