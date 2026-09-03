
import "./Community.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const categories = [
  {
    number: "01",
    title: "Travel Guides",
    text: "Practical information for planning journeys, destinations and unforgettable experiences.",
  },
  {
    number: "02",
    title: "Trekking",
    text: "Routes, permits, preparation, guides and real stories from the mountains.",
  },
  {
    number: "03",
    title: "Budget Travel",
    text: "Smart ways to travel more while spending less and making the most of every journey.",
  },
  {
    number: "04",
    title: "Travel Safety",
    text: "Useful information to help travellers prepare, stay aware and travel responsibly.",
  },
  {
    number: "05",
    title: "Traveller Stories",
    text: "Real journeys, experiences, photos and stories shared by the global community.",
  },
  {
    number: "06",
    title: "Local Insights",
    text: "Discover places, culture, food and experiences through people who know them best.",
  },
];

export default function Community() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/community"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community posts");
        }

        const data = await response.json();

        // Only approved posts will appear publicly
        const approvedPosts = data.filter(
          (post) => post.status === "approved"
        );

        setFeaturedPosts(approvedPosts);
      } catch (error) {
        console.error(
          "Community posts error:",
          error
        );
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchCommunityPosts();
  }, []);

  const formatPostDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="community-page">

      {/* ================= HERO ================= */}

      <section className="community-hero">

        <div className="community-container">

          <div className="community-hero-grid">

            <div className="community-hero-content">

              <span className="community-kicker">
                BACKPACKER GATEWAYS COMMUNITY
              </span>

              <h1>
                Travel together.
                <span> Explore smarter.</span>
              </h1>

              <p>
                A global space where backpackers, trekkers and travellers
                can discover reliable travel information, share real
                experiences and connect with people who love exploring
                the world.
              </p>

              <div className="community-actions">

                <Link
                  to="/signup"
                  className="community-primary-btn"
                >
                  Join the Community
                </Link>

                <a
                  href="#travel-information"
                  className="community-secondary-btn"
                >
                  Explore Information
                </a>

              </div>

            </div>


            {/* COMMUNITY INFO CARD */}

            <div className="community-hero-card">

              <span className="hero-card-label">
                BUILT FOR TRAVELLERS
              </span>

              <h3>
                Information.
                <br />
                Community.
                <br />
                <strong>Adventure.</strong>
              </h3>

              <div className="hero-card-stats">

                <div>
                  <strong>01</strong>
                  <span>Discover</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Connect</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Share</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MAIN PRIORITY ================= */}

      <section
        id="travel-information"
        className="community-priority"
      >

        <div className="community-container">

          <div className="priority-heading">

            <span>OUR COMMUNITY PURPOSE</span>

            <h2>
              Everything travellers need.
              <strong> One community.</strong>
            </h2>

            <p>
              Backpacker Gateways is focused on providing useful,
              traveller-first information while creating a space where
              people from around the world can share their own journeys.
            </p>

          </div>


          <div className="priority-grid">

            <article className="priority-card">

              <span className="priority-number">
                01
              </span>

              <h3>
                Travel Information
              </h3>

              <p>
                Find useful information about destinations, accommodation,
                transportation, trekking routes, budget travel and local
                experiences.
              </p>

            </article>


            <article className="priority-card">

              <span className="priority-number">
                02
              </span>

              <h3>
                Traveller Community
              </h3>

              <p>
                Travellers can create an account, build a profile and
                become part of a growing international travel community.
              </p>

            </article>


            <article className="priority-card">

              <span className="priority-number">
                03
              </span>

              <h3>
                Share Your Journey
              </h3>

              <p>
                Share travel stories, experiences, useful advice,
                destinations and memorable moments with other travellers.
              </p>

            </article>


            <article className="priority-card">

              <span className="priority-number">
                04
              </span>

              <h3>
                Travel Safely
              </h3>

              <p>
                Access practical guidance and important information to
                help prepare for safer and more responsible adventures.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* ================= TRAVEL CATEGORIES ================= */}

      <section className="community-categories">

        <div className="community-container">

          <div className="community-section-header">

            <div>

              <span>
                EXPLORE
              </span>

              <h2>
                Travel information
                <strong> for every journey.</strong>
              </h2>

            </div>

          </div>


          <div className="category-grid">

            {categories.map((category) => (

              <article
                className="category-card"
                key={category.number}
              >

                <span>
                  {category.number}
                </span>

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.text}
                </p>

                <button>
                  Explore →
                </button>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ================= RECENT POSTS ================= */}

      <section className="community-posts-section">

        <div className="community-container">

          <div className="community-section-header">

            <div>

              <span>
                LATEST FROM BACKPACKER GATEWAYS
              </span>

              <h2>
                Recent travel
                <strong> information.</strong>
              </h2>

            </div>

            <Link
              to="/community/posts"
              className="view-all-btn"
            >
              View All Posts →
            </Link>

          </div>


          <div className="community-post-grid">

            {loadingPosts ? (

              <div className="community-post-loading">
                Loading latest travel information...
              </div>

            ) : featuredPosts.length === 0 ? (

              <div className="community-post-empty">
                <h3>
                  No approved posts yet.
                </h3>

                <p>
                  New travel stories and information will appear here
                  after they are reviewed and approved.
                </p>
              </div>

            ) : (

              featuredPosts.slice(0, 3).map((post) => (

                <article
                  className="community-post-card"
                  key={post._id}
                >

                  <div className="post-image">

                    {post.image ? (

                      <img
                        src={post.image}
                        alt={post.title}
                      />

                    ) : (

                      <div className="post-image-placeholder">
                        Backpacker Gateways
                      </div>

                    )}

                    <span className="post-category">
                      {post.category?.toUpperCase()}
                    </span>

                  </div>


                  <div className="post-content">

                    <div className="post-meta">

                      <span>
                        {post.location || "Nepal"}
                      </span>

                      <span>
                        {formatPostDate(post.createdAt)}
                      </span>

                    </div>


                    <h3>
                      {post.title}
                    </h3>

                    <p>
                      {post.content}
                    </p>


                    <div className="post-footer">

                      <span className="post-author">
                        By {post.author || "Backpacker Gateways"}
                      </span>

                      <Link
                        to={`/community/post/${post._id}`}
                        className="read-post-btn"
                      >
                        Read More →
                      </Link>

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* ================= TRAVELLER ACCESS ================= */}

      <section className="traveller-access">

        <div className="community-container">

          <div className="traveller-access-grid">


            <div className="traveller-access-content">

              <span>
                YOUR TRAVEL ACCOUNT
              </span>

              <h2>
                Your journey.
                <strong> Your story.</strong>
              </h2>

              <p>
                Create your Backpacker Gateways account and become part
                of a global community built for people who explore.
              </p>


              <div className="access-list">

                <div>
                  <span>✓</span>
                  Create your traveller profile
                </div>

                <div>
                  <span>✓</span>
                  Publish your travel stories
                </div>

                <div>
                  <span>✓</span>
                  Share destinations and experiences
                </div>

                <div>
                  <span>✓</span>
                  Connect with fellow travellers
                </div>

              </div>


              <div className="access-actions">

                <Link
                  to="/signup"
                  className="community-primary-btn"
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  className="login-link"
                >
                  Already a member? Sign In →
                </Link>

              </div>

            </div>


            <div className="traveller-access-card">

              <span>
                COMMUNITY ACCESS
              </span>

              <h3>
                Join.
                <br />
                Travel.
                <br />
                <strong>Share.</strong>
              </h3>

              <p>
                Built for international travellers, backpackers,
                trekkers and explorers.
              </p>

            </div>


          </div>

        </div>

      </section>


      {/* ================= ADMIN ================= */}

      <section className="admin-information">

        <div className="community-container">

          <div className="admin-information-inner">

            <span>
              PLATFORM MANAGEMENT
            </span>

            <h2>
              Built with information
              <strong> travellers can trust.</strong>
            </h2>

            <p>
              Backpacker Gateways administrators can publish official
              travel information, destination updates, trekking guides,
              recent travel experiences and useful community resources.
            </p>

            <div className="admin-features">

              <span>
                Publish Official Posts
              </span>

              <span>
                Manage Community Content
              </span>

              <span>
                Support Traveller Safety
              </span>

              <span>
                Share Recent Travel Updates
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="community-final">

        <div className="community-container">

          <div className="community-final-content">

            <span>
              BACKPACKER GATEWAYS
            </span>

            <h2>
              The world is waiting.
              <strong> Share the journey.</strong>
            </h2>

            <p>
              Discover reliable information. Connect with travellers.
              Tell your story.
            </p>

            <div className="community-actions">

              <Link
                to="/signup"
                className="community-primary-btn"
              >
                Join the Community
              </Link>

              <a
                href="#travel-information"
                className="community-secondary-btn"
              >
                Explore Travel Info
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

