import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function UpdateUserForm() {
    const [updateEmail, setupdateEmail] = useState("");
    const [updatename, setupdatename] = useState("");

    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${id}/role`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setupdateEmail(response.data.email);
                setupdatename(response.data.username);
            })
            .catch((error) => error.message);
    }, [id]);

    function update(e) {
        e.preventDefault();
        axios
            .put(
                `http://localhost:5000/api/users/${id}`,
                {
                    email: updateEmail,
                    username: updatename,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                navigate(-1);
            })
            .catch((error) => error.message);
    }

    return (
        <>
            <div className="">
                <form
                    onSubmit={update}
                    className="bg-white m-auto w-md border-2 p-4 size-max"
                >
                    {/* <div>
                        <h3>OLD information</h3>
                        <p>Email : {user.email} </p>
                        <p>Username : {user.username} </p>
                    </div>

                     */}
                    <h2 className="capitalize text-sky-900 text-xl font-bold py-2 mb-2">
                        {" "}
                        Update Information of user :
                    </h2>
                    <Input
                        value={updatename}
                        onChange={(e) => setupdatename(e.target.value)}
                        type="text"
                        className="mb-3"
                        placeholder="username"
                    />
                    <Input
                        onChange={(e) => setupdateEmail(e.target.value)}
                        type="text"
                        className="mb-3"
                        placeholder="email"
                        value={updateEmail}
                    />

                    {/* <Input type="text" className="mb-3" value={user.is_actif} /> */}
                    {/* <div>
                        <label htmlFor="role">Choose a course:</label>
                        <select id="role">
                            <option>...</option>
                            <option>course 1</option>
                            <option>course 1</option>
                        </select>
                    </div> */}
                    <Button className="">Update</Button>
                </form>
            </div>
        </>
    );
}
