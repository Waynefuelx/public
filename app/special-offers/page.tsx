import Link from 'next/link'
import { Phone, Mail, MapPin, Check, Tag, ArrowRight, Truck } from 'lucide-react'
import { siteConfig, getRegionById, type RegionContact } from '@/lib/site-config'

export const metadata = {
  title: `Special Offers — ${siteConfig.company.name}`,
  description: siteConfig.specialOffer.description,
}

export default function SpecialOffersPage() {
  const { specialOffer, regions, company } = siteConfig
  const offerRegions = specialOffer.availableRegionIds
    .map((id) => getRegionById(id))
    .filter((r): r is RegionContact => Boolean(r))
  const otherRegions = regions.filter((r) => !specialOffer.availableRegionIds.includes(r.id))

  const offerIncludes = [
    'Insulated office with energy-saving aircon',
    '6m on-site storage container',
    '20km free transport included',
    'Delivered & set up on your site',
  ]

  return (
    <div className="bg-secondary-200 min-h-screen">
      {/* Hero */}
      <section className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-primary-700 text-primary-100 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" /> Limited-time offer
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Special Offers</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            {company.tagline}. Grab our current site-establishment deals while stocks last.
          </p>
        </div>
      </section>

      {/* Featured offer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-12">
        <div className="card shadow-soft overflow-hidden p-0">
          <div className="grid md:grid-cols-2">
            <div className="relative bg-secondary-100">
              <img
                src="/products/office-insulated.png"
                alt={specialOffer.headline}
                className="h-full w-full object-cover min-h-[260px]"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">{specialOffer.headline}</h2>
              <p className="text-secondary-600 mb-4">{specialOffer.description}</p>
              <div className="flex items-end gap-2 mb-5">
                <span className="text-4xl font-bold text-gradient">{specialOffer.price}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {offerIncludes.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-secondary-700">
                    <Check className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className="btn-primary inline-flex items-center justify-center gap-2">
                  Claim this offer <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${company.primaryPhone.replace(/\s/g, '')}`}
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {company.primaryPhone}
                </a>
              </div>
              <p className="text-xs text-secondary-500 mt-4">{specialOffer.finePrint}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where it's available */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="text-xl font-bold text-secondary-900 mb-6">Available at these branches</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {offerRegions.map((region) => (
            <div key={region.id} className="card">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <h4 className="text-lg font-semibold text-secondary-900">{region.name}</h4>
                <span className="status-badge status-confirmed ml-auto">Offer available</span>
              </div>
              <p className="text-secondary-600 text-sm mb-3">{region.city}</p>
              <div className="space-y-2 text-sm">
                <a
                  href={`tel:${region.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-secondary-700 hover:text-primary-600"
                >
                  <Phone className="w-4 h-4 text-primary-500" /> {region.phone}
                </a>
                <a
                  href={`mailto:${region.email}`}
                  className="flex items-center gap-2 text-secondary-700 hover:text-primary-600"
                >
                  <Mail className="w-4 h-4 text-primary-500" /> {region.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Other regions */}
        {otherRegions.length > 0 && (
          <div className="mt-8 card">
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-primary-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-secondary-900 mb-1">
                  {otherRegions.map((r) => r.name).join(' & ')}
                </h4>
                <p className="text-secondary-600 text-sm">
                  No current specials at these branches — but new deals land often. Contact us for a tailored
                  quote on rentals and complete site establishment.
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  {otherRegions.map((region) => (
                    <a
                      key={region.id}
                      href={`tel:${region.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Phone className="w-4 h-4" /> {region.name}: {region.phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-bold text-secondary-900 mb-3">Need something specific?</h3>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            From on-site storage and offices to ablutions, canteens and security huts — {company.shortName} is
            your one-stop shop for complete site establishment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/containers" className="btn-primary">
              Browse all containers
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
