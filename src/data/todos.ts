export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  category?: string;
}

export const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature release',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2024-01-20'),
    category: 'Work'
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending PRs from the development team',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2024-01-14'),
    category: 'Work'
  },
  {
    id: '3',
    title: 'Grocery shopping',
    description: 'Buy vegetables, fruits, and household supplies',
    completed: false,
    priority: 'low',
    createdAt: new Date('2024-01-16'),
    dueDate: new Date('2024-01-17'),
    category: 'Personal'
  },
  {
    id: '4',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for weekly team sync',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2024-01-18'),
    category: 'Work'
  },
  {
    id: '5',
    title: 'Exercise routine',
    description: '30 minutes of cardio and strength training',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2024-01-16'),
    category: 'Health'
  },
  {
    id: '6',
    title: 'Read technical blog',
    description: 'Read and summarize the latest React best practices article',
    completed: false,
    priority: 'low',
    createdAt: new Date('2024-01-15'),
    category: 'Learning'
  }
];

export const categories = ['Work', 'Personal', 'Health', 'Learning', 'Shopping', 'Other'];