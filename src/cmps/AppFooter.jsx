import { Container, Typography } from '@mui/material';

export function AppFooter() {
  return (
    <Container className='full'  sx={{padding:'.5em', textAlign: 'center' , border:'1px solid black', backgroundColor:'secondary.main'}}>
        <Typography variant='h6' sx={{color:'primary.main',}}> Mister Toy Shope  Created By DanDan Weibren</Typography>
    </Container>
  );
}