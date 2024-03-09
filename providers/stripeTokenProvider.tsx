"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createContext, Dispatch, ReactNode, useState } from "react";

export type StripeTokenContextType = {
  token: string | null;
  setToken: Dispatch<string | null>;
};

export const StripeContext = createContext<StripeTokenContextType>(
  {} as StripeTokenContextType
);

type Props = {
  children: ReactNode;
};

export const StripeTokenProvider = (props: Props) => {
  const { children } = props;
  const [token, setToken] = useState<string | null>(null);
  const stripePromise = loadStripe(
    "pk_test_51MzBHPH7Fr80VyAFXKdaDNuSBjGtFr6ayYtuLzAMToHQEkm6iRUZFGTjC8AtFnm5Y3MdRfdpp3u2Cb7zexMYJ5Ia00Vz9I57tw"
  );

  return (
    <Elements stripe={stripePromise}>
      <StripeContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        {children}
      </StripeContext.Provider>
    </Elements>
  );
};
