import React, { useState } from "react";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { OrderedList } from "../components/OrderedList";

export default function CorporationMain() {
  const sortItems = [
    { display: "Alphabet, Ascending", field: "name", order: "asc" },
    { display: "Alphabet, Descending", field: "name", order: "desc" },
  ];
  const filterItems = [
    "Paper Products",
    "Industrial Conglomerates",
    "Health Care Facilities",
    "Electric Utilities",
    "Electronic Components",
    "Environmental & Facilities Services",
    "Diversified REITs",
    "Communications Equipment",
    "Life Sciences Tools & Services",
    "Oil & Gas Drilling",
    "Agricultural & Farm Machinery",
    "Tires & Rubber",
    "Education Services",
    "Electronic Equipment & Instruments",
    "Application Software",
    "IT Consulting & Other Services",
    "Asset Management & Custody Banks",
    "Housewares & Specialties",
    "Casinos & Gaming",
    "Diversified Support Services",
    "Health Care Distributors",
    "Diversified Commercial & Professional Services --",
    "Broadcasting",
    "Brewers",
    "Air Freight & Logistics",
    "Soft Drinks",
    "Internet & Direct Marketing Retail",
    "Office Services & Supplies",
    "Household Products",
    "Forest Products",
    "Automobile Manufacturers",
    "Distillers & Vintners",
    "Specialized Consumer Services",
    "Diversified Banks",
    "Commodity Chemicals",
    "Distributors",
    "Wireless Telecommunication Services",
    "Construction Materials",
    "Real Estate Development",
    "Auto Parts & Equipment",
    "Agricultural Products",
    "Footwear",
    "Gas Utilities",
    "Specialty Chemicals",
    "Publishing",
    "Leisure Products",
    "Railroads",
    "Leisure Facilities",
    "Managed Health Care",
    "Integrated Telecommunication Services",
    "Packaged Foods & Meats",
    "Personal Products",
    "Regional Banks",
    "Automotive Retail",
    "Other Diversified Financial Services",
    "General Merchandise Stores",
    "Photographic Products -- Discontinued effective 02",
    "Real Estate Services",
    "Computer Storage & Peripherals - Discontinued effe",
    "Consumer Finance",
    "Industrial Machinery",
    "Not Assigned",
    "Department Stores",
    "Human Resource & Employment Services",
    "Coal & Consumable Fuels",
    "Pharmaceuticals",
    "Commercial Printing",
    "Movies & Entertainment",
    "Metal & Glass Containers",
    "Oil & Gas Storage & Transportation",
    "Fertilizers & Agricultural Chemicals",
    "Financial Exchanges & Data",
    "Property & Casualty Insurance",
    "Textiles",
    "Internet Software & Services",
    "Computer & Electronics Retail",
    "Health Care Supplies",
    "Steel",
    "Health Care Services",
    "Health Care Equipment",
    "Oil & Gas Exploration & Production",
    "Security & Alarm Services",
    "Apparel Retail",
    "Restaurants",
    "Semiconductor Equipment",
    "Food Distributors",
    "Home Furnishings",
    "Construction & Engineering",
    "Technology Hardware, Storage & Peripherals",
    "Independent Power Producers & Energy Traders",
    "Airlines",
    "Life & Health Insurance",
    "Insurance Brokers",
    "Trucking",
    "Homebuilding",
    "Alternative Carriers",
    "Biotechnology",
    "Technology Distributors",
    "Building Products",
    "Oil & Gas Refining & Marketing",
    "Home Improvement Retail",
    "Thrifts & Mortgage Finance",
    "Data Processing & Outsourced Services",
    "Trading Companies & Distributors",
    "Gold",
    "Copper",
    "Retail REITs",
    "Tobacco",
    "Diversified Metals & Mining",
    "Advertising",
    "Specialty Stores",
    "Consumer Electronics",
    "Oil & Gas Equipment & Services",
    "Investment Banking & Brokerage",
    "Food Retail",
    "Aerospace & Defense",
    "Drug Retail",
    "Hypermarkets & Super Centers",
    "Computer Hardware - Discontinued effective 02/28/2",
    "Hotels, Resorts & Cruise Lines",
    "Household Appliances",
    "Aluminum",
    "Apparel, Accessories & Luxury Goods",
    "Construction Machinery & Heavy Trucks",
    "Cable & Satellite",
    "Precious Metals & Minerals",
    "Electrical Components & Equipment",
    "Homefurnishing Retail",
    "Water Utilities",
    "Semiconductors",
    "Specialized Finance",
    "Paper Packaging",
    "Electronic Manufacturing Services",
  ];

  const [sort, setSort] = useState<any>(sortItems[0]);
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <div>
      <Header />
      <div className="m-10 lg:m-20 flex flex-col space-y-5">
        <p className="w-fill text-xl lg:text-4xl font-bold text-center sm:text-left">
          Corporations
        </p>
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="flex flex-row flex-wrap items-center ml-auto">
            <div className="flex flex-row items-center ml-auto">
              <p className="px-5">Sort:</p>
              <DropDown items={sortItems} defaultItem={0} setItem={setSort} />
            </div>
            <div className="flex flex-row items-center ml-auto">
              <p className="px-5">Filters:</p>
              <MultipleDropDown items={filterItems} setItems={setFilters} />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <OrderedList page={"organizations"} sort={sort} filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
