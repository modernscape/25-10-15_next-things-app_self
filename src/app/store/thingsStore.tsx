import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Thing } from "@/types";
import { ThingsState } from "@/types";

export const useThingStore = create<ThingsState>()(
  persist(
    (set) => ({
      things: [],
      setThings: (things: Thing[]) => {
        set({ things });
      },
      view: "active",
      setView: (view: "active" | "trashed") => set({ view }),
    }),
    {
      name: "things-storage",
    }
  )
);

// ・files

// page
//  └layout
// 　　├sidebar
// 　　└thingList
//              └autoWidthInput

// store
// └thingsStore

// lib
// ├firebase
// └firebaseStore

// .env.local

//  ・to install

// firestore
// zustand
// lucide-react
// class-authority-variants
