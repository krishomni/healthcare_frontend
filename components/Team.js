import { FaUserMd, FaCalendarAlt, FaLanguage } from 'react-icons/fa'

export default function Team() {
  const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Chief Dental Officer',
    credentials: 'DDS, MS Periodontics',
    bio: 'Board-certified periodontist with over 15 years of experience specializing in gum disease treatment and dental implants. Graduated from Harvard School of Dental Medicine.',
    specialties: ['Periodontics', 'Dental Implants'],
    availability: 'Mon-Fri: 8:00 AM - 5:00 PM',
    languages: 'English, Spanish',
    gradient: 'from-blue-100 to-blue-200'
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Cosmetic Dentist',
    credentials: 'DDS, AACD Accredited',
    bio: 'Cosmetic dentistry expert with 12 years of experience in smile makeovers, veneers, and aesthetic treatments. Member of the American Academy of Cosmetic Dentistry.',
    specialties: ['Cosmetic Dentistry', 'Veneers'],
    availability: 'Mon-Thu: 9:00 AM - 6:00 PM',
    languages: 'English, Mandarin',
    gradient: 'from-green-100 to-green-200'
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatric Dentist',
    credentials: 'DDS, Pediatric Specialty',
    bio: 'Dedicated pediatric dentist with 10 years of experience making dental visits fun and comfortable for children. Specializes in preventive care and behavior management.',
    specialties: ['Pediatric Dentistry', 'Preventive Care'],
    availability: 'Tue-Sat: 8:00 AM - 4:00 PM',
    languages: 'English, Spanish',
    gradient: 'from-purple-100 to-purple-200'
  }
]

  return (
    <section id="team" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-dark mb-6">Meet Our Expert Team</h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            [Board-certified physicians and healthcare professionals dedicated to your health]
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className={`h-80 bg-gradient-to-br ${doctor.gradient} flex items-center justify-center`}>
                <FaUserMd className="text-6xl text-primary/30" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-dark mb-2">{doctor.name}</h3>
                <p className="text-primary font-semibold mb-3">{doctor.specialty}</p>
                <p className="text-secondary font-medium mb-4">{doctor.credentials}</p>
                <p className="text-secondary leading-relaxed mb-6">
                  {doctor.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {doctor.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="text-secondary text-sm space-y-2">
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {doctor.availability}
                  </p>
                  <p className="flex items-center">
                    <FaLanguage className="mr-2" />
                    {doctor.languages}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}