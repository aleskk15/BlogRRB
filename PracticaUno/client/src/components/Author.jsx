import { useEffect, useState } from "react";
import { Link } from 'react-router'
import { useParams, useNavigate } from "react-router";
export default function Author(){
const {id_author} = useParams();
const [Author, setAuthor] = useState({});
const navigate = useNavigate
useEffect(() => {
  fetch('http://localhost:8000/authors/'+id_author, {
    method: "GET",
    credentials: "include"
  })
  .then( (res) => {
    if(res.status == 401){
      navigate('/login');
    }
    return res.json()})
  .then( (data) => setAuthor(data))
  .catch((error) => console.log(error))
}, [id_author, navigate]);
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