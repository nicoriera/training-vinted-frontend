import React from "react";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

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
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "50%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#49afb7", "#ccc"],
                min: min,
                max: max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
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
