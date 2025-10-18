import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { Thing } from "@/types";

const key_things = "things";
/// Thing
// Create
export async function addThing(title: string, order: number) {
  const ref = collection(db, key_things); // things
  return await addDoc(ref, {
    title,
    items: [],
    trashed: false,
    order: order,
    createdAt: new Date(),
  });
}
// Read
export async function subscribe() {}

// Update
export async function updateThing(id: string, newData: Partial<Thing>) {}

// Delete

/// Item
// Create
// Read
// Update
// Delete
