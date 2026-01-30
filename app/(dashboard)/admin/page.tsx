import { Card } from '@ui/card';
import { AlertCircle, Building2, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System-wide oversight and monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Gyms',
            value: '48',
            icon: Building2,
            color: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Total Users',
            value: '2,834',
            icon: Users,
            color: 'bg-green-100 text-green-600',
          },
          {
            label: 'Suspended Accounts',
            value: '12',
            icon: AlertCircle,
            color: 'bg-red-100 text-red-600',
          },
          {
            label: 'Marketplace Transactions',
            value: '1,245',
            icon: TrendingUp,
            color: 'bg-purple-100 text-purple-600',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-4 border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Recent System Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: 'New gym registered',
                details: 'FitClub Downtown',
                time: '2 hours ago',
              },
              {
                action: 'Vendor account suspended',
                details: 'Mike Supplements Inc',
                time: '5 hours ago',
              },
              {
                action: 'Marketplace dispute reported',
                details: 'Order #ORD-984',
                time: 'Yesterday',
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Admin Actions
          </h2>
          <div className="space-y-2">
            {[
              'Review Disputes',
              'Suspend User',
              'View Logs',
              'System Settings',
            ].map((action, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
