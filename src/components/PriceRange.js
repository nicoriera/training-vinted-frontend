import React from "react";
import { Range, getTrackBackground } from "react-range";

const PriceRange = (props) => {
  const { rangeValues, handleRange, handleFinalRange } = props;

  return (
    <div className="toggle-range">
      <span>Prix entre : </span>

      <Range
        values={rangeValues}
        step={5}
        min={0}
        max={500}
        onChange={(values) => handleRange(values)}
        onFinalChange={(values) => handleFinalRange(values)}
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
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangeValues,
                  colors: ["#ccc", "#49afb7", "#ccc"],
                  min: 0,
                  max: 500,
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
              outline: "none",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-25px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#49afb7",
              }}
            >
              {rangeValues[index] + "€"}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PriceRange;
