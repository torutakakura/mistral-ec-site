import ChangePassword from "@/app/components/pages/changePassword";
import { META_DESCRIPTION_CHANGE_PASSWORD, shopName } from "@/config/config";

export const metadata = {
    title: `パスワード変更 | ${shopName}`,
    description: META_DESCRIPTION_CHANGE_PASSWORD,
};

const ChangePasswordPage = () => {
    return (
        <ChangePassword />
    );
}

export default ChangePasswordPage;