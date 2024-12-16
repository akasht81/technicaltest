// Import necessary libraries and components
import React from "react"; // Core React library
import ReactDOM from "react-dom"; // ReactDOM for rendering React components to the DOM
import App from "./App"; // Main App component

// Render the App component into the DOM
ReactDOM.render(
  // React.StrictMode: A wrapper that activates additional checks and warnings for its children during development
  <React.StrictMode>
    <App /> {/* Main application component */}
  </React.StrictMode>,
  // Attach the React app to the DOM element with id "root"
  document.getElementById("root")
);
