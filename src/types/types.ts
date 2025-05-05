// Define types for navigation
export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    ParentStack: undefined;
    ChildStack: undefined;
  };
  
  export type ParentStackParamList = {
    ParentHome: undefined;
    TaskManagement: undefined;
    RewardManagement: undefined;
    Settings: undefined;
  };
  
  export type ChildStackParamList = {
    ChildHome: undefined;
    TaskCompletion: { taskId: string };
    ProgressView: undefined;
  };
  
  // Define other app-wide types here
  export type UserRole = 'parent' | 'child';
  
  export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    parentEmail?: string;
    nickname?: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    assignedTo: string;
    rewardId: string;
    completed: boolean;
    proofRequired: 'photo' | 'video' | 'none';
    recurrence?: 'daily' | 'weekly' | 'none';
    dueDate?: string;
    completedDates: string[];
  }
  
  export interface Reward {
    id: string;
    title: string;
    description: string;
    createdBy: string;
  }
  
  export interface Child {
    id: string;
    name: string;
    age: number;
    parentId: string;
    screenTimeBlock: {
      start: string;
      end: string;
      days: number[];
    };
  }