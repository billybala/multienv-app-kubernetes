import React, { useEffect, useContext } from 'react';
import { 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Chip,
  Stack,
} from '@mui/material';
import { Global } from '../../../helpers/Global';
import { MoviesContext } from '../../../Context/ContextProvider';

const DatabaseConnectionSection = () => {
  const { DBConnectionState, setDBConnectionState } = useContext(MoviesContext);

  // Obtener el estado inicial cuando el componente se monta
  useEffect(() => {
    // Petición a la API para obtener el estado de la conexión a la base de datos
    fetch(Global.url + 'dbstatus')
      .then(response => response.json())
      .then(data => setDBConnectionState(data.mongoStatus))
      .catch(() => setDBConnectionState('Desconectado'));
  }, []);

  // Función para manejar la conexión a la base de datos
  const connectToDatabase = () => {
    // Petición a la API para conectarse a la base de datos
    fetch(Global.url + 'dbconnect', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => setDBConnectionState(data.mongoStatus))
      .catch(() => setDBConnectionState('Error'));
  };

  // Función para manejar la desconexión de la base de datos
  const disconnectFromDatabase = () => {
    // Petición a la API para desconectarse de la base de datos
    fetch(Global.url + 'dbdisconnect', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => setDBConnectionState(data.mongoStatus))
      .catch(() => setDBConnectionState('Error'));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', backgroundColor: '#333', color: 'white' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Conexión Base de Datos
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Estado Conexión:
            </Typography>
            <Chip 
              label={DBConnectionState === 'Conectando' ? 'Conectando...' : DBConnectionState}
              color={DBConnectionState === 'Conectado' ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
          
          <Stack spacing={2} direction="column">
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={connectToDatabase} 
                disabled={DBConnectionState !== 'Desconectado'}
              >
                Conectar
              </Button>
              <Button 
                variant="contained" 
                fullWidth
                onClick={disconnectFromDatabase} 
                disabled={DBConnectionState !== 'Conectado'}
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

export default DatabaseConnectionSection;