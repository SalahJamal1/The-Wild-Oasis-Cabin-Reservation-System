import { createContext, useContext } from "react";
import { Props } from "../_context/CabinsContext";

export const CabinProvider = createContext<null | Props>(null);

export function useCabins(): Props {
  const context = useContext(CabinProvider);
  if (context === undefined || context === null) throw new Error("");
  return context;
}
