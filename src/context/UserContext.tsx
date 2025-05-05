import React, { createContext, useState, ReactNode } from 'react';

type Task = {
  id: string;
  title: string;
  assignedTo: string; // child ID
  rewardId: string;
  completed: boolean;
  proofRequired: 'photo' | 'video' | 'none';
  recurrence?: 'daily' | 'weekly' | 'none';
  dueDate?: string;
  completedDates: string[];
};

type Reward = {
  id: string;
  title: string;
  description: string;
  createdBy: string; // parent ID
};

type Child = {
  id: string;
  name: string;
  age: number;
  parentId: string;
  screenTimeBlock: {
    start: string; // "07:00"
    end: string; // "15:00"
    days: number[]; // [1,2,3,4,5] for weekdays
  };
};

type UserContextType = {
  tasks: Task[];
  rewards: Reward[];
  children: Child[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'completedDates'>) => void;
  completeTask: (taskId: string, proof?: string) => void;
  addReward: (reward: Omit<Reward, 'id'>) => void;
  addChild: (child: Omit<Child, 'id'>) => void;
  approveTask: (taskId: string) => void;
  declineTask: (taskId: string) => void;
};

export const UserContext = createContext<UserContextType>({
  tasks: [],
  rewards: [],
  children: [],
  addTask: () => {},
  completeTask: () => {},
  addReward: () => {},
  addChild: () => {},
  approveTask: () => {},
  declineTask: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [appChildren, setAppChildren] = useState<Child[]>([]);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'completedDates'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substring(7),
      completed: false,
      completedDates: [],
    };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (taskId: string, proof?: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: true,
              completedDates: [...task.completedDates, new Date().toISOString()],
            }
          : task
      )
    );
  };

  const addReward = (reward: Omit<Reward, 'id'>) => {
    const newReward: Reward = {
      ...reward,
      id: Math.random().toString(36).substring(7),
    };
    setRewards([...rewards, newReward]);
  };

  const addChild = (child: Omit<Child, 'id'>) => {
    const newChild: Child = {
      ...child,
      id: Math.random().toString(36).substring(7),
    };
    setAppChildren([...appChildren, newChild]);
  };

  const approveTask = (taskId: string) => {
    // In a real app, you might want to mark this differently
    console.log('Task approved:', taskId);
  };

  const declineTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: false } : task
      )
    );
  };

  return (
    <UserContext.Provider
      value={{
        tasks,
        rewards,
        children: appChildren,
        addTask,
        completeTask,
        addReward,
        addChild,
        approveTask,
        declineTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};