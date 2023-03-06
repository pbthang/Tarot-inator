import React from "react";
import TarotCard from "./TarotCard";

function Spread({ cards, handleCardDrawn }) {
  const [isSmall, setIsSmall] = React.useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  React.useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmall ? (
    <div className="carousel carousel-center w-full p-4 space-x-4 ">
      {cards.map((card, idx) => (
        <TarotCard
          idx={idx}
          card={card}
          onDrawClick={handleCardDrawn(idx)}
          key={card?.name || idx}
          className={"carousel-item w-8/12 min-[500px]:w-5/12"}
        />
      ))}
    </div>
  ) : (
    <div className="flex justify-around gap-6">
      {cards.map((card, idx) => (
        <TarotCard
          idx={idx}
          card={card}
          onDrawClick={handleCardDrawn(idx)}
          key={card?.name || idx}
          className={"max-w-md flex-1 basis-20"}
        />
      ))}
    </div>
  );
}

export default Spread;
