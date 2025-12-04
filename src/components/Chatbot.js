import React, { useEffect, useRef, useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      text: "Bonjour! Je suis votre assistant virtuel pour les prédictions de rendement agricole. Comment puis-je vous aider aujourd'hui?", 
      sender: 'bot' 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

  
    try {
        // Envoi de la requête au backend
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: input })
        });
      
        // Vérifie si la réponse est correcte
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
      
        // Parse la réponse JSON
        const data = await response.json();
      
        // Ajoute la réponse du bot dans le chat
        setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Erreur lors de la communication avec le backend :', error);
      
        setMessages(prev => [
          ...prev,
          {
            text: "Désolé, j'ai rencontré un problème. Veuillez réessayer plus tard.",
            sender: 'bot',
            error: true
          }
        ]);
      } finally {
        // Met fin au chargement
        setIsLoading(false);
      }
      
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
      <div className="p-4 bg-green-600 text-white rounded-t-lg">
        <h3 className="font-bold">Assistant Agricole IA</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              } ${message.error ? 'bg-red-100 text-red-800' : ''}`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Posez votre question ici..."
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chatbot;