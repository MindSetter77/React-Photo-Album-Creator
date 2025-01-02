const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Import cors
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const session = require('express-session')
const uuidv4 = require('uuid').v4;

require('dotenv').config();


const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 3001;

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',  // Tutaj wstaw adres swojego frontendu
  methods: 'GET, POST, PUT, DELETE', // Dozwolone metody
  credentials: true,  // Ważne: zezwala na przesyłanie ciasteczek
};

app.use(cors(corsOptions));
app.use(express.static('public')); // Do serwowania plików z folderu 'public'

app.use(session({
  secret: 'someSecret',
  cookie: { maxAge: 3000 },
  resave: false,
  saveUninitialized: false
}))

app.use('/albums', express.static(path.join(__dirname, 'albums')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});


//LOGOWANIE

// Endpoint do rejestracji użytkownika
app.post('/signup', (req, res) => {
  const { firstName, lastName, nickname, email, password } = req.body;

  selectSQL = `SELECT * FROM users WHERE email = ? OR nickname = ?`

  db.query(selectSQL, [email, nickname], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      if(result.length > 0){
        console.log(`Log: User already exists for user: ${result[0].id}`)
        res.status(201).json({ id: "ERROR"});
      }else{
        
        const sql = 'INSERT INTO users (firstName, lastName, nickname, email, password) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, nickname, email, password], (err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).json({ error: err.message });
            
          } else {
            console.log(`LOG: User created: ${nickname}`)
          }
          res.status(201).json({ id: result.insertId, firstName, lastName, email, password });
        });
      }
    }
  });
});

const session_memory = {}

// Endpoint do logowania użytkownika
app.post('/login', (req, res) => {

  const { username, password } = req.body;

  console.log(username)

  const sql = 'SELECT * FROM users WHERE nickname = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const id = result[0].id

    console.log('Log: Logged for: ', id);

    const session_id = uuidv4();
    session_memory[session_id] = {id, username}
    
    // Ustawienie ciasteczka
    res.cookie('WebPhotoSession', session_id, {
      httpOnly: false, // zabezpieczenie przed dostępem z JavaScript
      secure: process.env.NODE_ENV === 'production', // tylko przez HTTPS w produkcji
      sameSite: 'Strict', // zapewnia, że ciasteczko nie jest wysyłane w zapytaniach międzydomenowych
      maxAge: 3600000, // Czas życia ciasteczka (np. 1 godzina)
      path: '/', // Ciasteczko dostępne w całej aplikacji
    });

    res.status(200).json({result});
  });
});

app.get('/todos', (req, res) => {
  console.log('todos reached');
  
  const cookies = req.headers.cookie; // Odczytaj wszystkie ciasteczka z nagłówka

  if (!cookies) {
    console.log('err1')
    return res.status(401).send('No cookies found');
  }
  // Znajdź ciasteczko WebPhotoSession
  const match = cookies.split('; ').find(cookie => cookie.startsWith('WebPhotoSession='));
  if (!match) {
    console.log('err2')
    return res.status(401).send('Session cookie not found');
  }
  const session_id = match.split('=')[1]; // Wyciągnij wartość ciasteczka
  const userSession = session_memory[session_id]

  if(!userSession){
    console.log('err3')
    console.log(session_memory[session_id])
    return res.status(401).send('Invalid session')
 }

 const userId = userSession.id
 const sql = 'SELECT * FROM users WHERE id = ?';

 db.query(sql, [userId], (err, result) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  if (result.length === 0) {
    return res.status(401).json({ error: 'User not found!' });
  }
  console.log(result)

  res.status(200).json({result});
});
})




// Endpoint do logowania przez Google
app.post('/google-login', async (req, res) => {
  
  const {givenName, familyName, email} = req.body
  const nickname = givenName+familyName

  let sql = 'SELECT * FROM users WHERE email = ? or nickname = ?';

  db.query(sql, [email, nickname], (err, result) => {
    if (err) {
      console.log("err1")
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      const sql = 'INSERT INTO users (firstName, lastName, nickname, email, password) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [givenName, familyName, nickname, email, "googleLogin"], (err, result) => {
        if (err) {
          console.log("err2")
          return res.status(500).json({ error: err.message });
        } else {
          console.log("New user created in database!")
        }
      });
    } else {
      delete result[0].password;
      console.log(`LOG: Logged with google: ${result[0].id}`);

      const session_id = uuidv4();
      const id = result[0].id
      const userName = result[0].givenName + result[0].familyName

      session_memory[session_id] = {id, userName}

      console.log(`Session ID created for user: ${session_id}`)
      
      // Ustawienie ciasteczka
      res.cookie('WebPhotoSession', session_id, {
        httpOnly: false, // zabezpieczenie przed dostępem z JavaScript
        secure: process.env.NODE_ENV === 'production', // tylko przez HTTPS w produkcji
        sameSite: 'Strict', // zapewnia, że ciasteczko nie jest wysyłane w zapytaniach międzydomenowych
        maxAge: 3600000, // Czas życia ciasteczka (np. 1 godzina)
        path: '/', // Ciasteczko dostępne w całej aplikacji
      });


      res.status(200).json({ result});
    }
    
  });
});

