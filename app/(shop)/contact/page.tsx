import { META_DESCRIPTION_CONTACT, shopName } from "@/config/config";
import Contact from "../../components/pages/contact";

export const metadata = {
  title: `お問い合わせ | ${shopName}`,
  description: META_DESCRIPTION_CONTACT,
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
