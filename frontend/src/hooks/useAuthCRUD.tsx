import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios, { AxiosResponse } from 'axios';
import { User, UserLoginInputData, UserSignupInputData } from '../types';


export const useAuthCRUD = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState<string | null>(null)
	const { dispatch } = useAuthContext();

	const login = async (formData: UserLoginInputData): Promise<void> => {

		setIsLoading(true);
		setAuthError(null)
		const {email, password} = formData

		try {
			console.log("trying login")
			const response: AxiosResponse<User> = await axios.post(`http://localhost:4000/api/auth/login`, {
				email,
				password,
			});

			const { data } = response;
			console.log("reponse from auth: ", data)

			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(data));

			// update the auth context
			dispatch({ type: 'LOGIN', payload: data });

		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data) {
					setAuthError(error.response.data.error || 'Failed to login');
				} else {
					setAuthError('Failed to login due to network or server error');
				}
			} else {
			  	setAuthError('Failed to login due to unexpected error');
			}
			console.error(error)
		  } finally {
			setIsLoading(false);
		  }
		};

	const signup = async (formData: UserSignupInputData): Promise<void> => {
		setIsLoading(true);
		const {username, email, password} = formData
		try {
			const response: AxiosResponse<User>  = await axios.post(`http://localhost:4000/api/auth/signup`, {
				email,
				password,
				username,
			});
			const { data } = response;

			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(data));

			// update the auth context
			dispatch({ type: 'LOGIN', payload: data });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data) {
					setAuthError(error.response.data.error || 'Failed to signup');
				} else {
					setAuthError('Failed to signup due to network or server error');
				}
			} else {
			  	setAuthError('Failed to signup due to unexpected error');
			}
			console.error(error)
		} finally {
			setIsLoading(false);
		}
	};

	const logout = (): void => {
		// remove user from storage
		localStorage.removeItem('user');

		// dispatch logout action
		dispatch({ type: 'LOGOUT' });
	};

	return { login, signup, logout, isLoading, authError };
};
