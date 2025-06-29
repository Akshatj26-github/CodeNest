# 🪺 CodeNest — Full-Stack Blogging Platform

[![Made with React](https://img.shields.io/badge/Made%20with-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Made with Django](https://img.shields.io/badge/Backend-Django-success?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://codenest-project.onrender.com/)

> A feature-rich, responsive blogging platform built with **React**, **Django**, and **Django REST Framework**, allowing users to create, edit, and explore blogs with modern UI/UX.

## ⚙️Features

✅ Full user authentication (login, register, logout)  
✅ Forgot password via email system  
✅ Create, Read, Update, Delete (CRUD) blogs  
✅ Like system for blogs  
✅ Search blogs by title, author, category, or likes  
✅ Category-wise blog filtering  
✅ Edit user profile  
✅ Responsive UI with light/dark mode toggle  
✅ REST API integration using Django REST Framework  
✅ Deployed on Render

---

## 🌐 Live Demo

🔗 [Visit CodeNest Here](https://codenest-project.onrender.com/)

---

## 📸 Screenshots

| Home Page (Dark) | Create Blog | Search Blogs |
|------------------|-------------|--------------|
| ![Home] | ![Create] | ![Search] |


## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios  
- **Backend**: Django, Django REST Framework  
- **Database**: PostgreSQL  
- **Deployment**: Render

---

## 🧠 Learning Highlights

- Integration of RESTful APIs with React frontend
- Implementing secure auth workflows (JWT Authentication)
- State management with hooks and conditional rendering
- Real-world CRUD and search-based functionality
- Responsive design and theming with Tailwind

---

## 📂 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Akshatj26-github/CodeNest.git
cd CodeNest

# Backend setup
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend setup
cd ../frontend
npm install
npm start
