"use client";

import { useState } from "react";
import {
  Sparkles,
  Leaf,
  CheckCircle,
  Droplets,
  Wind,
} from "lucide-react";
import "./spa.css";
import useScrollReveal from "../hooks/useScrollReveal";

const SPA_SERVICES = [
  {
    id: 1,
    category: "Ayurveda",
    name: "Abhyanga Therapy",
    description:
      "A full-body massage using warm herbal oils to nourish tissues and calm the nervous system.",
    price: 3200,
  },
  {
    id: 2,
    category: "Rejuvenation",
    name: "Shirodhara",
    description:
      "Continuous pouring of warm oil on the forehead to induce deep relaxation.",
    price: 4200,
  },
  {
    id: 3,
    category: "Detox",
    name: "Panchakarma Lite",
    description:
      "A gentle detox ritual designed to restore digestive fire and balance.",
    price: 5200,
  },
];

export default function SpaPage() {
  const [activeTab, setActiveTab] = useState("Rituals");

  useScrollReveal([activeTab]);

  return (
    <main className="spa-page">
      {/* HERO */}
      <section className="spa-hero" data-animate>
        <div className="spa-icon">
          <Sparkles size={32} />
        </div>

        <h1>
          Joy <span>Ayurvedic</span> Spa
        </h1>

        <p>
          Ancient Keralan wisdom meets the modern quest for stillness.
          We use only cold-pressed oils and hand-picked herbs.
        </p>
      </section>

      {/* TABS */}
      <section className="spa-tabs" data-animate>
        <div className="tab-header">
          {["Rituals", "Consult"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab === "Rituals"
                ? "Healing Rituals"
                : "Dr. Consultation"}
            </button>
          ))}
        </div>

        {/* RITUALS */}
        {activeTab === "Rituals" && (
          <div className="ritual-grid">
            {SPA_SERVICES.map((service) => (
              <div key={service.id} className="ritual-card" data-animate>
                <div className="ritual-head">
                  <div>
                    <span>{service.category}</span>
                    <h3>{service.name}</h3>
                  </div>
                  <strong>₹{service.price}</strong>
                </div>

                <p>{service.description}</p>

                <div className="ritual-footer">
                  <div className="ritual-icons">
                    <Leaf size={16} />
                    <Droplets size={16} />
                    <Wind size={16} />
                  </div>
                  <button>Select Treatment</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONSULT */}
        {activeTab === "Consult" && (
          <div className="consult-grid" data-animate>
            <div className="consult-info">
              <h4>Personalized Healing.</h4>
              <p>
                Every journey begins with an assessment of your
                Prakriti (Dosha type). Our resident Ayurvedic
                doctor will curate your program.
              </p>

              <ul>
                {[
                  "In-depth Dosha Analysis",
                  "Dietary Guidance",
                  "Yoga Recommendations",
                  "Herbal Prescription",
                ].map((item) => (
                  <li key={item}>
                    <CheckCircle size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="consult-box">
              <h5>Book Initial Consultation</h5>
              <input type="date" />
              <button>Schedule Doctor Call</button>
              <p>
                Consultation fee: ₹1,500 (Adjustable against
                treatments)
              </p>
            </div>
          </div>
        )}
      </section>

      {/* FEATURE */}
      <section className="spa-feature" data-animate>
        <div className="feature-image" data-animate="left">
          <img
            src="https://plus.unsplash.com/premium_photo-1658506799059-78e0f7a53bf8?q=80&w=1170&auto=format&fit=crop"
            alt="Wellness Bathtub"
          />
        </div>

        <div className="feature-text" data-animate="right">
          <span>Signature Feature</span>
          <h2>The Wellness Bathtub Ritual.</h2>
          <p>
            A sensory soak infused with flower petals, Himalayan
            salts, and sandalwood essence — grounding your energy
            as the sea breeze flows through the terrace.
          </p>

          <div className="feature-icons">
            <div>
              <Sparkles />
              <small>Rejuvenate</small>
            </div>
            <div>
              <Droplets />
              <small>Detox</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
