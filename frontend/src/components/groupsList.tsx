import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const GroupsList = ({groups, onDelete, onEdit }) => {
    if (groups.length === 0) return <p>No group created yet</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 text-left">User</th>
                        <th className="p-2 text-left">Course</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group._id} className="border-t">

                            <td className="p-2">
                                {group.user_id.username}
                            </td>
                            <td className="p-2">
                                {group.course_id.title}
                            </td>
                            <td className="p-2 flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(group)}
                                >
                                    <Pencil/>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onDelete(group._id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupsList