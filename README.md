# Tallerazo - Workshop Management System

A comprehensive Angular application for automotive workshop management, featuring repair tracking, vehicle management, and customer-facing vehicle tracking capabilities.

## 🚀 Features

### Workshop Management
- **Dashboard**: Repair status tracking with tabbed interface (pending review, in review, reviewed, delivered)
- **Vehicle Management**: Register and manage vehicle information
- **Repair Orders**: Create and track repair services with pricing and time estimates
- **Status Workflow**: Automated repair status progression

### Customer Portal
- **Vehicle Tracking**: Real-time repair progress tracking using tracking codes
- **Workshop Discovery**: Browse and find available workshops
- **Service Timeline**: Visual progress indicators with status updates

### Core Features
- **Multi-language Support**: Spanish/English localization
- **Responsive Design**: Mobile-first Angular Material design
- **Authentication**: User login/registration system
- **Workshop Onboarding**: Setup process for new workshops

## 🛠️ Technology Stack

- **Frontend**: Angular 19.2.0
- **UI Framework**: Angular Material 19.2.18
- **Styling**: CSS with Material Design
- **State Management**: RxJS Observables
- **Internationalization**: ngx-translate
- **Development**: TypeScript 5.7.2

## 📁 Project Structure

```
src/app/
├── access-and-identity/     # Authentication & user management
│   ├── components/          # Login, register components
│   ├── models/             # User, auth response models
│   ├── services/           # Auth service, guards, interceptors
│   └── pages/              # Login/register pages
├── repair-management/       # Workshop repair operations
│   ├── components/         # Repair dialogs, vehicle dialogs
│   ├── models/             # Repair, vehicle models
│   ├── pages/              # Dashboard, cars, config pages
│   └── services/           # Repair, vehicle services
├── vehicle-tracking/        # Customer tracking system
│   ├── models/             # Tracking models
│   ├── pages/              # Input, detail tracking pages
│   └── services/           # Tracking service
├── workshop-discovery/      # Workshop listing & details
├── workshop/               # Workshop onboarding
└── shared/                 # Shared components & services
    ├── components/         # Headers, layouts, sidebars
    └── services/           # i18n, fake API services
```

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone [repository-url]
cd FrontEnd
```

2. **Install dependencies**
```bash
npm install
```

3. **Development server**
```bash
npm start
# Application runs on http://localhost:4200
```

4. **Build for production**
```bash
npm run build
```

5. **Deploy to Firebase**
```bash
npm run deploy
```

## 🗂️ Data Models

### Repair Management
```typescript
interface Repair {
  id: string
  plateNumber: string
  vehicleInfo: VehicleInfo
  services: RepairService[]
  status: RepairStatus
  createdAt: string
  updatedAt: string
}
```

### Vehicle Tracking
```typescript
interface VehicleTracking {
  id: string
  trackingCode: string
  vehicleInfo: VehicleInfo
  currentStatus: TrackingStatus
  services: TrackingService[]
  statusHistory: StatusUpdate[]
  workshopInfo: WorkshopInfo
}
```

## 🌐 Routing

- `/workshop/login` - Workshop login
- `/workshop/register` - Workshop registration
- `/workshop/onboarding/*` - Workshop setup
- `/workshop/dashboard` - Main dashboard
- `/workshop/cars` - Vehicle management
- `/workshop/config` - Workshop configuration
- `/workshops` - Workshop discovery
- `/vehicle-tracking` - Customer tracking input
- `/vehicle-tracking/:code` - Tracking details

## 🔑 Environment Configuration

The application currently uses mock data for development. To connect to a real backend:

1. Update API URLs in services
2. Replace mock implementations with HTTP calls
3. Configure authentication endpoints
4. Set up proper error handling

## 🎨 UI/UX Features

- **Material Design**: Consistent Angular Material components
- **Responsive Layout**: Mobile-optimized interface
- **Internationalization**: Spanish/English support
- **Progress Indicators**: Visual repair progress tracking
- **Status Chips**: Color-coded status indicators
- **Modal Dialogs**: Create repair/vehicle forms

## 🧪 Development Features

- **Mock Services**: Simulated backend responses
- **Example Data**: Pre-populated tracking codes for testing
- **Delay Simulation**: Realistic loading states
- **Error Handling**: User-friendly error messages

## 📱 Sample Tracking Codes

For testing the vehicle tracking feature:
- `TRK001234` - In-progress repair (Toyota Corolla)
- `TRK005678` - Completed service (Honda Civic)

## 🔮 Future Enhancements

- Real-time notifications
- Payment integration
- Inventory management
- Customer communication portal
- Workshop analytics dashboard
- Mobile app development

## Original Angular CLI Commands

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

**Tallerazo** - Modernizing automotive workshop management through technology.
