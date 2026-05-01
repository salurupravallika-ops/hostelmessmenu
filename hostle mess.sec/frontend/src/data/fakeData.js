export const fakeMenuData = [
  { id: 1, day: 'Monday', meal_type: 'Breakfast', item_name: 'Idli', price: 30 },
  { id: 2, day: 'Monday', meal_type: 'Breakfast', item_name: 'Dosa', price: 40 },
  { id: 3, day: 'Monday', meal_type: 'Lunch', item_name: 'Rice', price: 50 },
  { id: 4, day: 'Monday', meal_type: 'Lunch', item_name: 'Sambar', price: 20 },
  { id: 5, day: 'Monday', meal_type: 'Dinner', item_name: 'Chapati', price: 40 },
  { id: 6, day: 'Monday', meal_type: 'Dinner', item_name: 'Dal', price: 30 },
  { id: 7, day: 'Tuesday', meal_type: 'Breakfast', item_name: 'Upma', price: 25 },
  { id: 8, day: 'Tuesday', meal_type: 'Breakfast', item_name: 'Pongal', price: 35 },
  { id: 9, day: 'Tuesday', meal_type: 'Lunch', item_name: 'Rice', price: 50 },
  { id: 10, day: 'Tuesday', meal_type: 'Lunch', item_name: 'Chicken Curry', price: 80 },
  { id: 11, day: 'Tuesday', meal_type: 'Dinner', item_name: 'Fried Rice', price: 60 },
  { id: 12, day: 'Wednesday', meal_type: 'Breakfast', item_name: 'Poori', price: 40 },
  { id: 13, day: 'Wednesday', meal_type: 'Lunch', item_name: 'Veg Biryani', price: 70 },
  { id: 14, day: 'Wednesday', meal_type: 'Dinner', item_name: 'Chapati', price: 40 },
  { id: 15, day: 'Thursday', meal_type: 'Breakfast', item_name: 'Dosa', price: 40 },
  { id: 16, day: 'Thursday', meal_type: 'Lunch', item_name: 'Rice', price: 50 },
  { id: 17, day: 'Thursday', meal_type: 'Dinner', item_name: 'Egg Curry', price: 60 },
  { id: 18, day: 'Friday', meal_type: 'Breakfast', item_name: 'Idli', price: 30 },
  { id: 19, day: 'Friday', meal_type: 'Lunch', item_name: 'Fish Curry', price: 90 },
  { id: 20, day: 'Friday', meal_type: 'Dinner', item_name: 'Chapati', price: 40 },
  { id: 21, day: 'Saturday', meal_type: 'Breakfast', item_name: 'Puri', price: 40 },
  { id: 22, day: 'Saturday', meal_type: 'Lunch', item_name: 'Rice', price: 50 },
  { id: 23, day: 'Saturday', meal_type: 'Dinner', item_name: 'Paneer Curry', price: 80 },
  { id: 24, day: 'Sunday', meal_type: 'Breakfast', item_name: 'Dosa', price: 40 },
  { id: 25, day: 'Sunday', meal_type: 'Lunch', item_name: 'Chicken Biryani', price: 100 },
  { id: 26, day: 'Sunday', meal_type: 'Dinner', item_name: 'Fried Rice', price: 60 }
];

// Helper functions for mining
export const getAnalyticsData = () => {
  if (fakeMenuData.length === 0) return null;

  // Most frequent item
  const itemCounts = {};
  fakeMenuData.forEach(item => {
    itemCounts[item.item_name] = (itemCounts[item.item_name] || 0) + 1;
  });
  let mostFrequentItem = { item_name: '', count: 0 };
  for (const [name, count] of Object.entries(itemCounts)) {
    if (count > mostFrequentItem.count) {
      mostFrequentItem = { item_name: name, count };
    }
  }

  // Most expensive and cheapest
  let mostExpensive = fakeMenuData[0];
  let cheapest = fakeMenuData[0];
  let totalCost = 0;

  fakeMenuData.forEach(item => {
    if (item.price > mostExpensive.price) mostExpensive = item;
    if (item.price < cheapest.price) cheapest = item;
    totalCost += item.price;
  });

  // Weekly pattern
  const dayCounts = {
    'Monday': { count: 0, total: 0 },
    'Tuesday': { count: 0, total: 0 },
    'Wednesday': { count: 0, total: 0 },
    'Thursday': { count: 0, total: 0 },
    'Friday': { count: 0, total: 0 },
    'Saturday': { count: 0, total: 0 },
    'Sunday': { count: 0, total: 0 }
  };

  fakeMenuData.forEach(item => {
    if (dayCounts[item.day]) {
      dayCounts[item.day].count += 1;
      dayCounts[item.day].total += item.price;
    }
  });

  const weeklyPattern = Object.keys(dayCounts).map(day => ({
    day,
    count: dayCounts[day].count,
    avg_price: dayCounts[day].count > 0 ? (dayCounts[day].total / dayCounts[day].count).toFixed(2) : 0
  }));

  return {
    mostFrequent: mostFrequentItem,
    mostExpensive: mostExpensive,
    cheapest: cheapest,
    totalMeals: fakeMenuData.length,
    averageCost: (totalCost / fakeMenuData.length).toFixed(2),
    weeklyPattern
  };
};
