import React from 'react'
import { 
    Stack,
    Container,
    Box,
    Paper,
    Typography,
  } from '@mui/material';

const InstanceSection = () => {    
    return (
        <Container maxWidth="xs" sx={{ pt: '2%', flex: 1 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ display: "flex", justifyContent: 'right', alignItems: 'stretch' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
              <Paper elevation={3} sx={{ p: 1, maxWidth: 400, width: '100%', backgroundColor: '#333', color: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                  Instancia: {process.env.REACT_APP_INSTANCE_ID}
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Container>
    );
}

export default InstanceSection;
