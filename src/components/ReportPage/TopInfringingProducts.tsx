import { FC } from "react";

const TopInfringingProducts: FC<{ report: AnalysisReport }> = ({ report }) => {
  const top_infringing_products: Product[] = JSON.parse(
    report.top_infringing_products
  );

  return (
    <>
      {top_infringing_products.map((product: Product, index) => (
        <div
          key={product.product_name}
          className="flex flex-col gap-4 px-4 py-2 max-h-[420px]"
        >
          <div
            className={`relative p-4 rounded-xl flex flex-col gap-4 shadow-md
                 ${
                   product.infringement_likelihood === "High"
                     ? "bg-red-600/20"
                     : product.infringement_likelihood === "Moderate"
                     ? "bg-orange-600/20"
                     : "bg-gray-600/20"
                 }
              `}
          >
            {/* Product name */}
            <p className="flex items-center gap-2">
              <span className="w-max text-gray-300/80 text-sm">
                Product name:
              </span>
              {product.product_name}
            </p>
            {/* Infringement likelihood */}
            <p className="flex items-center gap-2">
              <span className="w-max text-gray-300/80 text-sm">
                Infringement likelihood:
              </span>
              {product.infringement_likelihood}
            </p>
            {/* Relevant claims */}
            <p className="flex items-center gap-2">
              <span className="w-max text-gray-300/80 text-sm">
                Relevant claims:
              </span>
              {product.relevant_claims.map((claim, index) => (
                <span key={claim}>
                  {claim}
                  {index !== product.relevant_claims.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
            {/* Specific features */}
            <p className="flex  gap-2">
              <span className="w-max text-gray-300/80 text-sm">
                Specific features:
              </span>
              <span className="flex flex-col w-96 text-xs">
                {product.specific_features.map((feature, index) => (
                  <span key={feature}>
                    {feature}
                    {index !== product.specific_features.length - 1
                      ? ", "
                      : "."}
                  </span>
                ))}
              </span>
            </p>
            {/* Explanation */}
            <p className="flex gap-2">
              <span className="w-max text-gray-300/80 text-sm">
                Explanation:
              </span>
              <span className="flex flex-col  text-xs">
                {product.explanation}
              </span>
            </p>

            <p className="absolute top-4 right-4 flex items-center gap-2 text-gray-300/80 text-sm">
              ( {index + 1} )
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
export default TopInfringingProducts;

// Report type
interface AnalysisReport {
  analysis_id: string;
  patent_id: string;
  company_name: string;
  overall_risk_assessment: string;
  analysis_date: string;
  top_infringing_products: string;
}

// top_infringing_products type
interface Product {
  product_name: string;
  infringement_likelihood: string;
  relevant_claims: string[];
  specific_features: string[];
  explanation: string;
}
