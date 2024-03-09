import ChangeEmail from "@/app/components/pages/changeEmail";
import { cookies } from 'next/headers'
import { Database } from "@/utils/database.types";
import { redirect } from 'next/navigation'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { META_DESCRIPTION_CHANGE_EMAIL, shopName } from "@/config/config";

export const metadata = {
  title: `メールアドレス変更 | ${shopName}`,
  description: META_DESCRIPTION_CHANGE_EMAIL,
};

const ChangeEmailPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
      })
    
      // セッションの取得
      const {
        data: { session },
      } = await supabase.auth.getSession()
    
      // 未認証の場合、リダイレクト
      if (!session) {
        redirect('/login')
      }

    return (
        <ChangeEmail email={session.user.email!} />
    );
}

export default ChangeEmailPage;