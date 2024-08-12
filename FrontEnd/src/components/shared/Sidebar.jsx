import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';



const SideBar = ({ filters, setFilters }) => {

  const items = ["Laptops", "Phones", "Cameras", "Computers", "Headphones", "TVs", "Accessories"];
  const prices = ["$0 - $99", "$100 - $249", "$250 - $499", "$500 - $1000+"];
  const brands = ["HP", "Apple", "Dell", "ASUS", "Sony", "Samsung"];
  const ratings = ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];

 const handleCheckboxChange = (category, value) => {
  setFilters((prevFilters) => {
    // Ensure that the category is always an array
    const updatedCategory = prevFilters[category] || [];

    return {
      ...prevFilters,
      [category]: updatedCategory.includes(value)
        ? updatedCategory.filter(item => item !== value)
        : [...updatedCategory, value]
    };
  });
};

  return (
    <aside className="w-64 flex-col border-r bg-background sm:flex">
      <nav className="grid items-start gap-4 pt-8 px-2 text-sm font-medium lg:px-4">
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Category</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 pl-6">
                  <Checkbox
                    id={`category-${index}`}
                    className="rounded-xs"
                    checked={filters.category.includes(item)}
                    onCheckedChange={() => handleCheckboxChange("category", item)}
                  />
                  <label htmlFor={`category-${index}`} className="text-base font-medium">
                    {item}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Shop by price</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
              {prices.map((price, index) => (
                <div key={index} className="flex items-center space-x-2 pl-6">
                  <Checkbox
                    id={`price-${index}`}
                    className="rounded-xs"
                    checked={filters.price.includes(price)}
                    onCheckedChange={() => handleCheckboxChange("price", price)}
                  />
                  <label htmlFor={`price-${index}`} className="text-base font-medium">
                    {price}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Brand</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center space-x-2 pl-6">
                    <Checkbox
                      id={`brand-${index}`}
                      checked={filters.brand?.includes(brand) || false}
                      onCheckedChange={() => handleCheckboxChange('brand', brand)}
                      className="rounded-xs"
                    />
                    <label
                      htmlFor={`brand-${index}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Rating</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
                {ratings.map((rating, index) => (
                  <div key={index} className="flex items-center space-x-2 pl-6">
                    <Checkbox
                      id={`rating-${index}`}
                      /* checked={filters.ratings?.includes(rating) || false}
                      onCheckedChange={() => handleCheckboxChange('ratings', rating)} */
                      className="rounded-xs"
                    />
                    <label
                      htmlFor={`rating-${index}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {rating}
                    </label>
                  </div>
                ))}
              </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        </nav>
    </aside>
    
  )
}

export default SideBar