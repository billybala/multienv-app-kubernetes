import React, { useEffect, useState } from 'react';
import { 
    Stack,
    Container,
    Paper,
    Button,
  } from '@mui/material';
  import { Global } from '../../helpers/Global';

const SharedContentButtons = () => {
  const [documentExists, setDocumentExists] = useState(false);
  const [documentReady, setDocumentReady] = useState(false);

  const instanceId = process.env.REACT_APP_INSTANCE_ID;

  // Método para comprobar si el documento existe en el almacenamiento compartido al cargar la página por primera vez
  useEffect(() => {
    const checkDocumentExists = async () => {
      try {
        const request = await fetch(Global.url + "check-document-exists", {
          method: "GET",
        });

        const data = await request.json();

        if (data.exists) {
          setDocumentReady(true);
          setDocumentExists(true);
        } else {
          setDocumentReady(false);
          setDocumentExists(false);
        }
      } catch (error) {
        console.log("Error al comprobar si el documento existe");
      }
    };

    checkDocumentExists();
  }, []);

  // Método para crear el documento y guardarlo en el almacenamiento compartido
  const saveDocument = async () => {
    try {
      setDocumentReady(false);
      const request = await fetch(Global.url + "save-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instanceId })
      });

      const data = await request.json();

      if (data.status === "Success") {
        setTimeout(() => {
          setDocumentReady(true);
        }, 30000);
        setDocumentExists(true);
        alert("Documento guardado correctamente");
      }
    } catch (error) {
      alert("Error al guardar documento");
    }
  };

  // Método para descargar el documento creado
  const downloadDocument = async () => {
    try {
      const response = await fetch(Global.url + 'download-document', {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error("Error al descargar el documento");
      }

      // Convierte la respuesta a un blob y crea un enlace de descarga
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "db_snapshot.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error al descargar el documento");
    }
  };

  return (
    <Container maxWidth='sm' sx={{ pt: '2%', flex: 1 }}>
      <Paper elevation={3} sx={{ p: 1, maxWidth: 400, width: '100%', backgroundColor: '#333', color: 'white' }}>
        <Stack direction='row' spacing={2} sx={{ display: "flex", justifyContent: 'center', alignItems: 'stretch' }}>
          <Button
            variant="contained" 
            fullWidth
            onClick={saveDocument}
          >
            Guardar documento
          </Button>
          <Button
            variant="contained" 
            fullWidth
            onClick={downloadDocument}
            disabled={!documentExists || !documentReady}
          >
            {documentReady ? "Descargar documento" : "Esperando documento..."}
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default SharedContentButtons;
