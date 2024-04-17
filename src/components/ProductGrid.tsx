import fetchData from "@/lib/fetchDataFromApi";
import layoutSettings from "@/lib/layoutSettings";
import NoProductFound from "./NoProductFound";
import Paginations from "./Paginations";
import ProductCard from "./cards/ProductCard";

type CategoryPageProps = {
  searchParams: SearchParamsType;
  params: {
    category: string;
    shop: string;
  };
};

const ProductGrid = async ({ params, searchParams }: CategoryPageProps) => {
  const filterString = params.category
    ? `/products/${params?.shop}/${params.category}`
    : `/products/${params?.shop}`;

  const res = await fetchData.get(`${filterString}`, {
    page: searchParams?.page as string,
    q: searchParams?.q as string,
    sort: searchParams?.sort as string,
    order: searchParams?.order as string,
    color: searchParams?.color as string,
    minPrice: searchParams?.minPrice as string,
    maxPrice: searchParams?.maxPrice as string,
  });

  const totalCount = res.data?.total;
  const products: BakeryProduct[] =
    (res.data.products as BakeryProduct[]) || [];
  const settings = layoutSettings?.[params?.shop];

  if (products.length === 0) {
    return <NoProductFound />;
  }

  return (
    <>
      <div className="grid-layout pt-6">
        {products.map((product) => (
          <ProductCard
            product={product}
            variants={settings.productCardVariants}
            key={product._id}
          />
        ))}
      </div>
      <Paginations totalCount={totalCount} />
    </>
  );
};

export default ProductGrid;
