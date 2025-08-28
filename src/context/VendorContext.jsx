import { createContext, useContext, useState } from "react";

const VendorContext = createContext();
export const useVendor = () => useContext(VendorContext);

export function VendorProvider({ children }) {
  const [vendorId, setVendorId] = useState(null);
  return (
    <VendorContext.Provider value={{ vendorId, setVendorId }}>
      {children}
    </VendorContext.Provider>
  );
}
