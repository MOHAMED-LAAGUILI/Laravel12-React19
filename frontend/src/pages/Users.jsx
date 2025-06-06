import { useStateContext } from '@/context/ContextProvider';
import React from 'react'

export default function Users() {
    const { user, token } = useStateContext();
  
  return (
    <div>
        <p>{JSON.stringify(user)}</p>
        <p>{JSON.stringify(token)}</p>
    </div>
  )
}
