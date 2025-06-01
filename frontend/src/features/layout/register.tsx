import { RegisterForm } from "../../components/register-form";
// import logo from "../../assets/fondation-logo.png";
import texturebg from "../../assets/texture.png";
import { Link } from "react-router";

export default function RegisterPage() {
    return (
        <div
            style={{
                backgroundImage: `url(${texturebg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // backgroundSize: "cover",
            }}
            className="flex min-h-svh flex-col items-center justify-center gap-5 bg-muted p-4 md:p-8"
        >
            <div className="flex w-full max-w-sm flex-col gap-5">
                <Link
                    to="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <img
                        src="public/souss_massa_tech-removebg-preview.png"
                        alt="souss massa tech academy"
                        className="w-25"
                    />
                </Link>
                <RegisterForm />
            </div>
        </div>
    );
}
