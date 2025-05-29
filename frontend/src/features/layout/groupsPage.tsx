import { useEffect, useState } from "react";
import GroupsFormate from "../../components/ui/groupsFormate";
import GroupsList from "../../components/groupsList";
import { toast } from "sonner";
import axios from "axios";

// Define the Group type based on  backend schema
export type Group = {
  _id: string;
  user_id: string; // to store the ObjectId string
  course_id: string; // to store the ObjectId string

  user?: { _id: string; name: string }; // Example: if user data is populated
  course?: { _id: string; title: string; code: string }; // Example: if course data is populated
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const fetchGroups = async () => {
    try {
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
      toast.success("Group deleted"); //toast is an object method that popeup  and it required to install npm i react-hot-toast
      fetchGroups();
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Failed to delete group";
      toast.error(message);
    }
  }

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