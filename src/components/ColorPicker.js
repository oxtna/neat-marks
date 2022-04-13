import { useState } from 'react';
import './ColorPicker.css';

const ColorPicker = () => {
  const [color, setColor] = useState("#00b8f0");

  const hexToRGB = (hex) => {
    const parsed = parseInt(hex, 16);
    return {
      r: (parsed >> 16) & 255,
      g: (parsed >> 8) & 255,
      b: parsed & 255
    };
  };

  const rgbaTemplate = ([r, g, b], a = 1) => {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const synchronizeColors = (event) => {
    const hex = event.target.value.substring(1);
    const { r, g, b } = hexToRGB(hex);
    document.documentElement.style.setProperty("--ui-color", event.target.value);
    document.documentElement.style.setProperty("--ui-focus-color", rgbaTemplate([r, g, b].map(v => 0.8 * v)));
    document.documentElement.style.setProperty("--ui-active-color", rgbaTemplate([r, g, b].map(v => 0.6 * v)));
    document.documentElement.style.setProperty("--ui-shadow-color", rgbaTemplate([r, g, b], 0.3));
    setColor(event.target.value);
  };

  return (
    <input type="color" className="color-picker" value={color} onChange={synchronizeColors} />
  );
};

export default ColorPicker;
