import EmptyCard from '../../components/EmptyCard/EmptyCard'
import NoteCard from '../../components/Cards/NoteCard'
import Navbar from '../../components/Navbar/Navbar'
import React, { useEffect, useState } from 'react'
import AddEditNotes from './AddEditNotes'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify';
import Modal from "react-modal";
import axios from "axios";
import AddNotesImg from "../../assets/note.png";


const Home = () => {

  // Hooks
  const [allNotes,setAllNotes] = useState([]);
  const [isSearch,setIsSearch] = useState(false);
  const [userInfo,setUserInfo] = useState();

  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null
  });

  // Edit Notes
  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({
      isShown:true,
      data:noteDetails,
      type:"edit"
    })
  };
  
  // get user Information
  const UserInfo = async()=>{
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/getuser",{withCredentials:true});

      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get all notes
  const getAllNotes = async()=>{
    try {
      const response = await axios.get("http://localhost:8000/api/v1/note/getallnotes",{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Delete Notes
  const deleteNote = async(data)=>{
    const noteId = data._id;
    try {
      const response = await axios.delete("http://localhost:8000/api/v1/note/deletenote/"+ noteId ,{withCredentials:true});

      if(response.data.success){
          getAllNotes();
          toast.success(response.data.message);
      }
  } catch (error) {
      if(error.response && error.response.data && error.response.message){
          console.log("An Unexpected error occured. Please try again");
      }
      console.log(error);
  }
  }

  // search for notes
  const onSearchNote = async(query)=>{
    try {
      const response = await axios.get("http://localhost:8000/api/v1/note/search",{
        withCredentials:true,
        params: { q: query }
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        toast.success(response.data.success.message);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // updateIsPinned
  const updateIsPinned = async(noteData)=>{
    const noteId = noteData._id;
    try {
        const response = await axios.put("http://localhost:8000/api/v1/note/updatePinnedNote/"+ noteId,{
          "isPinned":!noteId.isPinned
        },
        {withCredentials:true});

        if(response.data.success){
            getAllNotes();
            toast.success(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
  }

useEffect(()=>{
    UserInfo();
    getAllNotes();
    ()=>{};
},[])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote}/>
      <div className='container ml-10'>
        {allNotes.length > 0 ? <div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item,_id)=>(
            <NoteCard
            key={item._id} 
            title={item.title}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={()=>handleEdit(item)}
            onDelete={()=>{deleteNote(item)}}
            onPinNote={()=>{updateIsPinned(item)}}
            />
          ))}
        </div>:<EmptyCard imgSrc={AddNotesImg} message={"Start creating your first note ! Click the 'Add' button to join down your thoughts , ideas, and reminders. Let's get started!"}/>}
      </div>
      <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-900 hover:bg-blue-700 absolute right-10 bottom-10' 
      onClick={()=>{
        setOpenAddEditModal({isShown:true,type:"add",data:null});
      }}>
        <MdAdd className='text[32px] text-2xl text-white'/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={()=>{}}
        style={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
      <AddEditNotes 
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={()=>{
        setOpenAddEditModal({isShown:false,type:"add",data:null});
      }}
      getAllNotes={getAllNotes}
      />
      </Modal>
    </>
  )
}

export default Home