# Varun Engineering Solar - Residential Solar Specialists

An elegant, modern, responsive landing page built with React, Vite, Tailwind CSS, and Framer Motion. This website helps homeowners calculate and understand government-subsidized residential solar systems, explore plans, view savings metrics, and request a callback.

## 🚀 Features

- **Dynamic Cost Calculator**: Visualizes total system costs, government subsidies, and remaining costs (or monthly EMI projections).
- **Responsive Packages Grid**: Showcases customizable solar configurations (2 kW, 5 kW, 10 kW).
- **Smooth Framer Motion Animations**: Reveal animations, interactive counters, and custom SVG grid paths.
- **Modern Dark & Warm Palette**: Sleek dark accents with warm yellow/orange/emerald highlights representing solar power.
- **Callback/Consultation Form**: Clean interface for lead collection.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 Local Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
Run the following command in the root directory to install all required packages:
```bash
npm install
```

### 3. Run Development Server
Start the local server with hot-reloading:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the address printed in the terminal).

### 4. Build for Production
To build the application for deployment:
```bash
npm run build
```
This generates a highly optimized production bundle in the `dist/` directory.

---

## 🐙 How to Upload This Project to GitHub

Here are the step-by-step instructions to upload your project to your GitHub account:

### Step 1: Initialize Git
If git isn't initialized yet in this folder, open your terminal (PowerShell, Command Prompt, or Git Bash) in this project folder and run:
```bash
git init
```

### Step 2: Add Files to Staging
Add all the files to your local repository staging area:
```bash
git add .
```

### Step 3: Create Your First Commit
Commit the staged files with a descriptive message:
```bash
git commit -m "Initial commit: Varun Engineering Solar Landing Page"
```

### Step 4: Create a New GitHub Repository
1. Go to [GitHub](https://github.com/) and log into your account.
2. Click the **"+"** icon in the top-right corner and select **New repository**.
3. Name your repository (e.g., `varun-engineering-solar`).
4. Keep the repository **Public** (or **Private** depending on your preference).
5. **Do not** check any checkboxes under "Initialize this repository with" (no README, no .gitignore, no license, since your project already has these files).
6. Click **Create repository**.

### Step 5: Link Local Repo to GitHub & Push
Copy the commands from the GitHub repository page (specifically the ones under **"…or push an existing repository from the command line"**) and run them in your local terminal:

```bash
# Rename the default branch to 'main'
git branch -M main

# Add your GitHub repository as the remote origin (Replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/varun-engineering-solar.git

# Push the code to GitHub
git push -u origin main
```

*(Note: Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.)*
