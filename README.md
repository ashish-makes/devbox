# 🌐 Resource Management System

A web application designed to manage resources categorized by different topics. The app allows users to browse resources by category, and admins can add, edit, and delete resources. This system is built with Node.js, Express, Handlebars, and MongoDB.

## 📋 Features

- **Browse Resources**: Users can browse resources by categories.
- **Admin Controls**: Admin users can add, edit, and delete resources.
- **Category-Based Display**: Resources are displayed under specific categories.
- **Link to Resources**: Each resource contains a link that opens in a new tab.
- **Responsive Design**: The app is responsive and mobile-friendly.

## 📸 Screenshots

### 🏠 Home Page
![Home Page](path_to_homepage_screenshot)

- This is the homepage where users can browse resources categorized by topics.

### 📚 Resources Page
![Resources Page](path_to_resources_page_screenshot)

- The resources page displays resources categorized by topics. Users can click on the categories to see resources.

### ➕ Add Resource Page (Admin Only)
![Add Resource Page](path_to_add_resource_page_screenshot)

- Admin users can add new resources through this page. It includes fields for the resource name, category, description, and link.

### ✏️ Edit Resource Page (Admin Only)
![Edit Resource Page](path_to_edit_resource_page_screenshot)

- Admin users can edit existing resources using this page. The form is pre-filled with the resource's current details for easy editing.

### 🔒 Login Page
![Login Page](path_to_login_page_screenshot)

- The login page allows users to sign in with their credentials. Admin users can log in to manage resources.

## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/devbox.git
    ```

2. **Navigate into the project directory:**
    ```bash
    cd devbox
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```text
    PORT=3000
    DB_URL=your-database-url
    SESSION_SECRET=your-session-secret
    ```

5. **Run the application:**
    ```bash
    npm start
    ```

6. **Access the app:**
    Open your browser and go to `http://localhost:3000`.

## 🧑‍💻 Usage

- **Browse Resources**: Users can browse resources listed by categories.
- **Add Resource (Admin Only)**: Admin users can navigate to the `/add-resource` page to add new resources.
- **Edit Resource (Admin Only)**: Admins can click on the "Edit" button next to resources to modify them.
- **Delete Resource (Admin Only)**: Admins can delete resources using the "Delete" button.
- **Login**: Both admins and regular users must log in to access restricted pages. Admins get extra functionality like adding, editing, and deleting resources.

## 🔑 Authentication

The app requires login to access certain pages. Admin users have additional permissions to manage resources.

1. Navigate to the login page.
2. Enter the username and password (admin credentials are provided for admin users).
3. Once logged in, users will have access to their respective resources page, while admins will see the admin controls for managing resources.

## 🧑‍💻 Admin Controls

Only admins have access to the following features:

- **Add Resource**: Admins can add a new resource by filling out a form with resource details.
- **Edit Resource**: Admins can edit any existing resource.
- **Delete Resource**: Admins can remove resources they no longer want in the system.

## 🛠️ Technologies Used

- **Node.js**: Backend framework to build the server.
- **Express**: Framework to handle HTTP requests and routing.
- **MongoDB**: NoSQL database for storing resources and user data.
- **Handlebars**: Templating engine for rendering dynamic HTML.
- **CSS**: Styling for the app (CSS frameworks like Bootstrap can be used).

## 📝 Contributing

We welcome contributions! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Acknowledgements

- [Handlebars](https://handlebarsjs.com/) for dynamic templating.
- [Express](https://expressjs.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for database management.
- [Bootstrap](https://getbootstrap.com/) (if used) for responsive design and CSS framework.

