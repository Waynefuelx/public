/**
 * Topshell Container Rentals — single source of truth for all brand data.
 *
 * Everything brand-specific (company identity, regional contacts, product
 * catalog, social links, logos, the running special offer) lives here so a
 * future rebrand is a one-file change. Components import from `@/lib/site-config`
 * instead of hardcoding strings.
 */

export interface Depot {
  name: string
  addressLines: string[]
}

export interface RegionContact {
  id: string
  name: string
  city: string
  phone: string
  email: string
  addressLines: string[]
  /** Southern Cape operates two depots (George + Mossel Bay). */
  depots?: Depot[]
  hours: string
  /** Used by the "nearest branch" geolocation/Haversine logic. */
  coordinates: { lat: number; lng: number }
  hasSpecialOffer?: boolean
}

export interface ProductCategory {
  id: string
  label: string
}

export interface Industry {
  name: string
  /** lucide-react icon name, resolved to a component via a lookup map in the consumer. */
  icon: string
}

export interface Product {
  /** Stable slug — flows through /booking?container=<id> and the /api/orders payload. Keep stable. */
  id: string
  name: string
  category: string
  description: string
  sizes: string[]
  features: string[]
  dimensions?: string
  capacity?: string
  /** Indicative "from" monthly rental rate in ZAR, excl. VAT. */
  monthlyPrice?: number
  /** Indicative purchase price in ZAR, excl. VAT. */
  purchasePrice?: number
  rental: boolean
  purchase: boolean
  image: string
  /** lucide-react icon name, resolved to a component via a lookup map in the consumer. */
  icon: string
  /** Region ids where available; omitted = all regions. */
  regionAvailability?: string[]
  popular?: boolean
}

export interface SiteConfig {
  company: {
    name: string
    shortName: string
    legalName: string
    tagline: string
    taglineLong: string
    foundedYear: number
    yearsExperience: number
    memberships: string[]
    domain: string
    primaryEmail: string
    primaryPhone: string
    /** Prefix for order/tracking numbers, e.g. TS20001. */
    trackingPrefix: string
  }
  assets: {
    logoHeaderDark: string
    logoFooterLight: string
    logoLoginDark: string
    membershipBadge: string
    heroImage: string
  }
  social: {
    facebook: string
    instagram: string
    linkedin: string
    youtube: string
  }
  regions: RegionContact[]
  productCategories: ProductCategory[]
  industries: Industry[]
  products: Product[]
  specialOffer: {
    headline: string
    description: string
    price: string
    finePrint: string
    availableRegionIds: string[]
  }
  storage: { localStorageUserKey: string }
}

