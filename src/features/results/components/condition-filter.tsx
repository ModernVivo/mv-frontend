import Image from "next/image";
import { get } from "lodash";
import { type ConditionType } from "~/types";

export interface ConditionFilterType {
  conditionSuccess: boolean;
  conditions: ConditionType[] | undefined;
  showAllFiltersState: any;
  DEFAULT_SHOW_ITEM: number;
  handleCheckboxChange: any;
  toggleShowAllFilters: any;
}

const ConditionFilter = ({
  conditionSuccess,
  conditions,
  showAllFiltersState,
  DEFAULT_SHOW_ITEM,
  handleCheckboxChange,
  toggleShowAllFilters
}: ConditionFilterType) => {
  return (
    <div className="my-5 rounded-[10px] border border-[#E0E2E4]">
      <div className="flex flex-col gap-4">
        <h2 className="border-b border-[#E0E2E4] px-6 py-3 text-base font-bold leading-[250%] text-[#FFFFFF] bg-[#051731]">
          Condition Filters
        </h2>
        {
          conditionSuccess && conditions?.length === 0 && (
            <div className="flex flex-col gap-2 border-[#E0E2E4] px-6 py-3 text-[#999]">
              No conditions found
            </div>
          )
        }
        {conditionSuccess && conditions?.length !== 0 && conditions?.map((condition: ConditionType, k: number) => {
          const conditionId = condition.condition_id;
          const showAllFilters = showAllFiltersState[conditionId];
          const condition_values = get(condition, 'values', []);
          return (
            <div key={`condition-${conditionId}`} className={`flex flex-col gap-2 border-[#E0E2E4] px-6 py-3 ${conditions.length - 1 > k && 'border-b'}`}>
              <h3 className="text-base font-bold text-text-primary">
                {condition.condition_display_name}
              </h3>
              {condition_values.map((filter: any, index: number) => {
                if (index >= DEFAULT_SHOW_ITEM && !showAllFilters) return;
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
    </div>
  );
}

export default ConditionFilter;