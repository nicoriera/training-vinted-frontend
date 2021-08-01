import React from "react";
import Toggle from "react-toggle";

const ToggleSort = (props) => {
  const { sort, handleSort } = props;
  return (
    <div>
      <Toggle
        defaultChecked={sort}
        icons={{
          checked: <div>🔼</div>,
          unchecked: <div>🔽</div>,
        }}
        onChange={handleSort}
      />
    </div>
  );
};

export default ToggleSort;
