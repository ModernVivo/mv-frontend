import Image from "next/image";
import { useRouter } from "next/router";
import { get } from "lodash";

import NoResult from "~/features/results/components/no-results";
import SearchResults from "~/features/results/components/search-results";
// import { api } from "../../utils/api";
import ResultItem from "./components/result-item";
import Spinner from "./components/spinner";
import { useState } from "react";
import { type FilterType, type UserInPaperType } from "~/types/types";
import { type ConditionType } from "~/types";
import { createCsv } from "~/utils/csv";
import { boxCitation } from "~/utils/citationBox";
import { useGetPapersQuery, useGetConditionsQuery } from '~/store/services/core';

export const Results = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState([]);
  const [showAllFiltersState, setShowAllFiltersState] = useState<Record<number, boolean>>({});
  const [isAscending, setIsAscending] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('citations');

  const toggleShowAllFilters = (conditionId: number) => {
    setShowAllFiltersState((prevState) => ({
      ...prevState,
      [conditionId]: !prevState[conditionId],
    }));
  };

  const { data: papersData, isSuccess, isLoading, isError } = useGetPapersQuery({
    model: id,
    limit: 10,
    offset: 0,
  }) as { data: { results: UserInPaperType[] | undefined, count: number }, isSuccess: boolean, isLoading: boolean, isError: boolean };
  const data = get(papersData, 'results', []);
  const totalPaper = get(papersData, 'count', 0);

  const { data: conditions, isSuccess: conditionSuccess } = useGetConditionsQuery({
    model: id
  }) as { data: ConditionType[] | undefined, isSuccess: boolean };

  console.log('useGetPapersQuery', data, isSuccess, isLoading, isError)
  console.log('useGetConditionsQuery', conditions, conditionSuccess)

  // const { data, isSuccess, isLoading, isError } = api.paper.getPaper.useQuery(
  //   [id ? (id as string) : "", filters, isAscending, selectedOption],
  //   {
  //     enabled: !!id,
  //   },
  // ) as { data: UserInPaperType[] | undefined, isSuccess: boolean, isLoading: boolean, isError: boolean };

  // const { data: conditions, isSuccess: conditionSuccess } = api.condition.getConditions.useQuery(
  //   [id ? (id as string) : ""],
  // );

  const handleSortClick = () => {
    setIsAscending(!isAscending);
  };



  if (data) {
    boxCitation(data, selectedOption);
  }

  const handleCheckboxChange = (filter: FilterType, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFilters((prevSelectedFilters) =>
        prevSelectedFilters.filter((value) => value !== `${filter.value}_${filter.paper_id}_${filter.condition_id}`)
      );
      setFilters((prevSelectedFilters) =>
        prevSelectedFilters.filter((value) => value !== `${filter.value}`)
      );
    } else {
      setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, `${filter.value}_${filter.paper_id}_${filter.condition_id}`] as never);
      setFilters((prevSelectedFilters) => [...prevSelectedFilters, `${filter.value}`] as never);
    }
  };

  const handleDownloadCSV = () => {
    if (isSuccess && data) {
      createCsv(data);
    }
  };

  const handleSortClick2 = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setMenuOpen(false);
  };


  return (
    <>
      <section className="mt-8 flex items-center justify-center gap-4 bg-white">
        <SearchResults name={data?.[0]?.model?.model_name ?? ""} />
        <button className="h-12  w-12 rounded-[5px] bg-accent">
          <Image
            src="/search.svg"
            alt="search"
            width={22}
            height={20}
            className="m-auto"
          />
        </button>
        <div className="flex items-center gap-3 px-4 py-2">
          <Image src="/save-search.png" alt="sort-by" width={16} height={16} />
          <span className="text-text-base cursor-pointer leading-[120%] underline" onClick={handleDownloadCSV}>Save Search</span>
        </div>
      </section>
      <section className="mt-8 flex ">
        {/* Sidebar */}
        {conditionSuccess && conditions?.length !== 0 && (
          <aside className="mx-8 h-max w-[20%] rounded-[10px] border border-[#E0E2E4]">
            <div className="flex flex-col gap-4">
              <h2 className="border-b border-[#E0E2E4] px-6 py-3 text-base font-bold leading-[250%] text-[#FFFFFF] bg-[#051731]">
                Filter by:
              </h2>
              {conditions?.map((key, i) => {
                const conditionId = key.condition_id;
                const showAllFilters = showAllFiltersState[conditionId];
                return (
                  <div key={`condition-${conditionId}`} className="flex flex-col gap-2 border-b border-[#E0E2E4] px-6 py-3">
                    <h3 className="text-base font-bold text-text-primary">
                      {key.condition_display_name}
                    </h3>
                    {/* {key.paper_condition_value.map((filter: FilterType, index: number) => {
                      const isChecked = selectedFilters.includes(`${filter.value}_${filter.paper_id}_${filter.condition_id}` as never);
                      if (index > 5 && !showAllFilters) return;
                      return (
                        <div key={`value-condition-${filter.paper_id}_${filter.condition_id}_${index}`} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`${filter.condition_id + filter.paper_id}`}
                            name={`${filter.value}`}
                            value={`${filter.value}`}
                            className="h-4 w-4 rounded-sm border border-black accent-[#475569]"
                            onChange={() => handleCheckboxChange(filter, isChecked)}
                            checked={isChecked}
                          />
                          <label
                            htmlFor={filter.value}
                            className="text-base text-text-primary "
                          >
                            {`${filter.value}`}
                          </label>
                        </div>
                      );
                    })} */}
                    {/* {key.paper_condition_value.length > 0 && (
                      <div
                        className="mb-9 flex w-4/5 cursor-pointer gap-2"
                        onClick={() => toggleShowAllFilters(conditionId)}
                      >
                        <span className="text-base text-accent">
                          {showAllFilters
                            ? "Hide"
                            : `Show all ${key.paper_condition_value.length}`}
                        </span>
                        <Image
                          src="/chevron-accent.svg"
                          alt="chevron-down"
                          width={16}
                          height={16}
                          className={`${showAllFilters ? "rotate-180" : ""} `}
                        />
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>
          </aside>
        )}
        <main className="mr-8 w-[80%]">
          {isLoading ? (
            <Spinner />
          ) : (
            (isError || data?.length === 0) && <NoResult />
          )}
          {isSuccess && data?.length !== 0 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="ml-6 text-2xl font-bold text-[#475569]">
                  {totalPaper} Results
                </h2>
                <div className="relative inline-block">
                  <button className="flex items-center gap-3 border pl-4" onClick={handleSortClick}>
                    <span className="text-[#475569]">Sort by</span>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-8 text-center flex items-center justify-center"
                    >
                      <img
                        src="/sort.svg"
                        alt="sort-by"
                        width={16}
                        height={16}
                        onClick={handleSortClick2}
                        className="items-center text-center"
                      />
                    </div>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute top-10 right-0 bg-white border border-[#E3E7F0] rounded-lg p-2">

                      <div className="flex items-center mb-4">
                        <label>
                          <input
                            type="radio"
                            value="citations"
                            checked={selectedOption === 'citations'}
                            onChange={() => handleOptionChange('citations')}
                          />
                          Citations
                        </label>
                      </div>
                      <div className="flex items-center">
                        <label>
                          <input
                            type="radio"
                            value="date"
                            checked={selectedOption === 'date'}
                            onChange={() => handleOptionChange('date')}
                          />
                          Date
                        </label>
                      </div>


                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {data?.map((paper: UserInPaperType): JSX.Element => (
                  <ResultItem key={paper.paper_id} paper={paper} />
                ))}
              </div>
            </>
          )}
        </main>
      </section>
    </>
  );
};
