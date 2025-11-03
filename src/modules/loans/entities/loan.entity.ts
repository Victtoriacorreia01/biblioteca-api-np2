export class Loan {
  id: number;
  memberId: number;
  bookId: number;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status: string;
  fineCents: number;
  member?: any;
  book?: any;
}