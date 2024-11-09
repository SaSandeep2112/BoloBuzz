import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
interface SignUpCardProps{
setState:(state:SignInFlow)=>void;
}
interface FormData {
    Fullname:string,
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpCard = ({setState}:SignUpCardProps) => {
  const {signIn} = useAuthActions();  
  const [formData , setFormData] = useState<FormData>({
        Fullname:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}= e.target;
        setFormData(prevFormData =>({
            ...prevFormData,
            [name]:value
        }));
    }
    const OnPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      

      if(formData.password != formData.confirmPassword){
        setError("Password doesn't match");
        return;
      }
      setPending(true);
      signIn("password", {
        name:formData.Fullname,
        email: formData.email,
        password: formData.password,
        flow: "signUp",
      })
        .catch((e) => {
          console.log(e);
          setError("Something went Wromng");
        })
        .finally(() => {
          setPending(false);
        });
    };

    const handleProviderSignIn = (value: "github" | "google") => {
      setPending(true);
      signIn(value).finally(() => {
        setPending(false);
      });
    };
    const handleSubmit =(e: React.FormEvent)=>{
        e.preventDefault();
        console.log(formData);

    }
    return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login in to Continue</CardTitle>
        <CardDescription>
          Use email or another service to Continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="text-red-700 flex items-center mb-5">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={OnPasswordSignUp} className="space-y-2.5">
        <Input
            disabled={pending}
            value={formData.Fullname}
            type="text"
            name="Fullname"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          <Input
            disabled={pending}
            value={formData.email}
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <Input
            disabled={pending}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <Input
            disabled={pending}
            value={formData.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />
          <Button className="w-full" type="submit" size="lg" disabled={pending}>
            Sign In
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-2.5">
          <Button
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {
              handleProviderSignIn("google");
            }}
          >
            <FcGoogle
              className="absolute top-3 left-2.5 size-5"
              size={10}
            ></FcGoogle>
            Login with Google
          </Button>
          <Button
            disabled={false}
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {
              handleProviderSignIn("github");
            }}
          >
            <FaGithub
              className="absolute top-3 left-2.5 size-5 hover:bg-black"
              size={10}
            ></FaGithub>
            Login with Google
          </Button>
        </div>
        <p>
          Already have a Account .{" "}
          <span onClick={()=>setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">
            {" "}
            SignUp
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
