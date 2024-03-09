import { META_DESCRIPTION_PASSWORD_FORGOT, shopName } from "@/config/config";
import PasswordForgot from "../../components/pages/passwordForgot";

export const metadata = {
  title: `パスワードお忘れの方 | ${shopName}`,
  description: META_DESCRIPTION_PASSWORD_FORGOT,
};

const PasswordForgotPage = () => {
  return <PasswordForgot />;
};

export default PasswordForgotPage;
