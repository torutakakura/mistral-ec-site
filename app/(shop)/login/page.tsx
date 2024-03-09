import { META_DESCRIPTION_LOGIN, shopName } from "@/config/config";
import Login from "../../components/pages/login";

export const metadata = {
  title: `ログイン | ${shopName}`,
  description: META_DESCRIPTION_LOGIN,
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
