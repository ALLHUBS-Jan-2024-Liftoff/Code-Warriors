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
        <div className="w-full flex flex-col gap-4">
              <div className='px-2 py-14 text-center'>
                  <h1 className='text-5xl font-semibold'>Devices you can rely on.</h1>
                  <h2 className='text-4xl font-semibold text-muted-foreground'>Explore cutting edge technology.</h2>
              </div>
              <div className='flex gap-2 px-2'>
              <Card className="border-none rounded-none relative w-full h-[500px] bg-[url('/eCommerce_images/macbook2.jpg')] bg-cover bg-[left_0%_top_30%]">
                  <h1 className='text-5xl text-background font-semibold pt-3 text-center'>MacBook Pro</h1>
                  <Button className='bg-background text-foreground absolute bottom-12 right-8 hover:text-background'>Shop</Button>
              </Card>
              <Card className="border-none flex flex-col justify-end rounded-none relative w-full h-[500px] bg-[url('/eCommerce_images/sony_camera.jpg')] bg-cover bg-[left_0%_top_55%]">
                  <h1 className='text-5xl text-background font-semibold pb-8 text-center'>Sony Alpha Collection</h1>
                  <Button className='bg-background text-foreground absolute bottom-12 right-8 hover:text-background'>Shop</Button>
              </Card>
            </div>
            <div className='px-2'>
                <h1 className='text-5xl font-semibold pt-8 pb-12 text-center'>Shop by category</h1>
                <div className='grid grid-cols-3 gap-4'>
                {categories.map((category, index) => (
                    <Card className='shadow-sm border-none rounded-[30px] hover:scale-102 transition-transform duration-500 ease-in-out' key={index}>
                    <CardHeader>
                        <CardTitle className='text-center'>{category.category}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                    <img 
                    src={category.img}
                    alt={'No picture'} 
                    className="w-full h-48 object-contain my-4"
                />
                    </CardContent>
                    <CardFooter className='flex justify-center pb-4'>
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