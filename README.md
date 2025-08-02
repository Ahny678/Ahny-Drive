# A-Drive

## A simple cloud storage clone with authentication and file management

---

### 📦 Introduction

**A-Drive** is a cloud storage web application inspired by Google Drive. Built with **Node.js**, **Express**, and **Cloudinary**, it allows users to securely upload, organize, and manage their files online. With **Passport.js** for authentication and **PostgreSQL/Sequelize** for storage, A-Drive offers essential features of a modern file management system. The project emphasizes a secure, scalable backend architecture, and is being refactored to function as a **pure backend API** for future frontend integration using **React** or similar SPA frameworks.

**Keywords**: Node.js file upload API, Cloudinary Express backend, Passport.js authentication, PostgreSQL Sequelize file manager, Google Drive clone

---

## 🛠 Architecture Overview

Below is a simplified architecture of the current backend flow:

```plaintext
              +--------------+
              |   Browser    |
              +------+-------+
                     |
               Authenticated?
                     |
             +-------v--------+
             |   Passport.js  |
             +-------+--------+
                     |
         +-----------v------------+
         |  Express Controllers   |
         +-----+-----------+------+
               |           |
         +-----v-+       +-v-----+
         |Cloudinary|    |Postgres|
         +---------+     +--------+
```

- **File Uploads** go through Multer and are stored in **Cloudinary**
- **User Sessions** managed using **Express-Session + PostgreSQL**
- **Folders and File metadata** are stored via **Sequelize ORM**
- UI rendering with **EJS** (will be decoupled in the future)

---

## 🧰 Installation for Users

```bash
git clone https://github.com/yourusername/a-drive.git
cd a-drive
npm install
```

1. Create a `.env` file and fill env.example variables

2. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

3. Start the app:

   ```bash
   npm start
   ```

Visit: `http://localhost:3000`

---

## 👩‍💻 Installation for Developers / Contributors

1. Fork the repo, clone your fork:

   ```bash
   git clone https://github.com/yourusername/a-drive.git
   ```

2. Setup your environment (see `.env` example above)

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Code formatting and linting:

   - (Optional) Add your `.eslintrc`, `prettier`, etc.
   - Follow consistent style and comment important logic

---

## 🤝 Contributor Expectations

- Create PRs from feature branches (e.g., `feature/auth-improvement`)
- Keep commits atomic and descriptive
- Write clear commit messages (e.g., `fix: handle missing fileId in deletion`)
- All new code must be tested manually (automated tests coming soon)
- Respect file structure and naming conventions
- Be kind in code reviews 🙌

---

## 🐛 Known Issues

- 🧑‍🎨 **UI is minimal and inconsistent**

  - Goal is to deprecate the EJS-based frontend
  - Plan: Replace with React frontend calling backend APIs
  - 📄 No file type previews – future work will integrate this into the frontend

---

If you have suggestions or improvements, feel free to open a pull request!
