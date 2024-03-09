import { META_DESCRIPTION_USER_GUIDE, shopName } from "@/config/config";
import UserGuide from "../../components/pages/user_guide";

export const metadata = {
  title: `よくある質問 | ${shopName}`,
  description: META_DESCRIPTION_USER_GUIDE,
};

const UserGuidePage = () => {
  return <UserGuide />;
};

export default UserGuidePage;
