import ProductList from "../../components/pages/productList";
import { createClient } from "@/utils/supabase-server";
import { notFound } from "next/navigation";
import { productType } from "@/utils/product.types";
import { META_DESCRIPTION_PRODUCT_LIST, shopName } from "@/config/config";

export const metadata = {
  title: `商品一覧 | ${shopName}`,
  description: META_DESCRIPTION_PRODUCT_LIST,
};

type PageProps = {
  searchParams: {
    how_to_uses: string | number;
  };
};

const ProductListPage = async ({ searchParams }: PageProps) => {
  const filterParams = Object.entries(searchParams)[0];
  const supabase = createClient();
  let productsData;
  if (filterParams) {
    if (filterParams[0] === "price_id") {
      let minPrice;
      let maxPrice;
      // IDによって価格の範囲を設定
      switch (Number(filterParams[1])) {
        case 1:
          maxPrice = 4000;
          break;
        case 2:
          minPrice = 4000;
          maxPrice = 5999;
          break;
        case 3:
          minPrice = 6000;
          maxPrice = 9999;
          break;
        case 4:
          minPrice = 10000;
          maxPrice = 14999;
          break;
        case 5:
          minPrice = 15000;
          maxPrice = 19999;
          break;
        case 6:
          minPrice = 20000;
          break;
        default:
          // もしIDが1〜5の範囲外の場合は、全ての商品を取得するための条件を設定
          minPrice = 0;
          maxPrice = Infinity;
      }
      // products取得
      const { data } = await supabase
        .from("products")
        .select()
        .order("id", { ascending: true })
        .gte("price", minPrice ? minPrice : 0) // 最小価格以上の商品を取得
        .lte("price", maxPrice ? maxPrice : Infinity); // 最大価格以下の商品を取得
      productsData = data;
    } else {
      // products取得
      const { data } = await supabase
        .from("products")
        .select()
        .eq(filterParams[0], filterParams[1])
        .order("id", { ascending: true });
      productsData = data;
    }
  } else {
    // products取得
    const { data } = await supabase
      .from("products")
      .select()
      .order("id", { ascending: true });
    productsData = data;
  }

  // colorsが見つからない場合
  if (!productsData) return notFound();

  return <ProductList productsData={productsData as Array<productType>} />;
};

export default ProductListPage;
