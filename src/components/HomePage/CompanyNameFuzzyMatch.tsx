import { useCompanyNameFuzzyMatch } from "@/hooks/useCompanyNameFuzzyMatch";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

const CompanyNameFuzzyMatch: FC<CompanyNameFuzzyMatchProps> = ({
  companyName,
  setCompanyName,
}) => {
  const { companyNameFuzzyMatch } = useCompanyNameFuzzyMatch();

  const [companyNames, setCompanyNames] = useState<string[]>([]);

  // Get fuzzy match
  useEffect(() => {
    console.log(companyNames);
    const getFuzzyMatch = async () => {
      const { companyNames } = await companyNameFuzzyMatch({ companyName });
      setCompanyNames(companyNames);
    };

    getFuzzyMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName]);

  return (
    <div className="w-[228px] flex flex-col gap-1 h-auto max-h-20 overflow-y-auto">
      {companyNames.map((companyName) => (
        <button
          type="button"
          key={companyName}
          onClick={() => setCompanyName(companyName)}
          className="text-start hover:bg-slate-600 duration-150"
        >
          {companyName}
        </button>
      ))}
    </div>
  );
};
export default CompanyNameFuzzyMatch;

interface CompanyNameFuzzyMatchProps {
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
}
