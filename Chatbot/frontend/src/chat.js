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
  const [showChat, setShowChat] = useState(false); // Controls chat window visibility
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [recentChats, setRecentChats] = useState(["Hello!", "How are you?", "Tell me a joke"]);

  // Speech recognition setup
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

        // Create a timeout for detecting silence (5 seconds)
        let silenceTimeout = setTimeout(() => {
          stopListening();  // Stop listening after 5 seconds of silence
        }, 5000);

        recognitionRef.current.onresult = (event) => {
          clearTimeout(silenceTimeout); // Reset timeout when speech is detected
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          console.log("📝 Recognized text:", transcript);
          sendMessage(); // Automatically send the message after speech is detected
        };

        recognitionRef.current.onend = () => {
          console.log("🛑 Speech recognition ended.");
          setIsListening(false);
        };
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

  // Handle recent chat click
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
      if (!showChat) {
        setShowChat(true); // Show chat window when the first message is sent
      }
  
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
  
        // Filter out any unwanted responses like "Okay, here's the response in the requested format:"
        const unwantedPhrases = [
          "Okay, here's the response in the requested format",
          "Please find the breakdown below",
          "This is the response you requested",
          "Here's a friendly response",
          "userfriendly, short, and concise response",
          "short, and concise response",
          "userfriendly response",
          "userfriendly",
          "requested format",
          "concise format",
        ];
  
        unwantedPhrases.forEach((phrase) => {
          botResponseText = botResponseText.replace(new RegExp(phrase, "i"), "").trim();
        });
        
        // Split response into separate points
        let formattedResponse = botResponseText
          .split(/\d+\.\s/) // Split by numbered list (e.g., "1. ", "2. ")
          .map(point => point.replace(/[*:_-]+/g, "").trim()) 
          .filter(point => point.trim() !== ""); // Remove empty parts
  
        console.log("Formatted response points:", formattedResponse);
  
        // Check for serious health-related concerns
        const seriousIssuesRegex = /(depress|anxiety|mental health|panic attack|suicidal|therapy|counseling|stress disorder)/i;
        let containsSeriousIssue = seriousIssuesRegex.test(input);
  
        // Convert each point into a separate message for better readability
        formattedResponse.forEach((point, index) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `${point}`, sender: "bot" }
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

  // Handle emoji click
  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 container glass" style={{}}>
      <div
        className=" rounded shadow d-flex"
        style={{
          margin: "40px",
          // backgroundImage: `url("image.png")`,
          backgroundColor: "#1a1a1a",
          width: "100vw",  // 100% of the viewport width
          height: "100vh", // 100% of the viewport height
          display: "flex",
          position: "absolute",
          color: "white",
        }}
      >
        {/* Sidebar Section */}
        <div
          style={{
            width: sidebarOpen ? "25%" : "50px",
            margin: sidebarOpen ? "10px" : "0%",
            backgroundColor: sidebarOpen ? "rgba(157, 152, 152, 0.1)" : "transparent",
            color: "white",
            borderRadius: sidebarOpen ? "15px 15px 15px 15px" : "0 0 0 0",
            padding: "0.5%",
            alignItems: "center",
            transition: "width 1s ease",
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
              <h6 className="mt-2">Profile</h6>
              <hr style={{ width: "100%" }} />
              <h6><FaClock /> Recent</h6>
              <div style={{ fontSize: "16px", textAlign: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", width: "90%", borderRadius: "20px 20px 20px 20px", height: "100%" }}>
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

        {/* Main Content */}
        <div style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div className="d-flex justify-content-center align-items-center" style={{ height: "10vh" }}>
            <div className="text-center mb-2">
              <h1 className="text-dark fw-bold fs-4 d-flex align-items-center ms-3">
                <a href="https://medihub.dev" className="text-decoration-none d-flex align-items-center">
                  <span className="display-4 text-danger fw-bold">M</span>
                  <span className="animate-text-change fs-3" style={{ color: "white" }}>ediHub</span>
                </a>
              </h1>
            </div>

          </div>



          {/* Chat Messages */}
          {!showChat && (
            <div className="text-center" style={{ color: "white", fontSize: "24px", marginTop: "10%", padding: "25px" }}>
              😊 Hi! How are you feeling today? <br />I'm here to listen and support you. 💙
            </div>
          )}


          {showChat && (
            <div
              ref={chatContainerRef}
              className="chat-box p-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparent background
                backdropFilter: "blur(20px)", // Glassy blur effect
                borderRadius: "10px", // Rounded corners
                scrollBehavior: "smooth", // Smooth scrolling
                height: "60%",
                overflowY: "auto", // Scroll when content overflows
                marginLeft: "13%",
                marginRight: "13%",
                marginTop: "2%",
                marginBottom: "2%",
                padding: "10%",
                color: "white", // Text color
                transition: "height 1s ease-in-out", // Smooth height transition
                // border: "2px solid rgba(181, 177, 177, 0.6)", // Soft border for depth
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
                textAlign: "center", // Center text alignment
                fontSize: "16px", // Default font size
                fontWeight: "500", // Medium text weight
                placeholder: "hi hello !" // This won't work in a style object, use `placeholder` prop in an input field
              }}

            >
              {messages.map((message, index) => (
                <div key={index} className={`d-flex ${message.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                  <div
                    className={`p-2 mb-2 ${message.sender === "user" ? "bg-primary text-white rounded-3" : "bg-light text-dark rounded-3"}`}
                    style={{ maxWidth: "75%", margin: "2%" }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: message.text }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input Section */}
          <div
            className="mt-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              height: showChat ? "auto" : "100vh", // Center input initially, move down when chat appears
              transition: "height 0.5s ease-in-out",
              width: "100%", // Ensure the container takes full width
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%", // Full width of the parent container
                maxWidth: "800px", // Optional: Limit the maximum width
                gap: "10px", // Space between input group and send button
              }}
            >
              {/* Input Group (80% width) */}
              <InputGroup
                className="mb-1"
                style={{
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent black
                  borderRadius: "20px", // Rounded corners
                  border: "1px solid rgba(255, 255, 255, 0.2)", // Light border
                  padding: "5px",
                  color: "white",
                  width: "80%", // 80% of the container width
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Emoji Button (Left) */}
                <Button
                  variant="light"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#CCCCCC", // Light gray for subtle look
                    marginRight: "5px", // Space between emoji button and input
                  }}
                >
                  <FaSmile size={20} />
                </Button>

                {/* Input Field */}
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
                    color: "white",
                    fontStyle: "italic", // Removes focus outline
                    flex: 1, // Takes remaining space
                  }}
                />

                {/* Voice Button (Right) */}
                <Button
                  variant="light"
                  onClick={startListening} // Single click to start listening
                  title="Click to Speak"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: isListening ? "red" : "#CCCCCC",
                    marginLeft: "5px", // Space between input and microphone button
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

              {/* Send Button (20% width) */}
              <Button
                variant="primary"
                onClick={sendMessage}
                style={{
                  width: "20%", // 20% of the container width
                  borderRadius: "20px", // Match the input group's border radius
                  height: "40px", // Match the input group's height
                }}
              >
                Send
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <div
              className="p-2 text-white rounded-3" // Removed bg-light
              style={{
                maxWidth: "75%",
                textAlign: "center",
                background: "transparent", // Correct spelling and transparent background
              }}
            >
              MediHub chatbot is in the development phase, so it may make mistakes.
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ChatbotUI;