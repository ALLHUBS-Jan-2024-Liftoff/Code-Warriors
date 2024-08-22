import React, { useState, useEffect, useContext} from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { List } from 'lucide-react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { CartContext } from "@/components/shared/CartContext"
import { useNavigate } from 'react-router-dom';
import { Carousel, CustomCard} from "@/components/ui/apple-cards-carousel";

const ProductDetails = () => {

    const DummyContent = () => {
        return (
          <>
            {[...new Array(3).fill(1)].map((_, index) => {
              return (
                <div
                  key={"dummy-content" + index}
                  className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                >
                  <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                      The first rule of Apple club is that you boast about Apple club.
                    </span>{" "}
                    Keep a journal, quickly jot down a grocery list, and take amazing
                    class notes. Want to convert those notes to text? No problem.
                    Langotiya jeetu ka mara hua yaar is ready to capture every
                    thought.
                  </p>
                  <img
                    src="https://assets.aceternity.com/macbook.png"
                    alt="Macbook mockup from Aceternity UI"
                    height="500"
                    width="500"
                    className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                  />
                </div>
              );
            })}
          </>
        );
      };

const { productId } = useParams()

const [product, setProduct] = useState({})
const [recommendations, setRecommendations] = useState([])

const cards = recommendations.map((card, index) => (
    <CustomCard key={card.src} card={card} index={index} />
  ));

useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}`);
        setProduct(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProduct();
  }, []);

useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/recommend/${productId}`);
        setRecommendations(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchRecommendations();
  }, []);

  
let { user } = useContext(AuthContext)

const { addToCart } = useContext(CartContext);

const navigate = useNavigate();

function handleAddToCart(product) {
    if(user) {
      addToCart(product, 1)
      navigate('/cart')
    } else {
      let quantity = 1
      localStorage.setItem('pendingCartItem', JSON.stringify({ product, quantity }));
      navigate('/user_auth')
    }
  }

const [description, setDescription] = useState('');
const [reviews, setReviews] = useState([]);
    

const handleChange = (event) => {
    setDescription(event.target.value);
};

useEffect(() => {
// ⬇ This calls my get request from the server
    getReview();
}, []);

const createReview = () => {
    let payload = {
        description: description,
        rating: 5,
        user: {
            userId: user.userId,
        },
        product: {
            productId: productId,
        },
    };
    axios.post('http://localhost:8080/api/review/create', payload).then((response) => {
        console.log(response.data);
        getReview();
    })
    .catch((error) => {
        console.error('Error creating review:', error);
    });
};
 
const deleteReview = (reviewId) => {
    axios.delete(`http://localhost:8080/api/review/delete?reviewID=${reviewId}`).then((response) => {
            console.log(response.message);
            window.location.reload();
            // Update the state to remove the deleted review
            //setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
        })
        .catch((error) => {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
        });
};

function getReview() {
    
    //axios.get(`http://localhost:8080/api/review/get?productID=${productId}`).then((response) => {
        axios.get(`http://localhost:8080/api/review/get?productID=${productId}`).then((response) => {
        console.log(response.data)
        
        setReviews(response.data);
    })
    .catch((error) => {
        console.error(`Error getting reviews:`, error);
    })
}

  return (
    <div className='w-full grid grid-cols-3 px-20'>
        <div className='col-span-2 flex flex-col items-center justify-center relative pt-24 pb-16'>
            <Breadcrumb className="absolute top-3 left-0"> 
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink className='text-blue-500' href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink className='text-blue-500' href="/results">Results</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage className='text-blue-500'>{product?.productName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {product.imageUrl ?
            <img 
                src={product.imageUrl} 
                alt={'No picture'} 
                className="w-full h-96 object-contain"
            /> :
            <div className="w-full h-96 object-contain my-4"></div>
            }
        </div>
        
        <div className='col-span-1 h-full flex flex-col pt-32'>
            <p className='text-primary'></p>
            <h1 className='text-2xl font-bold pb-2'>{product?.productName}</h1>
            <p className='pb-2 text-base font-semibold'>{product?.description}</p>
            <Button className='w-2/3 mt-12 flex items-center justify-center p-8 rounded-full text-lg' onClick = {() => handleAddToCart(product)} ><FontAwesomeIcon className='mr-2' icon={faCartShopping} />Add to Cart</Button>
        </div>
        <div className='col-span-3 w-full pt-16'>
            <h1 className='text-center text-3xl font-semibold'>Recommended</h1>
            <div className='w-full'>
            {recommendations.length > 0 ? (
              <Carousel items={cards} />
              ) : (
                <p>Loading recommendations...</p>
              )}
            </div>
        </div>
        <div className='col-span-3 h-96'>
                <h1 className='text-2xl font-semibold'>Reviews</h1>
                <Textarea
                    placeholder="Type your message here."
                    value={description}
                    onChange={handleChange}
                    className='w-full'
                />
                <Button onClick={createReview}>Submit Review</Button>
                {reviews.slice().reverse().map((review) => (
                    <Card key={review.id}>
                    
                        <CardHeader>
                            <CardTitle>{review.user?.userName}</CardTitle>
                            <CardDescription>Rating {review.rating}/5</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{review.description}</p>
                        </CardContent>
                        <Button type="button" variant="destructive" onClick={() => deleteReview(review.id)}>Delete Review</Button>
                    </Card>
                ))}
        </div>
    </div>
    
    );
};

export default ProductDetails;



