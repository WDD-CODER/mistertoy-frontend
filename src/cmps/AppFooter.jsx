import { Container, Typography } from '@mui/material';

export function AppFooter() {
  return (
    <Container  sx={{padding:'.5em', textAlign: 'center' , border:'1px solid black', backgroundColor:'secondary.main'}}>
        <Typography variant='h6' sx={{color:'primary.main',}}> Mister Toy Shope <br /> Created By DanDan Weibren</Typography>
    </Container>
  );
}