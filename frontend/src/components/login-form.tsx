import { Link } from "react-router";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function loginUser(e) {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login/", {
                email,
                password,
            })
            .then((res) => {
                // console.log(res.data);
                const token = res.data.token;
                localStorage.setItem("token", res.data.token);

                const decoded = jwtDecode(token);
                localStorage.setItem("userId", decoded.id); // store user ID

                navigate("/dash-home");
                // console.log(token);
            })
            .catch((error) => console.log(error.message));
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dash-home");
        }
    }, []);
    //     const token = localStorage.getItem("accessToken");
    //   return !!token;
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your email</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={loginUser}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {/* <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a> */}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Your passeword **"
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-cyan-900"
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div> */}
        </div>
    );
}
