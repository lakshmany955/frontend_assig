# React Admin Dashboard

Admin/User dashboard built with React 18, React Router v6, Redux Toolkit + RTK Query, Tailwind CSS, and i18next (EN/ES). Includes role-based access, CRUD, search/filter/pagination, theming, and mock API.

## Quick Start

1. Install: `npm install`
2. Dev server: `npm run dev` → open `http://localhost:5173/`

Login:

- Admin: `admin@company.com` / `admin123`
- User: `user@company.com` / `user123`

## Tech

- React 18 + Vite
- Redux Toolkit + RTK Query
- React Router v6
- Tailwind CSS (dark mode via `class`)
- i18next (EN/ES)
- Recharts (Dashboard)

## Features

- Auth: Single login; stores token + role in Redux/localStorage
- Protected routes: Admin vs User access; unauthorized → `/403`
- Sidebar: Role-based links; User cannot see Users/Settings or Product create/edit
- Users (Admin only): List/Create/Edit/Details/Delete
- Products:
  - Admin: Full CRUD
  - User: View list/details only
- Lists: Debounced search (300ms), filters, server-side pagination (10/page), empty + error states with Retry
- UI: Reusable Button/Input/Table/Modal/Card/Loader/Alert/Pagination, responsive sidebar, theme toggle, language switcher
- Dashboard: Category bar chart (mocked)

## Mock API

Implemented with RTK Query `fakeBaseQuery`, backed by in-memory modules:

- Users: `src/mock/users.js`
  - Fields: `id, name, email, role, createdAt`
  - Endpoints: `list({ page, q, role, pageSize=10 })`, `getById`, `create`, `update`, `remove`
- Products: `src/mock/products.js`
  - Fields: `id, name, description, price, category, stock, createdAt`
  - Endpoints: `list({ page, q, category (array ok), minPrice, maxPrice, pageSize=10 })`, `getById`, `create`, `update`, `remove`, `stats()`

RTK Query endpoints: `src/store/api.js`

- Users: `getUsers`, `getUser`, `createUser`, `updateUser`, `deleteUser`
- Products: `getProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`, `getProductStats`
- Caching: tag invalidation; optimistic patches on detail; list rows updated optimistically on delete

## Notable UX

- Debounced inputs for search
- Multi-select category filter (checkboxes)
- Clear filters resets all and refetches
- Pagination with Prev/Next and numbered buttons
- Toaster notifications and confirmation modals

## Theming & i18n

- Theme persisted to localStorage, applied on boot; `uiSlice` manages state
- i18n EN/ES with `react-i18next`; language persists in localStorage

## Development Notes

- Keep endpoints pure and small; mock layer simulates latency
- Column definitions are memoized to avoid re-renders
- Avoids fetching entire datasets for charts; `stats()` aggregates on server-side mock

## Potential Enhancements (Bonus)

- TypeScript migration
- Tests with Jest + React Testing Library
- MSW for HTTP-level mocks
- Charts with more metrics (sales over time, stock alerts)