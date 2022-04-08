import React from "react";
import { FaUniversity } from "react-icons/fa";
import { GiPublicSpeaker } from "react-icons/gi";
import { BsBuilding } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import Particles from "react-tsparticles";
import { Link } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";
import { SearchBar } from "../components/SearchBar";

import * as highlightsImport from "../highlights.json";

export default function Main() {
  const highlights = highlightsImport;
  return (
    <div>
      <HeaderMain />
      <div className="bg-gradient-to-tr from-red to-blue h-screen">
        <Particles
          id="tsparticles"
          className="absolute w-full inset-y-0 left-0"
          options={{
            fullScreen: { enable: false, zIndex: 1000 },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.3,
                width: 0.3,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 0.2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 200,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 3,
              },
            },
            detectRetina: true,
          }}
        />
        <div className="absolute flex flex-col space-y-24 py-48 px-10 lg:px-20 inset-y-0 left-0 w-full">
          <div className="flex flex-col space-y-5 max-w-7xl m-auto">
            <p className="text-4xl sm:text-5xl font-medium text-center text-white">
              politicians, corporations, and universities are connected
            </p>
            <p className="text-2xl sm:text-3xl font-light text-center text-white">
              check out the web of ideology, money, revolving doors, personal
              wealth, and power
            </p>
            <div className="flex flex-row space-x-2 justify-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-32 py-32 px-10 lg:px-20">
        <div className="lg:-m-5 flex flex-col lg:flex-row flex-wrap justify-center">
          <div className="mx-auto lg:mx-0">
            <FaUniversity size="16em" />
          </div>
          <div className="flex flex-col space-y-4 lg:w-1/2 2xl:w-1/3 mt-10 lg:mt-0 lg:ml-32">
            <p className="text-lg font-medium">Highlighted Universities</p>
            {highlights.universities.map(function (entry, index) {
              return (
                <Link key={index} to={"universities/" + entry.id}>
                  <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
                    <div>
                      <p>{entry.name}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <p
                        className="text-right"
                        dangerouslySetInnerHTML={{
                          __html: entry.statistic.replace(
                            /\*([^*]*)\*/g,
                            "<span class='font-medium'>$1</span>"
                          ),
                        }}
                      ></p>
                      <FiExternalLink size="1.1em" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="lg:-m-5 flex flex-col lg:flex-row lg:flex-row-reverse flex-wrap justify-center">
          <div className="mx-auto lg:mx-0">
            <BsBuilding size="16em" />
          </div>
          <div className="flex flex-col space-y-4 lg:w-1/2 2xl:w-1/3 mt-10 lg:mt-0 lg:mr-32">
            <p className="text-lg font-medium lg:text-right">
              Highlighted Corporations
            </p>
            {highlights.corporations.map(function (entry, index) {
              return (
                <Link key={index} to={"corporations/" + entry.id}>
                  <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
                    <div>
                      <p>{entry.name}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <p
                        className="text-right"
                        dangerouslySetInnerHTML={{
                          __html: entry.statistic.replace(
                            /\*([^*]*)\*/g,
                            "<span class='font-medium'>$1</span>"
                          ),
                        }}
                      ></p>
                      <FiExternalLink size="1.1em" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="lg:-m-5 flex flex-col lg:flex-row flex-wrap justify-center">
          <div className="mx-auto lg:mx-0">
            <GiPublicSpeaker size="16em" />
          </div>
          <div className="flex flex-col space-y-4 lg:w-1/2 2xl:w-1/3 mt-10 lg:mt-0 lg:ml-32">
            <p className="text-lg font-medium">Highlighted Politicians</p>
            {highlights.politicians.map(function (entry, index) {
              return (
                <Link key={index} to={"politicians/" + entry.id}>
                  <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
                    <div>
                      <p>{entry.name}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <p
                        className="text-right"
                        dangerouslySetInnerHTML={{
                          __html: entry.statistic.replace(
                            /\*([^*]*)\*/g,
                            "<span class='font-medium'>$1</span>"
                          ),
                        }}
                      ></p>
                      <FiExternalLink size="1.1em" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-5 max-w-5xl m-auto">
          <p className="text-4xl sm:text-5xl font-medium text-center">
            About votingbuck
          </p>
          <p className="text-2xl sm:text-3xl font-light text-center leading-10">
            Is a politician’s voting record aligned with their public
            statements? Who do the employees of big corporations donate to?
            Which politicians are the biggest campaign contribution earners, and
            whose personal wealth has increased the most while in office? On
            this site, you can find information on everything you’ve ever wanted
            to know about money, ideology and politics. Information is separated
            into the three centers of political power in America (politicians,
            corporations and universities), and easily accessible in a
            dashboard-style format.
          </p>
        </div>
        <div className="-m-5 flex flex-row flex-wrap justify-center">
          <div className="m-8 w-80 relative flex flex-col">
            <img
              className="h-44 object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1541872705-1f73c6400ec9?ixlib=rb-1.2.1&w=400"
            ></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Politicians</p>
              <p className="font-light">
                votingbuck has data on the president and VP, the 535 current
                congressmen and women (435 members in the House, and 100
                senators), and the roughly 800 who failed to win re-election, or
                passed through the revolving door in the last two decades.
              </p>
              <Link
                className="text-blue500 font-normal text-center w-full"
                to="politicians"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="m-8 w-80 relative flex flex-col">
            <img
              className="h-44 object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&w=400"
            ></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Corporations</p>
              <p className="font-light">
                votingbuck has data on more than 3,000 stock-listed companies,
                representing over 120 industries, from Airlines (Delta), to tech
                firms (Apple) to big-agriculture (Monsanto).
              </p>
              <Link
                className="text-blue500 font-normal text-center w-full"
                to="corporations"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="m-8 w-80 relative flex flex-col">
            <img
              className="h-44 object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&w=400"
            ></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Universities</p>
              <p className="font-light">
                votingbuck has data on the top-ranked 600 universities in the
                country, from the Ivy League, to liberal arts colleges, to
                community colleges, to big state schools.
              </p>
              <Link
                className="text-blue500 font-normal text-center w-full"
                to="universities"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
