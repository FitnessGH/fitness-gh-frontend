import { Card } from '@ui/card';
import { Calendar, ShoppingBag, Target, Users } from 'lucide-react';

export default function CustomerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          My Fitness Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your progress and stay connected
        </p>
      </div>

      <Card className="p-6 border-border/50 bg-linear-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Membership Status</p>
            <p className="text-2xl font-bold text-primary mt-2">Active</p>
            <p className="text-sm text-muted-foreground mt-1">
              Expires in 45 days
            </p>
          </div>
          <div className="text-5xl text-primary/20">🏋️</div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Workouts This Week',
            value: '5',
            icon: Calendar,
            color: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Current Goal',
            value: 'Strength',
            icon: Target,
            color: 'bg-orange-100 text-orange-600',
          },
          {
            label: 'Marketplace Items',
            value: '3',
            icon: ShoppingBag,
            color: 'bg-green-100 text-green-600',
          },
          {
            label: 'Community Groups',
            value: '2',
            icon: Users,
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
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {[
              {
                name: 'Yoga Class',
                time: '6:00 PM - 7:00 PM',
                instructor: 'Sarah M.',
              },
              {
                name: 'Strength Training',
                time: '7:30 PM - 8:30 PM',
                instructor: 'Mike K.',
              },
              {
                name: 'Boxing Session',
                time: 'Tomorrow 10:00 AM',
                instructor: 'James L.',
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <button className="text-primary font-medium text-sm hover:text-primary/80">
                  Join
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Diet Tips
          </h2>
          <div className="space-y-3">
            {['Stay hydrated', 'Protein intake', 'Meal timing'].map(
              (tip, i) => (
                <div
                  key={i}
                  className="p-3 bg-accent/10 rounded-lg border border-accent/20"
                >
                  <p className="text-sm font-medium text-foreground">
                    💡 {tip}
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
