import { useState } from "react";
import { Link } from "react-router-dom";
import "./Gear.css";

const gearItems = [
{
id: 1,
name: "Trekking Backpack",
category: "Backpacks",
detail: "50L Hiking Backpack",
price: 4,
popular: true,
image:
"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
},
{
id: 2,
name: "Down Jacket",
category: "Clothing",
detail: "Warmth up to -20°C",
price: 6,
popular: true,
image:
"https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=900&q=85",
},
{
id: 3,
name: "Hiking Boots",
category: "Footwear",
detail: "Waterproof Trekking Boots",
price: 5,
popular: true,
image:
"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
},
{
id: 4,
name: "Sleeping Bag",
category: "Camping",
detail: "Comfort up to -10°C",
price: 4,
popular: false,
image:
"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=900&q=85",
},
{
id: 5,
name: "Trekking Poles",
category: "Accessories",
detail: "Lightweight Aluminium",
price: 2,
popular: false,
image:
"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85",
},
{
id: 6,
name: "Headlamp",
category: "Accessories",
detail: "Rechargeable LED",
price: 2,
popular: false,
image:
"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
},
{
id: 7,
name: "Trekking Tent",
category: "Camping",
detail: "2 Person Mountain Tent",
price: 8,
popular: false,
image:
"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=85",
},
{
id: 8,
name: "Hiking Gloves",
category: "Clothing",
detail: "Thermal Mountain Gloves",
price: 2,
popular: false,
image:
"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
},
];

const filters = [
"All Gear",
"Backpacks",
"Clothing",
"Footwear",
"Camping",
"Accessories",
];

const adventures = [
{
name: "Everest Base Camp",
region: "EVEREST REGION",
detail: "Cold weather gear · High altitude",
image:
"https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",
},
{
name: "Annapurna Circuit",
region: "ANNAPURNA REGION",
detail: "Hiking gear · Multi-day trekking",
image:
"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
},
{
name: "Langtang Valley",
region: "LANGTANG",
detail: "Light trekking · Mountain adventure",
image:
"https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=85",
},
];

