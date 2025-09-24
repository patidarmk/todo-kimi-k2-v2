import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}

export function TodoStats({ total, completed, active, overdue }: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: total,
      icon: Circle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active',
      value: active,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Overdue',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-full", stat.bgColor)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {completed} of {total} tasks completed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}