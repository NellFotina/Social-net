// import { render, screen } from "@testing-library/react";
import SamuraiJSApp from "./App";
import React from "react";
import ReactDOM from "react-dom";

// test("renders learn react link", () => {
//   render(<SamuraiJSApp />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SamuraiJSApp />, div); //монтирование компоненты в дивку, просто в память, нигде не отрендерится
  ReactDOM.unmountComponentAtNode(div); //демонтирование компоненты из дивки
});
