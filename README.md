# E-Commerce-Product-Listing-App

A demo of a simple merchant app for mobile devices.

## Setup & Run Instructions

1. Install Expo Go on your mobile device
2. Open a Command Prompt in the BuyStuff folder (it specifically must be Command Prompt, not PowerShell; the filepath within your command prompt should end with `E-Commerce-Product-Listing-App\BuyStuff`)
3. Type in `npx expo start` and press Enter
4. Scan the generated QR code with your mobile device, this will open the app with Expo Go

## Project Explanation
This project uses Fake Store API (fakestoreapi.com/docs) for its product data.
Cart data is within the app itself, because the API does not persist data from POST or UPDATE method calls.
This app uses the `blank-typescript` Expo template via `npx create-expo-app@latest --template`.