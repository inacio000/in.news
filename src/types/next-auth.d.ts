import { Session } from 'next-auth';

interface Subscription {
  status: string;
}

declare module 'next-auth' {
  interface Session {
    activeSubscription: Subscription | null;
  }
}
