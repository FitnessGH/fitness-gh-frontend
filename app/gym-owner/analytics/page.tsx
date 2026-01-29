'use client';

import { Card } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 4000, members: 240 },
  { month: 'Feb', revenue: 5200, members: 280 },
  { month: 'Mar', revenue: 4800, members: 270 },
  { month: 'Apr', revenue: 6100, members: 310 },
  { month: 'May', revenue: 7200, members: 360 },
  { month: 'Jun', revenue: 8100, members: 400 },
];

const membershipData = [
  { name: 'Basic', value: 120 },
  { name: 'Standard', value: 180 },
  { name: 'Premium', value: 100 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Track your gym performance and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$35,500', change: '+12%' },
          { label: 'Active Members', value: '400', change: '+8%' },
          { label: 'Avg Check-ins', value: '2,450', change: '+5%' },
          { label: 'Member Growth', value: '18%', change: '+3%' },
        ].map((metric, i) => (
          <Card
            key={i}
            className="p-4 border-border/50"
          >
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-bold mt-2 text-foreground">
              {metric.value}
            </p>
            <p className="text-xs text-green-600 mt-2">↑ {metric.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Revenue & Growth
          </h2>
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
              />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="var(--accent)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Membership Mix
          </h2>
          <div className="space-y-3">
            {membershipData.map((plan, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {plan.name}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {plan.value}
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${(plan.value / 400) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Monthly Revenue Breakdown
        </h2>
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={revenueData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
            />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="var(--primary)"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
