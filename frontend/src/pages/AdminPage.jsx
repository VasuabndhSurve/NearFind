
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5041/api/vendors";

const initialForm = {
  name: "",
  description: "",
  address: "",
  city: "",
  phone: "",
  imageUrl: "",
  rating: 0,
  reviewCount: 0,
  latitude: 0,
  longitude: 0,
  categoryId: 1,
};

function AdminPage() {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchVendors = async () => {
    try {
      const response = await axios.get(API_URL);
      setVendors(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numberFields = [
      "rating",
      "reviewCount",
      "latitude",
      "longitude",
      "categoryId",
    ];

    setFormData((current) => ({
      ...current,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, {
          id: editingId,
          ...formData,
        });

        setMessage("Vendor updated successfully.");
      } else {
        await axios.post(API_URL, formData);
        setMessage("Vendor added successfully.");
      }

      resetForm();
      await fetchVendors();
    } catch (error) {
      console.error("Save error:", error);
      setMessage(
        error.response?.data?.message || "Failed to save vendor."
      );
    }
  };

  const handleEdit = (vendor) => {
    setEditingId(vendor.id);

    setFormData({
      name: vendor.name || "",
      description: vendor.description || "",
      address: vendor.address || "",
      city: vendor.city || "",
      phone: vendor.phone || "",
      imageUrl: vendor.imageUrl || "",
      rating: vendor.rating || 0,
      reviewCount: vendor.reviewCount || 0,
      latitude: vendor.latitude || 0,
      longitude: vendor.longitude || 0,
      categoryId: vendor.category?.id || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Vendor deleted successfully.");
      await fetchVendors();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to delete vendor.");
    }
  };

  if (loading) {
    return <h2>Loading admin dashboard...</h2>;
  }

  return (
    <>
      <header className="discover-header">
        <div className="discover-header-inner">
          <Link to="/" className="discover-brand">
            <span className="brand-icon">N</span>
            <span>NearFind Admin</span>
          </Link>

          <nav className="discover-nav">
            <Link to="/discover">Discover</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/">Home</Link>
          </nav>
        </div>
      </header>

      <main className="discover-main">
        <section className="discover-intro">
          <p className="back-link">
            <Link to="/discover">← Back to Discover</Link>
          </p>

          <h1>Admin Dashboard</h1>
          <p>Manage vendors in the NearFind platform.</p>
        </section>

        {message && <p className="admin-message">{message}</p>}

        <section className="admin-form-section">
          <h2>{editingId ? "Edit Vendor" : "Add New Vendor"}</h2>

          
<form onSubmit={handleSubmit} className="admin-form">
  <div className="form-field">
    <label>Vendor Name</label>
    <input
      type="text"
      name="name"
      placeholder="Enter vendor name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Description</label>
    <textarea
      name="description"
      placeholder="Enter vendor description"
      value={formData.description}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Address</label>
    <input
      type="text"
      name="address"
      placeholder="Enter business address"
      value={formData.address}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>City</label>
    <input
      type="text"
      name="city"
      placeholder="Enter city"
      value={formData.city}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Phone Number</label>
    <input
      type="text"
      name="phone"
      placeholder="Enter phone number"
      value={formData.phone}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Image URL (Optional)</label>
    <input
      type="text"
      name="imageUrl"
      placeholder="Enter image URL"
      value={formData.imageUrl}
      onChange={handleChange}
    />
  </div>

  <div className="form-field">
    <label>Rating (0–5)</label>
    <input
      type="number"
      name="rating"
      placeholder="Enter rating"
      min="0"
      max="5"
      step="0.1"
      value={formData.rating}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Review Count</label>
    <input
      type="number"
      name="reviewCount"
      placeholder="Enter number of reviews"
      min="0"
      value={formData.reviewCount}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-field">
    <label>Latitude</label>
    <input
      type="number"
      name="latitude"
      placeholder="Example: 19.0760"
      step="any"
      value={formData.latitude}
      onChange={handleChange}
    />
  </div>

  <div className="form-field">
    <label>Longitude</label>
    <input
      type="number"
      name="longitude"
      placeholder="Example: 72.8777"
      step="any"
      value={formData.longitude}
      onChange={handleChange}
    />
  </div>

  <div className="form-field">
    <label>Category</label>
    <select
      name="categoryId"
      value={formData.categoryId}
      onChange={handleChange}
    >
      <option value="1">Beauty</option>
      <option value="2">Healthcare</option>
      <option value="3">Fitness</option>
      <option value="4">Fashion</option>
      <option value="5">Food</option>
    </select>
  </div>

  <div className="admin-form-actions">
    <button type="submit">
      {editingId ? "Update Vendor" : "Add Vendor"}
    </button>

    {editingId && (
      <button type="button" onClick={resetForm}>
        Cancel
      </button>
    )}
  </div>
</form>
        </section>

        <section className="admin-vendors-section">
          <h2>All Vendors ({vendors.length})</h2>

          <div className="admin-vendor-list">
            {vendors.map((vendor) => (
              <div className="admin-vendor-item" key={vendor.id}>
                <div>
                  <h3>{vendor.name}</h3>
                  <p>
                    {vendor.address}, {vendor.city}
                  </p>
                  <p>Rating: {vendor.rating}</p>
                  <p>Category: {vendor.category?.name || "Unknown"}</p>
                </div>

                <div className="admin-vendor-actions">
                  <button onClick={() => handleEdit(vendor)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(vendor.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminPage;