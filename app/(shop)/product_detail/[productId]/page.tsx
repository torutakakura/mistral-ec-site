import { createClient } from "@/utils/supabase-server";
import ProductDetail from "../../../components/pages/product_detail";
import { notFound } from "next/navigation";
import { META_DESCRIPTION_PRDUCT_DETAIL, shopName } from "@/config/config";

export const metadata = {
  title: `商品詳細 | ${shopName}`,
  description: META_DESCRIPTION_PRDUCT_DETAIL,
};

type PageProps = {
  params: {
    productId: string;
  };
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  // products詳細取得
  const { data: productData } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.productId)
    .single();

  // productsが存在しない場合
  if (!productData) return notFound();

  const product = {
    id: productData.id,
    name: productData.name,
    apeal: productData.apeal,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}products/${productData.image.replace(/-\d+\.webp$/, "")}/${productData.image}`,
    price: productData.price,
    description: productData.description,
    color_id: productData.color_id,
    flower_id: productData.flower_id,
    using_id: productData.using_id,
    is_recommended: productData.is_recommended,
    for_restaurant: productData.for_restaurant,
    for_present: productData.for_present,
  };

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
