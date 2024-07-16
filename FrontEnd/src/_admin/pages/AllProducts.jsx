import React from 'react'
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

const navigate = useNavigate();

const handleRowClick = () => {
    navigate('/admin/product_details');
};

const testData = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    name: 'Laser Lemonade Machine',
    status: 'Draft',
    price: '$499.99',
    quantity: 25,
    date: '2023-07-12 10:42 AM',
    imageSrc: '/placeholder.svg'
    }));

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
        <div className="flex items-center">
            <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
            </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                    </span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                    Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                    Archived
                </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
                </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
                </span>
            </Button>
            </div>
        </div>
        <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Created at
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {testData.map((item) => (
                    <TableRow onClick={handleRowClick} key={item.id} className="hover:bg-gray-100 cursor-pointer">
                    <TableCell className="hidden sm:table-cell">
                        <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.imageSrc}
                        width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {item.name}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {item.price}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {item.quantity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {item.date}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                    
                </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
                </div>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </main>
  )
}

export default AllProducts