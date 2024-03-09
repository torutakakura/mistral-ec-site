import { Suspense } from "react";
import Loading from "../loading";
import Home from "../components/pages/Home";

const HomePage = () => {
  return (
    <Suspense fallback={<Loading color="green" />}>
      {/* @ts-ignore*/}
      <Home />
    </Suspense>
  );
};

export default HomePage;