export const siteConfig: SiteConfig = {
  company: {
    name: 'Topshell Container Rentals',
    shortName: 'Topshell',
    legalName: 'Topshell Container Rentals',
    tagline: 'Best Value for Your Money Guaranteed',
    taglineLong: 'Best service and value for your money, guaranteed!',
    foundedYear: 2005,
    yearsExperience: 20,
    memberships: ['Verified Member of the Cape Chamber of Commerce and Industry'],
    domain: 'topshell.co.za',
    primaryEmail: 'rental@topshell.co.za',
    primaryPhone: '076 770 4500',
    trackingPrefix: 'TS',
  },
  assets: {
    logoHeaderDark: '/logo-dark.png',
    logoFooterLight: '/logo-light.png',
    logoLoginDark: '/logo-dark.png',
    membershipBadge: '/membership.png',
    heroImage: '/hero-workshop.jpg',
  },
  social: {
    facebook: 'https://www.facebook.com/topshellcontainers/',
    instagram: 'https://www.instagram.com/topshellcontainers/',
    linkedin: 'https://www.linkedin.com/company/topshellcontainers',
    youtube: 'https://www.youtube.com/@topshellcontainers',
  },
  regions: [
    {
      id: 'western-cape',
      name: 'Western Cape',
      city: 'Blackheath, Cape Town',
      phone: '076 770 4500',
      email: 'rental@topshell.co.za',
      addressLines: ['27 Range Road', 'Blackheath, Cape Town, 7581'],
      hours: 'Mon–Fri 08:00–16:30 · Weekends Closed',
      coordinates: { lat: -33.891, lng: 18.665 },
      hasSpecialOffer: true,
    },
    {
      id: 'southern-cape',
      name: 'Southern Cape',
      city: 'George & Mossel Bay',
      phone: '076 770 4500',
      email: 'rental@topshell.co.za',
      addressLines: ['Serving George & Mossel Bay'],
      depots: [
        {
          name: 'George Depot',
          addressLines: [
            'Challenge Transport Depot',
            '11 Ivory Street, Tamsui Industria',
            'George, 6529',
          ],
        },
        {
          name: 'Mossel Bay Depot',
          addressLines: ['16 Bally Crescent', 'Voorbaai, Mossel Bay, 6506'],
        },
      ],
      hours: 'Mon–Fri 08:00–16:30 · Weekends Closed',
      coordinates: { lat: -33.963, lng: 22.4617 },
      hasSpecialOffer: true,
    },
    {
      id: 'gauteng',
      name: 'Gauteng',
      city: 'Midrand',
      phone: '082 047 0505',
      email: 'quotes@topshell.co.za',
      addressLines: ['59 New Rd, Glen Austin AH', 'Midrand, 1685'],
      hours: 'Mon–Fri 07:00–16:00 · Weekends Closed',
      coordinates: { lat: -25.989, lng: 28.128 },
    },
    {
      id: 'mpumalanga',
      name: 'Mpumalanga',
      city: 'Secunda',
      phone: '079 300 6173',
      email: 'paul@topshell.co.za',
      addressLines: ['Stand 8755, Ext 53', 'Detroit Crescent, Secunda, 2300'],
      hours: 'Mon–Fri 07:00–16:00 · Weekends Closed',
      coordinates: { lat: -26.516, lng: 29.201 },
    },
  ],
  productCategories: [
    { id: 'storage', label: 'On-Site Storage' },
    { id: 'office', label: 'On-Site Offices' },
    { id: 'accommodation', label: 'On-Site Accommodation' },
    { id: 'ablution', label: 'Ablution Facilities' },
    { id: 'canteen', label: 'Canteens' },
    { id: 'refrigeration', label: 'Refrigeration Units' },
    { id: 'security', label: 'Security Huts' },
  ],
  industries: [
    { name: 'Education', icon: 'GraduationCap' },
    { name: 'Healthcare', icon: 'HeartPulse' },
    { name: 'Renewable Energy', icon: 'Sun' },
    { name: 'Electrical Engineering', icon: 'Zap' },
    { name: 'Water Treatment', icon: 'Droplets' },
    { name: 'Retail', icon: 'ShoppingCart' },
    { name: 'FMCG', icon: 'Truck' },
  ],
  products: [
    {
      id: 'storage-3m',
      name: '3m On-Site Storage Container',
      category: 'storage',
      description:
        'Compact, weatherproof 3m steel storage container — ideal for tools, equipment and secure on-site storage where space is tight.',
      sizes: ['3m'],
      features: ['Wind & watertight', 'Lockable steel doors', 'Custom lock box', 'On-site delivery & collection'],
      dimensions: '3m × 2.4m × 2.6m',
      capacity: '~14 m³',
      monthlyPrice: 550,
      rental: true,
      purchase: true,
      purchasePrice: 18500,
      image: '/products/storage-3m.webp',
      icon: 'Package',
      popular: true,
    },
    {
      id: 'storage-6m',
      name: '6m On-Site Storage Container',
      category: 'storage',
      description:
        'Our most popular storage solution. A full 6m steel container delivered and set up on your site — secure, durable and ready to use.',
      sizes: ['6m'],
      features: ['Wind & watertight', 'Heavy-duty lock box', 'Burglar bars optional', 'On-site delivery & collection'],
      dimensions: '6m × 2.4m × 2.6m',
      capacity: '~33 m³',
      monthlyPrice: 850,
      rental: true,
      purchase: true,
      purchasePrice: 28000,
      image: '/products/storage-6m.webp',
      icon: 'Package',
      popular: true,
    },
    {
      id: 'storage-shed',
      name: 'Storage Shed',
      category: 'storage',
      description:
        'Spacious storage sheds for larger on-site storage needs. Available in Gauteng & Mpumalanga.',
      sizes: ['Custom'],
      features: ['Large footprint', 'Weatherproof', 'Secure access', 'Flexible rental terms'],
      monthlyPrice: 750,
      rental: true,
      purchase: false,
      image: '/products/storage-shed.png',
      icon: 'Warehouse',
      regionAvailability: ['gauteng', 'mpumalanga'],
    },
    {
      id: 'office-6m-uninsulated',
      name: '6m Uninsulated Office Container',
      category: 'office',
      description:
        'A practical 6m site office with windows, door and electrics — a cost-effective workspace for any site.',
      sizes: ['6m'],
      features: ['Windows with burglar bars', 'Power points & lighting', 'Lockable door', 'Ready-to-use workspace'],
      dimensions: '6m × 2.4m × 2.6m',
      monthlyPrice: 1650,
      rental: true,
      purchase: true,
      purchasePrice: 42000,
      image: '/products/office-uninsulated.png',
      icon: 'Briefcase',
    },
    {
      id: 'office-6m-insulated',
      name: '6m Insulated Office Container',
      category: 'office',
      description:
        'A fully insulated 6m office with energy-saving aircon — comfortable in any weather, perfect for site management and meetings.',
      sizes: ['6m'],
      features: ['Fully insulated', 'Energy-saving aircon', 'Power, plugs & lighting', 'Windows with burglar bars'],
      dimensions: '6m × 2.4m × 2.6m',
      monthlyPrice: 2200,
      rental: true,
      purchase: true,
      purchasePrice: 52000,
      image: '/products/office-insulated.png',
      icon: 'Briefcase',
      popular: true,
    },
    {
      id: 'office-6m-combo',
      name: '6m Uninsulated Office Combo',
      category: 'office',
      description:
        'Combined office and storage in one 6m unit. Available in Gauteng & Mpumalanga.',
      sizes: ['6m'],
      features: ['Office + storage combo', 'Power & lighting', 'Lockable', 'Space-efficient'],
      monthlyPrice: 1950,
      rental: true,
      purchase: false,
      image: '/products/office-uninsulated.png',
      icon: 'Briefcase',
      regionAvailability: ['gauteng', 'mpumalanga'],
    },
    {
      id: 'office-6m-split',
      name: '6m Insulated Split Office Container',
      category: 'office',
      description:
        'An insulated 6m split office with aircon — two separate work areas in one unit. Available in Gauteng & Mpumalanga.',
      sizes: ['6m'],
      features: ['Insulated & split layout', 'Energy-saving aircon', 'Two work areas', 'Power, plugs & lighting'],
      monthlyPrice: 2600,
      rental: true,
      purchase: false,
      image: '/products/office-split.png',
      icon: 'Briefcase',
      regionAvailability: ['gauteng', 'mpumalanga'],
    },
    {
      id: 'conference-pod-6m',
      name: '6m Conference Pod',
      category: 'office',
      description:
        'A smart, insulated 6m conference pod for on-site meetings and presentations. Available in the Western Cape.',
      sizes: ['6m'],
      features: ['Insulated & aircon', 'Meeting-ready fit-out', 'Power & lighting', 'Professional finish'],
      monthlyPrice: 2400,
      rental: true,
      purchase: false,
      image: '/products/conference-pod.png',
      icon: 'Users',
      regionAvailability: ['western-cape'],
    },
    {
      id: 'sleeper-8bed',
      name: '8-Bed Sleeper Unit',
      category: 'accommodation',
      description:
        'On-site accommodation made affordable. A 6m sleeper unit with bunk beds, power, plugs and lighting for your team.',
      sizes: ['6m'],
      features: ['Sleeps 8 (bunk beds)', 'Power, plugs & lighting', 'Secure & weatherproof', 'Available at all outlets'],
      dimensions: '6m × 2.4m × 2.6m',
      capacity: '8 beds',
      monthlyPrice: 3200,
      rental: true,
      purchase: false,
      image: '/products/sleeper.png',
      icon: 'BedDouble',
    },
    {
      id: 'ablution-2m',
      name: '2m Ablution Facility',
      category: 'ablution',
      description:
        'Compact 2m on-site ablution facility — safe, clean and comfortable sanitation where space is limited.',
      sizes: ['2m'],
      features: ['Plumbed & ready', 'Clean & comfortable', 'Compact footprint', 'On-site delivery'],
      monthlyPrice: 1450,
      rental: true,
      purchase: false,
      image: '/products/ablution-2m.png',
      icon: 'ShowerHead',
    },
    {
      id: 'ablution-6m',
      name: '6m Ablution Facility',
      category: 'ablution',
      description:
        'Spacious 6m unisex ablution facility for larger sites — safe, clean, comfortable on-site sanitation.',
      sizes: ['6m'],
      features: ['Multiple toilets & basins', 'Unisex layout', 'Plumbed & ready', 'Durable finish'],
      monthlyPrice: 2200,
      rental: true,
      purchase: false,
      image: '/products/ablution-6m.png',
      icon: 'ShowerHead',
    },
    {
      id: 'ablution-2m-toilet-shower',
      name: '2m Ablution Facility with Toilet & Shower',
      category: 'ablution',
      description:
        'A 2m half-ablution facility complete with toilet and shower — compact sanitation with everything you need.',
      sizes: ['2m'],
      features: ['Toilet & shower', 'Hot/cold plumbing', 'Compact & private', 'On-site delivery'],
      monthlyPrice: 1650,
      rental: true,
      purchase: false,
      image: '/products/ablution-shower.webp',
      icon: 'ShowerHead',
    },
    {
      id: 'canteen-6m',
      name: '6m Canteen',
      category: 'canteen',
      description:
        'A fully fitted 6m canteen with stainless-steel worktops, basin, storage hooks and power points — feed your team on site.',
      sizes: ['6m'],
      features: ['Stainless-steel worktops', 'Basin & plumbing', 'Storage hooks', 'Power points'],
      dimensions: '6m × 2.4m × 2.6m',
      monthlyPrice: 2400,
      rental: true,
      purchase: false,
      image: '/products/canteen.png',
      icon: 'UtensilsCrossed',
    },
    {
      id: 'refrigeration-6m',
      name: '6m Refrigeration Unit',
      category: 'refrigeration',
      description:
        'Spacious walk-in 6m refrigeration unit for on-site cold storage. Available in the Western Cape.',
      sizes: ['6m'],
      features: ['Walk-in cold storage', 'Temperature controlled', 'Heavy-duty insulation', 'Reliable refrigeration'],
      dimensions: '6m × 2.4m × 2.6m',
      monthlyPrice: 3500,
      rental: true,
      purchase: false,
      image: '/products/refrigeration.png',
      icon: 'Thermometer',
      regionAvailability: ['western-cape'],
    },
    {
      id: 'security-hut',
      name: 'Security Hut',
      category: 'security',
      description:
        'Secure your site with ease. A cost-effective security hut with steel swing doors, custom lock box, burglar bars and optional 220v DB-board.',
      sizes: ['2.1m × 2.1m'],
      features: ['Steel swing doors', 'Custom lock box', 'Burglar bars', 'Optional 220v DB-board'],
      monthlyPrice: 950,
      rental: true,
      purchase: true,
      purchasePrice: 22000,
      image: '/products/security-hut.png',
      icon: 'ShieldCheck',
    },
    // Container Sales (purchase-only catalog entries)
    {
      id: 'sale-new-6m',
      name: 'New 6m Shipping Container',
      category: 'sales',
      description: 'Brand-new 6m container delivered across South Africa — pristine, one-trip steel ready for any use.',
      sizes: ['6m'],
      features: ['One-trip / new', 'Wind & watertight', 'Delivered nationwide', 'Conversion-ready'],
      rental: false,
      purchase: true,
      purchasePrice: 32000,
      image: '/products/storage-6m.webp',
      icon: 'Package',
    },
    {
      id: 'sale-used-6m',
      name: 'Used 6m Shipping Container',
      category: 'sales',
      description: 'Quality-checked pre-owned 6m container — a cost-effective, wind- and watertight buy.',
      sizes: ['6m'],
      features: ['Graded & inspected', 'Wind & watertight', 'Great value', 'Delivered nationwide'],
      rental: false,
      purchase: true,
      purchasePrice: 18000,
      image: '/products/storage-6m.webp',
      icon: 'Package',
    },
    {
      id: 'sale-modified',
      name: 'Custom Modified Container',
      category: 'sales',
      description: 'Built to your spec by our in-house CAD design, engineering and conversion workshops.',
      sizes: ['3m', '6m', '12m'],
      features: ['In-house CAD design', 'Engineered to spec', 'Custom conversions', 'Multi-industry experience'],
      rental: false,
      purchase: true,
      purchasePrice: 35000,
      image: '/products/custom.png',
      icon: 'Wrench',
    },
  ],
  specialOffer: {
    headline: 'Insulated Office + 6m Storage Container',
    description:
      'Get an insulated office with an energy-saving aircon and a 6m storage container.',
    price: 'R2,999 /month',
    finePrint:
      'T&Cs apply. Price excludes VAT and transport, and includes 20km free transport. Valid while stocks last.',
    availableRegionIds: ['western-cape', 'southern-cape'],
  },
  storage: { localStorageUserKey: 'topshell_user' },
}

// ---- Convenience selectors -------------------------------------------------

export const getProductById = (id: string): Product | undefined =>
  siteConfig.products.find((p) => p.id === id)

export const getRegionById = (id: string): RegionContact | undefined =>
  siteConfig.regions.find((r) => r.id === id)

export const rentalProducts: Product[] = siteConfig.products.filter((p) => p.rental)

export const purchaseProducts: Product[] = siteConfig.products.filter((p) => p.purchase)

export const regionsWithSpecialOffer: RegionContact[] = siteConfig.regions.filter(
  (r) => r.hasSpecialOffer,
)

export const industries: Industry[] = siteConfig.industries
