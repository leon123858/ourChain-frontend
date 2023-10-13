"use client";

import { useState } from "react";
import TodoItem from "./todoItem";

export default function TodoList({
  defaultData = [],
}: {
  defaultData?: { title: string; completed: boolean }[];
}) {
  const [input, setInput] = useState("");
  const [data, setData] = useState<{ title: string; completed: boolean }[]>(
    JSON.parse(JSON.stringify(defaultData))
  );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form className="w-full max-w-sm mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={() => {
              if (input) {
                setData([...data, { title: input, completed: false }]);
                setInput("");
              }
            }}
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {data.map((item, i) => {
          return (
            <TodoItem
              id={`todo-${i}`}
              title={item.title}
              isComplete={item.completed}
              clickCallback={() => {
                const newData = [...data];
                newData[i].completed = !newData[i].completed;
                setData(newData);
              }}
              deleteCallback={() => {
                const newData = [...data];
                newData.splice(i, 1);
                setData(newData);
              }}
            ></TodoItem>
          );
        })}
      </ul>
    </div>
  );
}
