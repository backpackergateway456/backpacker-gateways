import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Community.css";

export default function CommunityPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://backpacker-gateways-2.onrender.com/api/community/${id}`
        );

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();

        setPost(data);
      } catch (err) {
        console.error("Community post error:", err);
        setError(
          "Sorry, the community post you are looking for does not exist."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatPostDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="community-page">
        <section className="community-post-not-found">
          <h1>Loading Post...</h1>
          <p>Please wait while we load the community post.</p>
        </section>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="community-page">
        <section className="community-post-not-found">
          <h1>Post Not Found</h1>

          <p>
            {error ||
              "Sorry, the community post you are looking for does not exist."}
          </p>

          <Link to="/community" className="community-primary-btn">
            Back to Community
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="community-page">
      <section className="community-post-detail">
        <div className="community-container">

          <Link
            to="/community"
            className="back-community-link"
          >
            ← Back to Community
          </Link>

          <div className="community-post-detail-header">

            <span className="post-category">
              {post.category?.toUpperCase() || "TRAVEL"}
            </span>

            <h1>{post.title}</h1>

            <p>{post.content}</p>

            <div className="post-detail-meta">
              <span>
                By {post.author || "Backpacker Gateways"}
              </span>

              <span>
                {post.location || "Nepal"}
              </span>

              <span>
                {formatPostDate(post.createdAt)}
              </span>
            </div>

          </div>

          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="community-post-detail-image"
            />
          ) : (
            <div
              className="community-post-detail-image"
              style={{
                minHeight: "420px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #1b4332, #2d6a4f)",
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: "600",
              }}
            >
              {post.location || "Nepal"}
            </div>
          )}

          <article className="community-post-article">
            <p>{post.content}</p>
          </article>

          <div className="community-post-bottom">

            <Link
              to="/community"
              className="community-primary-btn"
            >
              Explore More Posts
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}