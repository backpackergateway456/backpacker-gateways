import { useState } from "react";
import "./DestinationSearch.css";

const destinations = [
  "Kathmandu",
  "Pokhara",
  "Everest Base Camp",
  "Annapurna Circuit",
  "Chitwan",
  "Lalitpur",
  "Bhaktapur",
  "Nagarkot",
  "Manali",
  "Ladakh",
];

export default function DestinationSearch({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");

  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(query.toLowerCase())
  );

  const selectDestination = (destination) => {
    setQuery(destination);
    onChange(destination);
    setOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    onChange("");
  };

  return (
    <div className="destination-search">

      <button
        type="button"
        className="destination-trigger"
        onClick={() => setOpen(!open)}
      >
        <div className="destination-icon">⌕</div>

        <div className="destination-content">
          <span>Where</span>

          <strong>
            {query || "Search destinations"}
          </strong>
        </div>

        {query && (
          <span
            className="destination-clear"
            onClick={(e) => {
              e.stopPropagation();
              clearSearch();
            }}
          >
            ×
          </span>
        )}
      </button>

      {open && (
        <div className="destination-dropdown">

          <div className="destination-search-input">
            <span>⌕</span>

            <input
              autoFocus
              type="text"
              placeholder="Search destinations"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(e.target.value);
              }}
            />
          </div>

          {!query && (
            <div className="destination-label">
              Popular destinations
            </div>
          )}

          {filteredDestinations.length > 0 ? (
            <div className="destination-results">

              {filteredDestinations.map((destination) => (
                <button
                  type="button"
                  className="destination-option"
                  key={destination}
                  onClick={() =>
                    selectDestination(destination)
                  }
                >
                  <div className="option-icon">
                    ◉
                  </div>

                  <div>
                    <strong>{destination}</strong>
                    <span>Nepal</span>
                  </div>
                </button>
              ))}

            </div>
          ) : (
            <div className="destination-empty">
              <strong>No destinations found</strong>
              <span>
                Try searching another destination
              </span>
            </div>
          )}

        </div>
      )}
    </div>
  );
}