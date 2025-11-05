export interface Thing {
  id: string;
  order: number;
  title: string;
  items: Item[];
  createdAt: Date;
  trashed: boolean;
}

export interface ThingsState {
  things: Thing[];
  setThings: (things: Thing[]) => void;
  view: "active" | "trashed";
  setView: (view: "active" | "trashed") => void;
}

export interface Item {
  id: string;
  text: string
}