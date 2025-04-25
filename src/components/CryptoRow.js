import React, { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, Star } from "lucide-react";

export default function CryptoRow({ asset, index }) {
  const [fav, setFav] = useState(false);

  const fmt = (n) =>
    n >= 1e12
      ? (n / 1e12).toFixed(2) + "T"
      : n >= 1e9
      ? (n / 1e9).toFixed(2) + "B"
      : n >= 1e6
      ? (n / 1e6).toFixed(2) + "M"
      : n >= 1e3
      ? (n / 1e3).toFixed(2) + "K"
      : n;

  const pctCell = (v) => (
    <td className={v >= 0 ? "positive" : "negative"}>
      {v >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{" "}
      {isNaN(v) ? "0.00" : Math.abs(v).toFixed(2)}%
    </td>
  );

  return (
    <tr>
      <td
        onClick={() => setFav((f) => !f)}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <Star
          size={16}
          className={fav ? "fav-on" : "fav-off"}
          fill={fav ? "currentColor" : "none"}
        />
      </td>
      <td>{index}</td>
      <td className="name-cell">
        <img
          src={asset.logo}
          alt={asset.symbol}
          width={20}
          style={{ marginRight: 8 }}
        />
        {asset.name} <span className="symbol">{asset.symbol}</span>
      </td>
      <td>${asset.price.toLocaleString()}</td>
      {pctCell(asset.percent1h)}
      {pctCell(asset.percent24h)}
      {pctCell(asset.percent7d)}
      <td>${fmt(asset.marketCap)}</td>
      <td>${fmt(asset.volume24h)}</td>
      <td>
        {fmt(asset.circulatingSupply)}{" "}
        <span className="symbol">{asset.symbol}</span>
      </td>
      <td className="sparkline-cell">
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={asset.sparkline7d.map((v, i) => ({ t: i, v }))}>
            <Line type="monotone" dataKey="v" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </td>
    </tr>
  );
}
