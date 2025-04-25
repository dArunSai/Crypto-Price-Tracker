import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import idMap from "../data/sampleIds";

// Thunk: fetch market data from CoinGecko
export const fetchMarketData = createAsyncThunk(
  "crypto/fetchMarketData",
  async () => {
    const ids = Object.values(idMap).join(",");
    const url =
      `https://api.coingecko.com/api/v3/coins/markets` +
      `?vs_currency=usd` +
      `&ids=${ids}` +
      `&order=market_cap_desc` +
      `&per_page=5&page=1` +
      `&sparkline=true` +
      `&price_change_percentage=1h%2C24h%2C7d`;
    const res = await fetch(url);
    return res.json();
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarketData.fulfilled, (state, action) => {
      return action.payload.map((item) => ({
        id: item.id,
        logo: item.image,
        name: item.name,
        symbol: item.symbol.toUpperCase(),
        price: item.current_price,
        percent1h: item.price_change_percentage_1h_in_currency,
        percent24h: item.price_change_percentage_24h_in_currency,
        percent7d: item.price_change_percentage_7d_in_currency,
        marketCap: item.market_cap,
        volume24h: item.total_volume,
        circulatingSupply: item.circulating_supply,
        maxSupply: item.max_supply,
        sparkline7d: item.sparkline_in_7d.price,
      }));
    });
  },
});

export const selectAssets = (state) => state.crypto;
export default cryptoSlice.reducer;
