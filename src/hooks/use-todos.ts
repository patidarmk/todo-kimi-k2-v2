import { useState, useEffect } from 'react';
import { Todo, initialTodos } from '@/data/todos';
import { showSuccess, showError } from '@/utils/toast';

const STORAGE_KEY = 'todos-app-data';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTodos = JSON.parse(stored).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
        }));
        setTodos(parsedTodos);
      } else {
        // Initialize with mock data if no stored data
        setTodos(initialTodos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos(initialTodos);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos:', error);
        showError('Failed to save todos');
      }
    }
  }, [todos, loading]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
      completed: false
    };
    setTodos(prev => [newTodo, ...prev]);
    showSuccess('Todo added successfully!');
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
    showSuccess('Todo updated successfully!');
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    showSuccess('Todo deleted successfully!');
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    showSuccess('Completed todos cleared!');
  };

  const getTodosByFilter = (filter: 'all' | 'active' | 'completed' | 'priority' | 'category', value?: string) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'priority':
        return value ? todos.filter(todo => todo.priority === value) : todos;
      case 'category':
        return value ? todos.filter(todo => todo.category === value) : todos;
      default:
        return todos;
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    overdue: todos.filter(todo => 
      todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()
    ).length
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
    getTodosByFilter,
    stats
  };
}