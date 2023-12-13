import React from "react";

export default function Input01(props) {
  const handleChange = (e) => {
    props.onChange(e);
  };

  return (
    <>
      <input
        className="px-2 py-[10px] w-[94%] border-b-2 rounded border-br outline-none"
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
        value={props.type === "text" ? props.budgetText : props.budgetCost}
      />
    </>
  );
}
