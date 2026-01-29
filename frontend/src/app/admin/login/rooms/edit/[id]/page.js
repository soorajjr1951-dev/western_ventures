"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { updateRoom, getRooms } from "../../../../../lib/rooms";
import "../../../admin.css";

export default function EditRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    getRooms().then((rooms) =>
      setRoom(rooms.find((r) => r.id == id))
    );
  }, [id]);

  if (!room) return null;

  async function submit(e) {
    e.preventDefault();
    await updateRoom(id, room);
    window.location.href = "/admin/login/rooms";
  }

  return (
    <form className="admin-card" onSubmit={submit}>
      <h2>Edit Room</h2>

      {Object.keys(room).map((key) => (
        <input
          key={key}
          value={room[key]}
          onChange={(e) =>
            setRoom({ ...room, [key]: e.target.value })
          }
        />
      ))}

      <button>Update</button>
    </form>
  );
}
