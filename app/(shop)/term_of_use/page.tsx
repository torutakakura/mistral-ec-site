import { META_DESCRIPTION_TERM_OF_USE, shopName } from "@/config/config";
import TermOfUse from "../../components/pages/termOfUse";

export const metadata = {
  title: `利用規約 | ${shopName}`,
  description: META_DESCRIPTION_TERM_OF_USE,
};

const TermOfUsePage = () => {
  return <TermOfUse />;
};

export default TermOfUsePage;
