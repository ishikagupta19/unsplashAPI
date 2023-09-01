import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

const TextOverlay = ({ text, position, size, onTextChange, onDragStop, onResize }) => {
  return (
    <Draggable onStop={onDragStop}>
      <Resizable width={size.width} height={size.height} onResize={onResize}>
        <div className="text-overlay" style={{ top: position.y, left: position.x }}>
          {text}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default TextOverlay;
