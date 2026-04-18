import { useEffect, useState } from "react";
import { useParams } from "react-router";
export default function Post(){
const {id_post} = useParams();
const [post, setPost] = useState({});
useEffect(() => {
fetch('http://localhost:8000/posts/'+id_post)
.then( (res) => res.json())
.then( (data) => setPost(data));
},[id_post]);
return(
<>
{post.img && <img src={'.'+post.img} alt="Imagen del post"></img>}
<h1>{post.title}</h1>
<h2>Escrito por: {post.id_author}</h2>
<h2>{post.date}</h2>
<p>{post.text}</p>
</>
);
}