import React, {useState, createContext, useEffect, useContext} from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
  const router = useRouter();
  const [user,setUser] = useState(null);

  useEffect(() => {
    const getPublicUser = async () => {
      const sessionUser = supabase.auth.user();
      if(sessionUser) {
        const {data: publicUser} = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

        setUser({
          ...sessionUser,
          ...publicUser
        })
      }
    }
    getPublicUser();
    supabase.auth.onAuthStateChange(() => {
      getPublicUser();
    })
  }, [])

  const logout = async () => { 
    await supabase.auth.signOut(); 
    setUser(null);
    router.push("/")
  }

  const login = async (email) => { 
    await supabase.auth.signIn({email}); 
  }

  const exposed = {
    user,
    login,
    logout
  }

  return (
    <UserContext.Provider value={exposed}>
      {children}
    </UserContext.Provider>
  )

}

export const useUser = () => useContext(UserContext);





