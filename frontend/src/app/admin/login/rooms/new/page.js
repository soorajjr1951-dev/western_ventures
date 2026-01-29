"use client";

import { useState } from "react";
import { createRoom } from "../../../../lib/rooms";
import "../../admin.css";

export default function NewRoom() {
  const [room, setRoom] = useState({
    name: "",
    slug: "",
    category: "AC",
    price: "",
    short_description: "",
  });

  async function submit(e) {
    e.preventDefault();
    await createRoom(room);
    window.location.href = "/admin/login/rooms";
  }

  return (
    <form className="admin-card" onSubmit={submit}>
      <h2>New Room</h2>

      {Object.keys(room).map((key) => (
        <input
          key={key}
          placeholder={key.replace("_", " ")}
          onChange={(e) =>
            setRoom({ ...room, [key]: e.target.value })
          }
        />
      ))}

      <button>Create</button>
    </form>
  );
}
