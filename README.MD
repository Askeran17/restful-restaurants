# RESTful Restaurants

A full-stack demo project for managing a list of restaurants and starred (favorite) restaurants, built with Node.js (Express) backend and React frontend.

![Main List](/image-readme/main-list.png)

## Features

### Backend (Node.js + Express)
- REST API for managing restaurants (CRUD: create, read, update, delete)
- REST API for managing starred restaurants (add, remove, update comment, get all, get by id)
- Data persistence using JSON files (`restaurants.json` and `starredRestaurants.json`)
- Unique IDs for restaurants and starred entries (using `uuid`)
- CORS enabled for frontend-backend communication

### Frontend (React)
- List all restaurants
- Add, edit, and delete restaurants
- Star/unstar restaurants (add/remove from favorites)
- Add and edit comments for starred restaurants
- All changes are persistent (survive server restarts)
- Modern UI with React functional components and hooks

## Main Libraries Used

### Backend
- **express**: Web framework for Node.js
- **uuid**: For generating unique IDs
- **cors**: Enable CORS for API
- **morgan**: HTTP request logger
- **nodemon**: For development auto-restart

### Frontend
- **react**: UI library
- **react-scripts**: Create React App scripts

## Project Structure

```
backend/
  app.js
  routes/
    restaurants.js
    starredRestaurants.js
  restaurants.json
  starredRestaurants.json
frontend/
  src/
    api/
      restaurants.js
      starredRestaurants.js
    components/
      restaurants/
      starredRestaurants/
    provider/
      restaurants.js
```

## How to Run

1. **Install dependencies**
   - In `backend/` and `frontend/` run `npm install`
2. **Start backend**
   - In `backend/` run `npm start`
3. **Start frontend**
   - In `frontend/` run `npm start`
4. Open [http://localhost:3001](http://localhost:3001) (or your frontend port)

## Notes
- All data is stored in JSON files for demo purposes. No real database is used.
- If you restart the backend, all restaurants and starred restaurants will persist.
- Make sure backend and frontend use different ports (e.g., 3000 and 3001).

