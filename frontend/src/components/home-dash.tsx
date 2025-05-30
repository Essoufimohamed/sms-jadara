import axios from "axios";
import { useEffect, useState } from "react";
import CardChart from "./card-chart";
export default function DashHomePage() {
    const [users, setUsers] = useState("");
    const [course, setcouses] = useState("");

    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error) => error.message);
        axios
            .get("http://localhost:5000/api/courses/")
            .then((data) => {
                setcouses(data.data);
            })
            .catch((error) => error.message);
    }, []);
    return (
        <>
            <h2 className="capitalize text-sky-900 text-xl font-bold">
                statistical information :
            </h2>
            <div className="flex flex-wrap justify-evenly gap-3 ">
                <CardChart title="total students" number={users.length} />
                <CardChart title="total of courses" number={course.length} />
            </div>
        </>
    );
}
