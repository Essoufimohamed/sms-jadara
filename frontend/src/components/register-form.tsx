import { Link } from "react-router";
import { cn } from "@/lib/utils";
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

import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [success, setSuccess] = useState<boolean | undefined>();
    // const [passwordConferme, setPasswordConferme] = useState();

    const navigate = useNavigate();
    function sendUser(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/register/", {
                username,
                email,
                password,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.data.message);
                setSuccess(error.data.message);
            });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome to Jadara</CardTitle>
                    <CardDescription>
                        Register with your valide email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={() => {
                            sendUser;
                        }}
                    >
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                {success && (
                                    <p className="bg-red-300 text-center capitalize rounded-sm p-2">
                                        {success}
                                    </p>
                                )}
                                <div className="grid gap-3">
                                    <Label htmlFor="email">UserName</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="your name"
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="*********"
                                        required
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-cyan-900"
                                >
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="underline underline-offset-4"
                                >
                                    Sign in
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