app.post('/addComment', (req, res) => {
  const { user_id, album_id, comment, nickname } = req.body;

  // Sprawdzamy, czy wszystko jest poprawnie przekazane
  if (!user_id || !album_id || !comment) {
    return res.status(400).json({ error: 'Brak wymaganych danych: user_id, album_id lub comment' });
  }

  // Dodajemy bieżącą datę (current date) do zapytania
  const comment_date = new Date().toISOString().split('T')[0]; // Formatowanie daty w formacie YYYY-MM-DD

  const sql = 'INSERT INTO comments(user_id, album_id, comment, comment_date, nickname) values (?, ?, ?, ?, ?)';
  
  db.query(sql, [user_id, album_id, comment, comment_date, nickname], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Error inserting comment into database', details: err.message });
    }
    res.status(200).json({ result });
  });
});

app.get('/getComments', (req, res) => {
  const { album_id } = req.query;

  if (!album_id) {
    return res.status(400).json({ error: 'Brak album_id w zapytaniu' });
  }

  const sql = 'SELECT * FROM comments WHERE album_id = ?';
  
  db.query(sql, [album_id], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Error fetching comments from database', details: err.message });
    }

    res.status(200).json({ comments: result });
  });
});










// Konfiguracja Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'image-q');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

function moveFile(album_id, fileName) {
  const sourceFolder = path.join(__dirname, 'image-q');
  const destinationFolder = path.join(__dirname, 'albums', album_id);

  const sourcePath = path.join(sourceFolder, fileName);
  const destinationPath = path.join(destinationFolder, fileName);

  // Upewnij się, że folder docelowy istnieje
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  // Przenieś plik
  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error('Error moving file:', err);
      return;
    }
    console.log(`File moved from ${sourcePath} to ${destinationPath}`);
  });
}

// Endpoint do przesyłania plików
app.post('/upload', upload.single('file'), (req, res) => {
  const album_id = req.body.album_id
  const fileName = req.file.originalname

  moveFile(album_id, fileName)
  res.send(req.file);
});

app.get('/albums/:album_id/photos', (req, res) => {
  const album_id = req.params.album_id;
  const imagesDir = path.join(__dirname, 'albums', album_id); // Ścieżka do folderu albumu

  // Sprawdź, czy folder istnieje
  if (!fs.existsSync(imagesDir)) {
    return res.status(404).json({ error: 'Album not found' });
  }

  // Zbieranie listy plików w folderze
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read images directory' });
    }

    const imageUrls = files.map(file => `http://localhost:${port}/albums/${album_id}/${file}`);
    res.status(200).json({ images: imageUrls }); // Zwracamy listę URL-i
  });
});

// Endpoint do dodawania nowego albumu
app.post('/albums', (req, res) => {
  const { title, user_id, album_id, privacy } = req.body;

  const sql = 'INSERT INTO Album (title, user_id, album_id, privacy, allowedUsers) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, user_id, album_id, privacy, user_id.toString()], (err, result) => {
    console.log(album_id)
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Błąd duplikatu - tytuł już istnieje dla danego użytkownika
        console.log("ALREADY EXISTS")
        return res.status(409).json({ error: "Album title already exists for this user" });
      } else {
        // Inny błąd serwera
        console.log("server error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    // Pobranie albumId przed jego użyciem
    

    // Ścieżka do nowego folderu
    const folderPath = path.join(__dirname, 'albums', album_id);

    // Tworzenie folderu na serwerze
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.log("Failed to create directory:", err);
        return res.status(500).json({ error: "Failed to create directory" });
      }

      console.log('Folder created successfully:', folderPath);
      res.status(201).json({ title, user_id, album_id });
    });
  });
});

app.put('/updateAllowedUsers', (req, res) => {
  const {album_id, allowedUsers} = req.body
  console.log(allowedUsers)

  let sql = 'UPDATE album SET allowedUsers = ? WHERE album_id = ?'

  db.query(sql, [allowedUsers, album_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Allowed users updated successfully' });
  });
})

//GetAlbums Endpoint
app.get('/getAlbums/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  const sql = 'SELECT * FROM Album WHERE user_id = ?';
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

//GetAlbums Endpoint
app.get('/getPublicAlbums', (req, res) => {

  const sql = 'SELECT * FROM Album WHERE privacy = "public"';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});


app.get('/getPrivacyStatus/:album_id', (req, res) => {

  const album_id = req.params.album_id

  const sql = 'SELECT privacy FROM Album WHERE album_id = ?';

  db.query(sql,[album_id] ,(err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

app.get('/getAllowedUsers/:album_id', (req, res) => {

  const album_id = req.params.album_id

  const sql = 'SELECT allowedUsers FROM Album WHERE album_id = ?';

  db.query(sql,[album_id] ,(err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

app.post('/getSharedData', (req, res) => {
  const jsonData = req.body;

  const album_id = jsonData.album_id

  // Opcjonalnie zapisz dane do pliku
  const filePath = path.join(__dirname, 'albums', album_id, 'data.json');
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    console.log('Data saved successfully:', jsonData);
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

app.get('/getSharedData/:album_id', (req, res) => {
  const { album_id } = req.params;

  const filePath = path.join(__dirname, 'albums', album_id, 'data.json');

  // Sprawdź, czy plik istnieje
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Data not found' });
  }

  // Odczytaj plik i wyślij zawartość
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.get('/getAllUsers', (req, res) => {

  const sql = 'SELECT * FROM users';

  db.query(sql,(err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
  
});


// Nasłuch na określonym porcie
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
