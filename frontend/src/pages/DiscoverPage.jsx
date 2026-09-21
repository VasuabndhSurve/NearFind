
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  MapPin,
  Star,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  Scissors,
  Stethoscope,
  Dumbbell,
  Shirt,
  Utensils,
  ArrowLeft,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5041/api/vendors";

// Get icon based on vendor category
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

const categories = [
  { name: "All", icon: null },
  { name: "Beauty", icon: Scissors },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Fitness", icon: Dumbbell },
  { name: "Fashion", icon: Shirt },
  { name: "Food", icon: Utensils },
];

function DiscoverPage() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedRadius, setSelectedRadius] = useState("10");
  const [favorites, setFavorites] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("nearfindFavorites")) || [];
  } catch {
    return [];
  }
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch vendors from backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        const formattedVendors = response.data.map((vendor) => {
          const categoryName =
            typeof vendor.category === "string"
              ? vendor.category
              : vendor.category?.name || "Other";

          return {
            id: vendor.id,
            name: vendor.name,
            category: categoryName,
            location:
              vendor.location ||
              `${vendor.address || ""}, ${vendor.city || ""}`.replace(
                /^, |, $/g,
                ""
              ),
            rating: vendor.rating || 0,
            reviews: vendor.reviewCount || vendor.reviews || 0,
            distance: vendor.distance || 10,
            services: vendor.services || [],
            description: vendor.description || "",
            icon: getVendorIcon(categoryName),
          };
        });

        setVendors(formattedVendors);
      } catch (err) {
        console.error("Error loading vendors:", err);
        setError("Failed to load vendors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Filter vendors
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        search === "" ||
        vendor.name.toLowerCase().includes(search) ||
        vendor.category.toLowerCase().includes(search) ||
        (vendor.location || "").toLowerCase().includes(search) ||
        (vendor.services || []).some((service) =>
          service.toLowerCase().includes(search)
        );

      const matchesCategory =
        selectedCategory === "All" ||
        vendor.category === selectedCategory;

      const matchesRating =
        selectedRating === "All" ||
        vendor.rating >= Number(selectedRating);

      const matchesRadius =
        vendor.distance <= Number(selectedRadius);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesRadius
      );
    });
  }, [
    vendors,
    searchTerm,
    selectedCategory,
    selectedRating,
    selectedRadius,
  ]);

  // Toggle favorite
  const toggleFavorite = (vendorId) => {
  setFavorites((current) => {
    const updatedFavorites = current.includes(vendorId)
      ? current.filter((id) => id !== vendorId)
      : [...current, vendorId];

    localStorage.setItem(
      "nearfindFavorites",
      JSON.stringify(updatedFavorites)
    );

    return updatedFavorites;
  });
};

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedRating("All");
    setSelectedRadius("10");
  };

  const hasFilters =
    searchTerm !== "" ||
    selectedCategory !== "All" ||
    selectedRating !== "All" ||
    selectedRadius !== "10";

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
            <Link to="/discover" className="active">
              Discover
            </Link>

            <Link to="/favorites">
              Favorites

              {favorites.length > 0 && (
                <span className="favorite-count">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link to="/admin">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="discover-main">
        {/* Loading message */}
        {loading && (
          <div className="loading-message">
            Loading businesses...
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Heading */}
        <section className="discover-intro">
          <div>
            <Link to="/" className="back-link">
              <ArrowLeft size={15} />
              Back to home
            </Link>

            <h1>Discover businesses near you</h1>

            <p>
              Find businesses and services that match what you're
              looking for.
            </p>
          </div>

          <div className="location-display">
            <MapPin size={17} />

            <div>
              <small>YOUR LOCATION</small>
              <strong>Mumbai, Maharashtra</strong>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="search-section">
          <div className="main-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by business name, service or category..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button className="filter-button">
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </section>

        {/* Category */}
        <section className="category-filter">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className={
                  selectedCategory === category.name
                    ? "category-filter-item selected"
                    : "category-filter-item"
                }
                onClick={() =>
                  setSelectedCategory(category.name)
                }
              >
                {Icon && <Icon size={16} />}
                {category.name}
              </button>
            );
          })}
        </section>

        {/* Filters */}
        <section className="filter-bar">
          <div className="filter-group">
            <label>Location</label>

            <button className="select-filter">
              <MapPin size={15} />
              Mumbai
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="filter-group">
            <label>Distance</label>

            <select
              className="select-filter"
              value={selectedRadius}
              onChange={(event) =>
                setSelectedRadius(event.target.value)
              }
            >
              <option value="1">Within 1 km</option>
              <option value="2">Within 2 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating</label>

            <select
              className="select-filter"
              value={selectedRating}
              onChange={(event) =>
                setSelectedRating(event.target.value)
              }
            >
              <option value="All">Any rating</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
          </div>

          {hasFilters && (
            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </section>

        {/* Results */}
        <section className="results-section">
          <div className="results-header">
            <div>
              <span className="results-label">
                DISCOVER
              </span>

              <h2>
                {filteredVendors.length} businesses found
              </h2>
            </div>

            <span className="radius-info">
              Within {selectedRadius} km
            </span>
          </div>

          {loading ? (
            <div className="loading-message">
              Loading businesses...
            </div>
          ) : filteredVendors.length > 0 ? (
            <div className="vendor-grid">
              {filteredVendors.map((vendor) => {
                const Icon = vendor.icon;

                const isFavorite =
                  favorites.includes(vendor.id);

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
                        className={
                          isFavorite
                            ? "favorite-button favorited"
                            : "favorite-button"
                        }
                        onClick={() =>
                          toggleFavorite(vendor.id)
                        }
                        aria-label="Add to favorites"
                      >
                        <Heart
                          size={19}
                          fill={
                            isFavorite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>

                    <div className="vendor-card-content">
                      <span className="vendor-category">
                        {vendor.category}
                      </span>

                      <h3>{vendor.name}</h3>

                      <div className="vendor-rating">
                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        <strong>{vendor.rating}</strong>

                        <span>
                          ({vendor.reviews} reviews)
                        </span>
                      </div>

                      <div className="vendor-location">
                        <MapPin size={14} />

                        <span>{vendor.location}</span>

                        <strong>
                          {vendor.distance} km
                        </strong>
                      </div>

                      {vendor.services.length > 0 && (
                        <div className="service-list">
                          {vendor.services.map((service) => (
                            <span key={service}>
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
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
          ) : (
            <div className="empty-results">
              <div className="empty-icon">
                <Search size={25} />
              </div>

              <h3>No businesses found</h3>

              <p>
                Try changing your search or adjusting your
                filters.
              </p>

              <button onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DiscoverPage;