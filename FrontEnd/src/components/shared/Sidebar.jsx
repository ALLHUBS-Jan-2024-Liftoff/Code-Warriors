import React from 'react'
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



const SideBar = () => {

  const items = ["Laptops", "Phones", "Cameras", "Computers", "Headphones", "Accessories"];

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
                <Checkbox id={`item-${index}`} className="rounded-xs" />
                <label
                  htmlFor={`item-${index}`}
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
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
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                $0 - $25
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                $0 - $25
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                $25 - $50
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                $50 - $100
              </label>
            </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Brand</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                HP
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Apple
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Dell
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ASUS
              </label>
            </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-base pl-6'>Rating</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2'>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                5 Star
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                4 Star
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                3 Star
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                2 Star
              </label>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <Checkbox id="terms" className='rounded-xs'/>
              <label
                htmlFor="terms"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                1 Star
              </label>
            </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        </nav>
    </aside>
    
  )
}

export default SideBar