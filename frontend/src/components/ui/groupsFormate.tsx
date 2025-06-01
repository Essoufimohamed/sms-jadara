import { useEffect, useState } from "react"  // here we importing needed react HOOKS
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "axios"


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

//export default is valide only for function but export is validate for variables 
const GroupsFormate = ({ onGroupCreated = () => {}, initialData = null }) => {
  const [formData, setFormData] = useState({
    user_id: "",  //String as a defualt value  and initialized with an empty string
    course_id: "",
  })

  const [users, setUsers] = useState([])// empty array as a useState default value
  const [courses, setCourses] = useState([])

/*useEffect hook. It performs a side effect (fetching data from an API) 
that interacts with an external resource */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          /*axios to send HTTP GET requests to backend API, a way for a CLIENT-SIDE application to communicate with a SERVER-SIDE*/
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/courses"),
        ]);
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        toast.error("Failed to load users or courses for selection.");
        //toast is a dynamic popup for the UX showing in client side your requist status
      }
    };

    fetchData() //function invocation
    /* in essence that says, "Now that we've defined how to get the data, go ahead and get it!"  */
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        user_id: initialData, //initialData.user_id,
        course_id: initialData,  // initialData.course_id,
      });
    } else {
      setFormData({
        user_id: "",
        course_id: "",
      });
    }
  }, [initialData]);

  const handleSelectChange =  (username, value) => {
    setFormData((prev) => ({ ...prev, [username]: value }))
  };

  const handleSubmit = async () => {

    try {
      if (initialData?._id) {
        // Edit mode
        const { data } = await axios.patch(
          `http://localhost:5000/api/groups/${initialData._id}`,formData)
          /* If PATCH sends only the fields you want to change, and leaves untouched any fields not included in the request body,
          PUT sends the entire, complete representation of the resource.  
          likely be removed or set to null/default values on the server, because the PUT request says "make the resource exactly like this."*/
        toast.success(`Group updated successfully!`)
      } else {
        // Create mode
        const { data } = await axios.post("http://localhost:5000/api/groups", formData);
        toast.success(`Group created successfully!`);
      }

      onGroupCreated();

      setFormData({ 
        user_id: "", 
        course_id: "",
       })

    } catch (err) {
      toast.error("Failed to save group");
    }
  };

  const isEditing = !!initialData?._id;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Group" : "Create New Group"}
      </h2>

      <div className="space-y-4">

        <div>
          <Label htmlFor="user_id">User</Label>
          <Select value={formData.user_id} onValueChange={(value) => handleSelectChange("user_id", value)} required>
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
          <Select value={formData.course_id} onValueChange={(value) => handleSelectChange("course_id", value)} required>
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
        {/* Removed: disabled={loading} and the ternary operator for button text based on loading */}
        <Button type="button" className="w-full" onClick={handleSubmit}>
          {isEditing ? "Update Group" : "Create Group"}
        </Button>

      </div>
    </div>
  );
} // the end of GroupsFormate func

export default GroupsFormate