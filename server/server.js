const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Import cors
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static('public')); // Do serwowania plików z folderu 'public'

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
    console.log('Log: Logged for: ', result[0].id);
    res.status(200).json({result});
  });
});

// Endpoint do logowania przez Google
app.post('/google-login', async (req, res) => {
  
  const {givenName, familyName, email} = req.body
  console.log(givenName)

  let sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
      db.query(sql, [givenName, familyName, email, "googleLogin"], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          console.log("New user created in database!")
        }

        let sql2 = 'SELECT * FROM users WHERE email = ?';
        db.query(sql2, [email], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }else{
            delete result[0].password;
            console.log('Google-user logged after creating in database. :', result);
            res.status(201).json({ result});
          }
        })
        
        
      });
    } else {
      delete result[0].password;
      console.log('Google-user already in database. :', result);
      res.status(200).json({ result});
    }
    
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
