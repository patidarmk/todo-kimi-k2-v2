import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { CheckSquare, Plus, BarChart3, Filter } from 'lucide-react';

interface HeaderProps {
  onShowAddForm: () => void;
  activeFilter: string;
}

export function Header({ onShowAddForm, activeFilter }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-500">Organize your day, achieve your goals</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>{activeFilter}</span>
            </div>
            <Button
              onClick={onShowAddForm}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}