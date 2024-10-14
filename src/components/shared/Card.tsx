import React from "react";

interface CardParams {
    title:string,
    description?:string,
    btn?:string,
}


const Card = ({title,description,btn}:CardParams) => {
  return (
    <div className="cookieCard">
      <p className="cookieHeading">{title}</p>
      <p className="cookieDescription">
        {description}
      </p>
      <button className="acceptButton">{btn}</button>
    </div>
  );
};

export default Card;
