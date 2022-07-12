import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = ( serverPath ) => {

    const socket = useMemo( () => io.connect( serverPath, {
        transports: ['websocket']
    } ), [ serverPath ] );
    const [ online, setonline ] = useState(false);

 useEffect(() => {
    setonline( socket.connected );
  }, [ socket ])
 
  
  useEffect(() => {
  socket.on('connect', () => {
   setonline( true );
  })
 }, [ socket ])
 
 
 useEffect(() => {
   socket.on('disconnect', () => {
    setonline( false );
   })
  }, [ socket ])


    return {
        socket,
        online
    }
}