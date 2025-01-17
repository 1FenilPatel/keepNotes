import React from "react";
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate , MdDelete} from 'react-icons/md';

const NoteCard = ({
  title,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {

  return(
   <div  className="border drop-shadow w-full rounded p-5 bg-white hover:shadow-xl transition-all ease-in-out">
    <div className="flex items-center justify-between">
        <div className="">
            <h6 className="text-sm font-medium">{title}</h6>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary':'text-slate-300'}`} onClick={onPinNote}/>
    </div>

    <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
    <div className="flex items-center justify-between mt-2">

        <div className="text-sm text-slate-500">{tags.map((item)=>`#${item} `)}</div>
        <div className="flex items-center gap-2">
            <MdCreate className="icon-btn hover:text-green-600"
            onClick={onEdit}/>

            <MdDelete className="icon-btn hover:text-red-500"
            onClick={onDelete}/>
            </div>
    </div>
  </div>
)};

export default NoteCard;
