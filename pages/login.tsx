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
    onSuccess: () => { addToast('Please click the link in your email to login', {appearance: 'success', autoDismiss: true}) },
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
      <div className="max-w-7xl text-center mx-auto px-5 md:px-20">
        <form onSubmit={handleSubmit}> 
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label> 
            <input
              className="input input-bordered"
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control mt-4">
            <button
              className="btn btn-primary"
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