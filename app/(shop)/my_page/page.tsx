import { META_DESCRIPTION_MY_PAGE, shopName } from "@/config/config";
import MyPage from "../../components/pages/mypage";

export const metadata = {
  title: `マイページ | ${shopName}`,
  description: META_DESCRIPTION_MY_PAGE,
};

const MyPagePage = () => {
  return <MyPage />;
};

export default MyPagePage;
