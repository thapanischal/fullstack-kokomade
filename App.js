import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [article, setArticles] = useState([]);


  useEffect(() => {
    const FetchArticle = async () => {
      let response = await axios.get("http://127.0.0.1:3000/api/v1/articles");
      setArticles(response.data);
    };
    FetchArticle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addArticle(title, body, author);

    setTitle("");
    setBody("");
    setAuthor("");

  }


  const addArticle = async () => {
    if (title === "" || body === "" || author === "") return null;
    try {
      let response = await axios.post("http://127.0.0.1:3000/api/v1/articles", {
        title: title,
        body: body,
        author: author,
      });
      setArticles((article) => [response.data, ...article]);
    } catch (error) {
      console.error("Error Creating The Article", error.response || error);
    }
  };





  return (<div>
    <h2>Create/Edit an Article</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title :</label>
        <input type='text' name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div>
        <label>Body :</label>
        <input type='text' name="body" onChange={(e) => setBody(e.target.value)} value={body} />
      </div>
      <div>
        <label>Author :</label>
        <input type='text' name="author" onChange={(e) => setAuthor(e.target.value)} value={author} />
      </div>
      <button type='submit'>Create Article</button>
    </form>
    <ul>
      {article.map((article, index) => (
        <li key={index}>
          <h3>article.title</h3>
          <h3>article.body</h3>
          <h3>article.author</h3>
        </li>
      ))}

    </ul>
  </div>

  );
}

export default App;
