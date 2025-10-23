export default function Footer({ practiceData }) {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' }
  ]
  
  const services = [
    '[Service 1]',
    '[Service 2]',
    '[Service 3]',
    '[Service 4]'
  ]

  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-primary mb-4">{practiceData.name}</h4>
            <p className="text-gray-300 mb-4 max-w-md">
              [Leading healthcare facility providing comprehensive medical services with state-of-the-art technology and experienced professionals.]
            </p>
            <div className="text-gray-300 text-sm">
              <p>[123 Healthcare Blvd, Suite 100]</p>
              <p>[Medical City, TX 75001]</p>
              <p>Phone: [+1 (555) 123-4567]</p>
              <p>Email: [info@yourpractice.com]</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} {practiceData.name}. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}