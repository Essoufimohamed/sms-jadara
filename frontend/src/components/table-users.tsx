import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserRoundPen, Trash2, ShieldCheck, ShieldBan } from "lucide-react";

import axios from "axios";

import usericon from "../assets/icons/user.png";
import { Link } from "react-router";
import DeleteConforme from "./delete-conforme";
// import { DialogCloseButton } from "./dialog-conferme";

export function TableUsers() {
    type User = {
        _id: string;
        username: string;
        email: string;
        is_actif: boolean;
        role: Role;
    };
    type Role = {
        role_name: string;
    };

    const [users, setUsers] = useState<User[]>([]);
    const [popup, setPopup] = useState(false);
    const [deleteUserId, setDeleteUser] = useState("");

    const token = localStorage.getItem("token");
    console.log(users.length);
    function fechUsers() {
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
    }

    useEffect(() => {
        fechUsers();
    }, []);

    function handlDelete() {
        setPopup(true);

        axios
            .delete(`http://localhost:5000/api/users/${deleteUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => {
                data.data;
                setPopup(false);
                fechUsers();
            })
            .catch((error) => error.message);
    }

    return (
        <div className="relative">
            <h2 className="text-center text-cyan-700 text-2xl uppercase font-bold bg-gray-50 py-5">
                A list of Student
            </h2>
            {popup && (
                <DeleteConforme
                    annule={() => {
                        setPopup(false);
                    }}
                    conforme={handlDelete}
                />
            )}

            <Table className="border-2 border-yellow-100 ">
                <TableHeader className="capitalize">
                    <TableRow className="bg-yellow-100">
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead className="w-[140px]">Username</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">
                            update / delete
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => {
                        return (
                            <>
                                {!(user.role?.role_name == "admin") ? (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <img src={usericon} alt="" />
                                        </TableCell>
                                        <TableCell className="font-medium capitalize">
                                            {user.username}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {/* {user.hasOwnProperty("role")
                                                ? "valide"
                                                : "No-valide"} */}
                                            {user.is_actif == true ? (
                                                <ShieldCheck color="green" />
                                            ) : (
                                                <ShieldBan color="red" />
                                            )}
                                        </TableCell>
                                        <TableCell className="flex justify-center gap-3">
                                            <Link
                                                to={`/dash-home/users/update/${user._id}`}
                                            >
                                                <UserRoundPen />
                                            </Link>

                                            {/* <DialogCloseButton id={user._id} /> */}
                                            <Trash2
                                                color="red"
                                                onClick={() => {
                                                    setDeleteUser(
                                                        `${user._id}`
                                                    );
                                                    setPopup(true);
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
