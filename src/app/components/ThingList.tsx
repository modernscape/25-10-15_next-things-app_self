"use client";
import { useThingStore } from "../store/thingsStore";

export default function ThingList() {
  const view = useThingStore((state) => state.view);
  return view === "active" ? <div>things</div> : <div>trash</div>;
}
