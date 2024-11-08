import { company_products } from "@/data/company_products";
import { patents } from "@/data/patents";
import {
  Company,
  GetPatentAndCompanyProps,
  Patent,
} from "@/types/jsonFiles.type.types";

export default function getPatentAndCompany({
  patentId,
  companyName,
}: GetPatentAndCompanyProps) {
  // find the patent
  const patent: Patent | undefined = patents.find(
    (eachPatent) => eachPatent.publication_number === patentId
  );

  const { companies }: { companies: Company[] } = company_products;

  // find the company
  const company = companies.find(
    (eachCompany) => eachCompany.name === companyName
  );

  return { patent, company };
}
