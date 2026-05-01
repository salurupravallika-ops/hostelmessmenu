import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { fakeMenuData } from '../data/fakeData';

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');
  const [search, setSearch] = useState('');

  const fetchMenu = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = fakeMenuData;
      if (day) filtered = filtered.filter(item => item.day === day);
      if (mealType) filtered = filtered.filter(item => item.meal_type === mealType);
      if (search) filtered = filtered.filter(item => item.item_name.toLowerCase().includes(search.toLowerCase()));
      setMenu(filtered);
      setLoading(false);
    }, 400); // Simulate network delay
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMenu();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [day, mealType, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Weekly Menu</h2>
          <p className="text-gray-500 mt-1">Manage and view the food items served</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search food item..."
            className="pl-10 w-full border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-1 md:w-40"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">All Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <select 
            className="border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-1 md:w-40"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">All Meals</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading menu...</div>
        ) : menu.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No items found matching the filters.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-100 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Food Item Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {menu.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{item.item_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
