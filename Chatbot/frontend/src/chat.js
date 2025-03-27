import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaRobot, FaSmile, FaTimes, FaMicrophone, FaUserCircle, FaClock, FaBars, FaChevronLeft } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [recentChats, setRecentChats] = useState(["Hello!", "How are you?", "Tell me a joke"]);
 

  // useEffect(() => {
  //   if (!("webkitSpeechRecognition" in window)) {
  //     console.warn("Speech recognition not supported in this browser.");
  //     alert("Your browser does not support speech recognition. Please use Google Chrome.");
  //     return;
  //   }

  //   recognitionRef.current = new window.webkitSpeechRecognition();
  //   recognitionRef.current.lang = "en-US";
  //   recognitionRef.current.interimResults = false;
  //   recognitionRef.current.continuous = false;

  //   recognitionRef.current.onstart = () => {
  //     console.log("🎤 Speech recognition started...");
  //   };

  //   recognitionRef.current.onresult = (event) => {
  //     const transcript = event.results[0][0].transcript;
  //     setInput(transcript);
  //     console.log("📝 Recognized text:", transcript);
  //   };

  //   recognitionRef.current.onend = () => {
  //     console.log("🛑 Speech recognition ended.");
  //     setIsListening(false);
  //   };

  //   recognitionRef.current.onerror = (event) => {
  //     console.error("❌ Speech recognition error:", event.error);
  //     setIsListening(false);
      
  //     let errorMessage = "An unknown error occurred.";
  //     switch (event.error) {
  //       case "network":
  //         errorMessage = "🚨 Network error! Check your internet connection and try again.";
  //         break;
  //       case "audio-capture":
  //         errorMessage = "🎤 No microphone detected. Please check your mic settings.";
  //         break;
  //       case "not-allowed":
  //         errorMessage = "❌ Permission denied. Please allow microphone access.";
  //         break;
  //       case "aborted":
  //         errorMessage = "⚠️ Speech recognition aborted. Try again.";
  //         break;
  //       case "no-speech":
  //         errorMessage = "🔇 No speech detected. Please try speaking again.";
  //         break;
  //     }
  //     alert(errorMessage);
  //   };
  // }, []);
  

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported in this browser.");
      alert("Your browser does not support speech recognition. Please use Google Chrome.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.continuous = false;

    recognitionRef.current.onstart = () => {
      console.log("🎤 Speech recognition started...");
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      console.log("📝 Recognized text:", transcript);
    };

    recognitionRef.current.onend = () => {
      console.log("🛑 Speech recognition ended.");
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      setIsListening(false);
      
      let errorMessage = "An unknown error occurred.";
      switch (event.error) {
        case "network":
          errorMessage = "🚨 Network error! Check your internet connection and try again.";
          break;
        case "audio-capture":
          errorMessage = "🎤 No microphone detected. Please check your mic settings.";
          break;
        case "not-allowed":
          errorMessage = "❌ Permission denied. Please allow microphone access.";
          break;
        case "aborted":
          errorMessage = "⚠️ Speech recognition aborted. Try again.";
          break;
        case "no-speech":
          errorMessage = "🔇 No speech detected. Please try speaking again.";
          break;
      }
      alert(errorMessage);
    };
  }, []);
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
        console.log("🎤 Listening...");
      } catch (error) {
        console.error("⚠️ Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
      console.log("🛑 Stopped listening.");
    }
  };

  //recent
  const handleRecentChatClick = (chat) => {
    setInput(chat); // Set input field with the selected recent chat
    setTimeout(() => sendMessage(chat), 100); // Automatically send the message after a short delay
  };


  
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setRecentChats((prevChats) => [input, ...prevChats.slice(0, 4)]);
    setInput("");
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      console.log("Sending request to backend with prompt:", input);
      const response = await axios.post(`${API_URL}/gemini`, { prompt: input });

      console.log("Response received from backend:", response.data);

      let botResponseText = response.data?.response || "I’m not sure about that. Can you clarify?";
      

      // Check for greetings and respond naturally
           if (/^(hi|hello|hey|good morning|good evening|good afternoon|hello!)$/i.test(input.toLowerCase().trim())) {
               botResponseText = "Hey there! What’s on your mind? 😊";
           } else if (/^(thank you|thanks)$/i.test(input)) {
               botResponseText = "You're welcome! Happy to help. 👍";
           } else if (/how are you/i.test(input)) {
               botResponseText = "I'm just a bot, but I'm feeling great! How about you?";
           } 
      console.log("Raw bot response before processing:", botResponseText);

      // Split response into separate points
      let formattedResponse = botResponseText
        .split(/\d+\.\s/) // Split by numbered list (e.g., "1. ", "2. ")
        .filter(point => point.trim() !== ""); // Remove empty parts

      console.log("Formatted response points:", formattedResponse);

      // Check for serious health-related concerns
      const seriousIssuesRegex = /(depression|anxiety|mental health|panic attack|suicidal|therapy|counseling|stress disorder)/i;
      let containsSeriousIssue = seriousIssuesRegex.test(input);

      // Convert each point into a separate message for better readability
      formattedResponse.forEach((point, index) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `${index + 1}. ${point}`, sender: "bot" }
        ]);
      });

      // If serious issue is detected, add a telemedicine consultation link
      if (containsSeriousIssue) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `It sounds like you're going through a tough time. 💙 You're not alone—support is available. <br><br> 
                         <a href=" https://medihub-ver1.vercel.app/ " target="_blank" style="color: #007bff; text-decoration: underline;">
                         Click here to consult a doctor</a>`,
            sender: "bot"
          }
        ]);
      }

    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong. Try again later. 😕", sender: "bot" },
      ]);
    }
  };




  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 container glass" style={{
       }}>
      <div
        className="p-4 rounded shadow d-flex"
        style={{
          backgroundColor: "#1a1a1a",
          width: "650px",
          height: "635px",
          display: "flex",
          borderRadius: "10px",
          position: "relative",
          color:"white"
          
        }}
      >
        {/* Sidebar Section */}
        <div
          style={{
            width: sidebarOpen ? "180px" : "40px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            borderRadius: "10px 0 0 10px",
            //border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "10px",
            transition: "width 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: sidebarOpen ? "center" : "flex-start",
          }}
        >
          <Button
            variant="light"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              borderRadius: "50%",
              padding: "5px",
              marginBottom: "10px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
             
            }}
          >
            {sidebarOpen ? <FaChevronLeft size={16} /> : <FaBars size={16} />}
          </Button>

          {sidebarOpen && (
            <>
              <FaUserCircle size={50} />
              <h6  className="mt-2">Profile</h6>
              <hr style={{ width: "100%" }} />
              <h6><FaClock /> Recent</h6>
              <div style={{ fontSize: "12px", textAlign: "center",backgroundColor:"rgba(0, 0, 0, 0.5)"  }}>
                {recentChats.map((chat, index) => (
                  <div
                    key={index}
                    className="p-1 text-light"
                    onClick={() => handleRecentChatClick(chat)} // Calls the function when clicked
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {chat}
                  </div>
                ))}

              </div>
            </>
          )}
        </div>

        {/* Chat Window */}
        <div style={{ flex: 1,backgroundColor: "rgba(255, 255, 255, 0.1)" , paddingLeft: "10px", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div className="text-center mb-2">
          <h1 className="text-dark fw-bold fs-4 d-flex align-items-center ms-3">
          <span className="display-4 text-danger fw-bold">M</span>

      <span className="animate-text-change fs-3" style={{color:"white"}}>ediHub</span>
    </h1>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="chat-box p-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              height: "400px",
              overflowY: "auto",
              padding: "10px",
              color:"white"
            }}

          >
            {messages.map((message, index) => (
              <div key={index} className={`d-flex ${message.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                <div
                  className={`p-2 mb-2 ${message.sender === "user" ? "bg-primary text-white rounded-3" : "bg-light text-dark rounded-3"}`}
                  style={{ maxWidth: "75%" }}
                >
                  <span dangerouslySetInnerHTML={{ __html: message.text }} />

                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
         
< div className="mt-2">
  <InputGroup
    className="mb-1"
    style={{
      position: "relative",
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent black
      borderRadius: "20px", // Rounded corners
      border: "1px solid rgba(255, 255, 255, 0.2)", // Light border
      padding: "5px",
      color:"white",
    }}
  >
    <Form.Control
      className="custom-placeholder"
      placeholder="Add a message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      style={{
        backgroundColor: "transparent", // Keeps transparency
        color: "#FFFFFF", // White text
        border: "none", // Removes default border
        outline: "none", 
        color:"white",
        fontStyle:"italic",// Removes focus outline
      }}
    />

    {/* Emoji Button */}
    <Button
      variant="light"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#CCCCCC", // Light gray for subtle look
      }}
    >
    <FaSmile size={20} />
    </Button>

    {/* Voice Button */}
    <Button
      variant="light"
      onMouseDown={startListening}
      onMouseUp={stopListening}
      onTouchStart={startListening}
      onTouchEnd={stopListening}
      title="Hold to Speak"
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#CCCCCC",
      }}
    >
      <FaMicrophone size={20} />
    </Button>
 {/* Emoji Picker Popup */}
 {showEmojiPicker && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    right: "10px",
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    maxHeight: "150px",
                    overflowY: "auto",
                    padding: "10px",
                  }}
                >
                  <FaTimes
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowEmojiPicker(false)}
                  />
                  {/* Emoj importing  */}
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    categories={["smileys_people"]} // Only show face emojis
                  />

                </div>
              )}
            </InputGroup>


            <Button variant="primary" className="w-100" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
