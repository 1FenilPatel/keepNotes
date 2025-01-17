import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEditNotes = ({noteData , type , getAllNotes , onClose}) => {

    // Hooks
    const [title , setTitle] = useState(noteData?.title || "");
    const [content , setContent] = useState(noteData?.content || "");
    const [tags,setTags] = useState(noteData?.tags || []);
    const [error,setError] = useState(null);

    // add note
    const addNewNote = async() =>{
        try {
            const response = await axios.post("http://localhost:8000/api/v1/note/addnote",{
                title,
                content,
                tags
            },{withCredentials:true});

            if(response.data && response.data.note){
                getAllNotes();
                toast.success(response.data.message)
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.message){
                setError(error.response.data.message);
            }
            console.log(error);
        }
    };

    // edit note
    const editNote = async()=>{
        const noteId = noteData._id;
        try {
            const response = await axios.put("http://localhost:8000/api/v1/note/editnote/"+noteId,{
                title,
                content,
                tags
            },{withCredentials:true});

            if(response.data.success){
                getAllNotes();
                toast.success(response.data.message);
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.message){
                setError(error.response.data.message);
            }
            console.log(error);
        }
    };


    const handleAddNote = ()=>{
        if(!title){
            setError('Please enter the title.')
            return;
        }

        if(!content){
            setError('Please enter the content.')
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote()
        }else{
            addNewNote()
        }
    }
    
  return (
    <div className='relative'>
        <button
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go to Gym at 5'
            value={title}
            onChange={({target})=>setTitle(target.value)}
            />
        </div>


        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
            type="text"
            className='text-sm text-slate-950 outline-none bg-slate-100 rounded'
            placeholder='Content'
            rows={10}
            value={content}
            onChange={({target})=>setContent(target.value)}
            ></textarea>
        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 mt-3 text-xs pb-1'>{error}</p>}

        <button className='btn-primary font-medium mt-2 p-3' onClick={()=>handleAddNote()}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
    </div>
  )
}

export default AddEditNotes