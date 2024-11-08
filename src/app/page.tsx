import FormCheckInfringement from "@/components/HomePage/FormCheckInfringement";
import HistoryReports from "@/components/HomePage/HistoryReports";

const HomePage = () => {
  return (
    <main className="flex flex-col justify-center items-center pt-40 px-8">
      <div className="container xl:h-[640px] rounded-3xl bg-[#2E3438] shadow-xl p-16">
        <div className="w-full flex justify-center gap-16 max-xl:flex-col">
          <FormCheckInfringement />
          <HistoryReports />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
