import express from "express";
import {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
} from "../controller/groupController.js";

const groupRouter = express.Router();

// CHANGE THESE PATHS
groupRouter.post("/", createGroup);
groupRouter.get("/", getAllGroups);        
groupRouter.get("/:id", getGroupById);    
groupRouter.put("/:id", updateGroup);     
groupRouter.delete("/:id", deleteGroup);  

export default groupRouter;