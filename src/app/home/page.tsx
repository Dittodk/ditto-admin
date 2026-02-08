"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Dummy data for stats
  const stats = [
    { title: 'Total Users', value: '37', change: '+12%', icon: '👥', color: 'bg-blue-500', link: '/userlist' },
    { title: 'Properties', value: '20', change: '+8%', icon: '🏢', color: 'bg-purple-500', link: '/list-hotels' },
    { title: 'Reservations', value: '75', change: '+23%', icon: '📅', color: 'bg-green-500', link: '/reservation' },
    { title: 'Reports Status', value: '12', change: '+5%', icon: '📄', color: 'bg-orange-500', link: '/reports' },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = '/logout';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Accommodator Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link 
              href={stat.link}
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border border-gray-100 transform block ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-2xl transition-transform ${
                  hoveredCard === index ? 'scale-110' : ''
                }`}>
                  {stat.icon}
                </div>
                <span className="flex items-center text-green-600 text-sm font-semibold">
                  {stat.change}
                  <span className="ml-1">↗</span>
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-2">Click to manage →</p>
            </Link>
          ))}
        </div>

        {/* Simple Dummy Graph Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Reservation Trends</h2>
              <p className="text-gray-600 text-sm mt-1">Monthly booking statistics for 2024</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-xl">📈</span>
              <span className="font-semibold">+15% from last year</span>
            </div>
          </div>

          {/* Simple Bar Chart - No Calculations */}
          <div className="flex items-end justify-between gap-2 h-64 px-2">
            {/* January */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '160px' }}>
                <span className="text-white font-semibold text-xs">65%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Jan</span>
            </div>

            {/* February */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '195px' }}>
                <span className="text-white font-semibold text-xs">78%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Feb</span>
            </div>

            {/* March */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '180px' }}>
                <span className="text-white font-semibold text-xs">72%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Mar</span>
            </div>

            {/* April */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '213px' }}>
                <span className="text-white font-semibold text-xs">85%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Apr</span>
            </div>

            {/* May */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '230px' }}>
                <span className="text-white font-semibold text-xs">92%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">May</span>
            </div>

            {/* June */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '220px' }}>
                <span className="text-white font-semibold text-xs">88%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Jun</span>
            </div>

            {/* July */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '238px' }}>
                <span className="text-white font-semibold text-xs">95%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Jul</span>
            </div>

            {/* August */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '225px' }}>
                <span className="text-white font-semibold text-xs">90%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Aug</span>
            </div>

            {/* September */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '205px' }}>
                <span className="text-white font-semibold text-xs">82%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Sep</span>
            </div>

            {/* October */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '218px' }}>
                <span className="text-white font-semibold text-xs">87%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Oct</span>
            </div>

            {/* November */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '233px' }}>
                <span className="text-white font-semibold text-xs">93%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Nov</span>
            </div>

            {/* December */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg flex items-start justify-center pt-2" style={{ height: '245px' }}>
                <span className="text-white font-semibold text-xs">98%</span>
              </div>
              <span className="text-gray-600 font-medium text-xs">Dec</span>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💰</span>
              <h3 className="text-gray-600 text-sm font-medium">Revenue (MTD)</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">$124,580</p>
            <p className="text-sm text-green-600 mt-1">+18% vs last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⭐</span>
              <h3 className="text-gray-600 text-sm font-medium">Average Rating</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">4.8 / 5.0</p>
            <p className="text-sm text-gray-500 mt-1">Based on 1,847 reviews</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <h3 className="text-gray-600 text-sm font-medium">Occupancy Rate</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">87.5%</p>
            <p className="text-sm text-green-600 mt-1">+5.2% vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;