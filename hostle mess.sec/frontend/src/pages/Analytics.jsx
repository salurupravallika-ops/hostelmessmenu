import React, { useState, useEffect } from 'react';
import { Award, ArrowDown, ArrowUp, Activity, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getAnalyticsData } from '../data/fakeData';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = () => {
      setLoading(true);
      setTimeout(() => {
        setData(getAnalyticsData());
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center p-12 text-gray-500">Mining Data... 🔥</div>;
  if (!data) return <div className="text-center p-12 text-gray-500">Failed to load analytics.</div>;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Data Mining Dashboard</h2>
        <p className="text-gray-500 mt-1">Key insights extracted from the mess menu data 🔥</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Most Frequent Item" 
          value={data.mostFrequent?.item_name || 'N/A'}
          subtitle={`${data.mostFrequent?.count || 0} times served`}
          icon={<Award className="text-yellow-500" size={24} />}
          bg="bg-yellow-50"
        />
        <StatCard 
          title="Total Meals Recorded" 
          value={data.totalMeals || 0}
          subtitle="Total meals available in menu"
          icon={<Activity className="text-blue-500" size={24} />}
          bg="bg-blue-50"
        />
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Activity className="text-indigo-500" size={20} />
          <span>Weekly Pattern (Items per day)</span>
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.weeklyPattern} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <Tooltip 
                cursor={{fill: '#f9fafb'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Items Served" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-900 leading-tight">{value}</h4>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
