'use client'

import { DeliveryAddressType, ProfileType } from "@/utils/types";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";


export type AddressContextType = {
  myprofile: ProfileType | undefined;
  setMyprofile: Dispatch<ProfileType | undefined>;
  deliveryAddresses: Array<DeliveryAddressType>;
  setDeliveryAddresses: Dispatch<Array<DeliveryAddressType>>;
};

export const AddressContext = createContext<AddressContextType>(
  {} as AddressContextType
);

type Props = {
  children: ReactNode;
};


const readMyprofile = (): ProfileType | undefined => {
  const myaddress_jsonStr = sessionStorage.getItem("myaddress");
  return myaddress_jsonStr != null ? JSON.parse(myaddress_jsonStr) : undefined;
};

export const AddressProvider = (props: Props) => {
  const { children } = props;
  const [myprofile, setMyprofile] = useState<ProfileType | undefined>();
  const [deliveryAddresses, setDeliveryAddresses] = useState<Array<DeliveryAddressType>>([]);  

  useEffect(() => {
    const loadedProfile = readMyprofile();
    if (loadedProfile) {
      setMyprofile(loadedProfile);
    }
  }, []);

  return (
    <AddressContext.Provider
      value={{
        myprofile,
        setMyprofile,
        deliveryAddresses,
        setDeliveryAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
