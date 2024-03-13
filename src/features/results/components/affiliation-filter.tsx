import Image from "next/image";
import { get } from "lodash";
import { type AffiliationType } from "~/types";
import { AFFILIATION_FILTER_GENERAL, AFFILIATION_FILTER_KEY } from "~/constants/core";
import Spinner from "./spinner";

export interface AffiliationFilterType {
  isSuccess: boolean;
  isLoading: boolean;
  data: AffiliationType[] | undefined;
  selectedFilters: any;
  showAllFiltersState: any;
  DEFAULT_SHOW_ITEM: number;
  handleCheckboxChange: any;
  toggleShowAllFilters: any;
}

const AffiliationFilter = ({
  data = [],
  isSuccess,
  isLoading = true,
  selectedFilters = {},
  showAllFiltersState,
  DEFAULT_SHOW_ITEM,
  handleCheckboxChange,
  toggleShowAllFilters
}: AffiliationFilterType) => {

  const affiliationGeneral = Object.keys(AFFILIATION_FILTER_GENERAL);

  const renderGeneralFilter = (v: string, k: number) => {
    const affiliation_general_value = AFFILIATION_FILTER_GENERAL[v];
    const check_id = `value-affiliation_${affiliation_general_value}_${k}`;
    return (
      <div key={check_id} className="flex items-center gap-3 cursor-pointer capitalize">
        <input
          type="checkbox"
          id={check_id}
          name={affiliation_general_value}
          className="h-4 w-4 rounded-sm border border-black accent-[#475569] cursor-pointer"
          onChange={(event: any) => handleCheckboxChange(AFFILIATION_FILTER_KEY.GENERAL_AFFILIATION, affiliation_general_value, event)}
        />
        <label
          htmlFor={check_id}
          className="text-base text-text-primary cursor-pointer"
        >
          {affiliation_general_value}
        </label>
      </div>
    );
  }


  const renderSpecificAffiliation = () => {
    const specific_affiliation = AFFILIATION_FILTER_KEY.SPECIFIC_AFFILIATION;
    const showAllFilters = showAllFiltersState[specific_affiliation];
    return (
      <div>
        <div className="max-h-[500px] overflow-y-auto py-2 my-2">
          {data.map((filter: any, index: number) => {
            if (index >= DEFAULT_SHOW_ITEM && !showAllFilters) return;
            const affiliation_id = filter.affiliation_name;
            const check_id = `value-specific_affiliation_${affiliation_id}`;
            const checked = get(selectedFilters, specific_affiliation, []).includes(affiliation_id);
            return (
              <div key={check_id} className="flex justify-start items-start gap-3 cursor-pointer py-2">
                <div className="w-[20px] flex justify-start items-center pt-1">
                  <input
                    type="checkbox"
                    id={check_id}
                    name={affiliation_id}
                    className="h-4 w-4 rounded-sm border border-black accent-[#475569] cursor-pointer"
                    onChange={(event: any) => handleCheckboxChange(specific_affiliation, affiliation_id, event)}
                    checked={checked}
                  />
                </div>
                <label
                  htmlFor={check_id}
                  className="text-base text-text-primary cursor-pointer"
                >
                  {filter.affiliation_name}
                </label>
              </div>
            );
          })}
        </div>
        {data.length > DEFAULT_SHOW_ITEM && (
          <div
            className="mb-9 flex w-4/5 cursor-pointer gap-2"
            onClick={() => toggleShowAllFilters(specific_affiliation)}
          >
            <span className="text-base text-accent">
              {showAllFilters
                ? "Hide"
                : `Show all ${data.length - DEFAULT_SHOW_ITEM}`}
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
        {
          !isLoading && data.length === 0 && (
            <div className="flex flex-col gap-2 border-[#E0E2E4] px-6 py-3 text-[#999]">
              No Specific Affiliation found
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="my-5 rounded-[10px] border border-[#E0E2E4]">
      <div className="flex flex-col gap-4">
        <h2 className="border-b border-[#E0E2E4] px-6 py-3 text-base font-bold leading-[250%] text-[#FFFFFF] bg-[#051731]">
          Affiliation Filters
        </h2>

        <div className={`flex flex-col gap-2 border-[#E0E2E4] px-6 py-3 border-b`}>
          <h3 className="text-base font-bold text-text-primary">General</h3>
          {affiliationGeneral.map(renderGeneralFilter)}
        </div>

        <div className={`flex flex-col gap-2 border-[#E0E2E4] px-6 py-3`}>
          <h3 className="text-base font-bold text-text-primary">Specific Affiliation</h3>
          {renderSpecificAffiliation()}
          {!!isLoading && <Spinner height="auto" />}
        </div>

      </div>
    </div>
  );
}

export default AffiliationFilter;