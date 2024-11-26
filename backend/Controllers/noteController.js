import { Note } from "../Models/note.model.js";

// Create note
export const AddNote = async(req,res)=>{
    try {
        const {title,content,tags} = req.body;
        const user = req.user;

        if(!title || !content || !tags){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        };

        const note = await Note.create({
            title,
            content,
            tags:tags || [],
            userId:user
        });

        await note.save();

        return res.status(200).json({
            message:"Note add sucessfully",
            success:true,
            note
        });
    } catch (error) {
        console.log(error);
    }
};

// Edit note
export const EditNote = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const {title,content,tags,isPinned} = req.body;
        const user = req.user;

        if(!title || !content || !tags){
            return res.status(400).json({
                message:"No changes provided.",
                success:false
            })
        }   

        const note = await Note.findOne({_id:noteId , userId:user});
        if(!note){
            return res.status(400).json({
                message:"Note not found",
                success:false
            })
        };

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            message:"Note updated successfully",
            success:true,
            note
        });

    } catch (error) {
        console.log(error);
    }
};

// Get all notes
export const getAllNotes = async(req,res)=>{
    try {
        // first of all get the user.
        const user = req.user;

        const notes = await Note.find({userId:user}).sort({isPinned:-1});

        return res.status(200).json({
            message:"All notes retrived successfully.",
            success:true,
            notes
        });
    } catch (error) {
        console.log(error);
    }
};

// Delete note
export const DeleteNote = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const user = req.user;

        const note = await Note.findOne({_id:noteId,userId:user});

        if(!note){
            return res.status(400).json({
                message:"Note not found",
                success:false
            })
        };

        await Note.deleteOne({_id:noteId,userId:user});

        return res.status(200).json({
            message:"Note deleted successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};

// Update isPinned Value
export const updateNotePinned = async(req,res)=>{
    try {
        const noteId = req.params.noteId;
        const {isPinned} = req.body;
        const user = req.user;

        if(!isPinned){
            return res.status(400).json({
                message:"No changes provided.",
                success:false
            })
        }   

        const note = await Note.findOne({_id:noteId , userId:user});
        if(!note){
            return res.status(400).json({
                message:"Note not found",
                success:false
            })
        };

        note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            message:"Note Pinned successfully",
            success:true,
            note
        });

    } catch (error) {
        console.log(error);
    }
};

// Search Notes
export const searchNotes = async (req, res) => {
    const user = req.user; 
    const query = req.query.q; 
    console.log(query);
    console.log(user);
    
    if (!query) {
        return res.status(400).json({
            message: "Search query is required",
            success: false
        });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user, 
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
                { tags: { $regex: new RegExp(query, "i") } }
            ]
        });

        return res.json({
            success: true,
            notes: matchingNotes,
            message: "Notes matched successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching for notes."
        });
    }
};
