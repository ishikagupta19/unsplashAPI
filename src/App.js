import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ImageDisplay from './ImageDisplay';
import TextOverlay from './TextOverlay';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [size, setSize] = useState({ width: 100, height: 50 });

  const fetchImage = async () => {
    try {
      const response = await axios.get('https://source.unsplash.com/random/800x600');
      setImageUrl(response.request.responseURL);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addTextOverlay = () => {
    setTextOverlays([
      ...textOverlays,
      {
        text,
        position,
        size,
      },
    ]);
    setText('');
  };

  return (
    <div className="app">
      <div className="controls">
      <p>Please click on fetch button to show the image</p>
        <button type="button" class="btn btn-outline-dark" onClick={fetchImage}>Fetch Image</button>
        <br/>
        <br/>
        <div class="row ">
          <div class="col-md-2" style={{marginLeft:"40%"}}>
        <input type="text" class="form-control" style={{marginRight:"20px"}} placeholder="Enter Text" value={text} onChange={handleTextChange} />
        </div>
        <div class="col-md-2">
        <button type="button" class="btn btn-outline-success" onClick={addTextOverlay}>Add Text</button>
        </div>
        </div>
      </div>
      <ImageDisplay imageUrl={imageUrl} />
      {textOverlays.map((overlay, index) => (
        <TextOverlay
          key={index}
          text={overlay.text}
          position={overlay.position}
          size={overlay.size}
          onDragStop={(e, data) => {
            const updatedOverlays = [...textOverlays];
            updatedOverlays[index].position = { x: data.x, y: data.y };
            setTextOverlays(updatedOverlays);
          }}
          onResize={(e, data) => {
            const updatedOverlays = [...textOverlays];
            updatedOverlays[index].size = { width: data.size.width, height: data.size.height };
            setTextOverlays(updatedOverlays);
          }}
        />
      ))}
    </div>
  );
};

export default App;
