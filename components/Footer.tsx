'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { company, social, regions } = siteConfig

  const footerLinks = {
    rentals: [
      { name: 'On-Site Storage', href: '/rental' },
      { name: 'On-Site Offices', href: '/rental' },
      { name: 'Ablution Facilities', href: '/rental' },
      { name: 'Security Huts', href: '/rental' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Branches', href: '/branches' },
      { name: 'Special Offers', href: '/special-offers' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Browse Containers', href: '/containers' },
      { name: 'Get a Quote', href: '/booking' },
      { name: 'Track Container', href: '/track' },
      { name: 'Sign In', href: '/login' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: social.facebook, icon: Facebook },
    { name: 'Instagram', href: social.instagram, icon: Instagram },
    { name: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { name: 'YouTube', href: social.youtube, icon: Youtube },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <img src={siteConfig.assets.logoFooterLight} alt={company.name} className="h-10 w-auto" />
            </Link>
            <p className="text-primary-100 mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              <span className="font-semibold text-white">{company.taglineLong}</span>
              <br /><br />
              With nearly {company.yearsExperience} years of experience, Topshell rents high-quality storage, office, sleeper, ablution, canteen, refrigeration and security containers across the Western Cape, Southern Cape, Gauteng and Mpumalanga — a one-stop shop for complete site establishment.
            </p>

            {/* Primary Contact */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-200" />
                <a
                  href={`tel:${company.primaryPhone.replace(/\s/g, '')}`}
                  className="text-primary-100 hover:text-white transition-colors duration-200"
                  title={`Call ${company.primaryPhone}`}
                >
                  {company.primaryPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-200" />
                <a
                  href={`mailto:${company.primaryEmail}`}
                  className="text-primary-100 hover:text-white transition-colors duration-200"
                >
                  {company.primaryEmail}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-200" />
                <span className="text-primary-100">Western &amp; Southern Cape · Gauteng · Mpumalanga</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center space-x-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors duration-200"
                >
                  <s.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Rentals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rentals</h3>
            <ul className="space-y-2">
              {footerLinks.rentals.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-100 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-100 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-100 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regional Contacts */}
        <div className="border-t border-primary-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {regions.map((region) => (
              <div key={region.id} className="text-center md:text-left">
                <h4 className="text-white font-semibold mb-2">{region.name}</h4>
                <div className="text-primary-100 text-sm space-y-1">
                  <p>
                    <a
                      href={`tel:${region.phone.replace(/\s/g, '')}`}
                      className="hover:text-white transition-colors duration-200"
                      title={`Call ${region.phone}`}
                    >
                      {region.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${region.email}`} className="hover:text-white transition-colors duration-200">
                      {region.email}
                    </a>
                  </p>
                  <p>{region.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-primary-100 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} {company.name}. All rights reserved. · {company.memberships[0]}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-primary-100 hover:text-white text-xs sm:text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/special-offers" className="text-primary-100 hover:text-white text-xs sm:text-sm transition-colors duration-200">
                Special Offers
              </Link>
              <img
                src={siteConfig.assets.membershipBadge}
                alt="Verified Member of the Cape Chamber of Commerce and Industry"
                className="h-11 w-auto bg-white rounded p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
