const express = require('express');
const router = express.Router();
const db = require('../db');

// @route   GET /api/menu/analytics
// @desc    Get analytics data (mining)
router.get('/analytics', async (req, res) => {
  try {
    // 1. Most frequent item
    const [freqResult] = await db.query(`
      SELECT item_name, COUNT(*) as count 
      FROM mess_menu 
      GROUP BY item_name 
      ORDER BY count DESC 
      LIMIT 1;
    `);

    // 2. Most expensive item
    const [expensiveResult] = await db.query(`
      SELECT item_name, price FROM mess_menu 
      ORDER BY price DESC 
      LIMIT 1;
    `);

    // 3. Cheapest item
    const [cheapestResult] = await db.query(`
      SELECT item_name, price FROM mess_menu 
      ORDER BY price ASC 
      LIMIT 1;
    `);

    // 4. Total meals served (Total rows)
    const [totalMealsResult] = await db.query(`
      SELECT COUNT(*) as total FROM mess_menu;
    `);

    // 5. Average cost
    const [avgCostResult] = await db.query(`
      SELECT AVG(price) as average FROM mess_menu;
    `);
    
    // 6. Weekly Pattern (Count of items per day)
    const [weeklyPattern] = await db.query(`
      SELECT day, COUNT(*) as count, AVG(price) as avg_price 
      FROM mess_menu 
      GROUP BY day
      ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    `);

    res.json({
      mostFrequent: freqResult.length > 0 ? freqResult[0] : null,
      mostExpensive: expensiveResult.length > 0 ? expensiveResult[0] : null,
      cheapest: cheapestResult.length > 0 ? cheapestResult[0] : null,
      totalMeals: totalMealsResult[0].total,
      averageCost: avgCostResult[0].average ? parseFloat(avgCostResult[0].average).toFixed(2) : 0,
      weeklyPattern: weeklyPattern
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/menu
// @desc    Get all menu items with optional filters
router.get('/', async (req, res) => {
  try {
    const { day, meal_type, search } = req.query;
    let query = 'SELECT * FROM mess_menu WHERE 1=1';
    let queryParams = [];

    if (day) {
      query += ' AND day = ?';
      queryParams.push(day);
    }
    
    if (meal_type) {
      query += ' AND meal_type = ?';
      queryParams.push(meal_type);
    }

    if (search) {
      query += ' AND item_name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    // Sort by id logic (or keep insertion order)
    query += ' ORDER BY id ASC';

    const [rows] = await db.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/menu
// @desc    Add a new menu item
router.post('/', async (req, res) => {
  try {
    const { day, meal_type, item_name, price } = req.body;
    
    if (!day || !meal_type || !item_name || !price) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const [result] = await db.query(
      'INSERT INTO mess_menu (day, meal_type, item_name, price) VALUES (?, ?, ?, ?)',
      [day, meal_type, item_name, price]
    );

    res.status(201).json({
      id: result.insertId,
      day,
      meal_type,
      item_name,
      price
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
