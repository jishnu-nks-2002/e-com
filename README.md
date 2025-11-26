# E-Commerce CRUD Application

A fully functional, responsive single-page e-commerce application built with React and Vite, featuring complete CRUD operations for product management with admin authentication.


### Core Functionality
- **Product Listing**: Browse all products fetched from the Fake Store API with beautiful gallery view
- **Product Details**: View comprehensive information for each product on a dedicated page
- **Add Products**: Create new products through an intuitive form interface (Admin only)
- **Edit Products**: Update existing product information seamlessly (Admin only)
- **Delete Products**: Remove products with confirmation dialog (Admin only)
- **Admin Authentication**: Secure login system for managing products
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Enhanced user experience with Framer Motion and GSAP

### Technical Highlights
- Real-time CRUD operations with client-side state management
- Dynamic routing for individual product pages with React Router v7
- Protected routes for admin-only operations
- Comprehensive form validation with user-friendly error messages
- Loading states and error handling for all API calls
- Clean, component-based architecture following React best practices
- Modern React patterns using hooks (useState, useEffect, useContext)
- Persistent authentication using localStorage

## 🛠️ Technologies Used

- **React** (v19.2.0) - Frontend framework
- **Vite** (v7.2.4) - Build tool and development server
- **React Router** (v7.9.6) - Client-side routing
- **Axios** (v1.13.2) - HTTP client for API requests
- **Tailwind CSS** (v4.1.17) - Utility-first CSS framework
- **Framer Motion** (v12.23.24) - Animation library
- **GSAP** (v3.13.0) - Professional-grade animation
- **Lucide React** - Beautiful icon library
- **Fake Store API** - Product data source

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/jishnu-nks-2002/e-com.git
   cd e-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Admin Login Credentials**
   ```
   Username: admin
   Password: admin123
   ```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and deploys it to GitHub Pages automatically.

## 📁 Project Structure

