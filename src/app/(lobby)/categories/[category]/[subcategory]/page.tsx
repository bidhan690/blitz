import { getProductsAction } from "@/_actions/product";
import Products from "@/components/Products";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { siteConfig } from "@/config/site";
import { toTitleCase } from "@/lib/utils";
import { FC } from "react";

interface pageProps {
  params: {
    category: string
    subcategory: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: pageProps) {
  return {
    title: `${toTitleCase(params.subcategory)} - ${siteConfig.name}`,
    description: `Buy products from the ${params.subcategory} category`,
  }
}

const page: FC<pageProps> = async ({ searchParams, params }) => {
  const { sort, page, per_page, price_range } = searchParams;

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0


  const product = await getProductsAction({
    sort: typeof sort === "string" ? sort : null,
    offset,
    limit,
    categories: [params.category],
    subcategories: [params.subcategory],
    price_range: typeof price_range === "string" ? price_range.split("-") : null,
  });

  const pageCount = Math.ceil(product.count / limit);

  return (
    <Shell>
      <PageHeader aria-labelledby="subcategory-page-header">
        <PageHeaderHeading size="sm">{toTitleCase(params.subcategory)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy ${params.subcategory} from the best stores.`}
        </PageHeaderDescription>
      </PageHeader>
      <Products products={product.items} pageCount={pageCount} />
    </Shell>
  );
};

export default page;
