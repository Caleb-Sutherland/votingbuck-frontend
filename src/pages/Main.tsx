import React from "react";
import { FaUniversity } from "react-icons/fa";
import { GiPublicSpeaker } from "react-icons/gi";
import { BsBuilding } from "react-icons/bs";
import Particles from "react-tsparticles";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Main() {
  const particlesInit = (main: any) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container: any) => {
    console.log(container);
  };
  return (
    <div>
      <Header/>
      <div className="bg-gradient-to-tr from-red-600 to-blue-600 h-screen">
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
        <div className="absolute flex flex-col space-y-24 py-48 px-20 inset-y-0 left-0 w-full">
          <div className="flex flex-col space-y-5 max-w-5xl m-auto">
            <p className="text-4xl sm:text-5xl font-medium text-center text-white">View political donation information for organizations and political figures.</p>  
            <p className="text-2xl sm:text-3xl font-light text-center text-white">Research and discover political associations through donation information.</p>
            <div className="flex flex-row space-x-2 justify-center">
              <input type="text" placeholder="corporates, universities or politicians" className="w-72 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring shadow-lg rounded-lg"/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-32 py-32 px-20">
        <div className="-m-5 flex flex-row flex-wrap justify-center space-x-32">
          <FaUniversity size="16em"/>
          <div className="flex flex-col space-y-4 w-1/3">
            <p className="text-lg font-medium">Highlighted Universities</p>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Harvard University</p>
              </div>
              <div>
                <p className="text-right">Donated <span className="font-medium">$1,254,332.20</span> in 2021</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Massachusetts Institute of Technology</p>
              </div>
              <div>
                <p className="text-right">Employed <span className="font-medium">124</span> Political Contributors</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>New York University</p>
              </div>
              <div>
                <p className="text-right">Made <span className="font-medium">1,424</span> Donations in 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="-m-5 flex flex-row flex-wrap justify-center space-x-32">
          <div className="flex flex-col space-y-4 w-1/3">
            <p className="text-lg font-medium text-right">Highlighted Politicians</p>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Joe Biden</p>
              </div>
              <div>
                <p className="text-right">Received <span className="font-medium">$1,254,332.20</span> in 2021</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Donald Trump</p>
              </div>
              <div>
                <p className="text-right">Received <span className="font-medium">1,424</span> Donations in 2021</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Kamala Harris</p>
              </div>
              <div>
                <p className="text-right">Received From <span className="font-medium">1,545</span> Contributors</p>
              </div>
            </div>
          </div>
          <GiPublicSpeaker size="16em"/>
        </div>
        <div className="-m-5 flex flex-row flex-wrap justify-center space-x-32">
          <BsBuilding size="16em"/>
          <div className="flex flex-col space-y-4 w-1/3">
            <p className="text-lg font-medium">Highlighted Corporates</p>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Apple</p>
              </div>
              <div>
                <p className="text-right">Donated <span className="font-medium">$1,254,332.20</span> in 2021</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Bank of America</p>
              </div>
              <div>
                <p className="text-right">Employed <span className="font-medium">124</span> Political Contributors</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Lockheed Martin</p>
              </div>
              <div>
                <p className="text-right">Made <span className="font-medium">1,424</span> Donations in 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-5 max-w-5xl m-auto">
          <p className="text-4xl sm:text-5xl font-medium text-center">About votingbuck</p>  
          <p className="text-2xl sm:text-3xl font-light text-center leading-10">Voting Buck&apos;s mission is to make political data available to everyone. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
        </div>
        <div className="-m-5 flex flex-row flex-wrap justify-center">
          <div className="m-8 w-80 relative flex flex-col">
            <img className="h-44 object-cover rounded-lg" src="https://images.unsplash.com/photo-1541872705-1f73c6400ec9?ixlib=rb-1.2.1&w=400"></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Politicians</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              <Link className="text-blue-500 font-normal text-center w-full" to="politicians">Explore</Link>
            </div>
          </div>
          <div className="m-8 w-80 relative flex flex-col">
            <img className="h-44 object-cover rounded-lg" src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&w=400"></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Corporates</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              <Link className="text-blue-500 font-normal text-center w-full" to="corporates">Explore</Link>
            </div>
          </div>
          <div className="m-8 w-80 relative flex flex-col">
            <img className="h-44 object-cover rounded-lg" src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&w=400"></img>
            <div className="py-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Universities</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              <Link className="text-blue-500 font-normal text-center w-full" to="universities">Explore</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>);
}
