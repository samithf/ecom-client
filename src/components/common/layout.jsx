import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";

export function Layout() {
  return (
    <div style={{ maxWidth: "1366px", marginInline: "auto" }}>
      <Navigation />
      <main style={{ padding: 10 }}>
        <Outlet />
      </main>
    </div>
  );
}
