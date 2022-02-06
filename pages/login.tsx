import {useRouter} from 'next/router';
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import {useUser} from '../context/UserContext';
import { useToasts } from 'react-toast-notifications';

export default function Login() {
  const {login, user} = useUser();
  const {addToast} = useToasts();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const {mutate: signInMutate, isLoading} = useMutation((email: string) => login(email), {
    onSuccess: () => { 
      addToast('Please click the link in your email to login', {appearance: 'success', autoDismiss: true});
      router.push('/');
     },
    onError: () => { addToast('There was an error sending you a link. Please try again later', {appearance: 'error', autoDismiss: true}) }
  });

  useEffect(() => {
    if(user){
      router.push('/');
    }
  },[router])

  const handleSubmit =  (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInMutate(email);
  }

  return (
    <>
      <div className="mx-auto flex justify-center items-center">
        <form onSubmit={handleSubmit}> 
          <div className="my-1">
            <label htmlFor="email" className="mb-2 space-x-2">
              <span className="text-gray-800">Email</span>
            </label> 
            <input
              className="my-1 py-2 px-2 border-2 shadow-sm border-solid border-gray-500 rounded-md block w-80"
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <button
              className="border-solid bg-sky-100 border-2 border-gray-500 hover:bg-gray-300 p-2 rounded-md"
              onClick={handleSubmit}
            >
              {isLoading ? <span>Sending...</span>:<span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}