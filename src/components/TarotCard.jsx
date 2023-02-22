import React from "react";
import { getRandomCard } from "../utils/tarot";

function TarotCard({ card, className, onDrawClick }) {
  if (!card) {
    return (
      <div
        className={`card card-bordered rounded-sm group h-full flex justify-center items-center shadow p-1 ${
          className || ""
        } aspect-[35/60]`}
      >
        <button className="btn" onClick={onDrawClick} disabled={!!card}>
          Draw a card
        </button>
      </div>
    );
  }

  return (
    <div
      className={`card card-bordered rounded-sm before:!rounded-sm group image-full shadow ${
        className || ""
      }`}
    >
      {card.img && (
        <figure className={`p-1 ${card.reversed ? "rotate-180" : ""}`}>
          <img src={`/cards/${card.img}`} alt={card.name} />
        </figure>
      )}
      <div className="card-body opacity-0 group-hover:opacity-100 duration-300">
        <h3 className="card-title">{card.name}</h3>
        <div className="">
          <div className="text-xs mb-4">{card.reversed && "(Reversed)"}</div>
          <div className="text-base mb-4 flex-1">
            {card.keywords.join(", ")}
          </div>
          {card.Elemental && (
            <div className="text-base">Elemental: {card.Elemental}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TarotCard;
