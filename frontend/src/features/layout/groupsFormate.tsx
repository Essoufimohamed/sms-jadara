import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import type { Group } from "./groupsPage";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define types for User and Course for the dropdowns
type UserOption = {
    _id: string;
    username: string;
};

type CourseOption = {
    _id: string;
    title: string;
};

type Props = {
    onGroupCreated: () => void;
    initialData?: Group | null;
};

export default function GroupsFormate({ onGroupCreated, initialData }: Props) {
    const [formData, setFormData] = useState({
        user_id: "",
        course_id: "",
    });

    const [users, setUsers] = useState<UserOption[]>([]);
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true); // For loading users/courses

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [usersRes, coursesRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/users", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }), // Adjust this endpoint if needed
                    axios.get("http://localhost:5000/api/courses"), // Adjust this endpoint if needed
                ]);
                setUsers(usersRes.data);
                setCourses(coursesRes.data);
            } catch (error: any) {
                toast.error("Failed to load users or courses for selection.");
                console.error("Error fetching dependencies:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchDependencies();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                user_id: initialData.user_id,
                course_id: initialData.course_id,
            });
        } else {
            setFormData({
                user_id: "",
                course_id: "",
            });
        }
    }, [initialData]);

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData?._id) {
                // Edit mode
                const { data } = await axios.patch(
                    `http://localhost:5000/api/groups/${initialData._id}`,
                    formData
                );
                toast.success(`Group updated successfully!`);
            } else {
                // Create mode
                const { data } = await axios.post(
                    "http://localhost:5000/api/groups",
                    formData
                );
                toast.success(`Group created successfully!`);
            }

            onGroupCreated();
            setFormData({ user_id: "", course_id: "" });
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error ||
                error.message ||
                "Failed to save group";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!initialData?._id;

    if (dataLoading) {
        return (
            <p className="max-w-md mx-auto mt-10">
                Loading users and courses...
            </p>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Group" : "Create New Group"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="user_id">User</Label>
                    <Select
                        value={formData.user_id}
                        onValueChange={(value) =>
                            handleSelectChange("user_id", value)
                        }
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) =>
                                user.role.role_name === "student" ? (
                                    <SelectItem key={user._id} value={user._id}>
                                        {user.username}
                                    </SelectItem>
                                ) : null
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="course_id">Course</Label>
                    <Select
                        value={formData.course_id}
                        onValueChange={(value) =>
                            handleSelectChange("course_id", value)
                        }
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course._id} value={course._id}>
                                    {course.title} ({course.code})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading
                        ? isEditing
                            ? "Updating..."
                            : "Creating..."
                        : isEditing
                        ? "Update Group"
                        : "Create Group"}
                </Button>
            </form>
        </div>
    );
}
