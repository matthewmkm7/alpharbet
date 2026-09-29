"use client";

import { useEffect, useState } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "INR" | "BTC" | "ETH";

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string; isCrypto?: boolean }[] = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  { code: "INR", label: "Indian Rupee", symbol: "₹" },
  { code: "BTC", label: "Bitcoin", symbol: "₿", isCrypto: true },
  { code: "ETH", label: "Ethereum", symbol: "Ξ", isCrypto: true },
];

type RatesState = {
  status: "loading" | "ready" | "error";
  // How many units of each currency equal $1 — multiply a USD amount by this
  // to convert it. USD's own rate is always 1 and never needs a network call.
  rates: Partial<Record<CurrencyCode, number>>;
};

// All NADAC prices on this page are in USD. This hook fetches conversion
// rates once, from two free, no-API-key-required public sources:
//   - Frankfurter (https://frankfurter.app) for fiat currencies (ECB rates)
//   - CoinGecko for crypto (its price is USD-per-coin, so we invert it)
// If either source fails, whatever did load still works — USD itself always
// works with no network at all.
export function useCurrencyRates() {
  const [code, setCode] = useState<CurrencyCode>("USD");
  const [state, setState] = useState<RatesState>({ status: "loading", rates: { USD: 1 } });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [fiatResult, cryptoResult] = await Promise.allSettled([
        fetch("https://api.frankfurter.app/latest?from=USD").then((r) => r.json()),
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd").then((r) =>
          r.json()
        ),
      ]);
      if (cancelled) return;

      const rates: Partial<Record<CurrencyCode, number>> = { USD: 1 };

      if (fiatResult.status === "fulfilled" && fiatResult.value?.rates) {
        for (const currency of CURRENCIES) {
          const value = fiatResult.value.rates[currency.code];
          if (typeof value === "number") rates[currency.code] = value;
        }
      }
      if (cryptoResult.status === "fulfilled") {
        const btcUsd = cryptoResult.value?.bitcoin?.usd;
        const ethUsd = cryptoResult.value?.ethereum?.usd;
        if (typeof btcUsd === "number" && btcUsd > 0) rates.BTC = 1 / btcUsd;
        if (typeof ethUsd === "number" && ethUsd > 0) rates.ETH = 1 / ethUsd;
      }

      const gotFiat = fiatResult.status === "fulfilled";
      const gotCrypto = cryptoResult.status === "fulfilled";
      setState({ status: gotFiat || gotCrypto ? "ready" : "error", rates });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function convert(usdAmount: number): number {
    const rate = state.rates[code] ?? 1;
    return usdAmount * rate;
  }

  function format(usdAmount: number): string {
    const info = CURRENCIES.find((c) => c.code === code)!;
    const converted = convert(usdAmount);
    const decimals = info.isCrypto ? 8 : Math.abs(converted) < 1 ? 4 : 2;
    const amountStr = converted.toFixed(decimals);
    return info.symbol ? `${info.symbol}${amountStr}` : `${amountStr} ${info.code}`;
  }

  return { code, setCode, status: state.status, convert, format };
}
