const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Halaman utama untuk pendaftaran
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk mendaftar pengguna
app.post('/register', (req, res) => {
    const { username, nomor, password } = req.body;

    if (!username || !nomor || !password) {
        return res.status(400).json({ error: 'Semua field harus diisi!' });
    }

    const newUser = {
        username,
        nomor,
        password,
        saldo: 0
    };

    fs.readFile('database.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca database' });
        }

        let users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('database.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Gagal menyimpan data pengguna' });
            }

            res.status(201).json({ message: 'Akun berhasil dibuat!' });
        });
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
