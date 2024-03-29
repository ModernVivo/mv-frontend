import { useEffect } from "react";
import Image from "next/image";
import ModernVivo from "../components/modern-vivo";
import { useState } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";

import { useGetModelQuery } from '~/store/services/core';
import { type ModelType } from "~/types";
import * as Sentry from "@sentry/nextjs";

export default function AdvancedSearch() {
  Sentry.init({
    dsn: "https://738397419a0cb5e391613793f4b762b2@o4506696855781376.ingest.us.sentry.io/4506696879702016",

    integrations: [
      Sentry.feedbackIntegration({
        // Additional SDK configuration goes in here, for example:
        colorScheme: "system",
        buttonLabel: "Send Feedback",
        submitButtonLabel: "Send Feedback",
        formTitle: "Send Feedback",
      }),
    ],
  });

  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<number | undefined>();

  const { data: models, isLoading } = useGetModelQuery({
    usable: "True"
  }) as { data: ModelType[] | undefined, isLoading: boolean };

  useEffect(() => {
    if (!!models && models.length > 0) {
      setSelectedModel(get(models, '[0].model_id'))
    }
  }, [models])

  const handleClick = () => {
    if (selectedModel) {
      void router.push(`/results/${selectedModel}`);
    }
  };
  return (
    <div className="flex flex-col items-center ">
      {/* Hero */}
      <section className="h-auto w-full bg-[lightgray] bg-hero-gradient bg-cover bg-no-repeat text-gray-600">
        <div className="m-4 flex h-full flex-col items-center justify-center">
          <div className="mx-8 mt-12 flex w-full flex-col items-center sm:flex-row sm:flex-wrap">
            <h1 className="mb-4 ml-[8.5%] text-4xl font-medium leading-[120%] tracking-[-1px] text-text-primary sm:text-[55px]">
              In-vivo experimental design
              <br /> at a{" "}
              <label className="font-bold text-fraction">fraction</label> of the
              time.
            </h1>
            <Image
              src="/modern-vivo-asset-1.png"
              alt="logo"
              width={390}
              height={218}
              className="ml-auto mr-[5%]"
            />
          </div>
          <div className="mx-8 mb-1 flex w-full flex-row items-end gap-4 sm:items-end">
            <div className="ml-[8.5%] flex w-[43%] flex-col gap-4">
              <label
                htmlFor="search"
                className="text-base font-normal text-text-primary"
              >
                Search by model type
              </label>
              <select
                name="search"
                id="search"
                className="h-12 w-full appearance-none rounded-[5px] border border-solid border-text-primary px-5 py-3"
                // placeholder="Formalin-Induced Nociceptive Pain Model"
                onChange={(e) => setSelectedModel(+e.target.value)}
                defaultValue={selectedModel}
                disabled={isLoading && !models}
              >
                {!!models && models.map((model: ModelType) => (
                  <option key={model.model_id} value={model.model_id}>
                    {model.model_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="h-12  w-12 rounded-[5px] bg-accent"
              onClick={() => handleClick()}
            >
              <Image
                src="/search.svg"
                alt="search"
                width={22}
                height={20}
                className="m-auto"
              />
            </button>
            {/*
            <span className="mb-4 text-base font-normal leading-[120%] text-text-primary underline">
              Advanced search
            </span>
            */}
          </div>
        </div>
      </section>
      {/* filters */}
      {/* <section className="h-auto w-full bg-[#F6F6F6] pb-8 text-gray-600"> 
        <div className="m-2 flex h-full flex-col justify-center">
          <div className="ml-[8.5%] mt-12 flex items-center gap-5 sm:flex-row">
            <SearchDropdown />
            <span className="text-base leading-[120%] text-text-primary underline">
              Add filter
            </span>
          </div>
          <div className="ml-[8.5%] flex flex-col sm:flex-row sm:gap-20">
            <div className="mt-7 flex items-center">
              <input
                type="checkbox"
                id="exclude"
                className="h-5 w-5 rounded-sm border-[#B0B0B7]"
              />
              <label
                htmlFor="exclude"
                className="ml-2 text-base leading-[150%] text-[#5B5D61]"
              >
                Exclude highly biased papers
              </label>
            </div>
            <div className="mt-7 flex items-center">
              <input
                type="checkbox"
                id="exclude"
                className="h-5 w-5 rounded-sm border-[#B0B0B7]"
              />
              <label
                htmlFor="exclude"
                className="ml-2 text-base leading-[150%] text-[#5B5D61]"
              >
                Include proprietary data
              </label>
            </div>
            <div className="mt-7 flex items-center">
              <input
                type="checkbox"
                id="exclude"
                className="h-5 w-5 rounded-sm border-[#B0B0B7]"
              />
              <label
                htmlFor="exclude"
                className="ml-2 text-base leading-[150%] text-[#5B5D61]"
              >
                Only include papers with the same class
              </label>
            </div>
          </div>
        </div>
      </section>
      */}
      {/* section 3 */}
      <ModernVivo />
    </div>
  );
}
