# Pinit - Pinterest-Style Image Sharing App

## 📋 Project Overview

**Pinit** is a full-stack web application inspired by Pinterest, allowing users to create accounts, upload images (pins), organize them into boards, and share visual content with others. The application provides a modern, responsive interface for discovering and saving images in a social media context.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system using Passport.js
- **Image Upload**: Users can upload images with titles and descriptions
- **Boards Management**: Create and organize boards to categorize pins
- **Pin Organization**: Add pins to boards for better content organization
- **Profile Management**: User profiles with customizable profile pictures
- **Saved Pins**: Users can save pins from other users to their collection

### User Experience
- **Responsive Design**: Modern UI with gradient backgrounds and clean styling
- **Flash Messages**: User feedback for actions and error handling
- **Session Management**: Persistent login sessions with secure logout
- **Image Gallery**: Visual grid layout for browsing pins and boards

## 🛠️ Technology Stack

### Backend Technologies
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: ODM for MongoDB object modeling

### Authentication & Security
- **Passport.js**: Authentication middleware
- **bcryptjs**: Password hashing and encryption
- **express-session**: Session management
- **connect-flash**: Flash messaging for user feedback

### File Handling
- **Multer**: Multipart/form-data file upload handling
- **File Storage**: Local file system storage for uploaded images

### Frontend Technologies
- **EJS**: Embedded JavaScript templating engine
- **CSS3**: Custom styling with modern design patterns
- **Method Override**: HTTP verb support (PUT, DELETE)

## 📁 Project Structure

```
Pinit_app-main/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
├── GEMINI.md             # This documentation file
├── config/
│   └── profile.js        # Passport.js authentication configuration
├── middleware/
│   ├── ensureAuthenticated.js  # Authentication middleware
│   ├── isAuthenticated.js      # Alternative auth check
│   └── upload.js              # File upload configuration
├── models/
│   ├── User.js           # User schema and model
│   ├── Pin.js            # Pin schema and model
│   └── Board.js          # Board schema and model
├── routes/
│   ├── index.js          # Home page routes
│   ├── auth.js           # Authentication routes
│   ├── user.js           # User profile routes
│   ├── pins.js           # Pin management routes
│   └── boards.js         # Board management routes
├── views/
│   └── pages/            # EJS templates for all pages
│       ├── home.ejs      # Landing page
│       ├── login.ejs     # User login
│       ├── register.ejs  # User registration
│       ├── profile.ejs   # User profile
│       ├── pins.ejs      # Pin gallery
│       ├── newPin.ejs    # Create new pin
│       ├── boards.ejs    # Board gallery
│       ├── newBoard.ejs  # Create new board
│       ├── boardDetails.ejs # Individual board view
│       └── savedPins.ejs # User's saved pins
└── public/
    ├── css/              # Stylesheets for each page
    ├── uploads/          # User uploaded images
    │   └── profiles/     # Profile pictures
    └── default-avatar.png # Default user avatar
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  profilePic: String (filename),
  savedPins: [ObjectId] (references to Pin documents)
}
```

### Pin Model
```javascript
{
  title: String (required),
  imageUrl: String (required),
  description: String,
  createdBy: ObjectId (reference to User)
}
```

### Board Model
```javascript
{
  name: String,
  owner: ObjectId (reference to User),
  pins: [ObjectId] (references to Pin documents)
}
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pinit_app-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running on `mongodb://localhost:27017/pinit`
   - Or update the connection string in `app.js`

4. **Create necessary directories**
   ```bash
   mkdir -p public/uploads/profiles
   ```

5. **Start the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Open browser and navigate to `http://localhost:3000`

## 🚀 Usage Guide

### Getting Started
1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Profile Setup**: Upload a profile picture to personalize your account

### Creating Content
1. **Create Pins**: Upload images with titles and descriptions
2. **Create Boards**: Organize your content into themed collections
3. **Add Pins to Boards**: Categorize your pins for better organization

### Social Features
1. **Browse Content**: Explore pins and boards created by other users
2. **Save Pins**: Add interesting pins to your saved collection
3. **View Profiles**: Check out other users' profiles and their content

## 🔒 Security Features

- **Password Hashing**: Secure password storage using bcryptjs
- **Session Management**: Express sessions with secure configuration
- **Authentication Middleware**: Protected routes requiring user login
- **File Upload Validation**: Image type validation for uploads
- **Input Sanitization**: MongoDB injection protection through Mongoose

## 🎨 UI/UX Design

- **Modern Gradient Design**: Eye-catching color schemes
- **Responsive Layout**: Works on desktop and mobile devices
- **Intuitive Navigation**: Clear user flow and navigation patterns
- **Visual Feedback**: Flash messages for user actions
- **Clean Typography**: Readable fonts and proper spacing

## 📝 API Endpoints

### Authentication Routes
- `GET /auth/register` - Registration page
- `POST /auth/register` - Create new user
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user
- `GET /auth/logout` - User logout

### User Routes
- `GET /users/profile` - User profile page
- `POST /users/upload-profile-pic` - Upload profile picture
- `GET /users/saved` - View saved pins

### Pin Routes
- `GET /pins/new` - Create pin form
- `POST /pins` - Upload new pin

### Board Routes
- `GET /boards` - View all boards
- `GET /boards/new` - Create board form
- `POST /boards` - Create new board
- `GET /boards/:id` - View specific board
- `POST /boards/:id/add` - Add pin to board

## 🔄 Development Workflow

### Available Scripts
- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon

### Development Tools
- **Nodemon**: Automatic server restart during development
- **Method Override**: Support for PUT/DELETE HTTP methods
- **Flash Messages**: User feedback system
- **Static File Serving**: Efficient asset delivery

## 🚧 Future Enhancements

### Potential Features
- **Search Functionality**: Search pins and boards by keywords
- **User Following**: Follow other users and see their activity
- **Comments System**: Comment on pins and boards
- **Like/Unlike**: Reaction system for pins
- **Categories**: Pre-defined categories for better organization
- **Email Notifications**: Notify users of activity
- **Admin Panel**: Content moderation and user management
- **API Endpoints**: RESTful API for mobile apps
- **Image Optimization**: Automatic image compression and resizing
- **Social Media Integration**: Share pins to external platforms

### Technical Improvements
- **Input Validation**: Enhanced form validation
- **Error Handling**: Comprehensive error management
- **Testing**: Unit and integration tests
- **Performance**: Caching and optimization
- **Security**: Enhanced security measures
- **Deployment**: Production deployment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

**Prachi Singh** - Original Creator

---

*This documentation provides a comprehensive overview of the Pinit application, its features, setup process, and potential for future development.*