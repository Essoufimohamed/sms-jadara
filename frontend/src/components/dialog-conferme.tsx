import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import { Trash2 } from "lucide-react";

export function DialogCloseButton(props) {
    const token = localStorage.getItem("token");
    function handlDelete() {
        axios
            .delete(`http://localhost:5000/api/users/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((data) => {
                data.data;
            })
            .catch((error) => error.message);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Trash2 className="cursor-pointer" color="red" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center space-x-2">
                    <Button
                        onClick={handlDelete}
                        type="submit"
                        size="sm"
                        className="px-4"
                    >
                        <span>Delete</span>
                    </Button>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
