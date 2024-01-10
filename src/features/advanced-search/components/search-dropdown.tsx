import Image from "next/image";
import { useState } from "react";

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="md:w-[47%]">
      <div className="flex">
        <button
          id="dropdown-button"
          className="z-10 inline-flex h-12 flex-shrink-0 items-center rounded-l-lg border border-[#E0E2E4] bg-[#E0E2E4] px-5 py-4 focus:outline-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Drug class
          <Image
            src={"/chevron.svg"}
            alt="chevron-down"
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
        <div
          id="dropdown"
          className={`absolute ${
            !isOpen && "hidden"
          } z-10 mt-12 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow`}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Analgesic
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Antidepressant
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Antipsychotic
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Antiviral
              </button>
            </li>
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block h-12 w-full rounded-r-md border border-l-2 border-[#E0E2E4] bg-white px-5 py-4 text-base  text-text-primary "
            placeholder="e.g. Analgesic or Antidepressant"
            required
          />
        </div>
      </div>
    </form>
  );
}
