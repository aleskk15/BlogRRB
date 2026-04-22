const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/hello'
, (req, res) => {
res.json( { message: "Hola" } );
});
app.listen(8000, () => {
console.log('Servidor corriéndose en el puerto 8000');
});

const pgp = require('pg-promise')();
const cn = {
host: 'localhost'
,
port: 5432,
database: 'blog'
,
user: 'postgres'
,
password: '123'
,
allowExitOnIdle: true
}
const db = pgp(cn)

/* GET all the posts */
app.get('/posts'
, (req, res) => {
db.any('SELECT * FROM post')
.then((data) => res.json(data))
.catch((error) => console.log('ERROR:'
, error));
});

/* GET a specific post */
app.get('/posts/:id_post'
, (req, res) => {
db.one('SELECT * FROM post WHERE id_post=$1'
,[req.params.id_post])
.then((data) => res.json(data))
.catch((error) => console.log('ERROR:'
, error));
})

app.get('/posts/:id_post', (req, res) => {
db.one('SELECT * FROM posts WHERE id_post=$1',[req.params.id_post])
.then((data) => res.json(data))
.catch((error) => console.log('ERROR:', error));
});

/** GET AUTHOR DATA**/
app.get('/authors', (req, res) => {
db.any('SELECT * FROM author')
.then((data) => res.json(data))
.catch((error) => console.log('ERROR:', error));
});

/** GET A SPECIFIC AUTHOR **/
app.get('/authors/:id_author', (req, res) => {
db.one('SELECT * FROM author WHERE id_author=$1', [req.params.id_author])
.then((data) => res.json(data))
.catch((error) => console.log('ERROR:', error));
});

//importar multer
const multer = require('multer');
// definición de la carpeta donde se guardarán las imágenes a subir y el nombre que se les asignará
const storage = multer.diskStorage({
destination: '../src/assets/',
filename: function (req, file, cb){
cb(null, file.originalname)
}
});
// creación del multer con los datos definidos en storage
const upload = multer({storage: storage});

// POST a new post (entry)
app.post('/posts/new', upload.single('img'), function(req, res){
    // ./src/assets/uploads/ + nombre_original.jpg
    const fullPath = `./src/assets/${req.file.originalname}`;

    const query = `
        INSERT INTO post (tittle, date, img, id_author) 
        VALUES ($1, CURRENT_TIMESTAMP, $2, 2)
    `;

    db.none(query, [req.body.title, fullPath]) // Guardamos el path completo
    .then(() => {
        res.send({
            message: 'Post agregado correctamente'
        });
    })
    .catch((error) => {
        console.log('ERROR: ', error);
        res.status(500).send({ error: 'Error al insertar' });
    });
});