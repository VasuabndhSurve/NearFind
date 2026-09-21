
# NearFind

NearFind is a location-based business discovery platform that helps users discover nearby businesses and services.

Users can search, filter, compare ratings, view vendor details, and save favorite businesses. Administrators can manage vendors through a CRUD dashboard.

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
- Lucide React Icons
- CSS

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- C#

### Database

- Microsoft SQL Server
- Entity Framework Core Migrations

## Project Structure

```text
NearFind/
│
├── NearFind.API/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Main Pages

- Landing Page
- Discover Page
- Vendor Details Page
- Favorites Page
- Admin Dashboard

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/vendors` | Get all vendors |
| GET | `/api/vendors/{id}` | Get vendor by ID |
| POST | `/api/vendors` | Add a vendor |
| PUT | `/api/vendors/{id}` | Update a vendor |
| DELETE | `/api/vendors/{id}` | Delete a vendor |
| GET | `/api/categories` | Get all categories |

## Database Setup

1. Open SQL Server and ensure the SQL Server instance is running.
2. Update the database connection string in the backend configuration.
3. Open a terminal in the `NearFind.API` directory.
4. Run the following commands:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

The API will run on the configured local URL.

## Frontend Setup

Open a terminal in the `frontend` directory.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the frontend URL displayed in the terminal.

## Running the Application

1. Start the ASP.NET Core backend.
2. Start the React frontend.
3. Open the frontend URL in your browser.
4. Explore businesses and test the vendor management dashboard.

## Database Information

The application uses SQL Server with Entity Framework Core.

Database migrations are used to create and update the database schema. Initial vendor and category data is seeded through the backend.

The actual SQL Server database files are not included in this repository.

## Author

Vasubandh Surve
