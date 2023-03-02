import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAligment = (): [string, Dispatch<SetStateAction<string>>] => {
  const [alignment, setAlignment] = useState<Readonly<string>>("cart");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/cart/payment") {
      setAlignment("payment Delivery");
    } else if (location.pathname === "/cart/address") {
      setAlignment("address");
    } else if (location.pathname === "/cart/summary") {
      setAlignment("summary");
    } else {
      setAlignment("cart");
    }
  }, [location]);
  return [alignment, setAlignment];
};

export default useAligment;
