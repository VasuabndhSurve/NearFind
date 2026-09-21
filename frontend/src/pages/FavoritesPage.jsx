
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
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

function FavoritesPage() {
  const [vendors, setVendors] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nearfindFavorites")) || [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);

        const response = await axios.get(API_URL);
        setVendors(response.data);
      } catch (err) {
        console.error("Error loading vendors:", err);
        setError("Failed to load favorite businesses.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const favoriteVendors = vendors.filter((vendor) =>
    favorites.includes(vendor.id)
  );

  const removeFavorite = (vendorId) => {
    const updatedFavorites = favorites.filter(
      (id) => id !== vendorId
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "nearfindFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

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

            <Link to="/favorites" className="active">
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
        <Link to="/discover" className="back-link">
          <ArrowLeft size={15} />
          Back to Discover
        </Link>

        <section className="discover-intro">
          <div>
            <h1>My Favorites</h1>

            <p>
              Your saved businesses and services in one place.
            </p>
          </div>
        </section>

        {loading && (
          <div className="loading-message">
            Loading favorites...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && favoriteVendors.length === 0 && (
          <div className="empty-results">
            <div className="empty-icon">
              <Heart size={25} />
            </div>

            <h3>No favorite businesses yet</h3>

            <p>
              Save businesses from the Discover page to see them
              here.
            </p>

            <Link to="/discover" className="vendor-details-link">
              Explore businesses
            </Link>
          </div>
        )}

        {!loading && !error && favoriteVendors.length > 0 && (
          <section className="results-section">
            <div className="results-header">
              <div>
                <span className="results-label">
                  SAVED BUSINESSES
                </span>

                <h2>
                  {favoriteVendors.length} favorites
                </h2>
              </div>
            </div>

            <div className="vendor-grid">
              {favoriteVendors.map((vendor) => {
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
                const reviews =
                  vendor.reviewCount || vendor.reviews || 0;

                return (
                  <article
                    className="vendor-card"
                    key={vendor.id}
                  >
                    <div className="vendor-card-top">
                      <div className="vendor-icon">
                        <Icon size={25} />
                      </div>

                      <button
                        className="favorite-button favorited"
                        onClick={() =>
                          removeFavorite(vendor.id)
                        }
                        aria-label="Remove from favorites"
                      >
                        <Heart
                          size={19}
                          fill="currentColor"
                        />
                      </button>
                    </div>

                    <div className="vendor-card-content">
                      <span className="vendor-category">
                        {categoryName}
                      </span>

                      <h3>{vendor.name}</h3>

                      <div className="vendor-rating">
                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        <strong>{rating}</strong>

                        <span>
                          ({reviews} reviews)
                        </span>
                      </div>

                      <div className="vendor-location">
                        <MapPin size={14} />

                        <span>
                          {location || "Location unavailable"}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/vendor/${vendor.id}`}
                      className="vendor-details-link"
                    >
                      View details
                      <ArrowLeft
                        size={16}
                        className="arrow-right"
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default FavoritesPage;