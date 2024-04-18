const express = require('express');
var con = require('./db/connection.js'); // db is pool
const cors = require('cors');

/* import cookieParser from 'cookie-parser';

import jwt from 'cookie-parser'; */

const app = express();
const PORT = process.env.PORT || 8881;

app.use(cors());
app.use(express.json());

//Get all users data
app.get('/users', (req, res)=> {
	const sql = "select * from users";
	con.query(sql, (err, data)=> {
	if(err) return res.json(err);
	return res.json(data);
	})

})


//Get a user by ID
app.get('/admin/user/:id', (req, res) => {
   const { id } = req.params;
  con.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
       if (err) {
            throw err;
        }
        if (results.length > 0) {
            res.json(results[0]); // Sending the first row if found
        } else {
            res.status(404).json({ error: 'User not found' }); // Sending a 404 status if user not found
        }
    });
});

//Add User
app.post('/admin/create', (req, res)=> {
    const request = req.body;
    const bcrypt = require('bcrypt');
	const saltRounds = 10;

	password=req.body.password;

	const sql = "INSERT INTO users (`name`, `first_name`, `last_name`,`email`,`phone`,`password`,`status`,`created_at`) VALUES(?)";

		bcrypt.hash(password,saltRounds, function(err, hashedPassword) {

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to hash password' });
            }

	const values = [
        request.name,
        request.first_name,
        request.last_name,
		request.email,
        request.phone,
        hashedPassword,
        '0',
		request.created_at,

    ]
    con.query(sql, [values], (err, data)=> {
	if(err) return res.json(err);
	return res.json('created');
	})

});

})

//Update user
/* app.put('/admin/update/:id', (req, res) => {
    const request = req.body;
    const data = [request.name, request.first_name, request.last_name,  request.email, request.phone, request.updated_at, req.params.id];
 
    // Construct the SQL query string
    const query = 'UPDATE users SET name = ?, first_name = ?, last_name = ?, email = ?, phone = ?, updated_at = ? WHERE id = ?';

    con.query(query, data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to update user' });
        } else {
            res.json({ message: 'User updated successfully', id: req.params.id });
        }
    });
});
 */
  

/* for file upload  */
const multer = require('multer');
const fs = require('fs');
const path = require('path');
/* for file upload end */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const currentdate = new Date();
        const timestamp = currentdate.getTime(); // Get current timestamp
        cb(null, timestamp + '-' + file.originalname); // Prefix filename with timestamp
    }
});
const upload = multer({ storage: storage });

app.put('/admin/update/:id', upload.single('profile_image'), (req, res) => {
	const request = req.body;
	
	console.log('Form Data:', request);
	
	const filePath = path.join(__dirname, 'uploads/images', req.file.filename);

    // Check if the file already exists, if so, replace it
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the existing file
    }

	const data = [request.name, request.first_name, request.last_name, request.email, request.phone, req.file.filename, updated_at, req.params.id];
    //console.log(data);
	
   // Construct the SQL query string
    const query = 'UPDATE users SET name = ?, first_name = ?, last_name = ?, email = ?, phone = ?, profile_image = ?, updated_at = ? WHERE id = ?';
    //console.log(query); // Log the query string
    
    con.query(query, data, (err, result) => {
		//console.log(con.query);
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to update user' });
        } else {
            res.json({ message: 'User updated successfully', id: req.params.id });
        }
    });
});
 
 //for delete
app.delete('/admin/delete/:id', (req, res) => {
    const userId = req.params.id;
    
    // Construct the SQL query string for deleting a user
    const query = 'DELETE FROM users WHERE id = ?';
    console.log(query); // Log the query string
    
    con.query(query, userId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to delete user' });
        } else {
            res.json({ message: 'User deleted successfully', id: userId });
        }
    });
});
 
// login api
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const bcrypt = require('bcrypt');

    const sql = "SELECT * FROM users WHERE email = ?";

    con.query(sql, [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const user = result[0];
                bcrypt.compare(password, user.password, (err, bcryptResult) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    if (bcryptResult) {
                        res.json({ message: 'Login successful' });
                    } else {
                        res.status(401).json({ error: 'Invalid email or password' });
                    }
                });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});


//logout
// Assuming you're using Express.js
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            res.status(500).send('Failed to logout');
        } else {
            res.status(200).send('Logout successful');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  
