const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // default XAMPP/MySQL user
  password: '', // default XAMPP/MySQL password
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Initialize Database and Table
  db.query('CREATE DATABASE IF NOT EXISTS hostel_mess', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database `hostel_mess` ready');

    // Use the database
    db.query('USE hostel_mess', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }

      // Create Table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mess_menu (
          id INT AUTO_INCREMENT PRIMARY KEY,
          day VARCHAR(50) NOT NULL,
          meal_type VARCHAR(50) NOT NULL,
          item_name VARCHAR(100) NOT NULL,
          price INT NOT NULL
        )
      `;
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table `mess_menu` ready');

        // Check if data already exists
        db.query('SELECT COUNT(*) as count FROM mess_menu', (err, results) => {
          if (err) {
            console.error('Error checking data:', err);
            return;
          }
          if (results[0].count === 0) {
            // Insert sample fake data
            const insertDataQuery = `
              INSERT INTO mess_menu (day, meal_type, item_name, price) VALUES
              ('Monday', 'Breakfast', 'Idli', 30),
              ('Monday', 'Breakfast', 'Dosa', 40),
              ('Monday', 'Lunch', 'Rice', 50),
              ('Monday', 'Lunch', 'Sambar', 20),
              ('Monday', 'Dinner', 'Chapati', 40),
              ('Monday', 'Dinner', 'Dal', 30),
              ('Tuesday', 'Breakfast', 'Upma', 25),
              ('Tuesday', 'Breakfast', 'Pongal', 35),
              ('Tuesday', 'Lunch', 'Rice', 50),
              ('Tuesday', 'Lunch', 'Chicken Curry', 80),
              ('Tuesday', 'Dinner', 'Fried Rice', 60),
              ('Wednesday', 'Breakfast', 'Poori', 40),
              ('Wednesday', 'Lunch', 'Veg Biryani', 70),
              ('Wednesday', 'Dinner', 'Chapati', 40),
              ('Thursday', 'Breakfast', 'Dosa', 40),
              ('Thursday', 'Lunch', 'Rice', 50),
              ('Thursday', 'Dinner', 'Egg Curry', 60),
              ('Friday', 'Breakfast', 'Idli', 30),
              ('Friday', 'Lunch', 'Fish Curry', 90),
              ('Friday', 'Dinner', 'Chapati', 40),
              ('Saturday', 'Breakfast', 'Puri', 40),
              ('Saturday', 'Lunch', 'Rice', 50),
              ('Saturday', 'Dinner', 'Paneer Curry', 80),
              ('Sunday', 'Breakfast', 'Dosa', 40),
              ('Sunday', 'Lunch', 'Chicken Biryani', 100),
              ('Sunday', 'Dinner', 'Fried Rice', 60);
            `;
            db.query(insertDataQuery, (err) => {
              if (err) {
                console.error('Error inserting sample data:', err);
                return;
              }
              console.log('Sample data inserted into `mess_menu`');
            });
          }
        });
      });
    });
  });
});

// Export a connection pool pointing to the database for use in routes
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hostel_mess',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
