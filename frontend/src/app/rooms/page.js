"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./rooms.css";
import useScrollReveal from "../hooks/useScrollReveal";
import { getRooms } from "../lib/strapi";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ filter & sort state (INITIALIZED FIRST → avoids runtime error)
  const [filterType, setFilterType] = useState("ALL"); // ALL | AC | NON-AC 
  const [sortOrder, setSortOrder] = useState("LOW_HIGH"); // LOW_HIGH | HIGH_LOW

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  // ✅ derived rooms list (stable & predictable)
  const visibleRooms = useMemo(() => {
    let list = [...rooms];

    if (filterType !== "ALL") {
      list = list.filter((room) => room.category === filterType);
    }

    list.sort((a, b) => {
      if (sortOrder === "LOW_HIGH") return a.price - b.price;
      return b.price - a.price;
    });

    return list;
  }, [rooms, filterType, sortOrder]);

  // animate when visibleRooms changes
  useScrollReveal([visibleRooms.length]);

  if (loading) {
    return <p style={{ padding: 120 }}>Loading rooms…</p>;
  }

  return (
    <main className="rooms-page">
      <div className="container">
        {/* HEADER */}
        <header className="rooms-header" data-animate>
          <span className="eyebrow">The Sanctuaries</span>
          <h1>
            Rest in the <br />
            <span>Sublime.</span>
          </h1>
          <p>
            Eight uniquely commissioned chambers, each serving as a lens to view
            the Arabian Sea. Designed for stillness, privacy, and the gentle
            sounds of the tides.
          </p>
        </header>

        {/* FILTER & SORT */}
        <div className="rooms-controls" data-animate>
          <div className="filter-group">
            {["ALL", "AC", "NON-AC"].map((type) => (
              <button
                key={type}
                className={filterType === type ? "active" : ""}
                onClick={() => setFilterType(type)}
              >
                {type.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="sort-group">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="LOW_HIGH">Price: Low → High</option>
              <option value="HIGH_LOW">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* ROOMS LIST */}
        {visibleRooms.length === 0 ? (
          <p className="no-rooms">No rooms match your selection.</p>
        ) : (
          <div className="rooms-list">
            {visibleRooms.map((room, index) => (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className={`room-row-card ${
                  index % 2 !== 0 ? "reverse" : ""
                }`}
                data-animate
              >
                {/* IMAGE */}
                <div className="room-image">
                  {room.previewImage ? (
                    <img src={room.previewImage} alt={room.name} />
                  ) : (
                    <div className="room-image-placeholder" />
                  )}
                  <div className="room-type">{room.category}</div>
                </div>

                {/* CONTENT */}
                <div className="room-content">
                  <div className="stars">★★★</div>

                  <h3>{room.name}</h3>

                  <p className="description">
                    {room.description ||
                      "A thoughtfully designed coastal retreat crafted for calm, privacy, and rest."}
                  </p>

                  <div className="room-footer">
                    <div>
                      <span className="rate-label">Nightly rate from</span>
                      <div className="price">
                        ₹{room.price.toLocaleString()}
                      </div>
                    </div>

                    <span className="arrow-btn">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
