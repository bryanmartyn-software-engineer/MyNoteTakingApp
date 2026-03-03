Online Shop App - React Native
A modern, feature-rich e-commerce mobile application built with React Native. This app provides a complete shopping experience with product browsing, cart management, wishlist functionality, and dark mode support.

✨ Features
Product Listing - Browse products with search and category filtering

Product Details - View detailed product information with quantity selector

Shopping Cart - Add/remove items, update quantities, and view totals

Wishlist - Save favorite products for later

Dark Mode - Seamless dark/light theme switching

Profile Screen - View stats and manage preferences

Real-time Updates - Cart badge shows item count instantly

📱 Screenshots
[Screenshots will be added here]

🚀 Getting Started
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (version 14 or newer)

npm or yarn package manager

React Native CLI (npm install -g react-native-cli)

Android Studio (for Android development)

Xcode (for iOS development, macOS only)

iOS Simulator (for iOS, macOS only) or Android Emulator

Environment Setup
Note: Make sure you have completed the React Native Environment Setup instructions before proceeding.

Step 1: Install Dependencies
Navigate to the project root and install all required dependencies:

bash
# Using npm
npm install

# OR using Yarn
yarn install
For iOS Only
If you're developing for iOS, install the CocoaPods dependencies:

bash
cd ios && pod install && cd ..
Step 2: Start the Metro Server
First, you will need to start Metro, the JavaScript bundler that comes with React Native.

bash
# Using npm
npm start

# OR using Yarn
yarn start

# To clear cache if needed
npm start -- --reset-cache
Step 3: Start your Application
Let Metro Bundler run in its own terminal. Open a new terminal from the project root and run:

For Android
bash
# Using npm
npm run android

# OR using Yarn
yarn android
For iOS
bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
If everything is set up correctly, you should see your app running in your Android Emulator or iOS Simulator shortly.

📦 Dependencies
This project uses the following main dependencies:

json
{
  "react-native-vector-icons": "^10.0.0",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "@react-navigation/native-stack": "^6.9.13",
  "react-native-screens": "^3.22.1",
  "react-native-safe-area-context": "^4.7.1",
  "react-native-gesture-handler": "^2.12.0"
}
🏗 Project Structure
text
OnlineShopApp/
├── src/
│   ├── context/
│   │   └── ShopContext.js          # Global state management
│   ├── screens/
│   │   ├── HomeScreen.js           # Product listing screen
│   │   ├── ProductDetailScreen.js  # Product details screen
│   │   ├── CartScreen.js           # Shopping cart screen
│   │   ├── WishlistScreen.js       # Wishlist screen
│   │   └── ProfileScreen.js        # User profile screen
│   └── navigation/
│       └── AppNavigator.js         # Navigation configuration
├── App.js                          # Main app component
└── package.json
🎯 How to Use the App
Navigation Guide
Home Screen (Default)

Browse all available products

Use the search bar to find specific items

Filter products by category using chips

Tap any product to view details

Tap the heart icon to add/remove from wishlist

Product Details

View full product description and specifications

Adjust quantity using + and - buttons

Check real-time stock availability

Tap "Add to Cart" to purchase

Cart Screen

Review all items added to cart

Modify quantities or remove items

View subtotal and total prices

Proceed to checkout (demo only)

Wishlist Screen

View all saved products

Quickly add items to cart

Remove items from wishlist

Profile Screen

View shopping statistics

Toggle dark mode on/off

Access account settings (UI demo)

🎨 Customization
Modifying the App
Open App.js in your text editor to modify the main app component

Edit screen files in src/screens/ to change UI and functionality

Modify ShopContext.js to add more features or change the data structure

For Android:
Press <kbd>R</kbd> twice or select "Reload" from the Developer Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows/Linux, <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS)

For iOS:
Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in the iOS Simulator to reload