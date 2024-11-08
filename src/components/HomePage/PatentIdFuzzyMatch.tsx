import { usePatentIdFuzzyMatch } from "@/hooks/usePatentIdFuzzyMatch";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

const PatentIdFuzzyMatch: FC<PatentIdFuzzyMatchProps> = ({
  patentId,
  setPatentId,
}) => {
  const { patentIdFuzzyMatch } = usePatentIdFuzzyMatch();

  const [patentIds, setPatentIds] = useState<string[]>([]);

  // Get fuzzy match
  useEffect(() => {
    console.log(patentIds);
    const getFuzzyMatch = async () => {
      const { patentIds } = await patentIdFuzzyMatch({ patentId });
      setPatentIds(patentIds);
    };

    getFuzzyMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patentId]);

  return (
    <div className="w-[228px] flex flex-col gap-1 h-auto max-h-20 overflow-y-auto">
      {patentIds.map((patentId) => (
        <button
          type="button"
          key={patentId}
          onClick={() => setPatentId(patentId)}
          className="text-start hover:bg-slate-600 duration-150"
        >
          {patentId}
        </button>
      ))}
    </div>
  );
};
export default PatentIdFuzzyMatch;

interface PatentIdFuzzyMatchProps {
  patentId: string;
  setPatentId: Dispatch<SetStateAction<string>>;
}
