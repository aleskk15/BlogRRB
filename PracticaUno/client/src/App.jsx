import './App.css'
import { Routes, Route } from 'react-router';
import { Link } from 'react-router';
import { useState } from 'react';
import { Home } from './home';
import { Blog } from './blog';
import { Contact } from './contact';
import Post from './components/Post';
import Author from './components/Author';
import Login from './components/Login'



function App() {
  const [filteredText, setFilteredText] = useState("");
  function handleChange(e){
    setFilteredText(e.target.value);
  }

  return(
    <>
    <nav>
      <Link to="/">Inicio</Link> <br></br>
      <Link to="/blog">blog</Link><br></br>
      <Link to="/contact">Contacto</Link><br></br>
    </nav>
    <Routes>
      <Route path="/" element={<Home></Home> } />
      <Route path="/blog" element={<Blog></Blog>}></Route>
      <Route path="/contact" element = {<Contact></Contact>}></Route>
      <Route path="/blog/:id_post" element={<Post></Post>}></Route>
      <Route path="/author/:id_author" element={<Author></Author>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>

    </Routes>
    </>
  )


}

export default App
