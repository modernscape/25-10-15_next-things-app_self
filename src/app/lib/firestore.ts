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
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Thing } from "@/types";

const key_things = "things";

/*
Thing
*/
// Create
export async function addThing(title: string, order: number) {
  const ref = collection(db, key_things);
  return await addDoc(ref, {
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

//
export async function toggleTrash(thingID: string) {
  const thingRef = doc(db, key_things, thingID)
  const snapshot = await getDoc(thingRef)
  if (!snapshot.exists()) return

  const thing = snapshot.data() as Thing
  await updateDoc(thingRef, {
    trashed: !thing.trashed
  })
}

/*
Item
*/
// Create
export async function addItem(thingID: string) {
  const thingRef = doc(db, key_things, thingID);


  const uniqueID = doc(collection(db, "dummy")).id

  await updateDoc(thingRef, {
    items: arrayUnion({ id: uniqueID, text: "new item" }),
  });
}

// Update、Delete
// export async function updateItem(thingID: string, itemID: string, newText: string) {
//   const thingRef = doc(db, key_things, thingID); // thing
//   const snapshot = await getDoc(thingRef);
//   if (!snapshot.exists()) return;

//   const thing = snapshot.data() as Thing;
//   const oldItem = thing.items.find((item) => item.id === itemID);
//   if (!oldItem) return;

//   await updateDoc(thingRef, {
//     items: arrayRemove(oldItem),
//   });

//   if (newText !== "") {
//     await updateDoc(thingRef, {
//       items: arrayUnion({ ...oldItem, text: newText }),
//     });
//   }
// }


// export async function updateItemAtIndex(thingID: string, index: number, newItem: string) {
//   const thingRef = doc(db, key_things, thingID)
//   const snapshot = await getDoc(thingRef)

//   if (!snapshot.exists()) return

//   const data = snapshot.data() // Thing
//   const items = data.items || []

//   // 範囲外保護
//   if (index < 0 || index >= items.length) return

//   items[index] = {
//     ...items[index],
//     text: newItem
//   }

//   await updateDoc(thingRef, {
//     items,
//   })
// }

//

// Firestore 的に安全な書き方（同時編集対策）
export async function updateItemAtIndex(thingID: string, index: number, newText: string) {
  const thingRef = doc(db, key_things, thingID)

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(thingRef)
    if (!snap.exists()) return

    const thing = snap.data() as Thing
    const items = thing.items || []

    if (index < 0 || index >= items.length) return

    items[index] = { ...items[index], text: newText }
    transaction.update(thingRef, { items })
  })
}




// moveUp, moveUDown
import { runTransaction } from "firebase/firestore";

export async function moveThing(thingID: string, up: boolean) {
  const q = query(collection(db, key_things), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  const things = snapshot.docs.map((t) => ({
    id: t.id,
    ...t.data(),
  })) as Thing[];

  const index = things.findIndex((t) => t.id === thingID);
  if (index === -1) return;

  const swapIndex = up ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= things.length) return;

  const currentRef = doc(db, key_things, things[index].id);
  const swapRef = doc(db, key_things, things[swapIndex].id);

  runTransaction(db, async (tx) => {
    tx.update(currentRef, { order: swapIndex });
    tx.update(swapRef, { order: index });
  });
}

// QuerySnapshot
//   ├── snapshot.docs[0] → DocumentSnapshot
//   ├── snapshot.docs[1] → DocumentSnapshot
//   ├── snapshot.docs[2] → DocumentSnapshot
//   └── ...
