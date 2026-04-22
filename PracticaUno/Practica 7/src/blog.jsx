import { useState, useEffect } from 'react';
import { CardList } from './components/Cards.jsx';
import NewPost  from './components/NewPost.jsx'

export function Blog() {
    const [entries, setEntries] = useState([{id_post:0, title:"", date:"", image:"", text:"", id_author:0}]);
    const [filteredText, setFilteredText] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/posts")
            .then((res) => res.json())
            .then((posts) => setEntries(posts));
    }, []);

    function handleChange(e) {
        setFilteredText(e.target.value);
    }

    return(
        <>
        <h1>Las filipantes fotos de Remi, Riley y Bethoveen</h1>
      <div className='filter'>
        <p>Buscar:</p>
        <input type='text' value={filteredText} placeholder="Remi estuvo aqui" onChange={handleChange}></input>
      </div>
      <CardList entries={entries} filteredText={filteredText}></CardList>
      <NewPost></NewPost>
        </>
    )
}