import { useEffect, useState } from "react"
import GroupsFormate from "../../components/ui/groupsFormate"
import GroupsList from "../../components/groupsList"
import { toast } from "sonner"
import axios from "axios"


const GroupsPage = () => {

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null)

  const fetchGroups = async () => {
    try {
      // to send back user/course details for display.
      const { data } = await axios.get("http://localhost:5000/api/groups")
      setGroups(data)
    } catch (err) { 
      toast.error("Failed to load groups")
    }
  }

  const handleDeleteGroup = async (id) => { 
    try {
      await axios.delete(`http://localhost:5000/api/groups/${id}`)
      toast.success("Group deleted")
      fetchGroups()
    } catch (err) {

      if (!handleDeleteGroup) {
        return toast.error("Failed to delete group")
      }
    }
  }

  const handleEditGroup = (group) => {
    setSelectedGroup(group)
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

  const handleFormSuccess = () => {
    fetchGroups();
    setSelectedGroup(null)
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
        onDelete={handleDeleteGroup}
        onEdit={handleEditGroup}
      />
    </div>
  );
}

export default GroupsPage