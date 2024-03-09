import { META_DESCRIPTION_TRANSACTIONS_LAW, shopName } from "@/config/config";
import TransactionsLaw from "../../components/pages/transactionsLaw";

export const metadata = {
  title: `特定商取引法に基づく表記 | ${shopName}`,
  description: META_DESCRIPTION_TRANSACTIONS_LAW,
};

const TransactionsLawPage = () => {
  return <TransactionsLaw />;
};

export default TransactionsLawPage;
