import React from "react";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const Slider = (props) => {
  const step = 5;
  const min = 0;
  const max = 500;

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
            width: "80%",
            cursor: "inherit",
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
      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            backgroundColor: "#49afb7",
            border: "1px solid #FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-24px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "10px",
              fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#49afb7",
            }}
          >
            {values[index].toFixed(1)}
          </div>
        </div>
      )}
    />
  );
};

export default Slider;
