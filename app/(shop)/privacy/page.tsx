import { META_DESCRIPTION_PRIVACY, shopName } from "@/config/config";
import Privacy from "../../components/pages/privacy";

export const metadata = {
  title: `プライバシー | ${shopName}`,
  description: META_DESCRIPTION_PRIVACY,
};

const PrivacyPage = () => {
  return <Privacy />;
};

export default PrivacyPage;
