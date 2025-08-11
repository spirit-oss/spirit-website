import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Plus, Search, CalendarDays, Clock } from 'lucide-react';

interface CalendarAppProps {
  onBack: () => void;
}

export const CalendarApp: React.FC<CalendarAppProps> = ({ onBack }) => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const events = [
    { time: '09:00', title: 'Team Meeting', color: 'bg-primary' },
    { time: '14:30', title: 'Doctor Appointment', color: 'bg-accent' },
    { time: '18:00', title: 'Dinner with Family', color: 'bg-orange-500' },
  ];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-medium">Calendar</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Month Header */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-2xl font-light text-white/90">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 mb-6">
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="h-8 flex items-center justify-center text-white/60 text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                className={`
                  h-10 flex items-center justify-center text-sm rounded-lg transition-smooth
                  ${!day ? 'invisible' : ''}
                  ${day === selectedDate ? 'bg-primary text-white' : 'text-white/80 hover:bg-white/10'}
                  ${day === new Date().getDate() && day !== selectedDate ? 'bg-white/5' : ''}
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Events */}
      <div className="flex-1 px-6 pb-8">
        <div className="flex items-center mb-4">
          <CalendarDays className="w-5 h-5 text-accent mr-2" />
          <h3 className="text-lg font-medium text-white/90">Today's Events</h3>
        </div>
        
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${event.color} mr-3`} />
                <div className="flex-1">
                  <h4 className="text-white/90 font-medium">{event.title}</h4>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-white/60 mr-1" />
                    <span className="text-white/60 text-sm">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Event Button */}
          <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-2xl text-white/60 hover:border-white/40 hover:text-white/80 transition-smooth">
            <Plus className="w-5 h-5 mx-auto mb-2" />
            Add new event
          </button>
        </div>
      </div>
    </div>
  );
};