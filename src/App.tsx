import React from "react";
import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/posts" element={<h1>PostListPage</h1>} />
        <Route path="/posts/:id" element={<h1>PostListPage</h1>} />
        <Route path="/posts/new" element={<h1>PostListPage</h1>} />
        <Route path="/posts/edit/:id" element={<h1>PostListPage</h1>} />
        <Route path="/profile" element={<h1>PostListPage</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
