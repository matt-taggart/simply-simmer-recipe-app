import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { RoutePaths } from "@/lib/constants";
import searchViewImg from "/public/search-view.png";
import modifyRecipeImg from "/public/modify-recipe.png";
import recipeImg from "/public/recipe.png";
import savedRecipeImg from "/public/saved-recipe.png";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className="flex flex-1 flex-col items-center h-full bg-gray-50">
      <div key="1" className="bg-[#f0ebe3] min-h-screen flex flex-col w-full">
        <header className="flex justify-between items-center px-6 py-6 sm:px-24 sm:py-14 bg-[#f0ebe3]">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-4xl">
              Simply <span className="text-[#eeb08f]">Simmer</span>
            </h1>
          </div>
          <Link href={RoutePaths.LOGIN}>
            <Button
              size="lg"
              className="bg-[#eeb08f] hover:bg-[#e1a382] text-white border border-[#eeb08f]"
            >
              Sign In
            </Button>
          </Link>
        </header>
        <main className="py-12 mt-24 flex-grow">
          <section className="text-center max-w-[85ch] mx-auto mb-48">
            <h2 className="text-6xl font-bold text-[#bd1e59] mb-8">
              Spend Less Time Scrolling, More Time Cooking
            </h2>
            <p className="text-2xl text-gray-800 mb-8 max-w-[65ch] mx-auto">
              Our AI-powered app helps you find the perfect recipe based on your
              taste preferences, dietary restrictions, and what's in your
              pantry.
            </p>
            <div className="flex justify-center space-x-4 mt-10 mb-16">
              <Link href="/login">
                <Button
                  size="xl"
                  className="bg-[#bd1e59] text-white hover:bg-[#a4043f] hover:text-white"
                >
                  Find a Recipe
                </Button>
              </Link>
            </div>
          </section>

          <section
            className="mt-10 px-6  flex flex-col items-center max-w-7xl mx-auto"
            id="container"
          >
            <h2 className="text-5xl font-bold text-[#bd1e59] mb-16 text-center w-full">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-32 w-full">
              <div className="flex flex-wrap md:flex-nowrap items-center">
                <div className="w-full md:w-5/12 sm:p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-5">
                      <div className="text-5xl sm:text-6xl font-bold text-[#bd1e59]">
                        1
                      </div>
                      <h3 className="text-3xl sm:text-4xl">
                        Start with a meal idea
                      </h3>
                    </div>
                    <p className="text-xl sm:text-2xl text-gray-800">
                      Enter the meal type or key ingredient you have in mind.
                      Our AI-driven search brings you a variety of recipes that
                      match your input.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-7/12 py-4 md:p-4 flex justify-center items-center">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <Image
                      src={searchViewImg.src}
                      alt="Search View"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-32 w-full">
                <div className="flex flex-wrap md:flex-nowrap items-center">
                  <div className="w-full md:w-7/12 py-4 sm:p-4 flex justify-center items-center">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <Image
                        src={recipeImg.src}
                        alt="Search View"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-5/12 sm:p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-5">
                        <div className="text-5xl sm:text-6xl font-bold text-[#bd1e59]">
                          2
                        </div>
                        <h3 className="text-3xl sm:text-4xl">
                          Streamline your meal prep
                        </h3>
                      </div>
                      <p className="text-xl sm:text-2xl text-gray-800">
                        Effortlessly create a grocery list and detailed cooking
                        instructions in a user-friendly format. Print or save
                        digitally for convenient access and hassle-free cooking.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center">
                  <div className="w-full md:w-5/12 sm:p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-5">
                        <div className="text-5xl sm:text-6xl font-bold text-[#bd1e59]">
                          3
                        </div>
                        <h3 className="text-3xl sm:text-4xl">
                          Personalize your recipe
                        </h3>
                      </div>
                      <p className="text-xl text-2xl text-gray-800">
                        Select from a range of suggested recipes. Easily modify
                        any recipe to align with your dietary preferences,
                        whether it's low-carb, vegetarian, or allergy-friendly.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-7/12 py-4 sm:p-4 flex justify-center items-center">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <Image
                        src={modifyRecipeImg.src}
                        alt="Search View"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center">
                  <div className="w-full md:w-7/12 py-4 sm:p-4 flex justify-center items-center">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <Image
                        src={savedRecipeImg.src}
                        alt="Search View"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-5/12 sm:p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-5">
                        <div className="text-5xl sm:text-6xl font-bold text-[#bd1e59]">
                          4
                        </div>
                        <h3 className="text-3xl sm:text-4xl">
                          Save your recipe
                        </h3>
                      </div>
                      <p className="text-xl sm:text-2xl text-gray-800">
                        Save your recipe for later use. Never lose track of a
                        recipe again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <h2 className="text-5xl font-bold text-[#eeb08f] mb-4 text-center w-full mt-24">
            Pricing
          </h2>
          <div className="w-full flex gap-8 flex-wrap justify-center mb-10">
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mt-8 mx-3">
                <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <span>Basic Plan</span>
                  <span className="mt-0.5 text-lg">(Free)</span>
                </h1>

                <div className="space-y-4 mb-4 text-lg">
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>Extract recipes with zero ads (10 per month).</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Discover new recipes with our powerful search
                      functionality.
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>Save recipes for easy access.</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Display and print grocery list & cooking instructions.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-[#eeb08f] mt-8 mx-3">
                <h1 className="text-2xl font-semibold text-[#bd1e59] mb-4 flex items-center gap-2">
                  <span>Pro Plan</span>
                  <CloudLightningIcon className="text-[#bd1e59] mr-2" />
                  <span className="text-lg mt-1">($4.99/month)</span>
                </h1>
                <div className="space-y-4 mb-4 text-lg">
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Ad-free recipe access. Say goodbye to distractions.
                    </span>
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Ultra fast recipe search. Find your favorite recipes in
                      seconds.
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Save your favorite recipes. Never lose a recipe again.
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CheckIcon className="inline h-5 w-5 mr-2 text-green-700 flex-shrink-0" />
                    <span>
                      Personalize your favorite recipes. Tailor them to your
                      taste.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 my-16">
            <Link href="/login">
              <Button
                size="xl"
                className="bg-[#bd1e59] text-white hover:bg-[#a4043f] hover:text-white"
              >
                Find a Recipe
              </Button>
            </Link>
          </div>
        </main>
        <footer className="bg-[#eeb08f] text-[#bd1e59] py-6 px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link className="text-sm hover:underline" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline" href="#">
                Privacy Policy
              </Link>
            </div>
            <p className="text-sm">
              © 2024 Simply Simmer. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CloudLightningIcon(props) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}
