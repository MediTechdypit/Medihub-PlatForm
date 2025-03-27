import './App.css';
import ChatbotUI from './chat';
import React from "react";
//import { app } from "./firebaseConfig";
//import Spline from '@splinetool/react-spline'; <Spline scene="https://prod.spline.design/EjpdYz26oQzLzhUB/scene.splinecode" />

function App() {
  return (
   
    //console.log("Firebase initialized:", app),
    <div className="App">
      <ChatbotUI/>
    </div>
  );
}

export default App;
