import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trash2, 
  Edit3, 
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Todo } from '@/data/todos';
import { TodoForm } from './todo-form';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updates: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    onUpdate(todo.id, updates);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDueDateStatus = () => {
    if (!todo.dueDate) return null;
    
    const dueDate = new Date(todo.dueDate);
    const now = new Date();
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      return { text: `Overdue by ${format(dueDate, 'MMM d')}`, color: 'text-red-600', icon: AlertCircle };
    } else if (isToday(dueDate)) {
      return { text: 'Due today', color: 'text-orange-600', icon: Clock };
    } else if (isTomorrow(dueDate)) {
      return { text: 'Due tomorrow', color: 'text-blue-600', icon: Calendar };
    } else {
      return { text: `Due ${format(dueDate, 'MMM d')}`, color: 'text-gray-600', icon: Calendar };
    }
  };

  const dueDateStatus = getDueDateStatus();

  if (isEditing) {
    return (
      <Card className="mb-4 border-blue-200 shadow-sm">
        <CardContent className="p-6">
          <TodoForm
            onSubmit={handleUpdate}
            initialData={todo}
            submitLabel="Update Todo"
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "mb-4 transition-all duration-200 hover:shadow-md",
      todo.completed ? "opacity-75 bg-gray-50" : "bg-white"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggleComplete(todo.id)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={cn(
                  "font-medium text-lg break-words",
                  todo.completed && "line-through text-gray-500"
                )}>
                  {todo.title}
                </h3>
                
                {todo.description && (
                  <p className={cn(
                    "text-sm text-gray-600 mt-1 break-words",
                    todo.completed && "text-gray-400"
                  )}>
                    {todo.description}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge className={getPriorityColor(todo.priority)}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                  </Badge>
                  
                  {todo.category && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {todo.category}
                    </Badge>
                  )}
                  
                  {dueDateStatus && (
                    <div className={cn("flex items-center gap-1 text-sm", dueDateStatus.color)}>
                      <dueDateStatus.icon className="h-3 w-3" />
                      {dueDateStatus.text}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Edit3 className="h-4 w-4 text-blue-600" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this todo?')) {
                      onDelete(todo.id);
                    }
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}