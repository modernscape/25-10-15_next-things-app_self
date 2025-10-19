import { db } from "./firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot, arrayUnion } from "firebase/firestore";
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
export function subscribeThings(callback: (things: Thing[]) => void) {
  const q = query(collection(db, key_things), orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const things = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Thing));
    callback(things);
  });
}

// Update
export async function updateThing(thingID: string, newData: Partial<Thing>) {
  const thingRef = doc(db, key_things, thingID);
  await updateDoc(thingRef, newData);
}

// Delete
export async function deleteThing(thingID: string) {
  const thingRef = doc(db, key_things, thingID);
  await deleteDoc(thingRef);
}

/*
Item
*/
// Create
export async function addItem(thingID: string) {
  const thingRef = doc(db, key_things, thingID);
  await updateDoc(thingRef, {
    items: arrayUnion({ id: "", title: "新しいitem" }),
  });
}

// Read
// Update
// Delete
