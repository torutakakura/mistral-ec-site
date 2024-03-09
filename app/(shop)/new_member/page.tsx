import { META_DESCRIPTION_NEW_MEMBER, shopName } from "@/config/config";
import NewMember from "../../components/pages/newMember";

export const metadata = {
  title: `会員登録 | はじめてご利用の方 | ${shopName}`,
  description: META_DESCRIPTION_NEW_MEMBER,
};

const NewMemberPage = () => {
  return <NewMember />;
};

export default NewMemberPage;
