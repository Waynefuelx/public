'use client'

import Link from 'next/link'
import { Truck, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    conversions: [
      { name: 'Site Offices', href: '/services' },
      { name: 'Office Units', href: '/services' },
      { name: 'Storage Solutions', href: '/services' },
      { name: 'Custom Conversions', href: '/services' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Branches', href: '/branches' },
      { name: 'Careers', href: '/careers' },
      { name: 'News', href: '/news' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Container', href: '/track' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  return (
    <footer className="bg-[#006240] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold">Valley Containers</span>
            </div>
            <p className="text-[#F2F2F2] mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              <span className="font-semibold text-white">Welcome to Valley Containers</span>
              <br /><br />
              At Valley Containers, we specialise in the leasing of storage, office, sleeper, freezer and refrigeration containers. You can rent a steel container for literally any need, from anywhere in South Africa. We also sell new and used containers and offer converted containers to suit your individual needs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
                          <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-[#F2F2F2]" />
              <a 
                href="tel:+27 86 187 8487"
                className="text-[#F2F2F2] hover:text-white transition-colors duration-200"
                title="Call +27 86 187 8487"
              >
                +27 86 187 8487
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#F2F2F2]" />
              <span className="text-[#F2F2F2]">info@valleycontainers.co.za</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-[#F2F2F2]" />
              <span className="text-[#F2F2F2]">South Africa</span>
            </div>
            </div>
          </div>

          {/* Conversions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conversions</h3>
            <ul className="space-y-2">
              {footerLinks.conversions.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-[#F2F2F2] hover:text-white transition-colors duration-200"
                  >
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
                  <Link 
                    href={link.href}
                    className="text-[#F2F2F2] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-[#F2F2F2] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-[#F2F2F2] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-[#F2F2F2] mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* George Branch */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">George Branch (Main)</h4>
              <div className="text-[#F2F2F2] text-sm space-y-1">
                <p>
                  <a 
                    href="tel:+27 44 878 0878"
                    className="hover:text-white transition-colors duration-200"
                    title="Call +27 44 878 0878"
                  >
                    +27 44 878 0878
                  </a>
                </p>
                <p>info@valleycontainers.co.za</p>
                <p>Western Cape, South Africa</p>
              </div>
            </div>
            
            {/* Cape Town Branch */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">Cape Town Branch</h4>
              <div className="text-[#F2F2F2] text-sm space-y-1">
                <p>
                  <a 
                    href="tel:+27 72 211 1052"
                    className="hover:text-white transition-colors duration-200"
                    title="Call +27 72 211 1052"
                  >
                    +27 72 211 1052
                  </a>
                </p>
                <p>cpt@valleycontainers.co.za</p>
                <p>Cape Town Metro, South Africa</p>
              </div>
            </div>
            
            {/* Johannesburg Branch */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">Johannesburg Branch</h4>
              <div className="text-[#F2F2F2] text-sm space-y-1">
                <p>
                  <a 
                    href="tel:+27 71 371 2972"
                    className="hover:text-white transition-colors duration-200"
                    title="Call +27 71 371 2972"
                  >
                    +27 71 371 2972
                  </a>
                </p>
                <p>jhb@valleycontainers.co.za</p>
                <p>Gauteng, South Africa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F2F2F2] mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-[#F2F2F2] text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Valley Containers. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-[#F2F2F2] hover:text-white text-xs sm:text-sm transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/terms" className="text-[#F2F2F2] hover:text-white text-xs sm:text-sm transition-colors duration-200">
                Terms
              </Link>
              <Link href="/sitemap" className="text-[#F2F2F2] hover:text-white text-xs sm:text-sm transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
