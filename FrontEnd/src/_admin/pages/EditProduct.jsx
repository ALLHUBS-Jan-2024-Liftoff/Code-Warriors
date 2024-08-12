import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  PlusCircle,
  Upload,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {

    const location = useLocation();
    const { product } = location.state;

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/all_products');
    };

    const navigateToAllProducts = () => {
        navigate('/admin/all_products');
    };

    const categories = ["Laptops", "Phones", "Cameras", "Computers", "Headphones", "TVs", "Accessories"];

    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('00.00');
    const [quantity, setQuantity] = useState('0');
    const [status, setStatus] = useState('AVAILABLE');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (product) {
            setProductName(product.productName || '');
            setDescription(product.description || '');
            setBrand(product.brand || '')
            setCategory(product.category || '')
            setPrice(product.price || '00.00');
            setQuantity(product.quantity || '0');
            setStatus(product.status || 'AVAILABLE');
            setImageUrl(product.imageUrl || '');
        }
    }, [product]);

    const handleEditProduct = async (productId) => {
        const formData = {
          productId,
          brand,
          category,
          productName,
          description,
          price,
          quantity,
          status,
          imageUrl
        };
    
        try {
          const response = await axios.put(`http://localhost:8080/product/${productId}`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (response.status === 200) {
            console.log(response.data); // Handle success
            navigateToAllProducts();
          } else {
            console.error('Failed to create product'); // Handle error
          }
        } catch (error) {
          console.error('Error:', error); // Handle network errors
        }
      };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft onClick={handleBackClick} className="h-4 w-4" />
            <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Return
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
            </Badge>
            
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
            <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                <CardTitle>Edit Product</CardTitle>
                <CardDescription>
                    Edit your product details here
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid gap-3">
                    <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full"
                    />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Brand</Label>
                        <Input
                            id="name"
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-24"
                    />
                    </div>
                </div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                    Enter information about the quantity and price
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell>
                        <Label htmlFor="stock-1" className="sr-only">
                            Stock
                        </Label>
                        <Input
                            id="stock-1"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        </TableCell>
                        <TableCell>
                        <Label htmlFor="price-1" className="sr-only">
                            Price
                        </Label>
                        <Input
                            id="price-1"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category" aria-label="Select category">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-4">
            <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                </CardContent>
            </Card>
            <Card
                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
            >
                <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                    Upload up to 5 images
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Label>Image URL</Label>
                <Input 
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className="grid gap-2 pt-2">
                    <img
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                    <button>
                        <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                        />
                    </button>
                    <button>
                        <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                        />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                    </button>
                    </div>
                </div>
                </CardContent>
            </Card>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="lg" onClick={handleBackClick}>
                    Discard
                </Button>
                <Button size="lg" onClick={() => handleEditProduct(product.productId)}>Edit Product</Button>
            </div>
            </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" onClick={handleBackClick}>
            Discard
            </Button>
            <Button size="sm" onClick={() => handleEditProduct(product.productId)}>Edit product</Button>
        </div>
        </div>
    </main>
  )
}

export default EditProduct