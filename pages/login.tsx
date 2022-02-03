import {useRouter} from 'next/router';
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import {useUser} from '../context/UserContext';

export default function Login() {
  const {login, user} = useUser();
  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const {mutate: signInMutate, isLoading, isSuccess, isError, error} = useMutation((email: string) => login(email), {
    onSuccess: () => console.log('Sign In Link Sent')
  });

  useEffect(() => {
    if(user){
      router.push('/');
    }
  },[user])

  const handleSubmit =  (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInMutate(email);
  }

  return (
    <>
      <div className="max-w-7xl text-center mx-auto px-5 md:px-20">
        <form onSubmit={handleSubmit}> 
        <div className="">
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
          <div className='mt-5'>
          {isSuccess ? <div className="alert alert-success">Magic link sent. Please click the link in your email to login.</div> : null}
          {isError ? (
              <div className="alert alert-error">There was an error sending link. Please try again later</div>
            ) : null}
            </div>
        </div>
        </form>
      </div>
    </>
  )
}