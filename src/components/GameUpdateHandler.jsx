import React, { useState } from 'react';

import SockJsClient from 'react-stomp';

const GameUpdateHandler = (props) => {
  const { onGameUpdated } = props;
  const [topics, setTopics] = useState([]);

  const onSocketConnected = () => {
    console.log('web socket connected');
    setTopics(['/topic/game-updated']);
  };

  const onGameMessageReceived = (game) => {
    console.log('web socket game updated message received', game);
    onGameUpdated(game);
  };

  return (
    <SockJsClient
      url={'http://localhost:3002/v1/game-events'}
      topics={topics}
      onConnect={onSocketConnected}
      onDisconnect={console.log('web socket disconnected')}
      onMessage={(game) => onGameMessageReceived(game)}
      debug={false}
    />
  );
};
export default GameUpdateHandler;
