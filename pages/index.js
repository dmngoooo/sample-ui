import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");

  function loadTasks() {
    axios.get("http://localhost:3000/tasks").then((response) => {
      setArticles(response.data);
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // const createPost = async () => {
  //   if (!title || !desc) {
  //     alert("enter task");
  //     return;
  //   }
  //   try {
  //     await axios.post("http://localhost:3000/tasks/create", {
  //       title,
  //       desc,
  //     });
  //     setTitle("");
  //     setDesc("");

  //     fetchArticles();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("aananannanananananan");
  //   }
  //   console.log(title, desc);
  // };

  // const handleChangeTitle = (event) => {
  //   setTitle(event.target.value);
  // };

  // const handleChangeDesc = (event) => {
  //   setDesc(event.target.value);
  // };

  function createNewTask() {
    const title = prompt("Task name?");

    axios
      .post("http://localhost:3000/tasks/create", {
        title,
      })
      .then(() => {
        loadTasks();
      });
  }
  function editTask() {
    const name = prompt("Task name?");
    console.log(name);
  }

  function deleteTask(id) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:3000/tasks/delete/${id}`).then(() => {
        loadTasks();
      });
    }
  }
  return (
    <main className="container mx-auto my-10">
      {articles.map((article) => (
        <div key={article.id} className=" mb-4 shadow card bg-slate-100">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="flex-1">{article.title}</div>`{" "}
              {/* <div className="flex-1">{article.body}</div>` */}
              <button className="btn btn-primary mb-4" onClick={editTask}>
                Edit
              </button>
              <button
                className="btn btn-primary mb-4"
                onClick={() => deleteTask(article.id)}
              >
                remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* <input
        type="text"
        placeholder="title"
        className="input input-bordered input-primary w-full max-w-xs"
        value={title}
        onChange={handleChangeTitle}
      />
      <input
        type="text"
        placeholder="Description"
        className="input input-bordered input-primary w-full max-w-xs"
        value={desc}
        onChange={handleChangeDesc}
      /> */}
      <button className="btn" onClick={createNewTask}>
        New task
      </button>
    </main>
  );
}
