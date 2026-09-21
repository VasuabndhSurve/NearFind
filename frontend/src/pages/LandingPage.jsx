import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ArrowRight,
  Scissors,
  Stethoscope,
  Dumbbell,
  Shirt,
  Utensils,
} from "lucide-react";

const categories = [
  {
    name: "Beauty",
    icon: Scissors,
    description: "Salons, spas & wellness",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Clinics & healthcare",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    description: "Gyms & fitness centers",
  },
  {
    name: "Fashion",
    icon: Shirt,
    description: "Boutiques & fashion",
  },
  {
    name: "Food",
    icon: Utensils,
    description: "Restaurants & cafes",
  },
];

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <MapPin size={20} />
          </div>
          <span>NearFind</span>
        </Link>

        <div className="nav-links">
          <a href="#categories">Categories</a>
          <a href="#why-nearfind">Why NearFind</a>

          <Link to="/discover" className="nav-cta">
            Explore Now
            <ArrowRight size={17} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              <MapPin size={16} />
              Discover what's around you
            </div>

            <h1>
              Find the right
              <span> business nearby.</span>
            </h1>

            <p className="hero-description">
              Discover trusted businesses and services around you.
              Search, compare, filter and find exactly what you need.
            </p>

            {/* Search Preview */}
            <div className="hero-search">
              <Search size={21} />
              <span>Search for businesses, services...</span>

              <Link to="/discover" className="search-button">
                Search
              </Link>
            </div>

            <Link to="/discover" className="primary-cta">
              Explore Businesses
              <ArrowRight size={19} />
            </Link>

            <div className="hero-location">
              <MapPin size={15} />
              <span>Find businesses based on your location</span>
            </div>

          </div>

          {/* Hero Visual */}
          <div className="hero-visual">

            <div className="floating-card card-top">
              <div className="mini-icon">
                <Star size={17} />
              </div>

              <div>
                <strong>Highly Rated</strong>
                <small>4.5+ businesses</small>
              </div>
            </div>

            <div className="discover-card">

              <div className="discover-card-header">
                <div>
                  <small>NEAR YOU</small>
                  <h3>Popular places</h3>
                </div>

                <MapPin size={22} />
              </div>

              <div className="mock-business">

                <div className="business-image beauty-image">
                  <Scissors size={25} />
                </div>

                <div className="business-info">
                  <h4>Glow Beauty Studio</h4>

                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    <span>4.8</span>
                    <span className="rating-count">(124)</span>
                  </div>

                  <p>
                    <MapPin size={13} />
                    Andheri, Mumbai
                  </p>
                </div>

                <Heart size={20} className="heart-icon" />
              </div>

              <div className="mock-business">

                <div className="business-image fitness-image">
                  <Dumbbell size={25} />
                </div>

                <div className="business-info">
                  <h4>FitZone Fitness</h4>

                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    <span>4.6</span>
                    <span className="rating-count">(98)</span>
                  </div>

                  <p>
                    <MapPin size={13} />
                    Bandra, Mumbai
                  </p>
                </div>

                <Heart size={20} className="heart-icon" />
              </div>

              <Link to="/discover" className="view-all">
                View all businesses
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="floating-card card-bottom">
              <div className="mini-icon location-mini">
                <MapPin size={17} />
              </div>

              <div>
                <strong>Within 5 km</strong>
                <small>Find places nearby</small>
              </div>
            </div>

          </div>

        </section>

        {/* Categories */}
        <section className="categories-section" id="categories">

          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE CATEGORIES</span>
              <h2>What are you looking for?</h2>
            </div>

            <Link to="/discover" className="text-link">
              Explore all
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="categories-grid">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  to="/discover"
                  className="category-card"
                  key={category.name}
                >
                  <div className="category-icon">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="category-arrow"
                  />
                </Link>
              );
            })}

          </div>

        </section>

        {/* Why NearFind */}
        <section className="why-section" id="why-nearfind">

          <div className="section-heading centered">
            <span className="section-label">WHY NEARFIND</span>
            <h2>Everything you need to discover nearby.</h2>
            <p>
              A simple way to find businesses and services that match
              what you're looking for.
            </p>
          </div>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-number">01</div>
              <Search size={24} />
              <h3>Search Easily</h3>
              <p>
                Search businesses by name, service or category.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <MapPin size={24} />
              <h3>Discover Nearby</h3>
              <p>
                Find businesses within a radius around your location.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <Star size={24} />
              <h3>Compare & Choose</h3>
              <p>
                Use ratings and filters to find the right option.
              </p>
            </div>

          </div>

        </section>

        {/* Final CTA */}
        <section className="final-cta">

          <div>
            <span className="section-label">READY TO EXPLORE?</span>
            <h2>Find something great nearby.</h2>
            <p>
              Start discovering businesses and services around you.
            </p>
          </div>

          <Link to="/discover" className="primary-cta light-cta">
            Explore NearFind
            <ArrowRight size={19} />
          </Link>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="brand">
          <div className="brand-icon">
            <MapPin size={18} />
          </div>
          <span>NearFind</span>
        </div>

        <p>
          Discover businesses. Find what you need.
        </p>

        <span className="copyright">
          © 2026 NearFind
        </span>
      </footer>

    </div>
  );
}

export default LandingPage;