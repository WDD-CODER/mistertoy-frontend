import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';

export function AppFooter() {
  return (
    <Container sx={{ textAlign: 'center' , border:'1px solid black', margin:'1em', backgroundColor:'secondary.main'}}>
        <Typography  variant='h4' sx={{width:'auto' ,color:'primary.main',}}> My Toy Shope </Typography>
    </Container>
  );
}