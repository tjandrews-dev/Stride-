"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Saving…");

    const f = new FormData(e.currentTarget);
    const images = String(f.get("images") || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: f.get("title"),
        description: f.get("description"),
        saleType: f.get("saleType"),
        category: f.get("category"),
        state: f.get("state"),
        price: f.get("price"),
        reserve: f.get("reserve"),
        endsAt: f.get("endsAt"),
        images,
      }),
    });

    const json = await res.json();
    if (json.ok) {
      setStatus("✅ Created! Redirecting…");
      router.push(`/listing/${json.id}`);
    } else {
      setStatus(`❌ ${json.error}`);
    }
  }

  const field = { display: "grid", gap: 6 };
  const input = {
    padding: "10px 12px",
    border: "1px solid #dcdde3",
    borderRadius: 8,
  } as React.CSSProperties;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Create Listing</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={field}><span>Title</span><input name="title" required style={input} /></label>
        <label style={field}><span>Description</span><textarea name="description" rows={4} style={input} /></label>

        <label style={field}><span>Sale Type</span>
          <select name="saleType" style={input as any}>
            <option value="CLASSIFIED">Classified</option>
            <option value="AUCTION">Auction</option>
          </select>
        </label>

        <label style={field}><span>Category</span>
          <select name="category" style={input as any}>
            <option value="horse">Horse</option>
            <option value="tack">Tack</option>
            <option value="transport">Transport</option>
            <option value="machinery">Machinery</option>
          </select>
        </label>

        <label style={field}><span>State</span><input name="state" placeholder="VIC / NSW / QLD…" style={input} /></label>
        <label style={field}><span>Price (Classified)</span><input name="price" type="number" step="0.01" style={input} /></label>
        <label style={field}><span>Reserve (Auction)</span><input name="reserve" type="number" step="0.01" style={input} /></label>
        <label style={field}><span>Auction Ends At</span><input name="endsAt" type="datetime-local" style={input} /></label>
        <label style={field}><span>Image URLs (comma-separated)</span><input name="images" placeholder="https://..., https://..." style={input} /></label>

        <button type="submit" style={{ padding: "12px 14px", borderRadius: 10, background: "#0B1D39", color: "#fff", border: 0, fontWeight: 800 }}>
          Create
        </button>
      </form>
      <p style={{ marginTop: 10, color: "#6b7280" }}>{status}</p>
    </div>
  );
}
