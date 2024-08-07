import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

const App = () => {
  const [fields, setFields] = useState({});
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState(null);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data:', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setBlob(recordedBlob);
    stopRecording();
  };

  const submitRecording = async () => {
    if (!blob) return;

    const formData = new FormData();
    formData.append('file', blob.blob, 'recording.webm');

    const response = await axios.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setFields(parseFields(response.data.fields));
  };

  const parseFields = (fieldsString) => {
    const lines = fieldsString.split('\n');
    const fields = {};
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      fields[key] = value || '';
    });
    return fields;
  };

  return (
    <div>
      <h1>Medical Transcription</h1>
      <div>
        {Object.entries(fields).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
      </div>
      <ReactMic
        record={recording}
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} disabled={recording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
      <button onClick={submitRecording} disabled={!blob}>Submit Recording</button>
    </div>
  );
};

export default App;