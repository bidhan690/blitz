import { getProductsAction } from "@/_actions/product";
import Products from "@/components/Products";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { siteConfig } from "@/config/site";
import { type Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: `Products - ${siteConfig.name}`,
  description: "Buy products from our stores",
};

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page: FC<pageProps> = async ({ searchParams }) => {
  const { sort, page, per_page, categories, price_range, subcategories } = searchParams;

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0


  const product = await getProductsAction({
    sort: typeof sort === "string" ? sort : null,
    offset,
    limit,
    categories: typeof categories === "string" ? categories.split(".") : null,
    subcategories: typeof subcategories === "string" ? subcategories.split(".") : null,
    price_range: typeof price_range === "string" ? price_range.split("-") : null,
  });

const pageCount = Math.ceil(product.count / limit);

  return (
    <Shell>
      <PageHeader aria-labelledby="products-page-header">
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy Products from our store
        </PageHeaderDescription>
      </PageHeader>
      <Products products={product.items} pageCount={pageCount} categories={true} />
    </Shell>
  );
};

export default page;
