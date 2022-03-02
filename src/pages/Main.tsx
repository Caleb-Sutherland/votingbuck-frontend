import React from "react";

export default function Main() {
  return (
    <div>
      <div className="flex flex-col space-y-24 py-48 px-20 bg-gradient-to-tr from-red-500 to-blue-500 h-screen">
        <div className="flex flex-col space-y-5 max-w-5xl m-auto">
          <p className="text-4xl sm:text-5xl font-medium text-center text-white">View political donation information for organizations and political figures.</p>  
          <p className="text-2xl sm:text-3xl font-light text-center text-white">Research and discover political associations through donation information.</p>
          <div className="flex flex-row space-x-2 justify-center">
            <input type="text" placeholder="Organization or Individual" className="w-72 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-24 py-24 px-20">
        <div className="-m-5 flex flex-row flex-wrap justify-center">
          <div className="m-5 w-96 relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg">
            {/*<div className="relative h-40 overflow-hidden">
              <img className="absolute my-auto" src="https://images.unsplash.com/photo-1554469384-e58fac16e23a"></img>
            </div>
            */}<div className="p-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Organizations</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
          </div>
          <div className="m-5 w-96 relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg">
            {/*<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"></img>
            */}<div className="p-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Individuals</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
