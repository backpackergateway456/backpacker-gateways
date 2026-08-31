export default function Gallery({ images = [] }) {
  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">OUR HOUSE</span>
          <h2>Life at Himalayan Backpacker House</h2>
          <p>
            Meet fellow travellers, relax after a trek and discover the
            atmosphere that makes our house feel like home.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <img
              key={image.id || index}
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}