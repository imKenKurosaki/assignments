import { useState } from "react";
let globalId = 0;

function App() {
  const [todos, setTodo] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;

    const arr = [...todos, {
        title,
        description,
        id: globalId++,
      },
    ];
    setTodo(arr);
  };

  return (
    <>
      <div className="flex justify-center p-10">
        <form onSubmit={addTodo} className="flex flex-col w-80 gap-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border border-black rounded-md p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border border-black rounded-md p-2"
          />
          <button type="submit" className="bg-slate-400 p-2 border rounded-md">
            Add todo
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-5">
          {todos.map((value) => {
            return (
              <div
                key={value.id}
                className="flex flex-col p-3 gap-2 text-white  border rounded-md border-black bg-slate-700"
              >
                <p className="font-bold text-xl">{value.title}</p>
                <p>{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
