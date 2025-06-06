"use client";
import React from "react";
import GlobalStyles from "../styles/GlobalStyles";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}