```
e-com/
├── public/                    # Static assets
├── src/
│   ├── api/
│   │   └── productsApi.js     # API service functions for CRUD operations
│   ├── assets/                # Images, fonts, etc.
│   ├── components/
│   │   ├── Banner.jsx         # Hero banner component
│   │   ├── Bestseller.jsx     # Featured products section
│   │   ├── ErrorBox.jsx       # Error display component
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Gallery.jsx        # Product gallery component
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Loading.jsx        # Loading spinner component
│   │   ├── ProductCard.jsx    # Individual product card
│   │   └── ProtectedRoute.jsx # Route protection for admin
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state management
│   │   └── ProductsContext.jsx # Global products state management
│   ├── pages/
│   │   ├── AddEditProduct.jsx # Add/Edit product form page
│   │   ├── AdminDashboard.jsx # Admin control panel
│   │   ├── Home.jsx           # Main product listing page
│   │   ├── Login.jsx          # Authentication page
│   │   ├── NotFound.jsx       # 404 error page
│   │   └── ProductDetails.jsx # Individual product details
│   ├── utils/
│   │   └── validators.js      # Form validation helpers
│   ├── App.jsx                # Main app component with routing
│   ├── index.css              # Global styles
│   └── main.jsx               # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔑 Key Design Decisions

### State Management
I implemented **React Context API** with two separate contexts:

1. **ProductsContext**: Manages global product state including CRUD operations
2. **AuthContext**: Handles user authentication and authorization

This approach avoids prop drilling while keeping the state management straightforward and maintainable for an application of this scale.

### Authentication System
Built a simple but effective authentication system:
- Admin credentials stored for demo purposes
- Protected routes using a `ProtectedRoute` component
- Persistent sessions using localStorage
- Automatic redirect for unauthorized access attempts

### Routing Strategy
**React Router v7** provides:
- Dynamic routes for product details (`/product/:id`)
- Protected admin routes (`/admin/*`)
- Clean URL structure for better SEO
- 404 handling for invalid routes

### Form Handling & Validation
Forms include:
- Real-time validation with custom validator utilities
- Required field validation
- Type checking (price must be a number)
- URL validation for image links
- Clear error messages positioned contextually
- Disabled submit buttons until validation passes
- Success notifications after operations

### API Integration Strategy
Since Fake Store API is mock:
- Optimistic UI updates for immediate feedback
- Client-side state synchronization for CRUD operations
- Local ID generation for new products (starting from 21)
- API calls still made for demonstration purposes
- Error handling for failed API requests

### Responsive Design with Tailwind CSS
Mobile-first approach with breakpoints:
- **Mobile** (< 640px): Single column, hamburger menu
- **Tablet** (640px - 1024px): Two-column product grid
- **Desktop** (> 1024px): Three to four-column grid
- Flexible layouts using CSS Grid and Flexbox

### Animation & User Experience
Enhanced interactions using:
- **Framer Motion**: Page transitions, card hover effects
- **GSAP**: Smooth scrolling animations, gallery effects
- Micro-interactions on buttons and cards
- Loading skeletons for better perceived performance

### Error Handling
Comprehensive coverage:
- API request failures with user-friendly messages
- Network connectivity issues
- Invalid product IDs with 404 pages
- Form validation errors with specific guidance
- Authentication errors during login

## 🎨 Design Choices

### Visual Design
- **Color Palette**: Modern gradient 
- **Typography**: System font stack for optimal performance
- **Layout**: Card-based design with consistent spacing
- **Imagery**: Product images with hover zoom effects

### User Experience
- Intuitive navigation with clear CTAs
- Breadcrumb navigation on product details
- Confirmation dialogs for destructive actions (delete)
- Toast notifications for operation feedback
- Skeleton loaders during data fetching

### Accessibility
- Semantic HTML5 elements
- Keyboard navigation support
- ARIA labels for screen readers
- Sufficient color contrast ratios
- Focus indicators on interactive elements

## 🔐 Admin Features

Access the admin dashboard at `/admin` after logging in:

**Admin Capabilities:**
- View all products in a table format
- Quick edit access from the dashboard
- Delete products with confirmation
- Add new products with validation
- Real-time product count statistics

**Default Credentials:**
```
Username: admin
Password: admin123
```

## 🧪 Testing Coverage

The application has been thoroughly tested for:

✅ All CRUD operations function correctly  
✅ Form validation catches all invalid inputs  
✅ Authentication flow works as expected  
✅ Protected routes block unauthorized access  
✅ Responsive design adapts to all screen sizes  
✅ Loading and error states display appropriately  
✅ Navigation flows smoothly between pages  
✅ Animations perform without lag  
✅ API error scenarios are handled gracefully

## 🚧 Known Limitations

1. **Mock API**: Fake Store API doesn't persist changes server-side
2. **Authentication**: Demo credentials only - no real backend verification
3. **Image Upload**: Uses URL input instead of file upload
4. **Product IDs**: New products get sequential IDs starting from 21
5. **No Database**: All state resets on page refresh (except auth)
6. **localStorage**: Authentication persists but product changes don't

## 📝 API Reference

This project uses the [Fake Store API](https://fakestoreapi.com/):

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/products` | GET | Fetch all products |
| `/products/:id` | GET | Fetch single product |
| `/products` | POST | Create new product (mock) |
| `/products/:id` | PUT | Update product (mock) |
| `/products/:id` | DELETE | Delete product (mock) |


## 👤 Author

**Jishnu**

- GitHub: [@jishnu-nks-2002](https://github.com/jishnu-nks-2002)
- Repository: [e-com](https://github.com/jishnu-nks-2002/e-com)

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) teams for excellent documentation
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first framework
- [Framer Motion](https://www.framer.com/motion/) for animation capabilities
- [Lucide](https://lucide.dev/) for beautiful icons

## 📚 Learning Resources

This project demonstrates:
- React functional components and hooks
- Context API for state management
- React Router for SPA navigation
- RESTful API integration
- Form handling and validation
- Protected routes and authentication
- Responsive design principles
- Modern animation techniques
- Vite build configuration
- GitHub Pages deployment

---
