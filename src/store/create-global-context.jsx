import { createContext, useContext } from 'react';

export const YoutubeContext = createContext();

export const useStoreContext = () => useContext(YoutubeContext);