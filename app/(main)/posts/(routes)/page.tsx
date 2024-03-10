 import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'
 
 const Posts = async() => {
  const session:any =  await auth()
   return (
    <>
      <div>{JSON.stringify(session)}</div>
      
      <form action={async()=>{
  'use server'
  await signOut();
      }}> 
     <button  type='submit'>
      Logout
     </button>
     </form>
     </>
   )
 }
 
 export default Posts