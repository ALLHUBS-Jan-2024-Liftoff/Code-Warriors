import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function AdminSignIn() {

  const navigate = useNavigate();

  const handleGoToHero = () => {
    navigate('/');
  };

  let {AdminLoginUser, setUser, setAuthTokens} = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    await AdminLoginUser(event);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-secondary">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" placeholder="Enter password"/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button onClick={handleGoToHero} variant="outline">Go Home</Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/admin_sign_up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}