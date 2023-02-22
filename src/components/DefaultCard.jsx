import React from "react";

function DefaultCard({ title, children, className }) {
  return (
    <div className={`card card-bordered rounded-sm shadow ${className || ""}`}>
      <div className="card-body w-full">
        {title && <h3 className="card-title">{title}</h3>}
        <>{children}</>
      </div>
    </div>
  );
}

export default DefaultCard;
