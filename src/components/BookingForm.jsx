import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Searching rooms for ${form.guests} guest(s) from ${form.checkIn} to ${form.checkOut}.`
    );
  };

  return (
    <section className="booking-section">
      <div className="container">
        <form className="booking-card" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="checkIn">Check in</label>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              value={form.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="checkOut">Check out</label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              value={form.checkOut}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          <button type="submit" className="primary-btn">
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}