import React, { useContext, useEffect } from 'react';
import { 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Chip,
  Stack,
} from '@mui/material';
import { MoviesContext } from '../../../Context/ContextProvider';
import { Global } from '../../../helpers/Global';

const CacheConnectionSection = () => {
  const { cacheConnectionState, setCacheConnectionState, environment } = useContext(MoviesContext);

  // Función para manejar la conexión a la caché
  const connectToCache = () => {
    // Petición a la API para conectar a la caché
    fetch(Global.url + 'connect-redis', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => setCacheConnectionState(data.redisStatus))
      .catch(() => setCacheConnectionState('Desconectado'));
  };

  // Función para manejar la desconexión de la caché
  const disconnectFromCache = () => {
    // Petición a la API para desconectar de la caché
    fetch(Global.url + 'disconnect-redis', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => setCacheConnectionState(data.redisStatus))
      .catch(() => setCacheConnectionState('Desconectado'));
  };

  // Obtener el estado inicial de la caché cuando el componente se monta
  useEffect(() => {
    fetch(Global.url + 'redis-status')
      .then(response => response.json())
      .then(data => setCacheConnectionState(data.redisStatus))
      .catch(() => setCacheConnectionState('Desconectado'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', backgroundColor: '#333', color: 'white' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Conexión Caché
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Estado Conexión:
            </Typography>
            <Chip 
              label={cacheConnectionState === 'Conectando' ? 'Conectando...' : cacheConnectionState}
              color={cacheConnectionState === 'Conectado' ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
          
          <Stack spacing={2} direction="column">
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={connectToCache} 
                disabled={environment !== 'production' || cacheConnectionState !== 'Desconectado'}
              >
                Conectar
              </Button>
              <Button 
                variant="contained" 
                fullWidth
                onClick={disconnectFromCache} 
                disabled={environment !== 'production' || cacheConnectionState !== 'Conectado'}
              >
                Desconectar
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}

export default CacheConnectionSection;