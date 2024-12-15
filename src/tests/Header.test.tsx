import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./../components/Header";

test("Headerに表示されるタイトルの確認", async () => {
  render(<Header />);
  const linkElement = screen.getByText(/総人口推移グラフ/i);
  expect(linkElement).toBeInTheDocument();
});
