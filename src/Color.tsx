import React from 'react';

const colors = [
  { name: "Background", hex: "#FFF8EC" },
  { name: "Primary Text", hex: "#2E2E2E" },
  { name: "Accent Gold", hex: "#CBB26A" },
  { name: "Secondary Text", hex: "#7A7A7A" },
  { name: "Dark Background", hex: "#1C1C1C" },
  { name: "Light Text on Dark", hex: "#EAEAEA" }
];

const ColorPalette = () => {
  return (
    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {colors.map((color) => (
        <div
          key={color.name}
          className="rounded-lg shadow-md border"
        >
          <div
            className="h-20 rounded-t-lg"
            style={{ backgroundColor: color.hex }}
          ></div>
          <div className="p-3 text-center text-sm font-medium">
            <div>{color.name}</div>
            <div className="text-xs text-gray-500">{color.hex}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
