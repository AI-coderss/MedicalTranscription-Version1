import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactMic } from "react-mic";
import Loader from "./Loader";
import "./App.css";
import { Link } from "react-router-dom";
import Orb from "./orb";
import Typing from "./Typing";
import ThemeSwitch from "./ThemeSwitch";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Main application component
function App({ fields, setFields }) {
  // State hooks for managing recording, loading state, transcript, and theme
  const [record, setRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [theme, setTheme] = useState("light");

  // Audio objects for button sounds
  const clickSound = new Audio("/click.wav");
  clickSound.volume = 0.2;
  const openingSound = new Audio("/opening.wav");
  openingSound.volume = 0.4;

  // Effect hook to set initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Function to start audio recording
  const startRecording = () => {
    clickSound.play();
    setRecord(true);
  };

  // Function to stop audio recording
  const stopRecording = () => {
    clickSound.play();
    setRecord(false);
  };

  // Function to handle audio recording stop event
  const onStop = async (recordedBlob) => {
    setLoading(true);

    // Prepare audio file for transcription
    const audioFile = new File([recordedBlob.blob], "temp.wav", {
      type: "audio/wav",
    });
    const formData = new FormData();
    formData.append("audio_data", audioFile);

    try {
      // Send audio file to server for transcription
      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update transcript state with response data
      const transcriptText = response.data.transcript;
      setTranscript(transcriptText);

      // Extract fields from the transcript
      const fieldsResponse = await axios.post(
        "http://localhost:5000/extract_fields",
        { transcript: transcriptText }
      );
      setFields(fieldsResponse.data);
    } catch (error) {
      console.error("Error during transcription:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle changes in input fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Function to reset the form for a new recording
  const handleNewRecording = () => {
    openingSound.play();
    setTranscript("");
    setFields({
      personalHistory: "",
      chiefComplaint: "",
      presentIllness: "",
      medicationHistory: "",
      pastHistory: "",
      familyHistory: "",
      requiredLabTestsAndProcedures: "",
    });
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Copying to clipboard was successful!");
        alert("Copied to clipboard!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Theme configuration for Material-UI
  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  // Render the application UI
  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <div className={`App ${theme}`}>
        <div className="title-section">
          <div className="content">
            <h2>MEDICAL TRANSCRIPTION 🎙️</h2>
            <h2>MEDICAL TRANSCRIPTION 🎙️</h2>
          </div>
        </div>
        <div className="sidebar">
          <h1>Medical Voice Transcription</h1>
          <div className="theme-toggle">
            <ThemeSwitch checked={theme === "dark"} onChange={toggleTheme} />
          </div>
          <div className="record-buttons">
            <button onClick={startRecording} disabled={record}>
              Start Recording
            </button>
            <button onClick={stopRecording} disabled={!record}>
              Stop Recording
            </button>
          </div>
          <div className="buttons-container">
            <button onClick={handleNewRecording}>New Recording</button>
            <Link to={`/case-analysis/${encodeURIComponent(transcript)}`}>
              <button
                disabled={!transcript}
                onClick={() => openingSound.play()}
              >
                Case Analysis
              </button>
            </Link>
          </div>
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            strokeColor="#ff38bf"
            visualSetting="frequencyBars"
            backgroundColor="#FFFFFF"
          />
          {loading && (
            <div className="loader-container">
              <Loader />
            </div>
          )}
          {loading && (
            <div className="orb-container">
              <Orb />
            </div>
          )}
          <Typing />
        </div>
        <div className="main-content">
          <div className="fields-section">
            {/* Field containers for various medical history sections */}
            <div className="field-container">
              <label htmlFor="personalHistory">Personal History:</label>
              <div className="textarea-container">
                <textarea
                  name="personalHistory"
                  value={fields.personalHistory}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.personalHistory)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="chiefComplaint">Chief Complaint:</label>
              <div className="textarea-container">
                <textarea
                  name="chiefComplaint"
                  value={fields.chiefComplaint}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.chiefComplaint)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="presentIllness">Present Illness:</label>
              <div className="textarea-container">
                <textarea
                  name="presentIllness"
                  value={fields.presentIllness}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.presentIllness)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="medicationHistory">Medication History:</label>
              <div className="textarea-container">
                <textarea
                  name="medicationHistory"
                  value={fields.medicationHistory}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.medicationHistory)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="pastHistory">Past History:</label>
              <div className="textarea-container">
                <textarea
                  name="pastHistory"
                  value={fields.pastHistory}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.pastHistory)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="familyHistory">Family History:</label>
              <div className="textarea-container">
                <textarea
                  name="familyHistory"
                  value={fields.familyHistory}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() => copyToClipboard(fields.familyHistory)}
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
            <div className="field-container">
              <label htmlFor="requiredLabTestsAndProcedures">
                Required Lab Tests and Procedures:
              </label>
              <div className="textarea-container">
                <textarea
                  name="requiredLabTestsAndProcedures"
                  value={fields.requiredLabTestsAndProcedures}
                  onChange={handleFieldChange}
                />
                <div
                  className="copy-icon-container"
                  onClick={() =>
                    copyToClipboard(fields.requiredLabTestsAndProcedures)
                  }
                >
                  <span className="copy-label">Copy</span>
                  <i className="fas fa-copy copy-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
