import React, { useContext } from "react";
import { 
    Box,
    Typography, 
    Paper,
    Stack,
} from '@mui/material';
import { MoviesContext } from '../../../../Context/ContextProvider';

const ListCache = () => {
    const { moviesCache } = useContext(MoviesContext);

    return (
        moviesCache?.map(movie => {
            return (
                <Paper key={movie?._id} elevation={3} sx={{ p: 2, flex: '1 1 30%', maxWidth: '30%', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Stack direction="column" textAlign="center" paddingBottom={2}>
                            <Typography variant="h5">{movie?.title}</Typography>
                            <Typography variant="body1">{movie?.content}</Typography>
                        </Stack>
                    </Box>
                </Paper>
            )
        })
    );
};

export default ListCache;
