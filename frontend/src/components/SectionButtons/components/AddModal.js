import React, { useState, useContext } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Global } from '../../../helpers/Global';
import { MoviesContext } from '../../../Context/ContextProvider';

const AddModal = () => {
    const { openModalAdd, setOpenModalAdd } = useContext(MoviesContext);

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    // Método que cierra el modal sin guardar nada en la base de datos
    const handleClose = () => {
        setOpenModalAdd(false);
    }

    // Método que agrega una película a la base de datos
    const handleAddMovie = async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        let newData = {
            title: newTitle,
            content: newContent
        };
        
        // Petición a la API para agregar la película a la base de datos
        const request = await fetch(Global.url + "create", {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json",
            }
        });
    
        const data = await request.json();
    
        if (data.status === "Success") {
            alert("Película agregada con éxito");
        }

        setOpenModalAdd(false);
    }

    return (
        <Dialog open={openModalAdd} onClose={handleClose}>
            <DialogTitle>Añadir Película</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Introduce los detalles de la película.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Movie Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Movie Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                    onChange={(e) => setNewContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleAddMovie}>Añadir</Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddModal;
