
// import { useEffect, useState } from "react";
// import { getVendors } from "./api/vendorApi";

// function App() {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         const data = await getVendors();
//         setVendors(data);
//       } catch (err) {
//         setError("Failed to load vendors");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendors();
//   }, []);

//   if (loading) return <h2>Loading vendors...</h2>;
//   if (error) return <h2>{error}</h2>;

//   return (
//     <div>
//       <h1>NearFind Vendors</h1>

//       {vendors.map((vendor) => (
//         <div key={vendor.id}>
//           <h2>{vendor.name}</h2>
//           <p>{vendor.city}</p>
//           <p>Rating: {vendor.rating}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DiscoverPage from "./pages/DiscoverPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Discover Page */}
        <Route path="/discover" element={<DiscoverPage />} />

        {/* Vendor Details Page */}
        <Route
          path="/vendor/:id"
          element={<VendorDetailsPage />}
        />
        <Route
           path="/favorites"
           element={<FavoritesPage />}
        />

        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback Route */}
        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;