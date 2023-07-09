import { api, deleteProject } from '@/services/api';
import React from 'react';
import useSWR from 'swr';

type ProjectListProps = {
  token: string;
  userId: string;
}

const ProjectsList = ({userId, token}: ProjectListProps) => {

  const fetcher = (url: string) => api.get(url, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }).then(res => res.data.projects);

  const { data: projects, mutate, error, isLoading } = useSWR(
    `/user/${userId}/projects`,
    fetcher,
    {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        //refreshInterval: 60000
    }
  );

  if(error){
    return (
      <div className='my-4 mx-auto text-black w-[30rem]'>
        <h2 className='text-lg text-center font-bold mb-2'>Your Projects</h2>
      </div>
    );
  }

  if(isLoading) {
    return (
      <div className='my-4 mx-auto text-black w-[30rem]'>
        <h2 className='text-2xl text-center font-bold mb-2'>Your Projects</h2>
        <div>Loading. . .</div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    await deleteProject({id: id, token: token, userId: userId});
    mutate();
  }

  return (
    <div className='my-4 mx-auto text-black w-[30rem]'>
      <h2 className='text-2xl text-center font-bold mb-2'>Your Projects</h2>
      <ul className='list-none m-0 p-0'>
        {projects?.map((project: any) => (
          <li key={project?.props.id} className='flex items-center bg-gray-300 border-b-2 border-gray-400 p-2'>
            <div className='flex-1'>
              <div className='text-xl font-semibold'>{project?.props.title}</div>
              <div className='project-desc'>{project?.props.description}</div>
            </div>
            <button className='rounded-full bg-slate-800 p-1 text-xs font-medium text-white hover:bg-slate-600' onClick={()=> { handleDelete(project?.props.id) }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsList