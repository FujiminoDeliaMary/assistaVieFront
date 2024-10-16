import React, { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Chat = (props) => {
  const { typeChat, fontSize } = props;

  const [messages, setMessages] = useState([]);
  const [isVocal, setIsVocal] = useState(false);
  const [isSOS, setIsSOS] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Vérifier si le navigateur supporte la reconnaissance vocale
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setSpeechRecognitionSupported(false);
    }
  }, [browserSupportsSpeechRecognition]);

  // Fonction pour envoyer le message à l'API
  const sendMessage = useCallback(async (messageText, isVocalMode = false) => {
    const endpoint = typeChat;

    try {
      const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          isVocal: isVocalMode,
        }),
      });

      const data = await response.json();

      // Ajouter la réponse de l'API au tableau des messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: data.response },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
    }
  }, [typeChat]);

  // Envoyer le message capté une fois que l'utilisateur a fini de parler
  useEffect(() => {
    if (!listening && transcript) {
      // Envoyer après la fin de la parole (quand la reconnaissance vocale s'arrête)
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: transcript },
      ]);

      sendMessage(transcript, true); // Envoyer le message capté
      resetTranscript(); // Réinitialiser le transcript après l'envoi
    }
  }, [listening, transcript, sendMessage, resetTranscript]);

  // Si la reconnaissance vocale n'est pas supportée, afficher un message
  if (!speechRecognitionSupported) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <ul className='w-full mt-7 flex flex-col gap-7 px-8 h-96 overflow-y-auto custom-scroll'>
        {messages.map((message, index) => {
          const isUser = message.sender === 'user';
          const listItemClass = isUser ? "self-start bg-myCustomColor-violet" : "self-end bg-myCustomColor-bleuC";

          return (
            <li
              style={{fontSize : fontSize}}
              key={index}
              className={`${listItemClass} max-w-[70%] px-4 py-5 rounded-md font-medium text-white`}
            >
              {message.text}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Chat;
