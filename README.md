# Full Stack Django + React (Vite) | GraphQL + JWT Auth + Image Upload

A complete full-stack web application built using **Django (Graphene-Django)** and **React (Vite)**.  
It implements **JWT-based authentication**, **GraphQL CRUD operations**, and **department management** with **image upload support**.  
The project uses a **MySQL** database and integrates **Apollo Client** on the frontend for GraphQL queries.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login using **JWT tokens**
- Access control for protected routes and API queries
- Token-based session management on frontend

### 🧩 Department CRUD
- Create, Read, Update, Delete operations for departments
- Each department includes a name, description, and image
- Uploaded images are stored and served via Django Media

### ⚙️ Technology Stack
- **Backend:** Django, Graphene-Django, MySQL, Django REST Framework (for auth helpers)
- **Frontend:** React (Vite), Apollo Client
- **Auth:** JSON Web Token (JWT)
- **Image Handling:** Django File Uploads (MEDIA settings)

---

## 📂 Project Structure

```bash
project-root/
│
├── backend/
│ ├── manage.py
│ ├── backend/ # Django project settings
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── app/ # Django app (e.g., departments, users)
│ │ ├── models.py
│ │ ├── schema.py # GraphQL schema definitions
│ │ ├── mutations.py # GraphQL mutations
│ │ ├── queries.py # GraphQL queries
│ │ ├── serializers.py # For JWT auth integration
│ │ └── views.py
│ ├── media/ # Uploaded images
│ └── requirements.txt
│
├── frontend/
│ ├── index.html
│ ├── vite.config.js
│ ├── package.json
│ ├── src/
│ │ ├── main.jsx
│ │ ├── App.jsx
│ │ ├── apolloClient.js
│ │ ├── components/
│ │ └── pages/
│ └── public/
│
└── README.md
```
## ⚙️ Backend Setup (Django + GraphQL)

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate   # For Linux/Mac
```
### 2. Install Dependencies
```bash
pip install -r requirements.txt
```
### 3. Configure Database (MySQL)

In backend/settings.py:
```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_mysql_username',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
### 4. Media Settings

Add to your settings.py:
```bash
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```
### 5. Apply Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```
### 6. Run the Development Server
```bash
python manage.py runserver
```
Your Django GraphQL API will be available at:
```bash
http://127.0.0.1:8000/graphql/
```

### 💫 Frontend Setup (React + Vite)
Navigate to the Frontend Folder
```bash
npm install
```
Run the Development Server
```bash
npm run dev
```



