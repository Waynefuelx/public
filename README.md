# Topshell Container Rentals - Rental & Sales Management App

A comprehensive container rental, sales, and logistics management system built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### 1. Rental Booking & Sales Management
- **Multi-step booking form** with service type selection (rental, purchase, quote)
- **Comprehensive rental services** including storage, office, VIP, refrigeration, and specialized containers
- **Container selection** with detailed specifications and pricing
- **Calendar-based delivery scheduling** with flexible date selection
- **Address input and validation** for delivery coordination
- **Payment method selection** (credit card, invoice, quote)
- **User profile management** for past orders and invoices

### 2. Logistics & Delivery Tracking
- **Real-time container tracking** with status updates
- **Live delivery status** with SMS/email notification system
- **Interactive map integration** showing dispatch, ETA, and route
- **Driver contact information** for direct communication
- **Delivery timeline** with detailed progress tracking
- **Mobile-responsive tracking interface**

### 3. Admin Panel & Lead CRM
- **Staff dashboard** with key performance metrics
- **Lead management system** with status tracking and assignment
- **Order management** with delivery scheduling
- **Customer relationship management** tools
- **Permission-based access control** (sales, operations, finance)
- **Reporting and analytics** dashboard
- **Export and data management** capabilities

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **UI Components**: Headless UI, Heroicons

## 📁 Project Structure

```
topshell-container-rentals/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page with hero and features
│   ├── rental/            # Container rental services page
│   │   └── page.tsx
│   ├── booking/           # Container booking page
│   │   └── page.tsx
│   ├── track/             # Container tracking page
│   │   └── page.tsx
│   └── admin/             # Admin panel for staff
│       └── page.tsx
├── components/             # Reusable React components
│   ├── Navigation.tsx     # Main navigation component
│   ├── Footer.tsx         # Footer component
│   ├── BookingForm.tsx    # Multi-step booking form
│   ├── ContainerTypes.tsx # Container showcase
│   └── Testimonials.tsx   # Customer testimonials
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd topshell-container-rentals
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features Demo

### Booking System
- Visit the home page and click "Book Now"
- Experience the 4-step booking process:
  1. Service & Container Selection
  2. Delivery Details
  3. Contact Information
  4. Payment & Review

### Container Tracking
- Navigate to `/track` page
- Use any tracking number (e.g., TS-2024-001)
- View real-time delivery status and timeline

### Admin Panel
- Access `/admin` page
- Explore different tabs:
  - Dashboard with metrics
  - Lead management
  - Order tracking
  - Calendar view
  - Reports & analytics

### Container Rental Services
- Browse `/rental` page for all available container types
- Filter by category (Storage, Office, Specialized, Premium, etc.)
- View detailed specifications and pricing for each container
- Access booking forms directly from rental listings

### **Indicative Rental Pricing (South African Rand, excl. VAT)**
- **3m Storage Container**: from R550/month
- **6m Storage Container**: from R850/month
- **6m Insulated Office (with aircon)**: from R2,200/month
- **8-Bed Sleeper Unit**: from R3,200/month
- **Ablution Facilities**: from R1,450/month
- **6m Canteen**: from R2,400/month
- **6m Refrigeration Unit**: from R3,500/month
- **Security Hut**: from R950/month

> **Special offer:** Insulated office (with energy-saving aircon) + a 6m storage container for **R2,999/month** (excl. VAT & transport, incl. 20km free transport) — Western & Southern Cape.

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (#1E3A5F) for main actions and branding, matching the Topshell logo
- **Secondary**: Light Gray (#F2F2F2) for UI backgrounds, cards, and sections
- **Accent**: Bright White (#FFFFFF) for logos and contrast elements
- **Text**: Dark Gray (#171717) for optimal readability
- **Success**: Green for positive states
- **Warning**: Yellow for caution states
- **Error**: Red for error states

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weights for readability

### Components
- **Buttons**: Primary, secondary, success, warning, error variants
- **Cards**: Consistent shadow and border styling
- **Forms**: Clean input fields with focus states
- **Status Badges**: Color-coded status indicators

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with sidebars
- **Tablet**: Adapted layouts for medium screens
- **Mobile**: Touch-friendly mobile-first design

## 🔧 Customization

### Adding New Container Types
Edit `components/ContainerTypes.tsx` to add new container specifications.

### Modifying Booking Form
Update `components/BookingForm.tsx` to add new form fields or steps.

### Admin Panel Features
Extend `app/admin/page.tsx` to add new tabs and functionality.

### Styling Changes
Modify `tailwind.config.js` and `app/globals.css` for design updates.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Build command: `npm run build`, publish directory: `.next`
- **AWS Amplify**: Connect repository and build settings
- **Docker**: Use provided Dockerfile for containerized deployment

## 📊 Performance Features

- **Image optimization** with Next.js Image component
- **Code splitting** for better loading performance
- **Lazy loading** for components and images
- **Optimized fonts** with Google Fonts
- **Minimal bundle size** with tree shaking

## 🔒 Security Considerations

- **Form validation** on client and server side
- **Input sanitization** for user data
- **HTTPS enforcement** in production
- **CORS configuration** for API endpoints
- **Rate limiting** for form submissions

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when implemented)
npm test
```

## 📈 Future Enhancements

- **Real-time notifications** with WebSockets
- **Advanced analytics** and reporting
- **Mobile app** with React Native
- **API integration** with logistics providers
- **Multi-language support**
- **Advanced search and filtering**
- **Customer portal** with order history
- **Payment gateway integration**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: rental@topshell.co.za
- **Phone**: [076 770 4500](tel:0767704500)
- **Website**: [topshell.co.za](https://topshell.co.za)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Built with ❤️ for Topshell Container Rentals**
