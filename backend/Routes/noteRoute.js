import express from "express";
const router = express.Router();
import { AddNote, DeleteNote, EditNote, getAllNotes, searchNotes, updateNotePinned } from "../Controllers/noteController.js";
import { isAuthentication } from "../Middlewares/IsAuthenticated.js";

router.route("/addnote").post(isAuthentication,AddNote);
router.route("/editnote/:noteId").put(isAuthentication,EditNote);
router.route("/getallnotes").get(isAuthentication,getAllNotes);
router.route("/deletenote/:noteId").delete(isAuthentication,DeleteNote);
router.route("/updatePinnedNote/:noteId").put(isAuthentication,updateNotePinned);
router.route("/search").get(isAuthentication,searchNotes);

export default router;