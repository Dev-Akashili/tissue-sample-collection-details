# Tissue Sample Collection Details

This project is an administrative web interface designed to manage a tissue sample directory. The system allows users to track collections of samples and the samples' details.

This repository consists of a full stack web application with a Next.js frontend and an ASP.NET backend web api that interacts with a postgreSQL database.

## Getting Started

## Prerequisites

1. **.NET SDK** `8.x`
   - The API is .NET8
2. Docker

# Frontend

This uses `Next.js` + `TypeScript` + `Tailwind CSS`

1. **Navigate to the project directory:**

   `cd repo-directory/frontend`

2. **Install dependencies using npm:**

   `npm install`

## Frontend App Configuration

The frontend app can be configured in any standard way an Node application can. Typically from environment variables.

```bash
BACKEND_URL=http://localhost:7266
```

# Backend

The application stack interacts with a PostgreSQL Server database, and uses code-first migrations for managing the database schema.

The repository contains a `docker-compose` for the database, so just run `docker-compose up -d` to start it running.

When setting up a new environment, or running a newer version of the codebase if there have been schema changes, you need to run migrations against your database server.

The easiest way is using the dotnet cli:

1. If you haven't already, install the local Entity Framework tooling

- Anywhere in the repo: `dotnet tool restore`

1. Navigate to the same directory as `TSCD.sln`
1. Run migrations:

- `dotnet ef database update --project app/TSCD`
- The above runs against the default local server, using the connection string in `appsettings.Development.json`
- You can specify a connection string with the `--connection "<connection string>"` option

```bash
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Username=postgres;Port=5432;Password=changeme;Database=tscd"
  }
}
```

## Backend App Configuration

The app can be configured in any standard way an ASP.NET Core application can. Typically from an `appsettings.json`.

Remember to update your localhost url in `appsettings.Development.json`: 

```bash
{
  "FrontendAppUrl" : "http://localhost:3000"
}
```
