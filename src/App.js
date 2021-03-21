import { useState, useEffect } from "react";
import "./App.css";
import { Task } from "./Task";
import { Taskbar } from "./Taskbar";

const json = [];
function App() {
  const [data, setdata] = useState(json);
  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks();
      setdata(tasksFromServer);
    };
    getTask();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/data");
    const val = await res.json();
    return val;
  };

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [remainder, setremainder] = useState(false);

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:5000/data/${id}`, {
      method: "DELETE",
    });
    setdata(data.filter((task) => task.id !== id));
  };

  const remaindertoggle = async (id) => {
    const tasktotoggle = await fetchTask(id);
    const updatetask = { ...tasktotoggle, remainder: !tasktotoggle.remainder };
    const res = await fetch(`http://localhost:5000/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatetask),
    });

    const val = await res.json();
    setdata(
      data.map((task) =>
        task.id === id ? { ...task, remainder: val.remainder } : task
      )
    );
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/data/${id}`);
    const val = await res.json();
    return val;
  };

  const addmore = async (e) => {
    e.preventDefault();
    /* alerts */
    if (!name) {
      alert("Please add Task name");
      return;
    }
    if (!description) {
      alert("Please add Description");
    }
    if (!date) {
      alert("Please add date & time");
    }
    //working
    const id = data.length + 1;
    const task = { id, name, description, date, remainder };

    const res = await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const val = await res.json();
    setdata([...data, val]);

    // setdata([...data, task]);
    setname("");
    setdescription("");
    setdate("");
    setremainder(false);
  };

  return (
    <div>
      <Taskbar
        data={data}
        onClick={deleteEvent}
        onDoubleClick={remaindertoggle}
      ></Taskbar>
      <form className="addtask" onSubmit={addmore}>
        <div>
          <label>Task</label>
          <br />
          <input
            type="text"
            placeholder="Add Title"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <br />
          <input
            type="text"
            placeholder="Add Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date & Time</label>
          <br />
          <input
            type="text"
            placeholder="Add Date & Time"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div>
          <label>Reminder</label>
          <br />
          <input
            type="checkbox"
            checked={remainder}
            value={remainder}
            onChange={(e) => setremainder(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" value="Save Task" />
      </form>
    </div>
  );
}

export default App;
