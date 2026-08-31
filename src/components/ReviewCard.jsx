export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="stars" aria-label={`${review.rating} out of 5 stars`}>
        ★★★★★
      </div>

      <p>“{review.text}”</p>

      <div className="review-author">
        <strong>{review.name}</strong>
        <span>{review.country}</span>
      </div>
    </article>
  );
}