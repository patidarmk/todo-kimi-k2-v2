import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { categories } from '@/data/todos';

interface TodoFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: 'all' | 'active' | 'completed' | 'priority' | 'category';
  onFilterChange: (filter: 'all' | 'active' | 'completed' | 'priority' | 'category') => void;
  filterValue?: string;
  onFilterValueChange: (value: string) => void;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

export function TodoFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  filterValue,
  onFilterValueChange,
  onClearCompleted,
  hasCompletedTodos
}: TodoFiltersProps) {
  return (
    <div className="space-y-4 mb-6 p-4 bg-white rounded-lg border">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[140px] focus:ring-2 focus:ring-blue-500">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="priority">By Priority</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>

          {(filter === 'priority' || filter === 'category') && (
            <Select value={filterValue || ''} onValueChange={onFilterValueChange}>
              <SelectTrigger className="w-[120px] focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {filter === 'priority' ? (
                  <>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </>
                ) : (
                  categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {hasCompletedTodos && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear Completed
          </Button>
        </div>
      )}
    </div>
  );
}