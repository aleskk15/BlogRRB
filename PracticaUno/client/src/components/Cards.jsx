import { Link } from 'react-router'

export function CardList({ entries, filteredText }) {
  const cards = entries
    .filter(entry => 
      entry && 
      entry.tittle && 
      entry.tittle.toLowerCase().includes(filteredText.toLowerCase())
    )
    .map(entry => (
      <Card 
        key={entry.id}      
        id_post={entry.id_post} 
        title={entry.tittle} 
        text={entry.desc}   
        date={entry.date} 
        image={entry.img}   
      />
    ));

  return <div className="cardList">{cards}</div>;
}


export function Card({title, date, img, id_post}){
return (
<div className="card">
<Link to={"/blog/"+id_post}>
<img src={img} alt="Imagen"/>
<h1>{title}</h1>
<p>{date.substring(0,10)}</p>
</Link>
</div>
);
}