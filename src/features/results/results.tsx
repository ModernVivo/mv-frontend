import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { get, isEmpty, forEach } from "lodash";
import ReactPaginate from 'react-paginate';

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
import { useGetPapersMutation, useGetConditionsValuesMutation } from '~/store/services/core';

const ITEMS_PER_PAGE = 10;
const DEFAULT_SHOW_ITEM = 5;

export const Results = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filters, setFilters] = useState([]);
  const [showAllFiltersState, setShowAllFiltersState] = useState<Record<number, boolean>>({});
  const [isAscending, setIsAscending] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('citations');
  const [itemOffset, setItemOffset] = useState(0);

  const [getPapers, { data: papersData, isSuccess, isLoading, isError }] = useGetPapersMutation();
  const [getConditions, { data: conditions, isSuccess: conditionSuccess }] = useGetConditionsValuesMutation();

  useEffect(() => {
    if (!!id) {
      getPapers({
        model: id,
        limit: ITEMS_PER_PAGE,
        offset: itemOffset,
        ...getConditionParams(selectedFilters)
      });
    }
  }, [selectedFilters, itemOffset, id])

  useEffect(() => {
    if (!!id) {
      getConditions({
        model: id
      });
    }
  }, [id])

  const getConditionParams = (conditions: any) => {
    if (isEmpty(selectedFilters)) return {};
    
    const _conditions = {};
    forEach(conditions, (value, key) => {
      if(!isEmpty(value)) {
        _conditions[key] = value;
      }
    });

    return {conditions: JSON.stringify(_conditions)};
  }

  const toggleShowAllFilters = (conditionId: number) => {
    setShowAllFiltersState((prevState) => ({
      ...prevState,
      [conditionId]: !prevState[conditionId],
    }));
  };

  const data = get(papersData, 'results', []);
  const totalPaper = get(papersData, 'count', 0);


  const handleSortClick = () => {
    setIsAscending(!isAscending);
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % totalPaper;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  if (data) {
    boxCitation(data, selectedOption);
  }

  const handleCheckboxChange = (condition_id: number, value: string, event: any) => {
    const isChecked = get(event, 'target.checked', false)
    const conditionId = String(condition_id);
    if(isChecked) {
      setSelectedFilters((preValue) => ({
        ...preValue,
        [conditionId]: [
          ...get(preValue, conditionId, []),
          value
        ]
      }))
    } else {
      setSelectedFilters((preValue) => ({
        ...preValue,
        [conditionId]: get(preValue, conditionId, []).filter(v => v !== value)
      }))
    }

    // if (isChecked) {
    //   setSelectedFilters((prevSelectedFilters) =>
    //     prevSelectedFilters.filter((value) => value !== `${filter.value}_${filter.condition_id}`)
    //   );
    //   setFilters((prevSelectedFilters) =>
    //     prevSelectedFilters.filter((value) => value !== `${filter.value}`)
    //   );
    // } else {
    //   setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, `${filter.value}_${filter.condition_id}`] as never);
    //   setFilters((prevSelectedFilters) => [...prevSelectedFilters, `${filter.value}`] as never);
    // }
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

  const pageCount = Math.ceil(totalPaper / ITEMS_PER_PAGE);

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
              {conditions?.map((condition: ConditionType) => {
                const conditionId = condition.condition_id;
                const showAllFilters = showAllFiltersState[conditionId];
                const condition_values = get(condition, 'values', []);
                return (
                  <div key={`condition-${conditionId}`} className="flex flex-col gap-2 border-b border-[#E0E2E4] px-6 py-3">
                    <h3 className="text-base font-bold text-text-primary">
                      {condition.condition_display_name}
                    </h3>
                    {condition_values.map((filter: FilterType, index: number) => {
                      const isChecked = get(selectedFilters, ``, false);
                      if (index > 5 && !showAllFilters) return;
                      const check_id = `value-condition_${conditionId}_${index}`;
                      return (
                        <div key={check_id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            id={check_id}
                            name={`${filter.value}`}
                            className="h-4 w-4 rounded-sm border border-black accent-[#475569] cursor-pointer"
                            onChange={(event: any) => handleCheckboxChange(conditionId, filter.value, event)}
                          />
                          <label
                            htmlFor={check_id}
                            className="text-base text-text-primary cursor-pointer"
                          >
                            {`${filter.value}`}
                          </label>
                        </div>
                      );
                    })}
                    {condition_values.length > DEFAULT_SHOW_ITEM && (
                      <div
                        className="mb-9 flex w-4/5 cursor-pointer gap-2"
                        onClick={() => toggleShowAllFilters(conditionId)}
                      >
                        <span className="text-base text-accent">
                          {showAllFilters
                            ? "Hide"
                            : `Show all ${condition_values.length - DEFAULT_SHOW_ITEM}`}
                        </span>
                        <Image
                          src="/chevron-accent.svg"
                          alt="chevron-down"
                          width={16}
                          height={16}
                          className={`${showAllFilters ? "rotate-180" : ""} `}
                        />
                      </div>
                    )}
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
                  <ResultItem key={paper.paper_id} paper={paper} paper_id={paper.paper_id} />
                ))}
              </div>
            </>
          )}

          <div className="my-10 flex justify-center">
            <ReactPaginate
              breakLabel="..."
              previousLabel={
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
              }
              nextLabel={
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              containerClassName="inline-flex -space-x-px text-base h-10"
              className=""
              pageClassName=""
              pageLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              activeClassName=""
              activeLinkClassName="cursor-not-allowed flex items-center justify-center px-3 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white bg-gray-700"
              previousClassName=""
              nextClassName=""
              previousLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              nextLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabledClassName=""
              disabledLinkClassName=""
              breakLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            />
          </div>
        </main>
      </section>
    </>
  );
};
