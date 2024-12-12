import React, { useContext, useEffect } from 'react'
import { 
    Stack,
    Container,
    Box,
    Paper,
    Typography,
  } from '@mui/material';
import { Global } from '../../helpers/Global';
import { MoviesContext } from '../../Context/ContextProvider';

const HealthSection = () => {
  const { health, setHealth } = useContext(MoviesContext);

  useEffect(() => {
    const getHealthStatus = async () => {
      const request = await fetch(Global.url + "health");
      const data = await request.json();      
        setHealth(data.status);
    };
    getHealthStatus();
  }, []);

  return (
    <Container maxWidth="xs" sx={{ pt: '2%', flex: 1 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ display: "flex", justifyContent: 'center', alignItems: 'stretch' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
          <Paper elevation={3} sx={{ p: 1, maxWidth: 400, width: '100%', backgroundColor: '#333', color: 'white' }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              <b>Status: </b>
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom align="center" color={health === 'OK' ? 'success' : 'error'}>
              {health}
            </Typography>
            </div>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}

export default HealthSection;
