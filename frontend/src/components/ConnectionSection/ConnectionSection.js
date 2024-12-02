import { 
  Stack,
  Container,
} from '@mui/material';
import DatabaseConnectionSection from './components/DatabaseConnectionSection';
import CacheConnectionSection from './components/CacheConnectionSection';
import { useContext, useEffect } from 'react';
import { MoviesContext } from '../../Context/ContextProvider';
import { Global } from '../../helpers/Global';

const ConnectionSection = () => {
  const { setEnvironment } = useContext(MoviesContext);

  // Obtención del entorno (dev o pro) cuando el componente se monta
  useEffect(() => {
      fetch(Global.url + 'environment')
        .then(response => response.json())
        .then(data => setEnvironment(data.environment))
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
        <Container maxWidth='lg'>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ display: "flex", justifyContent: 'center', alignItems: 'stretch' }}
          >
            <Container maxWidth='md' sx={{ p: '5%', flex: 1 }}>
              <DatabaseConnectionSection />
            </Container>
            <Container maxWidth='md' sx={{ p: '5%', flex: 1 }}>
              <CacheConnectionSection />
            </Container>
          </Stack>
        </Container>
  );
}

export default ConnectionSection;