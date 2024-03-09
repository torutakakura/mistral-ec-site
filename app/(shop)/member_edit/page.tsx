import { META_DESCRIPTION_MEMBER_EDIT, shopName } from "@/config/config";
import MemberEdit from "../../components/pages/memberEdit";

export const metadata = {
  title: `会員情報変更 | ${shopName}`,
  description: META_DESCRIPTION_MEMBER_EDIT,
};

const MemberEditPage = async () => {
  return <MemberEdit />;
};

export default MemberEditPage;
