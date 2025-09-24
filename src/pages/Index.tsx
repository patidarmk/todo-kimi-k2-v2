import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { TodoForm } from '@/components/todo/todo-form';
import { TodoItem } from '@/components/todo/todo-item';
import { TodoStats } from '@/components/todo/todo-stats';
import { TodoFilters } from '@/components/todo/todo-filters';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { useTodos } from '@/hooks/use-todos';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CheckCircle, Filter } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'priority' | 'category'>('all');
  const [filterValue, setFilterValue] = useState<string>('');

  const { 
    todos, 
    loading, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleComplete, 
    clearCompleted, 
    getTodosByFilter, 
    stats 
  } = useTodos();

  // Get filtered todos
  const filteredTodos = useMemo(() => {
    let filtered = getTodosByFilter(filter, filterValue);
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower)) ||
        (todo.category && todo.category.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [todos, filter, filterValue, searchTerm, getTodosByFilter]);

  const handleAddTodo = (todoData: any) => {
    addTodo(todoData);
    setShowAddForm(false);
  };

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed' | 'priority' | 'category') => {
    setFilter(newFilter);
    setFilterValue('');
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
  };

  const getActiveFilterText = () => {
    if (filter === 'all') return 'All Tasks';
    if (filter === 'active') return 'Active Tasks';
    if (filter === 'completed') return 'Completed Tasks';
    if (filter === 'priority') return `Priority: ${filterValue || 'All'}`;
    if (filter === 'category') return `Category: ${filterValue || 'All'}`;
    return 'All Tasks';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header onShowAddForm={() => setShowAddForm(true)} activeFilter={getActiveFilterText()} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats Section */}
        <TodoStats 
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          overdue={stats.overdue}
        />

        {/* Add Todo Form */}
        {showAddForm && (
          <Card className="mb-8 border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TodoForm
                onSubmit={handleAddTodo}
                submitLabel="Add Task"
                onCancel={() => setShowAddForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <TodoFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={handleFilterChange}
          filterValue={filterValue}
          onFilterValueChange={handleFilterValueChange}
          onClearCompleted={clearCompleted}
          hasCompletedTodos={stats.completed > 0}
        />

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || filter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by adding your first task!'
                  }
                </p>
                {!showAddForm && (
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                  onToggleComplete={toggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-16">
        <MadeWithApplaa />
      </footer>
    </div>
  );
};

export default Index;