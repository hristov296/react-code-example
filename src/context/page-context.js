import React from "react";

export const PageContext = React.createContext({
  currentRow: 0,
  isTouch: false,
  onSubMenuClick: () => {},
  jumpTo: () => {},
  mobHeaderState: "visible",
  setMobHeader: () => {},
});
