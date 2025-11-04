export class Member {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  registeredAt: Date;
  isActive: boolean;
}