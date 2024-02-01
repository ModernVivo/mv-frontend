import Image from "next/image";
import { useState } from "react";
import moment from "moment";

import { type UserInPaperType } from "~/types/types";

export interface Author {
  author_id: string;
  author: {
    firstname: string;
    lastname: string;
    affiliation: {
      affiliation_name: string;
    }
  }
}

export default function ResultItem({
  paper,
  paper_id
}: {
  paper: UserInPaperType["paper"];
  paper_id: number;
}) {

  const [showAllConditions, setShowAllConditions] = useState(false);
  const [showAllInformation, setShowAllInformation] = useState(false);
  // const year = moment(paper.pub_date).get('year');
  // const month = moment(paper.pub_date).get('month');
  // const day = moment(paper.pub_date).get('date');

  return (
    <div className="border-[#E0E2E4] text-[#475569]">
      <div className="my-6 rounded border bg-white">
      </div>
      <div className="flex flex-row">
        <div className="basis-1/6">
          <div className={`box-border h-176 w-44 p-4 rounded-lg`} style={{ backgroundColor: paper.colorBox }}>
            <div className="flow-root ... text-center">
              <div className={`text-[80px] font-bold`} style={{ color: paper.colorText }}>{paper.citation_count}</div>
            </div>
            <div className="flow-root ... text-center">
              <div className={`text-[16px] font-bold`} style={{ color: paper.colorText }}>Citations</div>
            </div>
          </div>
        </div>
        <div className="basis-1/1 w-full lg:w-auto" style={{ marginLeft: "20px" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold">Conditions</h2>
            {/* <div className="flex items-center gap-2 rounded border border-[#E0E2E4] px-3 py-2">
              <Image src="/filter.svg" alt="filter" width={16} height={16} />
              <input type="text" placeholder="Search condition" />
            </div> */}
          </div>
          <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 gap-2 mb-6">
            {paper.paper_condition_value.length > 0 ? (
              paper.paper_condition_value.map((condition, index: number) => {
                if (index > 5 && !showAllConditions) return;
                return (
                  <span
                    key={paper_id + condition.condition.condition_id}
                    className="font-normal w-full xl:w-[25rem]"
                  >
                    <strong className="font-bold w-[25rem]">
                      {condition.condition.condition_display_name}
                    </strong>{" "}
                    {condition.value}
                  </span>
                );
              })
            ) : (
              <span className="mb-10 font-normal">No conditions found</span>
            )}
          </div>

          {paper.paper_condition_value.length > 0 && (
            <div
              className="mb-9 flex w-4/5 cursor-pointer gap-2"
              onClick={() => setShowAllConditions(!showAllConditions)}
            >
              <span className="text-base text-accent">
                {showAllConditions
                  ? "Hide"
                  : `Show all ${paper.paper_condition_value.length}`}
              </span>
              <Image
                src="/chevron-accent.svg"
                alt="chevron-down"
                width={16}
                height={16}
                className={`${showAllConditions ? "rotate-180" : ""} `}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <div className="basis-[72%] text-[18px] font-bold text-[#051731]">
          {paper.title}
        </div>
        <div className="basis-[25%]">
          <div
            className="mb-9 flex w-4/5 cursor-pointer gap-2"
            onClick={() => setShowAllInformation(!showAllInformation)}
          >
            <span className="text-base text-accent">
              {showAllInformation
                ? "Hide paper information"
                : "View paper information"}
            </span>
            <Image
              src="/chevron-accent.svg"
              alt="chevron-down"
              width={16}
              height={16}
              className={`${showAllInformation ? "rotate-180" : ""} `}
            />
          </div>
        </div>
      </div>
      <div className={`${showAllInformation ? "" : "hidden"} `}>
        <div className="text-[14px] font-normal text-[#475569]">
          {paper.journal.short_name}, {paper.pub_date}
        </div>
        <div className="flex flex-row ml-2 mb-2 rounded-lg text-[14px] font-bold mt-4">
          <div className="basis-[30%] flex-grow overflow-y-auto">
            Author
          </div>
          <div className="basis-[70%] flex-grow overflow-y-auto">
            Affiliation
          </div>
        </div>
        <div className="h-full rounded-lg text-[14px] border font-normal px-3 py-3 leading-7">
          {paper.authors.map((author, k) => (
            <div className="grid grid-cols-4" key={k}>
              <div key={author.author.author_id} className="overflow-y-auto">
                {author.author.firstname} {author.author.lastname}
              </div>
              <div className="overflow-y-auto col-span-3 ml-12">
                {author.author.affiliation.affiliation_name}
              </div>
            </div>
          ))}
        </div>
        <div className="flex ml-2 mb-2 rounded-lg text-[14px] font-bold mt-4">
          <div className="">
            Abstract
          </div>
        </div>
        <div className="flex rounded-lg text-[14px] border font-normal px-3 py-3 leading-7 max-h-44 overflow-y-auto mb-4">
          {paper.abstract}
        </div>
      </div>
    </div>
  );
}

