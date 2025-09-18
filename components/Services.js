import { FaUserMd, FaHeartbeat, FaTooth, FaMicroscope, FaShieldAlt, FaProcedures } from 'react-icons/fa'

export default function Services() {
  const services = [
  {
    icon: FaTooth,
    title: 'General Dentistry',
    description: 'Comprehensive dental care including cleanings, fillings, crowns, and preventive treatments for the whole family.'
  },
  {
    icon: FaUserMd,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with veneers, teeth whitening, and aesthetic treatments using the latest techniques.'
  },
  {
    icon: FaProcedures,
    title: 'Oral Surgery',
    description: 'Expert surgical procedures including extractions, implants, and corrective jaw surgery with minimal discomfort.'
  },
  {
    icon: FaMicroscope,
    title: 'Orthodontics',
    description: 'Straighten your teeth with traditional braces, clear aligners, and modern orthodontic solutions.'
  },
  {
    icon: FaShieldAlt,
    title: 'Preventive Care',
    description: 'Protect your oral health with regular checkups, cleanings, and early detection of dental issues.'
  },
  {
    icon: FaHeartbeat,
    title: 'Emergency Dental',
    description: 'Urgent dental care available for accidents, severe pain, and dental emergencies when you need it most.'
  }
  ]
  return (
    <section id="services" className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-dark mb-6">Our [Medical/Dental] Services</h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            [Comprehensive healthcare services delivered by experienced professionals]
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors">
                  Learn More 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

