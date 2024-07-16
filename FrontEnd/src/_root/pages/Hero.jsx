import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const Hero = () => {

    const categories = [
        {
          "category": "Laptops",
          "img": "macbook_img.jpg",
          "productName": "MacBook Pro",
          "price": "$1299"
        },
        {
          "category": "Phones",
          "img": "iphone_img.jpg",
          "productName": "iPhone 13",
          "price": "$799"
        },
        {
          "category": "Computers",
          "img": "computer_img.jpg",
          "productName": "Gaming PC",
          "price": "$999"
        },
        {
          "category": "Audio",
          "img": "headphones_img.jpg",
          "productName": "Bose Quiet Comfort II",
          "price": "$299"
        },
        {
          "category": "Cameras",
          "img": "camera_img.jpg",
          "productName": "Canon DSLR",
          "price": "$499"
        },
        {
          "category": "TVs",
          "img": "tv_img.jpg",
          "productName": "Samsung 4K TV",
          "price": "$899"
        }
      ];

  return (
    <div className="w-full h-full flex flex-col items-center">
        <div className="w-3/4 flex flex-col gap-4 px-32 pt-4">
            <div>
                <h1 className='text-5xl font-semibold'>Devices you can rely on.</h1>
                <h2 className='text-2xl font-semibold text-muted-foreground'>Explore cutting edge technology.</h2>
            </div>
            <Card className="relative w-full h-96 bg-[url('/hero_section_img.webp')] bg-cover bg-[left_0%_top_55%]">
                <Button className='absolute bottom-12 right-8'>Shop now</Button>
            </Card>
            <div>
                <h1 className='text-2xl font-semibold pb-4'>Shop by category</h1>
                <div className='grid grid-cols-3 gap-5'>
                {categories.map((category, index) => (
                    <Card key={index}>
                    <CardHeader>
                        <CardTitle>{category.category}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                    <img 
                    src={category.img}
                    alt={'No picture'} 
                    className="w-full h-48 object-contain my-4"
                />
                    </CardContent>
                    <CardFooter className='flex justify-center pb-2'>
                        <Button variant='secondary'>Shop now</Button>
                    </CardFooter>
                    </Card>
                ))}
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold pb-4'>Recommedned for you</h1>
                <div className='grid grid-cols-5 gap-2'>
                {categories.map((category, index) => (
                    index !== 5 ? (
                    <Card key={index}>
                        <CardContent className='pb-0'>
                        <img 
                            src={category.img}
                            alt={'No picture'} 
                            className="w-full h-24 object-contain my-4"
                        />
                        </CardContent>
                        <CardFooter className='flex flex-col items-center justify-center pb-2'>
                        <h1 className='text-base font-semibold'>{category.productName}</h1>
                        <p className='text-xl font-semibold'>{category.price}</p>
                        </CardFooter>
                    </Card>
                    ) : null
                ))}
                </div>
            </div>
            
            {/* <h1 className='text-2xl font-semibold'>Items you've viewed</h1> */}
        </div>
    </div>
  )
}

export default Hero