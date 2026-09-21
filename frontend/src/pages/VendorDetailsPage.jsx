
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Scissors,
  Stethoscope,
  Dumbbell,
  Shirt,
  Utensils,
} from "lucide-react";

const API_URL = "http://localhost:5041/api/vendors";

const getVendorIcon = (category) => {
  switch (category?.toLowerCase()) {
    case "beauty":
      return Scissors;

    case "healthcare":
      return Stethoscope;

    case "fitness":
      return Dumbbell;

    case "fashion":
      return Shirt;

    case "food":
      return Utensils;

    default:
      return MapPin;
  }
};

function VendorDetailsPage() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/${id}`);

        setVendor(response.data);
      } catch (err) {
        console.error("Error loading vendor:", err);
        setError("Failed to load vendor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  if (loading) {
    return (
      <div className="discover-page">
        <main className="discover-main">
          <div className="loading-message">
            Loading vendor details...
          </div>
        </main>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="discover-page">
        <main className="discover-main">
          <div className="empty-results">
            <h3>{error || "Vendor not found"}</h3>

            <Link to="/discover" className="vendor-details-link">
              <ArrowLeft size={16} />
              Back to Discover
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const categoryName =
    typeof vendor.category === "string"
      ? vendor.category
      : vendor.category?.name || "Other";

  const Icon = getVendorIcon(categoryName);

  const location =
    vendor.location ||
    `${vendor.address || ""}, ${vendor.city || ""}`
      .replace(/^, |, $/g, "");

  const rating = vendor.rating || 0;
  const reviews = vendor.reviewCount || vendor.reviews || 0;

  return (
    <div className="discover-page">
      {/* Header */}
      <header className="discover-header">
        <div className="discover-header-inner">
          <Link to="/" className="discover-brand">
            <div className="brand-icon">
              <MapPin size={19} />
            </div>

            <span>NearFind</span>
          </Link>

          <nav className="discover-nav">
            <Link to="/discover">
              Discover
            </Link>

            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/admin">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="discover-main">
        {/* Back link */}
        <Link to="/discover" className="back-link">
          <ArrowLeft size={15} />
          Back to Discover
        </Link>

        {/* Vendor Details */}
        <section className="vendor-details-container">
          <div className="vendor-details-top">
            <div className="vendor-icon">
              <Icon size={40} />
            </div>

            <button
              className={
                isFavorite
                  ? "favorite-button favorited"
                  : "favorite-button"
              }
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
            >
              <Heart
                size={22}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <span className="vendor-category">
            {categoryName}
          </span>

          <h1>{vendor.name}</h1>

          <div className="vendor-rating">
            <Star size={17} fill="currentColor" />

            <strong>{rating}</strong>

            <span>
              ({reviews} reviews)
            </span>
          </div>

          <div className="vendor-location">
            <MapPin size={16} />

            <span>{location || "Location not available"}</span>
          </div>

          <div className="vendor-description">
            <h2>About this business</h2>

            <p>
              {vendor.description ||
                "No description available for this business."}
            </p>
          </div>

          <div className="vendor-contact-section">
            <h2>Business Information</h2>

            <div className="vendor-info-row">
              <strong>Category:</strong>
              <span>{categoryName}</span>
            </div>

            <div className="vendor-info-row">
              <strong>Location:</strong>
              <span>{location || "Not available"}</span>
            </div>

            <div className="vendor-info-row">
              <strong>Rating:</strong>
              <span>{rating} stars</span>
            </div>
          </div>

          <Link to="/discover" className="vendor-details-link">
            <ArrowLeft size={16} />
            Explore more businesses
          </Link>
        </section>
      </main>
    </div>
  );
}

export default VendorDetailsPage;