import { useEffect, useState } from "react";
import { Link } from 'react-router'
import { useParams } from "react-router";
export default function Author(){
const {id_author} = useParams();
const [Author, setAuthor] = useState({});
useEffect(() => {
fetch('http://localhost:8000/authors/'+id_author)
.then( (res) => res.json())
.then( (data) => setAuthor(data));
},[id_author]);
return(
<>


<h1>{Author.title}</h1>
<h2>Escrito por: {Author.name}</h2>
<h2>{Author.last_name}</h2>
<p>{Author.email}</p>
<p>{Author.phone}</p>
</>
);
}