const express = require('express');
const cors = require('cors');
const app = express();
const session = require ('express-session')
const pgSession = require('connect-pg-simple')(session);

app.use(cors({origin: 'http://localhost:5173', credentials: true}));
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
    host: 'localhost',
    port: 5432,
    database: 'blog',
    user: 'postgres',
    password: '123',
    allowExitOnIdle: true
};
const db = pgp(cn);

/* SESSION */
app.use(session({
  store: new pgSession({
    pgPromise : db,  // DB object from pg-promise
  }),
  secret: 'hola',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10*60*1000, secure: false},
}));

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
destination: '../client/src/assets/',
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



/* Function to authenticate */
const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next();
  } else {
    res.sendStatus(401);
  }
};


// POST login if credentials are correct
app.post('/login', upload.none(), (req, res) => {
  const { username, password } = req.body;

  db.oneOrNone("SELECT * FROM author WHERE username=$1", [username])
  .then((data) => {
    if (data != null){
      if(data.password == password){
        req.session.id_author = data.id_author;
        req.session.save(function (err) {
          if (err) return next(err)
        })
        res.send(req.session);
      }else{
        res.status(401).send('Invalid email/password');
      }
    }else{
      res.status(401).send('Invalid credentials');
    }
  })
  .catch((error) => console.log('ERROR: ', error));
});


// GET to logout and end session
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to destroy session');
    }
    res.send('Session destroyed');
  });
});



// GET session variables
app.get('/session-info', (req, res) => {
  res.json(req.session);
});


// GET one author
app.get('/authors/:id_author', authenticateSession, (req, res) => {
  db.one("SELECT *, TO_CHAR(date_of_birth, 'DD/MM/YYYY') as date_of_birth FROM author WHERE id_author =$1", [req.params.id_author])
  .then((data) => res.json(data))
  .catch((error) => console.log('ERROR: ', error));
});