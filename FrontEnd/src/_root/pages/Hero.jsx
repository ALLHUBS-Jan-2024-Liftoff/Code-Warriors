import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState }from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import FlipWords from "@/components/ui/flip-words"
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const navigate = useNavigate();

    const categories = [
        {
          "category": "Laptops",
          "img": "https://pngimg.com/uploads/macbook/macbook_PNG51.png",
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
          "category": "Headphones",
          "img": "https://www.bose.com.au/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-B02.png/jcr:content/renditions/cq5dam.web.1000.1000.png",
          "productName": "Bose Quiet Comfort II",
          "price": "$299"
        },
        {
          "category": "Cameras",
          "img": "https://static.bhphotovideo.com/explora/sites/default/files/video/a7iv.png",
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

    const words = ["innovative.", "powerful.", "cutting-edge."];

    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [headerAnimated, setHeaderAnimated] = useState(false); // Flag to animate header only once
    const [visibleItems, setVisibleItems] = useState(Array(categories.length).fill(false));
    const h1Ref = useRef(null);
    const itemRefs = useRef([]);
  
    useEffect(() => {
      // Observer for the header
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !headerAnimated) {
            setIsHeaderVisible(true);
            setHeaderAnimated(true);
          }
        },
        { threshold: 0.1 }
      );
  
      if (h1Ref.current) {
        headerObserver.observe(h1Ref.current);
      }
  
      return () => {
        if (h1Ref.current) {
          headerObserver.unobserve(h1Ref.current);
        }
      };
    }, [headerAnimated]);
  
    useEffect(() => {
      // Observer for the grid items
      itemRefs.current = itemRefs.current.slice(0, categories.length);
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = itemRefs.current.indexOf(entry.target);
              if (index !== -1) {
                setVisibleItems((prevVisibleItems) => {
                  const newVisibleItems = [...prevVisibleItems];
                  newVisibleItems[index] = true;
                  return newVisibleItems;
                });
                observer.unobserve(entry.target); // Unobserve after first intersection
              }
            }
          });
        },
        { threshold: 0.1 }
      );
  
      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
  
      return () => {
        itemRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, [categories.length]);

    const transitionDelays = ['0ms', '100ms', '200ms', '0ms', '100ms', '200ms'];

  return (
    <div className="w-full h-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-4">
          <div>
            <div className='w-full flex flex-col items-center justify-center py-8'>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold whitespace-nowrap">
              Technology that is
              </h1>
              <FlipWords words={words} duration={2750} className='mt-1 text-muted-foreground text-4xl md:text-5xl lg:text-6xl font-semibold'/>
            </div>
            <div className="flex flex-col lg:flex-row w-full">
              <Card className="shadow-none border-none rounded-none relative w-full lg:w-1/2 h-[560px] lg:h-[550px] bg-[url('/eCommerce_images/ipad.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <h1 className='text-3xl md:text-5xl font-semibold text-center pt-3'>iPad Pro</h1>
                  <div className="flex justify-end">
                    <Button className='mb-4 mr-4'>Shop</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="hidden lg:block border-none rounded-none relative w-1/2 h-[550px] bg-[url('/eCommerce_images/sony_camera.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div></div> {/* Empty div to push content to bottom */}
                  <div>
                    <h1 className='text-3xl md:text-5xl text-background font-semibold text-center mb-4'>Sony Alpha Collection</h1>
                    <div className="flex justify-end">
                      <Button className='bg-background text-foreground hover:text-background mb-4 mr-4'>Shop</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
            <div className='px-2 bg-secondary py-10'>
                <h1 ref={h1Ref} className={`text-5xl font-bold pb-12 text-center 
                transition-all ease-in duration-1000 transform ${isHeaderVisible ? "opacity-100" : "opacity-0"}`}>
                Shop by category</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {categories.map((category, index) => {
                  return (
                    <Card
                      key={index}
                      ref={(el) => (itemRefs.current[index] = el)}
                      className={`shadow-md hover:scale-102 transition-all ease-in-out duration-300 transform ${
                        visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: visibleItems[index] ? transitionDelays[index] : '0ms' }}
                    >
                      <CardHeader>
                        <CardTitle className="text-center">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={category.img}
                          alt="No picture"
                          className="w-full h-48 object-contain my-4"
                        />
                      </CardContent>
                      <CardFooter className="flex justify-center pb-4">
                        <Button variant="secondary" onClick={() => navigate(`/results/${category.category}`)}>Shop</Button>
                      </CardFooter>
                    </Card>
                  );
                })}
                </div>
            </div>
            <div>
                <h1 className='text-3xl text-center font-bold pb-4'>Recommended for you</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2'>
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