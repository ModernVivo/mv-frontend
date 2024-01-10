import Image from "next/image";
import { useState } from "react";

export default function SearchResults({ name }: { name?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <form className="text-[#475569] md:w-[47%]">
      <div className="flex">
        {/* <div
          id="dropdown"
          className={`absolute ${
            !isOpen && "hidden"
          } z-10 ml-[35%] mt-16 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-md shadow-[#1529B933]`}
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
                <Image
                  src={"/save-search.png"}
                  alt="save-search"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Save search
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <Image
                  src={"/share-search.png"}
                  alt="save-search"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Share
              </button>
            </li>
          </ul>
        </div> */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="border-r-1 z-20 block h-12 w-full rounded-l-md border border-[#051731] bg-white px-5 py-4 text-base  text-text-primary "
            placeholder={name}
            required
          />
        </div>
        <button
          id="dropdown-button"
          className="z-10 inline-flex h-12 flex-shrink-0 items-center rounded-r-lg border border-[#051731] bg-[#EAEAEA] px-3  py-4 focus:outline-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={"/chevron.svg"}
            alt="chevron-down"
            width={16}
            height={16}
          />
        </button>
      </div>
    </form>
  );
}
