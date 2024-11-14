import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import './css/Signup.css'
const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
interface Props {
  text: string;
  speed?: number;
}

const TypingText: React.FC<Props> = ({ text, speed = 75 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  

  useEffect(() => {
    let index = 0;
    setDisplayedText(text.charAt(index));
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prevText) => {
          const newText = prevText + text.charAt(index);
          return newText;
        });
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);
  
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <h1>{displayedText}</h1>
  );
};

interface SignUpFormProps {}

const SignupForm: React.FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate(); 

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await signUp({ variables: { username, password } });

      if (data?.signUp?.token) {
        localStorage.setItem('token', data.signUp.token);

        // Redirect to the login page after successful sign-up
        navigate('/login');
      }
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div className="form-container">
<TypingText text="Wander In, Bookworm – Glad You're Here!" speed={75} />
    <div className="form">

      <div className="form-border" onSubmit={handleSignUp}>
        <div id='username-input'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
  
        <button id="signup-btn" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
  
        {error && <p>Sign up failed: {error.message}</p>}
        <div>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
      </div>
  </div>
    
    </div>
  );
}  

export default SignupForm;
