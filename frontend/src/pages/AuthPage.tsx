import React, { FormEvent, useState } from 'react';
import { useAuthCRUD } from '../hooks/useAuthCRUD';
import { UserLoginInputData, UserSignupInputData } from '../types';


const AuthComponent: React.FC = () => {
  	const { login, signup, isLoading, authError } = useAuthCRUD();
	const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [formData, setFormData] = useState<UserLoginInputData | UserSignupInputData>({
		username: '',
		email: '',
		password: ''
	  });


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
		  ...prevState,
		  [e.target.name]: e.target.value,
		}));
	  };

	const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try{
			if(isLoginMode){
				await login(formData as UserLoginInputData);
			} else {
				await signup(formData as UserSignupInputData);
			}
		} catch (error: any) {
			setError(error.message);
		}
	}


  return (
    <div className="auth-outside-container">
		<div className="auth-inside-container">
			<div className="auth-header">
				<div className="logo"></div>
				<h1>Log in to Notes app</h1>
			</div>
			<form onSubmit={handleAuthSubmit}>
				{!isLoginMode && (
				<div className="single-input-container">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						onChange={onChange}
					/>
				</div>
				)}
				<div className="single-input-container">
					<label htmlFor="email">Email address</label>
					<input
						type="text"
						id="email"
						name="email"
						onChange={onChange}
					/>
				</div>
				<div className="single-input-container">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={onChange}
					/>
				</div>
				{!isLoginMode && (
				<div className="checkbox-container">
					<input type="checkbox" id="agree-to-terms"/>
					<label htmlFor="agree-to-terms"> I agree to Notes App terms</label>
				</div>
				)}
				{authError && <p className="error">{authError}</p>}
				<button
					type="submit"
					className="simple-auth-button"
				>
					<span>
						{isLoginMode ? "Log in" : "Sign Up"}
					</span>
				</button>
			</form>
			<div className="separator">
				<span> OR </span>
			</div>
			<div className="alternative-login-options">
				<button>
					Continue with Google
				</button>
			</div>
			<div className="change-is-login-mode-container">
				<p>
					{isLoginMode ? "Don't have an account?" : "Already have an account?"}
				</p>
				<button
					className="change-is-login-mode"
					onClick={() => setIsLoginMode((prev) => !prev)}
				>
					{isLoginMode ? "Sign up now" : "Log in"}
				</button>
			</div>
		</div>
	</div>
  );
};

export default AuthComponent;
