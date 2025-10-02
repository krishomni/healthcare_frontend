// pages/portfolios/handyman/HandymanShowcasePage.jsx
import React from 'react';
import Hero from './Hero.jsx';
import Services from './Services.jsx';
import Portfolio from './Portfolio.jsx';
import ProcessTimeline from './ProcessTimeline.jsx';
import Testimonials from './Testimonials.jsx';
import ContactForm from './ContactForm.jsx';
import Footer from './Footer.jsx';
import HeroSubNav from './HeroSubNav.jsx';

// CSS
import './Hero.css';
import './Services.css';
import './Portfolio.css';
import './ProcessTimeline.css';
import './Testimonials.css';
import './ContactForm.css';
import './Footer.css';

const HandymanShowcasePage = () => {
  // Seed content for the public showcase page
  const showcaseData = {
    hero: {
      title: 'Trusted Handyman for Home Repairs & Maintenance',
      subtitle: 'Licensed, Insured, and Ready to Help. Call us today!',
      phoneNumber: '(123) 456-7890',
      imageUrl: 'https://handymanraleighnc.com/wp-content/uploads/2019/11/Handyman-Services-AdobeStock_268881530-compressed-1024x683.jpg',
    },

    // Section heading + intro used by <Services />
    servicesSectionTitle: 'Our Services',
    servicesSectionIntro:
      "A One-Call Solution for Your To-Do List. We handle a wide range of home maintenance and repair solutions so you don't have to juggle multiple contractors.",

    // Six cards with the icons from your dropdown (💧 💡 🔨 🚪 🔧 🌳)
    services: [
      {
        icon: '🔧', 
        title: 'General Repairs',
        description:
          'From fixing squeaky doors to patching drywall, we handle all your general home repair needs.',
        bullets: ['Drywall repair', 'Door & window fixes', 'Furniture assembly', 'Garage door repair'],
      },
      {
        icon: '🔨', 
        title: 'Painting Services',
        description:
          'Professional interior and exterior painting to refresh and protect your home.',
        bullets: ['Interior painting', 'Exterior painting', 'Pressure washing', 'Staining & finishing'],
      },
      {
        icon: '💡',
        title: 'Electrical Work',
        description:
          'Safe and reliable electrical services for your home improvement projects.',
        bullets: ['Light installation', 'Outlet repair', 'Ceiling fan installation', 'Switch replacement'],
      },
      {
        icon: '💧',
        title: 'Plumbing Services',
        description: 'Quick and efficient plumbing repairs and installations.',
        bullets: ['Faucet repair', 'Toilet installation', 'Pipe fixes', 'Water heater service'],
      },
      {
        icon: '🔨',
        title: 'Carpentry',
        description: 'Custom carpentry work and wood repairs for your home.',
        bullets: ['Custom shelving', 'Trim installation', 'Deck repair', 'Cabinet installation'],
      },
      {
        icon: '🌳',
        title: 'Home Maintenance',
        description: 'Regular maintenance services to keep your home in top condition.',
        bullets: ['Seasonal maintenance', 'Gutter cleaning', 'Weatherproofing', 'Safety inspections'],
      },
    ],

    processSteps: [
      { number: 1, title: 'Request a Quote', description: 'Fill out our form or give us a call.' },
      { number: 2, title: 'We Confirm Details', description: "We’ll contact you to confirm the job scope." },
      { number: 3, title: 'You Approve the Price', description: 'Get a firm, upfront price. No surprises.' },
      { number: 4, title: 'We Do the Work', description: 'We complete the job professionally and on time.' },
      { number: 5, title: 'Guaranteed Satisfaction', description: 'We ensure you’re 100% happy with the result.' },
    ],

    testimonials: [
      {
        name: 'Jane D.',
        quote:
          '"Incredibly reliable and professional. The job was done perfectly and on time!"',
      },
      {
        name: 'John S.',
        quote:
          '"Finally found a handyman I can trust. Highly recommended for any home repair."',
      },
    ],
  };

  return (
    <div>
      <main>
        <HeroSubNav />
        <Hero content={showcaseData.hero} />
        <Services
          list={showcaseData.services}
          heading={showcaseData.servicesSectionTitle}
          intro={showcaseData.servicesSectionIntro}
        />
        <Portfolio />
        <ProcessTimeline steps={showcaseData.processSteps} />
        <Testimonials list={showcaseData.testimonials} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default HandymanShowcasePage;
