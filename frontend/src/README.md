
# NearFind

NearFind is a location-based business discovery platform that helps users find nearby businesses and services. Users can search, filter, compare ratings, view vendor details, and save their favorite businesses.

## Features

- Landing page with product overview
- Business discovery and search
- Category-based filtering
- Rating and distance filters
- Vendor details page
- Favorites management using local storage
- Admin dashboard
- Add, edit, and delete vendors
- SQL Server database integration
- REST API using ASP.NET Core
- Responsive user interface

## Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Lucide React
- CSS

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- C#
- SQL Server

### Database
- Microsoft SQL Server
- Entity Framework Core migrations
- Code First approach

## Project Structure

```text
NearFind/
│
├── NearFind.API/
│   ├── Controllers/
│   │   └── VendorsController.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Models/
│   │   ├── Vendor.cs
│   │   └── Category.cs
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── DiscoverPage.jsx
    │   │   ├── VendorDetailsPage.jsx
    │   │   ├── FavoritesPage.jsx
    │   │   └── AdminPage.jsx
    │   ├── api/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | Get all vendors |
| GET | `/api/vendors/{id}` | Get vendor by ID |
| POST | `/api/vendors` | Create a vendor |
| PUT | `/api/vendors/{id}` | Update a vendor |
| DELETE | `/api/vendors/{id}` | Delete a vendor |

## Database

The application uses SQL Server with Entity Framework Core.

The database contains:

- Categories
- Vendors

Vendor information includes:

- Name
- Description
- Address
- City
- Phone
- Image URL
- Rating
- Review count
- Latitude
- Longitude
- Category

## How to Run the Backend

1. Open the backend project in Visual Studio or VS Code.
2. Configure the SQL Server connection string in `appsettings.json`.
3. Apply database migrations:

```bash
dotnet ef database update
```

4. Run the API:

```bash
dotnet run
```

The API runs locally on:

```text
http://localhost:5041
```

## How to Run the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs locally on:

```text
http://localhost:5173
```

## Application Pages

### Landing Page
Introduces NearFind and provides navigation to the discovery experience.

### Discover Page
Allows users to search and filter available businesses.

### Vendor Details
Displays detailed information about an individual business.

### Favorites
Allows users to save and manage their favorite vendors.

### Admin Dashboard
Provides vendor management functionality, including creating, updating, and deleting vendors.

## Future Improvements

- User authentication and authorization
- Admin login
- Google Maps integration
- Real-time distance calculation
- Vendor image uploads
- User reviews and feedback
- Pagination
- Advanced location-based search
- Deployment to a cloud platform

## Developer

Vasubandh Surve

NearFind — Business Discovery Platform