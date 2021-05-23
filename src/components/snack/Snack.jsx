import { useState } from "react";
import "./Snack.css";

const Snack = ({ message }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="snack-container">
      <button
        onClick={() => {
          setOpen(false);
        }}
      ></button>
      {message}message
    </div>
  );
};

export default Snack;
