import type { Group } from "./groupsPage"; // Ensure this import is correct
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
    groups: Group[];
    loading: boolean;
    onDelete: (id: string) => void;
    onEdit: (group: Group) => void;
};

export default function GroupsList({
    groups,
    loading,
    onDelete,
    onEdit,
}: Props) {
    if (loading) return <p>Loading...</p>;
    if (groups.length === 0) return <p>No groups available.</p>;

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
                                {typeof group.user_id === "object" &&
                                group.user_id !== null
                                    ? group.user_id.username ||
                                      group.user_id.email
                                    : group.user_id}
                            </td>
                            <td className="p-2">
                                {typeof group.course_id === "object" &&
                                group.course_id !== null
                                    ? `${group.course_id.title} ${
                                          group.course_id.code
                                              ? `(${group.course_id.code})`
                                              : ""
                                      }`
                                    : group.course_id === null
                                    ? "N/A"
                                    : group.course_id}
                            </td>
                            <td className="p-2 flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(group)}
                                >
                                    <Pencil className="w-4 h-4" />
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
