import { User } from './user.interface';

export interface Message {
  id: number;
  message: string;
  createdAt: Date;
  author: User;
}
