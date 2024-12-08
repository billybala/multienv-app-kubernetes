import React, { useEffect, useState } from 'react'
import { 
    Stack,
    Container,
    Box,
    Paper,
    Typography,
  } from '@mui/material';
  import { Global } from '../../helpers/Global';

const InstanceSection = () => {
  const [instanceId, setInstanceId] = useState('');
  useEffect(() => {
    fetch(Global.url + "instance")
      .then(response => response.json())
      .then(data => {
        setInstanceId(data?.instanceId);
      })
      .catch(error => console.log(error));
  }, []);
  
  return (
    <Container maxWidth="md" sx={{ pt: '2%', flex: 1 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ display: "flex", justifyContent: 'center', alignItems: 'stretch' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Paper elevation={3} sx={{ p: 1, backgroundColor: '#333', color: 'white' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              <b>Instancia:</b><br/> {instanceId}
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}

export default InstanceSection;
