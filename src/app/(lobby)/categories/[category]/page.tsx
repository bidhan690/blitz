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
  }
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: pageProps) {
  return {
    title: `${toTitleCase(params.category)} - ${siteConfig.name}`,
    description: `Buy products from the ${params.category} category`,
  }
}

const page: FC<pageProps> = async ({ searchParams, params }) => {
  const { sort, page, per_page, categories, price_range, subcategories } = searchParams;

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0


  const product = await getProductsAction({
    sort: typeof sort === "string" ? sort : null,
    offset,
    limit,
    categories: [params.category],
    subcategories: typeof subcategories === "string" ? subcategories.split(".") : null,
    price_range: typeof price_range === "string" ? price_range.split("-") : null,
  });

  const pageCount = Math.ceil(product.count / limit);

  return (
    <Shell>
      <PageHeader aria-labelledby="category-page-header">
        <PageHeaderHeading size="sm">{toTitleCase(params.category)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy ${params.category} from the best stores.`}
        </PageHeaderDescription>
      </PageHeader>
      <Products products={product.items} pageCount={pageCount} category={params.category} />
    </Shell>
  );
};

export default page;
