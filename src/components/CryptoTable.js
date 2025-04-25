import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketData, selectAssets } from "../features/cryptoSlice";
import CryptoRow from "./CryptoRow";
import { Info, ChevronUp, ChevronDown, Star } from "lucide-react";

export default function CryptoTable() {
  const assets = useSelector(selectAssets);
  const dispatch = useDispatch();

  const [sortField, setSortField] = useState("marketCap");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    dispatch(fetchMarketData());
    const iv = setInterval(() => dispatch(fetchMarketData()), 1000);
    return () => clearInterval(iv);
  }, [dispatch]);

  const sortedAssets = useMemo(() => {
    if (!assets) return [];
    return [...assets].sort((a, b) => {
      const aVal = a[sortField] ?? 0;
      const bVal = b[sortField] ?? 0;
      if (typeof aVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [assets, sortField, sortOrder]);

  const headers = [
    { label: "Fav", field: "favorite" },
    { label: "#", field: "index" },
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "1h %", field: "percent1h" },
    { label: "24h %", field: "percent24h" },
    { label: "7d %", field: "percent7d" },
    { label: "Market Cap", field: "marketCap" },
    { label: "Volume(24h)", field: "volume24h" },
    { label: "Circulating Supply", field: "circulatingSupply" },
    { label: "Last 7 Days", field: "sparkline7d" },
  ];

  const onHeaderClick = (h) => {
    if (h.field === "favorite") return;
    if (sortField === h.field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(h.field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h.field}
                onClick={() => onHeaderClick(h)}
                className={h.field !== "favorite" ? "sortable-header" : ""}
                style={h.field === "favorite" ? { textAlign: "center" } : {}}
              >
                {h.label}
                {h.field !== "favorite" &&
                  [
                    "price",
                    "percent1h",
                    "percent24h",
                    "percent7d",
                    "marketCap",
                    "volume24h",
                    "circulatingSupply",
                  ].includes(h.field) &&
                  (sortField === h.field ? (
                    sortOrder === "asc" ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )
                  ) : (
                    <ChevronUp size={12} className="invisible-icon" />
                  ))}
                {["Market Cap", "Volume(24h)", "Circulating Supply"].includes(
                  h.label
                ) && <Info size={12} className="info-icon" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, i) => (
            <CryptoRow key={asset.symbol} asset={asset} index={i + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
