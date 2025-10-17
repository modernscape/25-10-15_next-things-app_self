export interface Thing {
  id: string;
  order: number;
  title: string;
  items: { id: string; text: string }[];
  createdAt: Date;
}

export interface ThingsState {
  things: Thing[];
  setThings: (things: Thing[]) => void;
  view: "active" | "trashed";
  setView: (view: "active" | "trashed") => void;
}
