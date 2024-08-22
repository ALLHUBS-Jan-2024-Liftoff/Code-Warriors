import { Link } from 'react-router-dom';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { CartContext } from '../components/shared/CartContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function UserAuthPage() {

  const navigate = useNavigate();

  const { addToCart, fetchProducts } = useContext(CartContext);

  const handleGoToHero = () => {
    const pendingCartItem = localStorage.getItem('pendingCartItem');
    if (pendingCartItem) {
      localStorage.removeItem('pendingCartItem');
    }
    navigate('/');
  };
  const handleGoToCart= () => {
    navigate('/cart');
    
  };

  let {loginUser, setAuthTokens, setUser} = useContext(AuthContext)

  const registerUser = async (e) => {

    try {
      const response = await axios.post('http://localhost:8080/register', {
        userName: e.target.usernameRegister.value,
        password: e.target.passwordRegister.value,
        role: "User"
      });

      const data = response.data;
      console.log(data)
      if (data) {

        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));

        const pendingCartItem = localStorage.getItem('pendingCartItem');

        if (pendingCartItem) {
          const { product, quantity } = JSON.parse(pendingCartItem);
          addToCart(product, quantity);
          localStorage.removeItem('pendingCartItem');
        } else {
          fetchProducts();
        }
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error); // Handle network errors
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    await loginUser(event);

    const pendingCartItem = localStorage.getItem('pendingCartItem');

    if (pendingCartItem) {
      const { product, quantity } = JSON.parse(pendingCartItem);
      addToCart(product, quantity);
      localStorage.removeItem('pendingCartItem');
    } else {
      fetchProducts();
    }

    handleGoToHero();
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    await registerUser(event);
    handleGoToCart();
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">User Login</TabsTrigger>
          <TabsTrigger value="register">User Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>User Login</CardTitle>
                <CardDescription>
                  Enter your username and password to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input name="username" id="username" placeholder="Username"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input name="password" id="password" placeholder="Pasword" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit">Login</Button>
                <Button variant="outline" onClick={handleGoToHero}>Go home</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>User Register</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="UsernameRegister">Username</Label>
                  <Input name="usernameRegister" id="usernameRegister" type="text" placeholder="username"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="passwordRegister">Password</Label>
                  <Input name="passwordRegister" id="passwordRegister" type="passwordRegister" placeholder="Password"/>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Create account</Button>
                <Button variant="outline" onClick={handleGoToHero}>Go home</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}