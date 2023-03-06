import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Configuration, OpenAIApi } from "openai";
import { getRandomCard } from "./utils/tarot.js";
import "./App.css";
import DefaultCard from "./components/DefaultCard.jsx";
import TarotCard from "./components/TarotCard.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Spread from "./components/Spread.jsx";

function App() {
  const numOfCards = 3;
  const [cards, setCards] = useState(Array(numOfCards).fill(null));
  const [topic, setTopic] = useState("");
  const [openai, setOpenai] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState("");

  useEffect(() => {
    const configuration = new Configuration({
      apiKey:
        import.meta.env.OPENAI_API_KEY ||
        "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",
    });
    const openai = new OpenAIApi(configuration);

    setOpenai(openai);
  }, []);

  const handleCardDrawn = (index) => () => {
    const newCards = [...cards];
    newCards[index] = getRandomCard(newCards);
    setCards(newCards);
  };

  const getReading = async () => {
    if (!cards || cards.length === 0) {
      alert("Please select 3 cards first");
      return;
    }

    setLoading(true);

    try {
      const cards_desc = cards
        .map((c) => {
          const meaning = `light: ${c.meanings.shadow.join(
            ", "
          )} - dark: ${c.meanings.light.join(",")}`;
          return `${c.name} ${
            c.reversed ? "reversed" : "upright"
          } (${meaning})`;
        })
        .join(", ");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a professional tarot reader. Give a 600-word reading answering the following question: ${
          topic || "anything"
        } with the following spread ${cards_desc} with poetic metaphorical style, and conclude with some sage advices from the reading. Make sure that you also take into consideration the interaction between the cards and the position of the cards (upright or reversed)\n\n`,
        temperature: 0.4,
        max_tokens: 1000,
        // finish_reason: "stop",
      });
      setReading(response.data.choices[0].text);
    } catch (err) {
      console.error(err);
      setReading("Sorry, I can't read these cards. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="flex justify-center px-4">
        <div className="container py-6 mt-16">
          <h1 className="text-4xl font-bold">Tarot Reader</h1>
          <DefaultCard
            title={"What do you want to enquire about?"}
            className="my-6 max-w-4xl"
          >
            <p className="mb-2">
              Whether it is about your love life, career, or anything else.
            </p>
            <form className="form-control w-full">
              <label className="label" htmlFor="reading-topic-input">
                <span className=" label-text">Question</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="Your question here..."
                type={"text"}
                name={"topic"}
                id={"reading-topic-input"}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
              />
            </form>
          </DefaultCard>
          <div className=" mt-6">
            <h3 className="text-2xl font-medium mb-4">
              Pick {numOfCards} cards
            </h3>
            <Spread cards={cards} handleCardDrawn={handleCardDrawn} />
          </div>
          {cards && cards.filter((c) => c).length == numOfCards && (
            <div className="flex justify-center mt-6">
              <button
                className="btn btn-primary"
                onClick={getReading}
                disabled={loading}
              >
                Get reading
              </button>
            </div>
          )}
          {loading ? (
            <div className="mt-6">
              <h3 className="text-2xl font-medium mb-4">Reading</h3>
              <DefaultCard className="w-full h-40">
                <div className="w-full flex justify-center items-center gap-4 h-full">
                  <ReactLoading type="bars" color="" />
                  <div>Reading the spread...</div>
                </div>
              </DefaultCard>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-2xl font-medium mb-4">Reading</h3>
              <DefaultCard className={"w-full"}>
                <p className="text-base whitespace-pre-line">
                  {reading
                    ? reading.trim()
                    : "Please select 3 cards and a topic to get a reading."}
                </p>
              </DefaultCard>
            </div>
          )}
          <div className="my-6">
            <h3 className="text-2xl font-medium mb-4">About the project</h3>
            <p>
              <strong>Disclaimer:</strong> This is just a fun project, so please
              don't take it too seriously.
            </p>
            <p>
              Tarot deck images and data are taken from{" "}
              <a
                className="link"
                href="https://www.kaggle.com/datasets/lsind18/tarot-json"
              >
                this Kaggle dataset
              </a>
            </p>
            <p>
              Reading generated using{" "}
              <a className="link" href="https://platform.openai.com/">
                OpenAI API
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
