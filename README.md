# Healthcare Website Frontend

A modern, responsive healthcare website built with Next.js and Tailwind CSS, optimized for deployment on Vercel.

## Features

- 🏥 **Healthcare-focused design** inspired by Austin Oral Surgery
- 📱 **Mobile-first responsive design** using Tailwind CSS
- ⚡ **Fast loading** with Next.js optimization
- 🎨 **Customizable content** - all text and data are placeholder-based
- 🔧 **Easy deployment** on Vercel
- ♿ **Accessible** with proper ARIA labels and keyboard navigation
- 🌐 **SEO optimized** with proper meta tags and structure

## Quick Start

1. **Clone and Install**
   ```bash
   git clone [your-repo-url]
   cd healthcare-frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Customize Content**
   - Edit the `practiceData` object in `pages/index.js`
   - Replace all `[placeholder]` text with your actual content
   - Add your images to the `public/` folder
   - Update contact information in components

4. **Deploy to Vercel**
   ```bash
   npm run build
   vercel --prod
   ```

## File Structure

```
healthcare-frontend/
├── components/           # React components
│   ├── Header.js        # Navigation header
│   ├── Hero.js          # Hero section
│   ├── Stats.js         # Statistics section
│   ├── Services.js      # Services grid
│   ├── Team.js          # Doctor profiles
│   ├── Gallery.js       # Photo gallery
│   ├── Contact.js       # Contact form
│   └── Footer.js        # Footer section
├── pages/               # Next.js pages
│   ├── _app.js         # App configuration
│   ├── _document.js    # Document structure
│   └── index.js        # Home page
├── styles/              # CSS styles
│   └── globals.css     # Global styles
├── public/              # Static assets
└── package.json        # Dependencies
```

## Customization Guide

### 1. Practice Information
Update the `practiceData` object in `pages/index.js`:

```javascript
const [practiceData, setPracticeData] = useState({
  name: 'Your Practice Name',
  tagline: 'Your Headline Here',
  description: 'Your practice description',
  stats: {
    years: '15',
    patients: '5000',
    successRate: '95',
    doctors: '8'
  }
})
```

### 2. Services
Edit the services array in `components/Services.js`:

```javascript
const services = [
  {
    icon: FaUserMd,
    title: 'Primary Care',
    description: 'Comprehensive primary healthcare services...'
  },
  // Add more services
]
```

### 3. Team Members
Update doctor information in `components/Team.js`:

```javascript
const doctors = [
  {
    name: 'Dr. John Smith',
    specialty: 'Cardiologist',
    credentials: 'MD, FACC',
    bio: 'Board-certified cardiologist with 15 years...',
    // Add more details
  }
]
```

### 4. Contact Information
Update contact details in `components/Contact.js` and `components/Footer.js`.

### 5. Colors and Styling
Modify the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: '#1e40af',      // Main brand color
  secondary: '#64748b',    // Secondary text
  accent: '#f59e0b',       // Accent color
  dark: '#1e293b',         // Dark text
  light: '#f8fafc'         // Light background
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically build and deploy your site
4. Custom domain can be added in Vercel dashboard

### Other Platforms
- **Netlify**: Drag and drop the `build` folder after running `npm run build`
- **AWS S3**: Upload build files to S3 bucket with static hosting enabled
- **Any hosting provider**: Upload the contents of `.next/out/` after running `npm run build && npm run export`

## Environment Variables

For production, you may want to add environment variables:

Create `.env.local`:
```
NEXT_PUBLIC_SITE_NAME=Your Practice Name
NEXT_PUBLIC_CONTACT_EMAIL=info@yourpractice.com
NEXT_PUBLIC_PHONE=+1234567890
```

## Performance Optimization

- Images are optimized with Next.js Image component
- CSS is purged automatically by Tailwind
- JavaScript is split into chunks for faster loading
- Components are lazy-loaded where appropriate

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

## License

This project is licensed under the MIT License - see the LICENSE file for details.
