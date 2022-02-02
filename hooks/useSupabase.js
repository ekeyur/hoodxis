import { createClient } from '@supabase/supabase-js';
import { QueryClient, useMutation, useQuery } from "react-query";
import { useToasts } from 'react-toast-notifications';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getUser(userId) {
  if(userId) {
    const {data: user, error} = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
    if(error) {
      throw error;
    }
    return user;
  }
  return null;
}

 const login = async (email) => {
  const { data, error } = await supabase.auth.signIn({ email })
  if(error) {
    throw error;
  }
  return data;
}

 const logOut = async () => {
  const { data, error } = await supabase.auth.signOut();
  if(error) {
    throw error;
  }
  return data;
}

const useSupabase = () => {  
  const {addToast} = useToasts();
  const queryClient = new QueryClient();
  const {data: session } = useQuery('session', async () => supabase.auth.session());
  const {data : user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery('user', () => getUser(session?.user?.id));
  
  const {mutate: signIn, isLoadingSignIn} = useMutation('login', login, {
    onSuccess: () => {
      addToast('login successful', {appearance: 'success'});
    },
    onError: () => {
      addToast('there was an error loggingin', {appearance: 'error'});
    }
  });

  const  signOut = () => {
    return useMutation(() => logOut(), {
      onSuccess: () => {
        queryClient.removeQueries()
      }
    })
  }
  
 return {session, supabase, user, signIn, signOut, isLoadingSignIn, isLoadingUser, isErrorUser};
}

export {useSupabase};