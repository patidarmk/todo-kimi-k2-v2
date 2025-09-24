import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Todo, categories } from '@/data/todos';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  initialData?: Partial<Todo>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function TodoForm({ onSubmit, initialData, submitLabel = 'Add Todo', onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialData?.priority || 'medium');
  const [category, setCategory] = useState(initialData?.category || 'Other');
  const [dueDate, setDueDate] = useState<Date | undefined>(initialData?.dueDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category,
        dueDate
      });
      
      // Reset form if not editing
      if (!initialData) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setCategory('Other');
        setDueDate(undefined);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title *
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          required
          className="focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)..."
          rows={3}
          className="focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority
          </label>
          <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
            <SelectTrigger id="priority" className="focus:ring-2 focus:ring-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="focus:ring-2 focus:ring-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="dueDate" className="text-sm font-medium">
            Due Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          type="submit" 
          disabled={isSubmitting || !title.trim()}
          className="flex-1"
        >
          {isSubmitting ? (
            'Saving...'
          ) : (
            <>
              {initialData ? <Edit className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {submitLabel}
            </>
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}