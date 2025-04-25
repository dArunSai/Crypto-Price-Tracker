    # Real-Time Crypto Price Tracker

A sleek and responsive real-time cryptocurrency tracker built with React and Redux Toolkit, displaying live market data using the CoinGecko API. The app features sortable columns, visual trends, and favorite coin toggling, all optimized for desktop and mobile devices.

---

## 🚀 Features

- 📈 Live crypto market data (price, % change, market cap, volume)
- ⭐ Toggle favorite assets
- 📊 Mini sparklines for 7-day trend
- 📱 Responsive design
- 🧠 Sortable columns with intuitive UI icons
- ⏱ Auto-refresh every second for real-time updates

---

## 🗂 File Structure

```
crypto-price-tracker/
│
├── public/
│ └── index.html # Base HTML template
│
├── src/
│ ├── components/
│ │ ├── CryptoRow.js # Single row representation of a crypto asset
│ │ └── CryptoTable.js # Table displaying the list of crypto assets
│ │
│ ├── data/
│ │ └── sampleIds.js # CoinGecko ID map for selected cryptocurrencies
│ │
│ ├── features/
│ │ └── cryptoSlice.js # Redux slice handling async data fetching
│ │
│ ├── App.js # Main app component
│ ├── App.css # Global styles
│ ├── index.js # Entry point
│ └── store.js # Redux store configuration
│
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

```

## ⚙️ Installation Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dArunSai/Crypto-Price-Tracker.git
   cd crypto-price-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

## 🧪 Running the Project

### Development Mode

```bash
npm start
```

This will launch the app in development mode at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

---

🎥 Demo
Watch the project in action here:

👉 [`https://drive.google.com/file/d/1DnjWIcLsTVqdvpQOD6jYw83pUfYaHPep/view?usp=drive_link`](https://drive.google.com/file/d/1DnjWIcLsTVqdvpQOD6jYw83pUfYaHPep/view?usp=drive_link)

## 🛠 Tech Stack & Architecture

### Frontend

- **React 18**: Modern component-based UI
- **Redux Toolkit**: Simplified state management with slices and thunks
- **Recharts**: Lightweight charts for sparklines
- **Lucide React**: Icon set for interactivity (arrows, stars, info, etc.)
- **CSS (Custom)**: Responsive layout and theming

### API Integration

- **CoinGecko API**: Real-time crypto price and trend data(Updates price every 1 minute)

### Architecture

- Component-based structure for maintainability
- Separation of concerns: data fetching (Redux slice) vs. UI rendering (components)
- Polling mechanism (setInterval) for real-time updates

---

## 📌 Notes

- The data updates every **1 minute** for real-time display.
- Coin list is defined in [`src/data/sampleIds.js`](src/data/sampleIds.js) – you can add more IDs supported by CoinGecko.
