import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  let [task, setTask] = useState("");
  let [alltask, setAlltask] = useState([]);

  let handleSubmit = async () => {
    axios
      .post("http://localhost:3000/createtask", {
        task: task,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getAlltask() {
    axios
      .get("http://localhost:3000/alltodo")
      .then((data) => {
        setAlltask(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAlltask();
  }),
    [task];

    let handleDelete=(id)=>{
      axios.delete(`http://localhost:3000/deletetodo/${id}`).then((data)=>{
        console.log(data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  return (
    <>
      {/* component */}
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                onChange={(e) => setTask(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={handleSubmit}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-green-500 hover:bg-teal"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {alltask.map((item) => (
              <div className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">{item.task}</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
                  Done
                </button>
                <button 
                onClick={()=>handleDelete(item._id)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-green-500 hover:bg-red"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
