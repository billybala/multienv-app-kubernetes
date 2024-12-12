import React from 'react';
import { 
  Box,
    Container,
    Paper,
    Stack,
  } from '@mui/material';

const SharedContent = () => {
  return (
    <Container maxWidth='sm' sx={{ pt: '2%', flex: 1 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Paper elevation={3} sx={{ p: 1, backgroundColor: '#333' }}>
            <img src="/shared/react-logo.svg" alt="React Logo" style={{ width: '150px', height: 'auto' }} />
          </Paper>
          </Box>
      </Stack>
    </Container>
  )
}

export default SharedContent;
