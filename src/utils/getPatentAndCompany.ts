import {
  Company,
  GetPatentAndCompanyProps,
  Patent,
} from "@/types/jsonFiles.type.types";
import fs from "fs";
import path from "path";

export default function getPatentAndCompany({
  patentId,
  companyName,
}: GetPatentAndCompanyProps) {
  // Parse from json
  const patents: Patent[] = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "public", "json", "Patents.json"),
      "utf-8"
    )
  );

  // find the patent
  const patent = patents.find(
    (eachPatent) => eachPatent.publication_number === patentId
  );

  // Parse from json
  const { companies }: { companies: Company[] } = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "public", "json", "company_products.json"),
      "utf-8"
    )
  );

  // find the company
  const company = companies.find(
    (eachCompany) => eachCompany.name === companyName
  );

  return { patent, company };
}
