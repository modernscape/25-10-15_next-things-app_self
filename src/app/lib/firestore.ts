import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
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

// Update、Delete
export async function updateItem(thingID: string, itemID: string, newText: string) {
  const thingRef = doc(db, key_things, thingID); // thing
  const snapshot = await getDoc(thingRef);
  if (!snapshot.exists()) return;

  const thing = snapshot.data() as Thing;
  const oldItem = thing.items.find((item) => item.id === itemID);
  if (!oldItem) return;

  await updateDoc(thingRef, {
    items: arrayRemove(oldItem),
  });

  if (newText !== "") {
    await updateDoc(thingRef, {
      items: arrayUnion({ items: { ...oldItem, text: newText } }),
    });
  }
}

// moveUp, moveUDown
