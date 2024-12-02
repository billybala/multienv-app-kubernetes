import React, { useContext } from "react";
import { 
    Box,
    Typography,
    Button, 
    Paper,
    Stack,
} from '@mui/material';
import { MoviesContext } from '../../../../Context/ContextProvider';
import { Global } from "../../../../helpers/Global";

const ListDB = () => {
    const { moviesDB } = useContext(MoviesContext);

    // Método que elimina una película de la base de datos
    const deleteMovie = async (movieId) => { 
        // Petición a la API para eliminar la película con el id especificado de la base de datos
        const request = await fetch(Global.url + "movie/" + movieId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === "Success") {
            
        }
    };

    return (
        moviesDB?.map(movie => {
            return (
                <Paper key={movie?._id} elevation={3} sx={{ p: 2, flex: '1 1 30%', maxWidth: '30%', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Stack direction="column" textAlign="center" paddingBottom={2}>
                            <Typography variant="h5">{movie?.title}</Typography>
                            <Typography variant="body1">{movie?.content}</Typography>
                        </Stack>
                    </Box>
                    <Stack spacing={2} direction="column">
                        <Stack direction="row" spacing={2}>
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={() => deleteMovie(movie?._id)}
                            >
                                Borrar película
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            )
        })
    );
};

export default ListDB;
