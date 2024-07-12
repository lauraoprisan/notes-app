import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios, { AxiosResponse } from 'axios';
import { User } from '../types';


export const useAuthCRUD = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState<string | null>(null)
	const { dispatch } = useAuthContext();

	const login = async (email: string, password: string): Promise<void> => {
		setIsLoading(true);
		try {
			const response: AxiosResponse<User> = await axios.post(`http://localhost:4000/api/auth/login`, {
				email,
				password,
			});
			const { data } = response;

			console.log("response data from login", data)
			// save the user to local storage

		
			localStorage.setItem('user', JSON.stringify(data));

			// update the auth context
			dispatch({ type: 'LOGIN', payload: data });
		} catch (error) {
			console.error('Failed to login: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	const signup = async (email: string, password: string, username: string): Promise<void> => {
		setIsLoading(true);
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
			console.error('Failed to signup: ', error);
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

	return { login, signup, logout, isLoading };
};
