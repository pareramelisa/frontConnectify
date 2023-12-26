/* eslint-disable react/prop-types */
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';
import './Chat.css';
// Conexión para escuchar y enviar eventos
const socket = io(VITE_API_BASE);

function Chat({ nickname, imageUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userColor] = useState(getRandomColor());
  const userEmail = nickname;

  const url = VITE_API_BASE + `/chat`;

  useEffect(() => {
    setMessages([]);
    fetchStoredMessages();

    // Listen for new messages
    const receivedMessage = (newMessage) => {
      // Add new messages to the end of the array
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on('message', receivedMessage);

    // Unsubscribe when the component is unmounted
    return () => {
      socket.off('message', receivedMessage);
    };
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      try {
        // Emitir el mensaje al socket
        socket.emit('message', message, nickname, imageUser);

        // Our message
        const newMessage = {
          body: message,
          from: 'Yo',
          image: imageUser, // Utilizar la imagen del usuario actual
        };

        // Agregar nuevos mensajes al final del array
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Clear the message input
        setMessage('');

        // HTTP request para guardar el mensaje y la imagen
        await axios.post(url + `/save`, {
          message: message,
          from: userEmail,
          image: imageUser, // Incluir la imagen en el cuerpo de la solicitud
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      window.alert('No puede enviar mensajes vacíos');
    }
  };

  const fetchStoredMessages = async () => {
    try {
      const { data } = await axios.get(url + `/messages`);

      // Ordenar mensajes por tiempo (timestamp)
      const sortedMessages = data.sort((a, b) => a.timestamp - b.timestamp);

      // Limpiar y actualizar el estado con mensajes ordenados
      setMessages([...sortedMessages]);
    } catch (error) {
      console.error('Error fetching stored messages:', error);
    }
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="chat-container">
      <div
        className="card"
        style={{ maxWidth: '800px', maxHeight: '800px', overflow: 'auto' }}
      >
        <h5 className="text-center mb-3">CHAT</h5>
        <div
          id="content-chat"
          className="card-body"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.from === 'Yo' ? 'user-message' : 'other-message'
              }`}
              style={{
                backgroundColor: message.from === 'Yo' ? userColor : '',
              }}
            >
              <div className="chat-bubble">
                <div className="user-info">
                  <img
                    src={message.image}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <span className="user-nickname">{message.from}</span>
                </div>
                <small className="text-muted">
                  {message.body || message.message}
                </small>
              </div>
            </div>
          ))}
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
