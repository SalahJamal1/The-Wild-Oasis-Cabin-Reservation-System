"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useCabins } from "../_hooks/useCabins";
import LoginMessage from "./LoginMessage";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
};

export default function ProtectPage({ children }: Props) {
  const { Auth, loader } = useCabins();
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    if (Auth === undefined) return;
    setIsAuth(false);
  }, [Auth]);
  if (isAuth || loader) return <Spinner />;
  return Auth ? children : <LoginMessage />;
}
