import Group from "../model/Group.js";
import Course from "../model/Course.js";
import User from "../model/User.js";

export const createGroup = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;
        const user = await User.findById(user_id);
        const course = await Course.findById(course_id);

        if (!user || !course) {
            return res
                .status(404)
                .json({ message: "user or course are messing " });
        }

        const newGroup = new Group({ user_id, course_id });
        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate({
                path: "user_id",
            })
            .populate({
                path: "course_id",
                select: "title",
            });
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate({
                path: "user_id",
                select: "email",
            })
            .populate({
                path: "course_id",
                select: "title",
            });
        if (!group) {
            return res.status(404).json({ message: "couldn get group by id" });
        }
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateGroup = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;

        const user = await User.findById(user_id);
        const course = await Course.findById(course_id);

        if (!course || !user) {
            return res
                .status(404)
                .json({ message: "course or message not found" });
        }

        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { user_id, course_id },
            { new: true }
        )
            .populate({
                path: "user_id",
                select: "email",
            })
            .populate({
                path: "course_id",
                select: "title",
            });

        if (!updatedGroup) {
            return res
                .status(404)
                .json({ message: "couldn't get updated group" });
        }
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.id);

        if (!deletedGroup) {
            res.status(404).json({ message: "deleted group not found" });
        }

        res.status(204).send("no content to delete");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
