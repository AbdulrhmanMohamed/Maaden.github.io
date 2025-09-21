# 🚀 GitHub Pages Deployment Guide

## Overview
This guide will help you deploy your Madeen construction company portfolio to GitHub Pages using GitHub Actions.

## Prerequisites
- GitHub account
- Repository with your code
- GitHub Pages enabled

## Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `madeen` or `madeen-portfolio` (or any name you prefer)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license

### 2. Push Your Code
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Madeen construction portfolio"

# Add your GitHub repository as remote
git remote add origin https://github.com/AbdulrhmanMohamed/Maaden.github.io.git

# Push to main branch
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy when you push to main branch

### 4. Configure Custom Domain (Optional)
If you have a custom domain:
1. In the GitHub Pages settings, add your custom domain
2. Update the `cname` field in `.github/workflows/deploy.yml`
3. Configure DNS records with your domain provider

## How It Works

### GitHub Actions Workflow
The deployment is automated using the workflow in `.github/workflows/deploy.yml`:

1. **Triggers**: Runs on every push to `main` branch
2. **Environment**: Uses Ubuntu latest with Node.js 20
3. **Dependencies**: Installs pnpm and project dependencies
4. **Build**: Runs `pnpm run build` to create production build
5. **Deploy**: Uses `peaceiris/actions-gh-pages` to deploy to GitHub Pages

### Build Configuration
- **Adapter**: `@sveltejs/adapter-static` for static site generation
- **Base Path**: Set to empty string for root deployment (`/`)
- **Output**: Builds to `build/` directory
- **Fallback**: Uses `index.html` for SPA routing

## Available Scripts

```bash
# Development
pnpm run dev          # Start development server

# Building
pnpm run build        # Build for production
pnpm run preview      # Preview production build locally

# Deployment
pnpm run deploy       # Build and deploy using gh-pages (manual)

# Code Quality
pnpm run check        # Type checking
pnpm run lint         # Linting
pnpm run format       # Code formatting
```

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `pnpm install`
- Verify TypeScript errors: `pnpm run check`
- Check for linting issues: `pnpm run lint`

### Deployment Issues
- Ensure GitHub Pages is enabled in repository settings
- Check GitHub Actions tab for workflow logs
- Verify the workflow file is in `.github/workflows/deploy.yml`

### Site Not Loading
- Check the GitHub Pages URL format: `https://abdulrhmanmohamed.github.io/Maaden.github.io`
- Verify the base path is set correctly in `svelte.config.js`
- Check browser console for JavaScript errors

## Project Structure
```
madeen/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── data/          # JSON data files
│   │   └── stores/        # Svelte stores
│   └── routes/            # SvelteKit routes
├── static/                # Static assets
├── build/                 # Production build output
├── svelte.config.js       # SvelteKit configuration
└── package.json           # Dependencies and scripts
```

## Features
- ✅ Static site generation
- ✅ GitHub Actions CI/CD
- ✅ Responsive design
- ✅ Dark/Light theme support
- ✅ Multi-language support (EN/AR)
- ✅ SEO optimized
- ✅ Modern UI with DaisyUI v5
- ✅ Tailwind CSS v4

## Support
If you encounter any issues:
1. Check the GitHub Actions logs
2. Verify all configuration files
3. Ensure all dependencies are up to date
4. Check browser console for client-side errors

---

**Happy Deploying! 🎉**
