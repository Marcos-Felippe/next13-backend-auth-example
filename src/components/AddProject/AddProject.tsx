'use client'

import { createProject } from '@/services/api';
import React, { useState } from 'react';

type AddProjectProps = {
    token: string;
    userId: string;
}

const AddProject = ({ token, userId }: AddProjectProps) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = async () => {
        try {
            const returnedMessage = await createProject({title: title, description: description, token: token, userId: userId});
            const error = returnedMessage.data.error;

            if(error === true){
                alert("Failed when try to create project!");
            } else {
                alert("Project created!");
            }

        } catch (error: any) {
            alert("Failed when try to create project!");
        }

        setTitle("");
        setDescription("");
    }

    return (
        <div className='mx-auto my-8 p-2 items-center h-[30rem] w-[30rem]'>
            <div className='items-center p-2 bg-gray-300 text-black rounded-lg w-full'>
                <h3 className='text-xl text-center font-bold mb-4'>Add New Project:</h3>
                <div className='flex mb-2'>
                    <label htmlFor="new-title" className='shrink-0 font-semibold'>Title:</label>
                    <input type="text" name='new-title' id='new-title' className='w-full ml-1 px-1'
                        value={ title }
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex mb-4'>
                    <label htmlFor="new-desc" className='shrink-0 font-semibold'>Description:</label>
                    <textarea name='new-desc' id='new-desc' maxLength={300} className='w-full ml-1 px-1 box-border'
                        value={ description }
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className='rounded-full bg-slate-800 py-1 px-2 text-xs font-medium text-white hover:bg-slate-600' onClick={ handleAdd }>Add</button>
            </div>
        </div>
    )
}

export default AddProject