export default function Gear() {
const [activeFilter, setActiveFilter] = useState("All Gear");
const [search, setSearch] = useState("");

const filteredGear = gearItems.filter((item) => {
const categoryMatch =
activeFilter === "All Gear" ||
item.category === activeFilter;


const searchMatch =
  item.name
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  item.detail
    .toLowerCase()
    .includes(search.toLowerCase());

return categoryMatch && searchMatch;


});

return ( <main className="gear-page">


  {/* HERO */}
  <section className="gear-hero">
    <div className="gear-hero-overlay" />

    <div className="gear-hero-content">
      <span className="gear-eyebrow">
        HIMALAYAN TREKKING GEAR
      </span>

      <h1>
        Hike Higher.
        <br />
        <span>Travel Lighter.</span>
      </h1>

      <p>
        Rent professional Himalayan hiking and trekking gear
        without carrying everything from home.
      </p>

      <div className="gear-hero-buttons">
        <a
          href="#gear-shop"
          className="gear-primary-button"
        >
          Explore Gear
        </a>

        <Link
          to="/trekking"
          className="gear-secondary-button"
        >
          Explore Treks →
        </Link>
      </div>

      <div className="gear-stats">
        <div>
          <strong>50+</strong>
          <span>Gear Items</span>
        </div>

        <div>
          <strong>$2+</strong>
          <span>Daily Rental</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Local Support</span>
        </div>
      </div>
    </div>
  </section>

  {/* INTRO */}
  <section className="gear-intro">
    <span className="section-label">
      RENT SMART
    </span>

    <h2>
      Himalayan Hiking Gear, Ready When You Are.
    </h2>

    <p>
      From Everest Base Camp to Annapurna, Langtang and Manaslu,
      get reliable trekking equipment without buying expensive gear.
      Choose your equipment, select your dates and start your adventure.
    </p>
  </section>

  {/* GEAR SHOP */}
  <section
    id="gear-shop"
    className="gear-shop-section"
  >
    <div className="gear-section-header">
      <div>
        <span className="section-label">
          GEAR RENTAL SHOP
        </span>

        <h2>Trekking Essentials</h2>
      </div>

      <div className="gear-search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search gear..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>
    </div>

    <div className="gear-filters">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          className={
            activeFilter === filter
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveFilter(filter)
          }
        >
          {filter}
        </button>
      ))}
    </div>

    <div className="gear-products-grid">
      {filteredGear.map((item) => (
        <article
          className="gear-product-card"
          key={item.id}
        >
          <div className="gear-product-image">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
            />

            {item.popular && (
              <span className="popular-badge">
                Popular
              </span>
            )}

            <button
              type="button"
              className="gear-favorite"
              aria-label={"Save " + item.name}
            >
              ♡
            </button>
          </div>

          <div className="gear-product-content">
            <span className="gear-category">
              {item.category}
            </span>

            <h3>{item.name}</h3>

            <p>{item.detail}</p>

            <div className="gear-product-bottom">
              <div className="gear-price">
                <strong>
                  ${item.price}
                </strong>

                <span>/ day</span>
              </div>

              <button
                type="button"
                className="rent-button"
              >
                Rent Now
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>

    {filteredGear.length === 0 && (
      <div className="no-gear-found">
        <h3>No gear found</h3>

        <p>
          Try another category or search term.
        </p>
      </div>
    )}
  </section>

  {/* PREMIUM WHY RENT */}
  <section className="gear-benefits-section">
    <div className="gear-benefits-container">

      <div className="gear-benefits-header">
        <div>
          <span className="gear-section-label">
            THE SMART WAY TO TREK
          </span>

          <h2>
            Travel Light.
            <span>Trek Further.</span>
          </h2>
        </div>

        <p>
          Get the equipment you need for the Himalayas
          without the cost, hassle and extra baggage of
          buying and carrying everything from home.
        </p>
      </div>

      <div className="gear-benefits-grid">

        <div className="gear-benefit-card">
          <div className="benefit-top">
            <span className="benefit-number">
              01
            </span>

            <span className="benefit-icon">
              ◈
            </span>
          </div>

          <h3>Smart Savings</h3>

          <p>
            Rent quality trekking equipment for your adventure
            and avoid spending hundreds of dollars on gear
            you may only use once.
          </p>

          <div className="benefit-line" />
        </div>


        <div className="gear-benefit-card featured">
          <div className="benefit-top">
            <span className="benefit-number">
              02
            </span>

            <span className="benefit-icon">
              ⌁
            </span>
          </div>

          <h3>
            Travel Without the Weight
          </h3>

          <p>
            Arrive in Nepal with less luggage.
            Collect your trekking gear locally and
            focus on the journey ahead.
          </p>

          <div className="benefit-line" />
        </div>


        <div className="gear-benefit-card">
          <div className="benefit-top">
            <span className="benefit-number">
              03
            </span>

            <span className="benefit-icon">
              ▲
            </span>
          </div>

          <h3>
            Ready for the Himalayas
          </h3>

          <p>
            Choose equipment suitable for changing
            mountain conditions, from high-altitude
            trails to cold Himalayan nights.
          </p>

          <div className="benefit-line" />
        </div>


        <div className="gear-benefit-card">
          <div className="benefit-top">
            <span className="benefit-number">
              04
            </span>

            <span className="benefit-icon">
              ◎
            </span>
          </div>

          <h3>
            Local Expert Support
          </h3>

          <p>
            Our local team helps you choose the
            right equipment based on your destination,
            season and trekking requirements.
          </p>

          <div className="benefit-line" />
        </div>

      </div>
    </div>
  </section>

  {/* ADVENTURES */}
  <section className="gear-adventures-section">
    <div className="gear-section-header">
      <div>
        <span className="section-label">
          PREPARE FOR THE HIMALAYAS
        </span>

        <h2>
          Gear for Every Adventure
        </h2>
      </div>

      <Link
        to="/trekking"
        className="view-treks-link"
      >
        View Trekking Packages →
      </Link>
    </div>

    <div className="adventure-grid">
      {adventures.map((adventure) => (
        <Link
          to="/trekking"
          className="adventure-card"
          key={adventure.name}
        >
          <img
            src={adventure.image}
            alt={adventure.name}
            loading="lazy"
          />

          <div className="adventure-overlay" />

          <div className="adventure-content">
            <span>
              {adventure.region}
            </span>

            <h3>
              {adventure.name}
            </h3>

            <p>
              {adventure.detail}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>

  {/* CTA */}
  <section className="gear-cta">
    <div>
      <span className="section-label">
        READY FOR THE MOUNTAINS?
      </span>

      <h2>
        Your Adventure. Our Gear.
      </h2>

      <p>
        Book your trekking equipment before you
        arrive in Nepal.
      </p>

      <a
        href="#gear-shop"
        className="gear-primary-button"
      >
        Browse Rental Gear →
      </a>
    </div>
  </section>

</main>


);
}
