/* eslint-disable react/prop-types */
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';
import './Chat.css';
//Conexión para escuchar y enviar eventos
const socket = io(VITE_API_BASE);

function Chat({ nickname }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);
  const [firstTime, setFirstTime] = useState(false);
  const userEmail = nickname;

  const url = VITE_API_BASE + `/chat`;
  // 'https://connectifyback-dp-production.up.railway.app/chat/';

  useEffect(() => {
    if (!firstTime) {
      fetchStoredMessages();
      setFirstTime(true);
    }
    const receivedMessage = (message) => {
      //console.log(message)
      setMessages([message, ...messages]);
    };
    socket.on('message', receivedMessage);

    //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
    return () => {
      socket.off('message', receivedMessage);
    };
  }, [messages]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('message', message, nickname);
      //Nuestro mensaje
      const newMessage = {
        body: message,
        from: 'Yo',
      };
      //Añadimos el mensaje y el resto de mensajes enviados
      setMessages([newMessage, ...messages]);
      //Limpiamos el mensaje
      setMessage('');

      //Petición http por POST para guardar el artículo:
      axios.post(url + `/save`, {
        message: message,
        from: userEmail,
      });
    } else {
      window.alert('No puede enviar mensajes vacíos');
    }
  };

  const fetchStoredMessages = async () => {
    const { data } = await axios.get(url + `/messages`);
    setStoredMessages(data);
    console.log(storedMessages);
  };

  return (
    <div className="chat-container">
      <div
        className="card"
        style={{ maxWidth: '600px', maxHeight: '600px', overflow: 'auto' }}
      >
        <h5 className="text-center mb-3">CHAT</h5>
        <div
          id="content-chat"
          className="card-body"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.from === 'Yo' ? 'user-message' : 'other-message'
              }`}
            >
              <div className="chat-bubble">
                <small>
                  {message.from}: {message.body}
                </small>
              </div>
            </div>
          ))}
          <div className="card-body"></div>
          <small className="text-muted">Anteriores mensajes...</small>
          {storedMessages ? (
            storedMessages.length === 0 ? (
              <p>Cargando mensajes...</p>
            ) : (
              storedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.from === nickname ? 'user-message' : 'other-message'
                  }`}
                >
                  <div className="chat-bubble">
                    <small className="text-muted">
                      {message.from}: {message.message}
                    </small>
                  </div>
                </div>
              ))
            )
          ) : (
            <p>Cargando mensajes...</p>
          )}
        </div>
        <form onSubmit={handlerSubmit} className="form-chat">
          <input
            type="text"
            className="form-control"
            placeholder="Mensaje..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="btn btn-success mx-3" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
