# TWalsh Tech - UniFi Network Solutions Landing Page

A professional, responsive landing page showcasing expertise in UniFi Network, Talk, Protect, and Access systems. Built with modern web technologies and optimized for GitHub Pages hosting.

## Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **UniFi Services**: Dedicated sections for Network, Talk, Protect, and Access
- **Contact Form**: Professional contact form with validation
- **Modern UI**: Clean, professional design with smooth transitions
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Cross-browser Compatible**: Works on all modern browsers

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter)

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. All assets are local, so no build process is required

### File Structure

```
twalshtech.com/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## GitHub Pages Deployment

### Option 1: Automatic Deployment (Recommended)

1. **Create a new repository** on GitHub
   - Repository name: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it public
   - Don't initialize with README, .gitignore, or license

2. **Upload your files** to the repository
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   # Copy all your website files here
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

4. **Your site will be available at**: `https://yourusername.github.io`

### Option 2: Project Repository

If you want to keep this as a project repository:

1. **Create a regular repository** (any name)
2. **Upload your files** as above
3. **Enable GitHub Pages** from the gh-pages branch or main branch
4. **Your site will be available at**: `https://yourusername.github.io/repository-name`

## Customization

### Personal Information

Update the following in `index.html`:
- Your company name in the title and navigation
- Contact information
- Service descriptions
- About section content

### Styling

Modify `styles.css` to:
- Change color scheme
- Adjust fonts
- Modify layout spacing
- Update animations

### Contact Form

The current contact form includes a simulation. To make it functional:

1. **Use a form service** like Formspree, Netlify Forms, or EmailJS
2. **Update the form action** in `index.html`
3. **Modify the JavaScript** in `script.js` to handle the actual submission

### Example with Formspree:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and icons
- Minimal JavaScript footprint
- CSS animations use GPU acceleration
- Responsive images and layouts

## SEO Features

- Semantic HTML structure
- Meta description and title tags
- Proper heading hierarchy
- Alt text for images
- Mobile-friendly design

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues with this landing page template, please open an issue on GitHub.

---

**Note**: Remember to replace placeholder content with your actual information before deploying to GitHub Pages.
