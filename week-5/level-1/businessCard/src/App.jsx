import { useState } from "react";
import { BusinessCard } from "./components/BusinessCard";

function App() {
  const [cards, setCards] = useState([]);

  function onSubmitHandler(e) {
    e.preventDefault();
    const { name, description } = e.target;

    setCards([
      ...cards,
      {
        name: name.value,
        description: description.value,
        socialMedia: ["facebook", "linkedln", "twitter"],
        interests: ["basketball", "gym", "coding"],
      },
    ]);
  }

  return (
    <>
      <div className="flex justify-center mt-4">
        <form onSubmit={onSubmitHandler} className="flex flex-col w-80 gap-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="border p-2 rounded-md border-black"
          />
          <input
            type="text"
            placeholder="Descriptions"
            name="description"
            className="border p-2 rounded-md border-black"
          />
          <button
            type="submit"
            className="border rounded-md p-2 bg-sky-600 border-black"
          >
            Create card
          </button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4 p-5">
        {cards.map((card) => {
          return <BusinessCard {...card} />;
        })}
      </div>
    </>
  );
}

export default App;
