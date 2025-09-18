import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { FaCalendarCheck, FaUsers, FaChartLine, FaUserMd } from 'react-icons/fa'

export default function Stats({ stats }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const statsData = [
    {
      icon: FaCalendarCheck,
      value: stats.years,
      label: 'Years Experience'
    },
    {
      icon: FaUsers,
      value: stats.patients,
      label: 'Patients Served'
    },
    {
      icon: FaChartLine,
      value: stats.successRate,
      label: 'Success Rate'
    },
    {
      icon: FaUserMd,
      value: stats.doctors,
      label: 'Expert Doctors'
    }
  ]

  return (
    <section ref={ref} className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="bg-primary/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="text-primary text-2xl" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
