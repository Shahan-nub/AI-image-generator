import React from "react";

interface CardParams {
    title:string,
    description?:string,
    btn?:string,
    link?:string,
}


const Card = ({title,description,btn,link}:CardParams) => {
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
