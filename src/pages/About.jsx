import "./About.css";

export default function About() {
  return (
    <main className="bk-about">

      {/* ================= HERO ================= */}
      <section className="bk-hero">
        <div className="bk-hero-bg"></div>

        <div className="bk-container bk-hero-grid">

          <div className="bk-hero-copy">

            <div className="bk-kicker">
              FOUNDER · COMPUTER ENGINEER · SOFTWARE DEVELOPER
            </div>

            <h1>
              Building
              <span> Backpacker Gateways.</span>
            </h1>

            <p className="bk-hero-description">
              Backpacker Gateways is built by Bikash Khanal,
              a Computer Engineer and MERN Stack Developer focused
              on creating modern, reliable and traveller-first digital
              experiences.
            </p>

            <div className="bk-hero-actions">
              <a href="#story" className="bk-btn bk-btn-primary">
                His Story
              </a>

              <a href="#platform" className="bk-btn bk-btn-outline">
                The Platform
              </a>
            </div>

            <div className="bk-hero-meta">

              <div>
                <strong>01</strong>
                <span>Engineer</span>
              </div>

              <div>
                <strong>02</strong>
                <span>MERN Expert</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Builder</span>
              </div>

            </div>

          </div>


          <div className="bk-profile-wrapper">

            <div className="bk-profile-frame">
              <img
                src="/bikash-khanal.jpg"
                alt="Bikash Khanal"
              />
            </div>

            <div className="bk-profile-card">

              <span>
                FOUNDER · BUILDER
              </span>

              <strong>
                Bikash Khanal
              </strong>

              <small>
                Computer Engineer · MERN Stack Developer
              </small>

            </div>

          </div>

        </div>
      </section>


      {/* ================= STORY ================= */}
      <section id="story" className="bk-intro">

        <div className="bk-container">

          <div className="bk-section-number">
            01 / THE PERSON
          </div>

          <div className="bk-intro-grid">

            <h2>
              Engineer by
              <span> foundation.</span>
            </h2>

            <div className="bk-intro-text">

              <p>
                Bikash Khanal is a Computer Engineer and Software
                Developer from Gorkha, Nepal, with a strong foundation
                in engineering, programming and technology.
              </p>

              <p>
                He completed his Computer Engineering degree from
                National College of Engineering and developed his
                expertise across modern web technologies, databases,
                APIs and full-stack application development.
              </p>

              <p>
                His core strength is the MERN Stack — MongoDB,
                Express.js, React and Node.js — allowing him to
                design and build complete digital platforms from
                frontend to backend.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= EXPERTISE ================= */}
      <section className="bk-expertise">

        <div className="bk-container">

          <div className="bk-section-number light">
            02 / EXPERTISE
          </div>

          <div className="bk-expertise-heading">

            <div>

              <span className="bk-label light-text">
                TECHNOLOGY
              </span>

              <h2>
                Full-stack
                <span> capability.</span>
              </h2>

            </div>

            <p>
              Combining engineering knowledge with modern software
              development to build scalable, practical and
              user-focused digital products.
            </p>

          </div>


          <div className="bk-tech-grid">

            <article>
              <span>01</span>
              <h3>React.js</h3>
              <p>
                Modern, responsive and interactive user experiences.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Node.js</h3>
              <p>
                Powerful backend systems, APIs and application logic.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>MongoDB</h3>
              <p>
                Flexible and scalable database-driven applications.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Express.js</h3>
              <p>
                Clean REST APIs and reliable backend architecture.
              </p>
            </article>

            <article>
              <span>05</span>
              <h3>MERN Stack</h3>
              <p>
                Complete full-stack product development.
              </p>
            </article>

            <article>
              <span>06</span>
              <h3>Engineering</h3>
              <p>
                Structured thinking focused on performance,
                scalability and usability.
              </p>
            </article>

          </div>

        </div>

      </section>


      {/* ================= PLATFORM ================= */}
      <section id="platform" className="bk-platform">

        <div className="bk-platform-overlay"></div>

        <div className="bk-container">

          <div className="bk-platform-content">

            <span>
              WHAT HE IS BUILDING NOW
            </span>

            <h2>
              Backpacker
              <strong> Gateways.</strong>
            </h2>

            <p>
              Today, Bikash is developing Backpacker Gateways —
              a technology-driven travel platform designed around
              the real needs of travellers.
            </p>

            <p>
              The goal is simple: make travel planning easier,
              experiences more trustworthy and every journey
              more connected.
            </p>

            <div className="bk-platform-credit">

              <small>
                FOUNDED · DESIGNED · DEVELOPED
              </small>

              <strong>
                By Bikash Khanal
              </strong>

              <span>
                Computer Engineer · MERN Stack Developer
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TRAVELLER FOCUS ================= */}
      <section className="bk-industries">

        <div className="bk-container">

          <div className="bk-section-number">
            03 / THE VISION
          </div>

          <div className="bk-industry-heading">

            <h2>
              Technology built
              <span> around travellers.</span>
            </h2>

            <p>
              Backpacker Gateways is being developed with one
              central priority — creating a better, safer and
              more seamless travel experience.
            </p>

          </div>


          <div className="bk-industry-grid">

            <div>
              <span>01</span>
              <h3>Traveller First</h3>
              <p>
                Every feature starts with the traveller and
                their real journey.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Trust</h3>
              <p>
                Clear information and dependable services
                designed to build confidence.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Safety</h3>
              <p>
                Technology designed with safer travel and
                informed decisions in mind.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Simplicity</h3>
              <p>
                Making accommodation, transport, trekking
                and travel planning easier.
              </p>
            </div>

            <div>
              <span>05</span>
              <h3>Connection</h3>
              <p>
                Bringing travellers, services and destinations
                together through one platform.
              </p>
            </div>

            <div>
              <span>06</span>
              <h3>Innovation</h3>
              <p>
                Continuously improving how people discover
                and experience travel.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= PHILOSOPHY ================= */}
      <section className="bk-philosophy">

        <div className="bk-container">

          <div className="bk-philosophy-inner">

            <span className="bk-label">
              HIS APPROACH
            </span>

            <h2>
              Technology should
              <br />
              <span>serve people.</span>
            </h2>

            <p>
              For Bikash, software is more than code.
              It is a way to solve real problems, create better
              experiences and make technology useful in everyday life.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FINAL ================= */}
      <section className="bk-final">

        <div className="bk-container">

          <span className="bk-label">
            BUILT IN NEPAL
          </span>

          <h2>
            Engineering.
            <br />
            Technology.
            <br />
            <span>Better Travel.</span>
          </h2>

          <p>
            Backpacker Gateways is his vision to bring engineering,
            technology and traveller-focused thinking together
            in one modern travel platform.
          </p>

          <div className="bk-final-person">

            <strong>
              Bikash Khanal
            </strong>

            <span>
              Founder
              <i>·</i>
              Computer Engineer
              <i>·</i>
              MERN Stack Developer
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}