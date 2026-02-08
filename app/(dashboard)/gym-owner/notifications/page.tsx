'use client';

import { Card } from '@ui/card';
import { AlertCircle, Bell, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'Renewal' | 'Event' | 'Alert' | 'Info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'Renewal',
    title: 'Membership Renewal Reminder',
    message:
      "Alex Chen's membership is expiring on 2025-03-15. Send renewal reminder?",
    date: '2025-01-16',
    read: false,
  },
  {
    id: 'N002',
    type: 'Event',
    title: 'Upcoming Event',
    message: 'HIIT Workout Challenge is scheduled for tomorrow at 18:00',
    date: '2025-01-16',
    read: false,
  },
  {
    id: 'N003',
    type: 'Alert',
    title: 'Payment Failed',
    message:
      'Payment from Maria Garcia for Standard plan failed. Please retry.',
    date: '2025-01-15',
    read: true,
  },
  {
    id: 'N004',
    type: 'Info',
    title: 'New Member Signup',
    message: 'Robert Thompson has signed up for the Basic membership plan',
    date: '2025-01-15',
    read: true,
  },
];

export default function NotificationsPage() {
  // TODO: Replace with real API data when notifications API is implemented
  // Notifications API endpoint needs to be created in the backend
  const [notifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Renewal':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'Event':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'Alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'Info':
        return <Info className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'Renewal':
        return 'bg-orange-50 border-orange-200';
      case 'Event':
        return 'bg-blue-50 border-blue-200';
      case 'Alert':
        return 'bg-red-50 border-red-200';
      case 'Info':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">
          View membership renewals, events, and important alerts
        </p>
      </div>

      <Card className="p-4 border-yellow-500/20 bg-yellow-500/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
              Notifications API Not Yet Implemented
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
              This page is currently using mock data. The notifications API endpoint needs to be created in the backend to enable real-time notifications.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 border ${getNotificationBgColor(notification.type)} cursor-pointer hover:border-primary/50 transition-colors ${
              !notification.read ? 'border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.date}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
