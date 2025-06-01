import { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import CourseTable from "./CourseTable";
import { toast } from "sonner"
import axios from "axios";

export type Course = {
  _id: string;
  title: string;
  code: string;
  description: string;
  duration: number;
};

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/courses");
      setCourses(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to load courses";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses(); // refresh
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Failed to delete course";
      toast.error(message);
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSuccess = () => {
    fetchCourses();
    setSelectedCourse(null); // reset form after create/edit
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <CourseForm
        onCourseCreated={handleFormSuccess}
        initialData={selectedCourse}
      />
      <CourseTable
        courses={courses}
        loading={loading}
        onDelete={handleDeleteCourse}
        onEdit={handleEditCourse}
      />
    </div>
  );
}
