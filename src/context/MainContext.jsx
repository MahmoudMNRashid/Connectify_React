import { createContext, useState } from "react";

export const MainContext = createContext({
  disableIsActive: false,
  startTheDisable: () => {},
  stopTheDisable: () => {},
});

export default function MainContextProvider({ children }) {
  const [disableIsActive, setDisableIsActive] = useState(false);

  const handleStartTheDisable = () => {
    setDisableIsActive(true);
  };
  const handleStopTheDisable = () => {
    setDisableIsActive(false);
  };
  const ctxValue = {
    disableIsActive,
    startTheDisable: handleStartTheDisable,
    stopTheDisable: handleStopTheDisable,
  };
  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
