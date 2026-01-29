"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRoomBySlug } from "../../lib/rooms";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./room-detail.css";

const WHATSAPP_NUMBER = "9495461894";

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useScrollReveal([room]);

  useEffect(() => {
    async function fetchRoom() {
      const data = await getRoomBySlug(slug);
      setRoom(data);
      setLoading(false);
    }

    if (slug) fetchRoom();
  }, [slug]);

  if (loading) return <p style={{ padding: 120 }}>Loading room…</p>;
  if (!room) return <p style={{ padding: 120 }}>Room not found.</p>;

  const [mainImage, ...galleryImages] = room.gallery || [];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello 👋\n\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`
  )}`;

  return (
    <main className="room-detail">
      <div className="room-detail-container">
        <div className="room-detail-card" data-animate>
          <header className="room-detail-header">
            <span>{room.category}</span>
            <h1>
              {room.name.split(" ")[0]}{" "}
              <em>{room.name.split(" ").slice(1).join(" ")}</em>
            </h1>
            <p>{room.short_description}</p>
            <div className="room-price">₹{room.price} / night</div>
          </header>

          {mainImage && (
            <section className="room-gallery">
              <div className="room-gallery-main" data-animate="left">
                <img src={mainImage} alt={room.name} />
              </div>

              <div className="room-gallery-grid" data-animate="right">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img} alt={`${room.name} ${i}`} />
                ))}
              </div>
            </section>
          )}

          {room.description && (
            <section className="room-description" data-animate>
              <h2>About the Room</h2>
              <p>{room.description}</p>
            </section>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            Book via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
