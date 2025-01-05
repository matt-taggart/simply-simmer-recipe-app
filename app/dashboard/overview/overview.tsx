"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Tabs from "@radix-ui/react-tabs";
import Skeleton from "react-loading-skeleton";
import hash from "object-hash";


import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { GENERATION_COUNT_LIMIT, RoutePaths } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { Wizard } from "@/components/Wizard";

export const dynamic = "force-dynamic";

export function Overview({ isSubscribed, generationCount }) {
  const defaultTab = "tab1";

  const [searchQuery, setSearchQuery] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const router = useRouter();
  const queryClient = useQueryClient();

  const supabase = createClient();

  const {
    isLoading,
    isFetching,
    data = [],
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => searchRecipes(searchQuery),
    enabled: false,
  });

  async function searchRecipes(searchQuery: string) {
    try {
      const searchResults = await axios.get(
        "/dashboard/search?q=" + searchQuery
      );

      return searchResults.data.map((recipe) => ({
        ...recipe,
        id: hash(recipe),
      }));
    } catch (error) {
      console.log("%cerror", "color:red; ", error);
    } finally {
      const user = await supabase.auth.getUser();
      await supabase.rpc("increment_search_count", {
        user_id_value: user?.data?.user?.id,
      });
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleKeyDown(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      refetch();
    }
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    refetch();
  }

  function onSubmitRecipeUrl(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const id = hash(recipeUrl);

    queryClient.setQueryData(["recipes"], () => {
      return [{ id, url: recipeUrl, title: "", profile: {} }];
    });

    router.push(RoutePaths.RECIPE + "/" + id);
  }

  function handleRecipeInputOnChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setRecipeUrl(event.target.value);
  }

  function handleRecipeInputKeyDown(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmitRecipeUrl(event);
    }
  }

  const loading = isLoading || isFetching;

  const filteredResults = data.filter((result) => !!result.title);

  return (
    <div key="1" className="bg-[#f0ebe3] min-h-screen max-w-full flex flex-col items-center">
      {!isSubscribed && generationCount >= GENERATION_COUNT_LIMIT ? (
        <div className="max-w-3xl mx-auto mt-8">
          <div className="tremor-Card-root  relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 pr-4 w-[65ch]">
            <p className="tremor-TableCell-root text-tremor-content">
              You've reached your monthly generation limit of 10 recipe
              extractions. Please{" "}
              <Link
                className="text-[#bd1e59] hover:underline font-bold"
                href={RoutePaths.BILLING}
              >
                upgrade your plan
              </Link>{" "}
              for more generations and to enable premium features.
            </p>
          </div>
        </div>
      ) : (
        <Tabs.Root
          defaultValue={defaultTab}
          onValueChange={(value) => setCurrentTab(value)}
          className="max-w-5xl mx-auto pb-10"
        >
          <header className="p-4 mb-4 max-w-2xl">
            <Tabs.List aria-label="search tabs" className="space-x-5 mt-10">
              <Tabs.Trigger
                value="tab1"
                className={cn(
                  "pb-1 border-b-2 border-transparent text-[#bd1e59] hover:border-[#bd1e59] text-lg",
                  { "border-[#bd1e59]": currentTab === "tab1" }
                )}
              >
                Search for Recipes
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab2"
                className={cn(
                  "pb-1 border-b-2 border-transparent text-[#bd1e59] hover:border-[#bd1e59] text-lg",
                  { "border-[#bd1e59]": currentTab === "tab2" }
                )}
              >
                Find Recipes by Category
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab3"
                className={cn(
                  "pb-1 border-b-2 border-transparent text-[#bd1e59] hover:border-[#bd1e59] text-lg",
                  { "border-[#bd1e59]": currentTab === "tab3" }
                )}
              >
                Enter Web Address for Recipe
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <p className="tremor-TableCell-root text-tremor-content mt-4 text-md">
                What kind of recipe are you looking for?
              </p>
              <div className="relative mt-4">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#eeb08f]" />
                <div className="relative">
                  <Input
                    className="py-6 px-4 w-full rounded-md bg-white shadow text-base"
                    placeholder="Example: banana bread"
                    type="search"
                    name="search"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Add onKeyDown event handler
                  />
                  <SearchIcon
                    onClick={handleSubmit}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#eeb08f] cursor-pointer"
                  />
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <p className="tremor-TableCell-root text-tremor-content mt-4 text-md">
                Find Recipes by Category
              </p>
              <Wizard />
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <p className="tremor-TableCell-root text-tremor-content mt-4 text-md">
                Please enter the web address of the recipe you want to extract:
              </p>
              <div className="relative mt-4 flex flex-col gap-2">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#eeb08f]" />
                <div className="relative">
                  <Input
                    className="py-6 px-4 w-full rounded-md bg-white shadow text-base"
                    placeholder="Example: www.my-recipe.com"
                    type="search"
                    onChange={handleRecipeInputOnChange}
                    onKeyDown={handleRecipeInputKeyDown} // Add onKeyDown event handler
                  />
                  <SearchIcon
                    onClick={onSubmitRecipeUrl}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#eeb08f] cursor-pointer"
                  />
                </div>
              </div>
            </Tabs.Content>
          </header>

          <Tabs.Content value="tab1">
            <div className="p-4 text-gray-600 text-sm">
              {isFetched && !loading && filteredResults.length === 0 && (
                <div className="tremor-Card-root  relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 pr-4 w-[65ch]">
                  <p className="tremor-TableCell-root text-tremor-content">
                    No recipes found. Please try your search again.
                  </p>
                </div>
              )}
              {(filteredResults.length > 0 || loading) && (
                <div className="overflow-x-auto text-base">
                  <table className="w-full bg-white rounded-md shadow">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left">Recipe Name</th>
                        <th className="px-6 py-3 text-left">Website</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {loading ? (
                        <>
                          {Array(10)
                            .fill(0)
                            .map((_, i) => (
                              <tr
                                key={i}
                                className="hover:bg-[#f8f8f8] hover:text-black transition-colors duration-200 cursor-pointer"
                              >
                                <td colSpan="2" className="px-6 py-3">
                                  <Skeleton />
                                </td>
                              </tr>
                            ))}
                        </>
                      ) : (
                        <>
                          {filteredResults.map((result) => (
                            <tr
                              key={result.id}
                              className="hover:bg-[#f8f8f8] hover:text-black transition-colors duration-200 cursor-pointer"
                              role="button"
                              onClick={() => {
                                router.push(
                                  RoutePaths.RECIPE + "/" + result.id
                                );
                              }}
                            >
                              <td className="px-6 py-3">{result.title}</td>
                              <td className="px-6 py-3 flex items-center gap-3">
                                <div className="flex flex-col sm:flex-row items-start gap-3">
                                  <img
                                    className="h-5 w-5 self-start"
                                    src={result.profile.img}
                                  />
                                  <span className="text-[#eeb08f]">
                                    {result.profile.long_name}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <div />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
