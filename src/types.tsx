export interface Thing {
  id: string;
  order: number;
  title: string;
  items: { id: string; text: string }[];
  createdAt: Date;
}
