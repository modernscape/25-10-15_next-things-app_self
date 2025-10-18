import { db } from "./firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Thing } from "@/types";

const key_things = "things";

/*
Thing
*/
// Create
export async function addThing(title: string, order: number) {
  const ref = collection(db, key_things);
  return addDoc(ref, {
    id: new Date().toString(),
    title,
    order,
    items: [],
    trashed: false,
    createdAt: new Date(),
  });
}

// Read
export async function subscribe(callback: (things: Thing[]) => void) {
  const q = query(collection(db, key_things), orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const things_ = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Thing));
    callback(things_);
  });
}
// Update
export async function updateThing(id: string, newData: Partial<Thing>) {
  const thingRef = doc(db, key_things, id);
  await updateDoc(thingRef, newData);
}

// Delete
export async function deleteThing(id: string) {
  const thingRef = doc(db, key_things, id);
  await deleteDoc(thingRef);
}

/*
Item
*/
// Create
// Read
// Update
// Delete
