'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Package, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';

interface Delivery {
  id: string;
  date: string;
  time: string;
  customer: string;
  details: string;
}

interface DeliveryCalendarProps {
  deliveries?: Delivery[];
}

type ViewMode = 'day' | 'week' | 'month';

const DeliveryCalendar: React.FC<DeliveryCalendarProps> = ({ deliveries = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  // Sample data if none provided
  const sampleDeliveries: Delivery[] = [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      customer: 'John Smith',
      details: 'Container delivery to warehouse'
    },
    {
      id: '2',
      date: new Date().toISOString().split('T')[0],
      time: '14:30',
      customer: 'Sarah Johnson',
      details: 'Equipment pickup and transport'
    },
    {
      id: '3',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:15',
      customer: 'Mike Wilson',
      details: 'Bulk container delivery'
    },
    {
      id: '4',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '16:00',
      customer: 'Lisa Brown',
      details: 'Express delivery service'
    },
    {
      id: '5',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '08:30',
      customer: 'David Lee',
      details: 'Container return and pickup'
    },
    {
      id: '6',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '11:45',
      customer: 'Emma Davis',
      details: 'Scheduled maintenance delivery'
    },
    {
      id: '7',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '13:20',
      customer: 'Robert Taylor',
      details: 'Multi-stop delivery route'
    },
    {
      id: '8',
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '15:30',
      customer: 'Jennifer White',
      details: 'Priority delivery service'
    }
  ];

  const deliveryData = deliveries.length > 0 ? deliveries : sampleDeliveries;

  // Generate week array starting from current date
  useEffect(() => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      week.push(date);
    }
    setCurrentWeek(week);
  }, [currentDate]);

  // Generate month array
  useEffect(() => {
    const month = [];
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    
    // Get first day of month and calculate starting date (including previous month's days)
    const firstDay = new Date(year, monthIndex, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    // Generate 42 days (6 weeks) to fill the calendar grid
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      month.push(date);
    }
    setCurrentMonth(month);
  }, [currentDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDeliveriesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return deliveryData.filter(delivery => delivery.date === dateString);
  };

  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getDeliveryCount = (date: Date) => {
    return getDeliveriesForDate(date).length;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getViewTitle = () => {
    switch (viewMode) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        });
      case 'week':
        return currentWeek[0] && currentWeek[6] ? 
          `${currentWeek[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${currentWeek[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` :
          '';
      case 'month':
        return currentDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
      default:
        return '';
    }
  };

  const renderDayView = () => {
    const dayDeliveries = getDeliveriesForDate(currentDate);
    
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              {getViewTitle()}
            </h4>
          </div>
          
          {dayDeliveries.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No deliveries scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dayDeliveries
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {formatTime(delivery.time)}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{delivery.customer}</span>
                      </div>
                      <p className="text-sm text-gray-700">{delivery.details}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Scheduled
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {currentWeek.map((date, index) => {
            const deliveries = getDeliveriesForDate(date);
            const deliveryCount = deliveries.length;
            const isCurrentDay = isToday(date);
            const isSelectedDay = isSelected(date);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`
                  p-4 text-left hover:bg-gray-50 transition-colors relative
                  ${isCurrentDay ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                  ${isSelectedDay ? 'bg-blue-100' : 'bg-white'}
                `}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`
                      text-sm font-medium
                      ${isCurrentDay ? 'text-blue-700' : 'text-gray-900'}
                    `}>
                      {formatDate(date)}
                    </span>
                    {deliveryCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {deliveryCount}
                      </span>
                    )}
                  </div>
                  
                  {deliveryCount > 0 && (
                    <div className="space-y-1">
                      {deliveries.slice(0, 2).map((delivery) => (
                        <div key={delivery.id} className="text-xs text-gray-600 truncate">
                          {formatTime(delivery.time)} - {delivery.customer}
                        </div>
                      ))}
                      {deliveries.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{deliveries.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Month header with weekdays */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>
        
        {/* Month grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {currentMonth.map((date, index) => {
            const deliveries = getDeliveriesForDate(date);
            const deliveryCount = deliveries.length;
            const isCurrentDay = isToday(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isSelectedDay = isSelected(date);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`
                  p-3 text-left hover:bg-gray-50 transition-colors relative min-h-[100px]
                  ${isCurrentDay ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                  ${isSelectedDay ? 'bg-blue-100' : 'bg-white'}
                  ${!isCurrentMonthDay ? 'text-gray-400' : ''}
                `}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`
                      text-sm font-medium
                      ${isCurrentDay ? 'text-blue-700' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}
                    `}>
                      {date.getDate()}
                    </span>
                    {deliveryCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {deliveryCount}
                      </span>
                    )}
                  </div>
                  
                  {deliveryCount > 0 && isCurrentMonthDay && (
                    <div className="space-y-1">
                      {deliveries.slice(0, 1).map((delivery) => (
                        <div key={delivery.id} className="text-xs text-gray-600 truncate">
                          {formatTime(delivery.time)} - {delivery.customer}
                        </div>
                      ))}
                      {deliveries.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{deliveries.length - 1} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Delivery Calendar</h3>
        <div className="flex items-center space-x-4">
          {/* View Toggle Buttons */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Day</span>
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Week</span>
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>Month</span>
            </button>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
              {getViewTitle()}
            </span>
            <button
              onClick={() => navigate('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      {viewMode === 'day' && renderDayView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'month' && renderMonthView()}

      {/* Selected Day Schedule - Only show for week and month views */}
      {selectedDate && viewMode !== 'day' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              Schedule for {formatDate(selectedDate)}
            </h4>
          </div>
          
          {(() => {
            const dayDeliveries = getDeliveriesForDate(selectedDate);
            
            if (dayDeliveries.length === 0) {
              return (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No deliveries scheduled for this day</p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {dayDeliveries
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((delivery) => (
                    <div
                      key={delivery.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {formatTime(delivery.time)}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{delivery.customer}</span>
                        </div>
                        <p className="text-sm text-gray-700">{delivery.details}</p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Scheduled
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Total Deliveries</p>
              <p className="text-2xl font-bold text-blue-600">
                {deliveryData.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Unique Customers</p>
              <p className="text-2xl font-bold text-green-600">
                {new Set(deliveryData.map(d => d.customer)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {viewMode === 'day' ? 'Today' : viewMode === 'week' ? 'This Week' : 'This Month'}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {viewMode === 'day' 
                  ? getDeliveryCount(currentDate)
                  : viewMode === 'week'
                  ? currentWeek.reduce((total, date) => total + getDeliveryCount(date), 0)
                  : currentMonth.filter(date => isCurrentMonth(date)).reduce((total, date) => total + getDeliveryCount(date), 0)
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCalendar;
