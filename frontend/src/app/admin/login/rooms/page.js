"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRooms, deleteRoom } from "../../../lib/rooms";
import "../admin.css";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  async function handleDelete(id) {
    if (confirm("Delete room?")) {
      await deleteRoom(id);
      setRooms((prev) => prev.filter((r) => r.id !== id));
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h2>Rooms</h2>
        <Link href="/admin/login/rooms/new">+ Add Room</Link>
      </header>

      {rooms.map((room) => (
        <div key={room.id} className="admin-row">
          <strong>{room.name}</strong>
          <div>
            <Link href={`/admin/login/rooms/edit/${room.id}`}>Edit</Link>
            <button onClick={() => handleDelete(room.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
