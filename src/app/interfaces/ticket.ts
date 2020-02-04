export enum PriorityType {
  LOW      = 0,
  HIGH     = 1,
  CRITICAL = 2
}

export enum StatusType {
  OPEN       = 0,
  INPROGRESS = 1,
  DONE       = 2
}

export interface ISupportTicket {
  id: number;
  title: string;
  description: string
  priority: PriorityType // (selectable from a predefined list)
  status: StatusType     // (selectable from a predefined list)
  email : string
  refersTo: number[];   // <Relation to other Support tickets IDs>
}
