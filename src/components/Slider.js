import React from "react";
import { useState } from "react";
import { Range } from "react-range";

const Slider = () => {
  const step = 0.1;
  const min = 0;
  const max = 100;

  const [values, setValues] = useState([20, 60]);

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "20%",

            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            backgroundColor: "#49afb7",
          }}
        />
      )}
    />
  );
};

export default Slider;
