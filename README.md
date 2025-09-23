# Healthcare Portfolio Template

A professional, customizable healthcare website template built with Next.js and Tailwind CSS. Perfect for medical practices, dental offices, clinics, and healthcare professionals.

## 🚀 Quick Start

1. **Download/Clone this template**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Customize your content** (see below)
4. **Run locally:**
   ```bash
   npm run dev
   ```
5. **Deploy to Vercel** (see deployment section)

## 📝 How to Customize Your Website

### Step 1: Edit Your Practice Information

Open `config/site-config.js` and replace the placeholder text with your actual information:

```javascript
// CHANGE THESE TO YOUR INFORMATION:
practice: {
  name: "Your Practice Name",           // ← Your practice name
  tagline: "Your Tagline Here",         // ← Your main headline  
  description: "Your practice description goes here..."  // ← Describe your services
},

contact: {
  phone: "+1 (555) 123-4567",          // ← Your phone number
  email: "info@yourpractice.com",      // ← Your email
  address: {
    street: "123 Your Street, Suite 100", // ← Your address
    city: "Your City",                   // ← Your city
    state: "ST",                        // ← Your state
    zip: "12345"                        // ← Your ZIP code
  }
},

stats: {
  years: "15",        // ← Years of experience
  patients: "5,000",  // ← Number of patients served
  successRate: "98",  // ← Success rate percentage  
  doctors: "8"        // ← Number of doctors/staff
}
```

### Step 2: Customize Your Services

Update the services array with your actual services:

```javascript
services: [
  {
    title: "Your Service Name",                    // ← Service name
    description: "Description of your service...", // ← What you offer
    icon: "user-md"  // ← Keep icon names as-is
  },
  // Add more services...
]
```

### Step 3: Add Your Team

Update the team section with your actual doctors/staff:

```javascript
team: [
  {
    name: "Dr. Your Name",              // ← Doctor's name
    specialty: "Your Specialty",        // ← Their specialty
    credentials: "MD, Board Certified", // ← Their credentials
    bio: "Doctor's background...",      // ← Professional bio
    specialties: ["Specialty 1", "Specialty 2"], // ← Areas of expertise
    availability: "Mon-Fri: 8:00 AM - 5:00 PM",  // ← When available
    languages: "English, Spanish"       // ← Languages spoken
  }
  // Add more team members...
]
```

### Step 4: Update Contact Information

Make sure all contact details are correct:

```javascript
contact: {
  phone: "Your real phone number",
  whatsapp: "Your WhatsApp number", 
  email: "Your real email address",
  address: {
    street: "Your actual address",
    city: "Your city",
    state: "Your state", 
    zip: "Your ZIP code"
  }
},

hours: {
  weekdays: "Your weekday hours",
  saturday: "Saturday hours or 'Closed'",
  sunday: "Sunday hours or 'Closed'"
}
```

## 🎨 Customization Options

### Change Colors
Edit the theme colors in `config/site-config.js`:
```javascript
theme: {
  primary: "#1e40af",   // Main blue color
  secondary: "#64748b", // Gray color  
  accent: "#f59e0b"     // Accent color
}
```

### Add Your Logo
1. Add your logo file to `public/images/logo.png`
2. Update the config: `logo: "/images/logo.png"`

### Add Doctor Photos
1. Add doctor photos to `public/images/doctor1.jpg`, `doctor2.jpg`, etc.
2. Update team config: `image: "/images/doctor1.jpg"`

### SEO Settings
Update for better search engine visibility:
```javascript
seo: {
  title: "Your Practice Name - Quality Healthcare",
  description: "Leading medical practice providing...",
  keywords: "healthcare, medical, your city, your specialty"
}
```

## 📁 File Structure

```
healthcare-template/
├── config/
│   └── site-config.js      # ← EDIT THIS FILE (main customization)
├── pages/
│   ├── index.js            # Main page (uses config data)
│   ├── _app.js             # App configuration
│   └── _document.js        # Document structure  
├── styles/
│   └── globals.css         # Styling
├── public/
│   └── images/            # ← ADD YOUR IMAGES HERE
│       ├── logo.png       # Your logo
│       ├── doctor1.jpg    # Doctor photos
│       └── ...
└── package.json           # Dependencies
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Get your live URL!** Vercel will give you a URL like:
   `https://your-practice-name.vercel.app`

### Alternative: GitHub + Vercel
1. Push your code to GitHub
2. Connect GitHub repo to Vercel dashboard
3. Auto-deploy on every code change

## 🎯 Template Examples

### Example 1: Dental Practice
```javascript
practice: {
  name: "Smile Dental Care",
  tagline: "Your Perfect Smile Awaits", 
  description: "Modern dental practice offering comprehensive oral care..."
},
services: [
  {
    title: "General Dentistry",
    description: "Cleanings, fillings, crowns, and preventive care.",
    icon: "tooth"
  }
]
```

### Example 2: Medical Clinic  
```javascript
practice: {
  name: "Family Health Clinic",
  tagline: "Comprehensive Healthcare for All Ages",
  description: "Full-service medical practice providing primary care..."
},
services: [
  {
    title: "Primary Care", 
    description: "Complete healthcare services for the whole family.",
    icon: "user-md"
  }
]
```

### Example 3: Specialist Practice
```javascript
practice: {
  name: "Heart Health Associates",
  tagline: "Expert Cardiac Care",
  description: "Specialized cardiovascular treatment and prevention..."
},
services: [
  {
    title: "Cardiac Consultation",
    description: "Comprehensive heart health evaluations and treatment plans.",
    icon: "heartbeat" 
  }
]
```

## ✅ Customization Checklist

- [ ] Update practice name and tagline
- [ ] Replace placeholder description with your services
- [ ] Update all contact information (phone, email, address)
- [ ] Change statistics to your actual numbers
- [ ] Customize services list
- [ ] Add your team members
- [ ] Update business hours
- [ ] Add your logo to `public/images/`
- [ ] Add doctor photos to `public/images/`
- [ ] Test website locally (`npm run dev`)
- [ ] Deploy to Vercel
- [ ] Test live website

## 🆘 Need Help?

### Common Issues:

**Q: Website shows "Your Practice Name"**
A: Edit `config/site-config.js` and change the practice name

**Q: Contact form doesn't work**
A: The form shows an alert by default. Connect to your backend API for real functionality.

**Q: Images don't show**
A: Make sure images are in `public/images/` folder with exact filenames from config

**Q: Colors look wrong**
A: Check the `theme` section in `config/site-config.js`

### Support:
- Check the browser console for errors
- Make sure all files are saved
- Restart the development server: `npm run dev`

## 📋 Features

✅ **Fully Responsive** - Works on all devices
✅ **SEO Optimized** - Better search rankings  
✅ **Fast Loading** - Optimized performance
✅ **Easy Customization** - Edit one config file
✅ **Professional Design** - Modern healthcare aesthetic
✅ **Contact Forms** - Ready for backend integration
✅ **Mobile Friendly** - Touch-optimized interface
✅ **Accessibility** - Screen reader compatible

## 🔧 Technical Details

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** React Icons (Font Awesome)
- **Deployment:** Vercel optimized
- **Browser Support:** All modern browsers

---

**Ready to launch your professional healthcare website? Start customizing now!**