import { useEffect, useState } from "react";
import GroupsFormate from "./groupsFormate";
import GroupsList from "./groupsList";
import { toast } from "sonner";
import axios from "axios";

// Define the Group type based on your backend schema
export type Group = {
  _id: string;
  user_id: string; // Will store the ObjectId string
  course_id: string; // Will store the ObjectId string

  user?: { _id: string; name: string }; // Example: if user data is populated
  course?: { _id: string; title: string; code: string }; // Example: if course data is populated
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const fetchGroups = async () => {
    try {
      // It's highly recommended that your backend populates user_id and course_id
      // to send back user/course details for display.
      const { data } = await axios.get("http://localhost:5000/api/groups");
      setGroups(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to load groups";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/groups/${id}`);
      toast.success("Group deleted");
      fetchGroups();
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Failed to delete group";
      toast.error(message);
    }
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSuccess = () => {
    fetchGroups();
    setSelectedGroup(null);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <GroupsFormate
        onGroupCreated={handleFormSuccess}
        initialData={selectedGroup}
      />
      <GroupsList
        groups={groups}
        loading={loading}
        onDelete={handleDeleteGroup}
        onEdit={handleEditGroup}
      />
    </div>
  );
}