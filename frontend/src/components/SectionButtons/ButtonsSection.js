import React, { useContext, useEffect, useState } from 'react';
import { 
    Container,
    Button, 
    Paper,
    Stack,
} from '@mui/material';
import { Global } from '../../helpers/Global';
import { MoviesContext } from '../../Context/ContextProvider';
import AddModal from './components/AddModal';

const ButtonsSection = () => {
    const {
        moviesDB,
        setMoviesDB,
        setListToShow,
        setOpenModalAdd,
        environment,
        DBConnectionState,
        cacheConnectionState,
        setMoviesCache
    } = useContext(MoviesContext);

    const [isEmpty, setIsEmpty] = useState(true);

    // Obtención de las películas de la base de datos cuando carga la página
    useEffect(() => {
        const getMoviesFromDB = async () => {
            const request = await fetch(Global.url + "movies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await request.json();
    
            if (data.status === "Success") {
                setMoviesDB(data?.movies);
            }
        };
        getMoviesFromDB();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Método que muestra el modal para añadir una película
    const addMovie = () => {
        setOpenModalAdd(true);
    };

    // Método que muestra todas las películas de la base de datos
    const showAllMovies = async () => {
        // Petición a la API para obtener todas las películas de la base de datos
        const request = await fetch(Global.url + "movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === "Success") {
            setMoviesDB(data?.movies);
            setListToShow("db");
        }
    };

    // Método que guarda las películas en caché
    const saveInCache = async () => {
        // Petición a la API para guardar todas las películas de la base de datos en caché
        const request = await fetch(Global.url + "cache-movies");
        const cacheStatus = await request.json();

        if (cacheStatus.status === "Success" && !cacheStatus.isEmpty) {
            setIsEmpty(false);
        };
    }
    
    // Método que muestra las películas guardadas en caché
    const showMoviesInCache = async () => {
        // Petición a la API para obtener las películas guardadas en caché
        const request = await fetch(Global.url + "get-movies-from-cache");
        const data = await request.json();

        if (data.status === "Success") {
            setMoviesCache(data?.movies);
            setListToShow("cache");
        }
    };

    // Método que vacía la caché
    const emptyCache = async () => {
        // Petición a la API para vaciar la caché
        const request = await fetch(Global.url + "clear-cache", { method: 'DELETE' });

        const cacheStatus = await request.json();

        if (cacheStatus.status === "Empty") {
            setIsEmpty(true);
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 2, width: '100%', backgroundColor: '#333', color: 'white' }}>
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={addMovie}
                        disabled={DBConnectionState === "Desconectado"}
                    >
                        Añadir película
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={showAllMovies}
                        disabled={moviesDB.length === 0 || DBConnectionState === "Desconectado"}
                    >
                        Mostrar Películas de la BD
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={saveInCache}
                        disabled={environment !== 'production' || cacheConnectionState === 'Desconectado'}
                    >
                        Guardar Películas en Caché
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={showMoviesInCache}
                        disabled={environment !== 'production' || cacheConnectionState === 'Desconectado' || isEmpty}
                    >
                        Mostrar Películas En Caché
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={emptyCache}
                        disabled={environment !== 'production' || cacheConnectionState === 'Desconectado' || isEmpty}
                    >
                        Vaciar Caché
                    </Button>
                </Stack>
                <AddModal />
            </Paper>
        </Container>
    );
};

export default ButtonsSection;