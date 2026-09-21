# E-Commerce-Product-Listing-App

A demo of a simple merchant app for mobile devices.

## Setup & Run Instructions

1. Install Expo Go on your mobile device
2. Open a Command Prompt in the BuyStuff folder (it specifically must be Command Prompt, not PowerShell; the filepath within your command prompt should end with `E-Commerce-Product-Listing-App\BuyStuff`)
3. Type in `npx expo start` and press Enter
4. Scan the generated QR code with your mobile device, this will open the app with Expo Go

## Project Explanation
This app uses the `blank-typescript` Expo template via `npx create-expo-app@latest --template`.

### Component Structure
- `src/screens/`: the three main views: `Home`, `ProductDetails`, `Cart`.
- `src/components/`: reusable UI pieces used across screens: `Header`, `SearchBar`, `CategoryChip`, `ProductCard`, `QuantitySelector`, `Notification`.
- `src/navigation/`: `AppNavigator.tsx`, which sets up the stack navigator and registers all three screens.
- `src/types/`: shared TypeScript interfaces (`Product`, `CartItem`) and navigation param types (`RootStackParamList`).
- `src/context/`: cart data.
- `src/data/`: all API calls (`fetchAllProducts`, `fetchProductById`, `fetchCategories`).

### State Management
Since the API's cart endpoints don't actually save data from POST and UPDATE requests (even with a 200 response), cart state is instead managed with React Context and `useReducer` (from `src/context/CartContext.tsx`). The reducer handles three actions: adding an item, removing an item, and updating an item's quantity. The hook `useCart()` exposes simple functions (`addItem`, `removeItem`, `updateQuantity`) to easily allow cart data to be managed.

Cart data lives persists only for the current app session (cart data is reset after closing the app).

### Data/API Handling
Product data comes from Fake Store API (fakestoreapi.com/docs), with all fetches in `src/data/apiData.ts`. Screens call these functions with `useEffect` hooks, tracking loading and error state to show appropriate feedback (loading, error messages, empty states).