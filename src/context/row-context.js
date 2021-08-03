import React from "react";

export const RowContext = React.createContext({
  rowState: "normal",
  setRowState: () => {},
  brandState: 0,
  setBrandState: () => {},
  leftBarLinkTo: undefined,
  setLeftBarLinkTo: () => {},
  shouldScrollDown: () => {},
  linkToText: "Read More",
  leftBarButton: "scroll",
});
