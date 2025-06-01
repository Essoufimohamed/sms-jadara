import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
// Removed 'type Group' import as type definitions are no longer used in plain JS React

// Removed type definitions for UserOption, CourseOption, and Props
// type UserOption = { ... };
// type CourseOption = { ... };
// type Props = { ... };

export default function GroupsFormate({ onGroupCreated, initialData }) { // Removed ': Props'
  const [formData, setFormData] = useState({
    user_id: "",
    course_id: "",
  });

  const [users, setUsers] = useState([]) // Removed '<UserOption[]>'
  const [courses, setCourses] = useState([]) // Removed '<CourseOption[]>'
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // For loading users/courses

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"), // Adjust this endpoint if needed
          axios.get("http://localhost:5000/api/courses"), // Adjust this endpoint if needed
        ]);
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
      } catch (error) { // Removed ': any'
        toast.error("Failed to load users or courses for selection.");
        
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

  const handleSelectChange = (name, value) => { // Removed ': string, value: string'
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // The handleSubmit function is now triggered by the Button's onClick
  const handleSubmit = async () => { // Removed 'e: React.FormEvent' parameter
    // e.preventDefault(); // This line is no longer needed and has been removed
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
        const { data } = await axios.post("http://localhost:5000/api/groups", formData);
        toast.success(`Group created successfully!`);
      }

      onGroupCreated();
      setFormData({ user_id: "", course_id: "" });
    } catch (err) { // Removed ': any'
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to save group";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!initialData?._id;

  if (dataLoading) {
    return <p className="max-w-md mx-auto mt-10">Loading users and courses...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Group" : "Create New Group"}
      </h2>

      {/* The form element has been removed. Its content is now directly within this div. */}
      {/* You'll now manually attach the handleSubmit function to the Button's onClick event. */}
      <div className="space-y-4">

        <div>
          <Label htmlFor="user_id">User</Label>
          <Select
            value={formData.user_id}
            onValueChange={(value) => handleSelectChange("user_id", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="course_id">Course</Label>
          <Select
            value={formData.course_id}
            onValueChange={(value) => handleSelectChange("course_id", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* The Button now uses type="button" and its onClick event will trigger handleSubmit */}
        <Button type="button" disabled={loading} className="w-full" onClick={handleSubmit}>
          {loading
            ? isEditing
              ? "Update Group"
              : "Create Group"
            : isEditing
              ? "Update Group"
              : "Create Group"}
        </Button>

      </div>
    </div>
  );
}