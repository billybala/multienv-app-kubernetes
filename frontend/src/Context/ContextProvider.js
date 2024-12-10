import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
export const MoviesContext = createContext();

// Crear el proveedor del contexto
export const ContextProvider = ({ children }) => {
  // Definir estados globales
  const [moviesDB, setMoviesDB] = useState([]);
  const [moviesCache, setMoviesCache] = useState([]);
  const [listToShow, setListToShow] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [DBConnectionState, setDBConnectionState] = useState('Disconnected');
  const [cacheConnectionState, setCacheConnectionState] = useState('Disconnected');
  const [environment, setEnvironment] = useState('');
  const [health, setHealth] = useState("Loading...");

  // Retornar estados globales compartidos entre todos los componentes
  return (
    <MoviesContext.Provider value={
        {
            moviesDB,
            setMoviesDB,
            moviesCache,
            setMoviesCache,
            listToShow,
            setListToShow,
            openModalAdd,
            setOpenModalAdd,
            DBConnectionState,
            setDBConnectionState,
            cacheConnectionState,
            setCacheConnectionState,
            environment,
            setEnvironment,
            health,
            setHealth,
        }
    }>
      {children}
    </MoviesContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
