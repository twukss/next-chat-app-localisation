import { createContext, useContext, useState } from "react";
import { AuthService } from "../service/AuthService";

const authContext = createContext();

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	const createUserWithEmailAndPassword = async (email, password) => {
		const { error, user } = await AuthService.CreateUserWithEmailAndPassword(email, password);
		setUser(user ?? null);
		setError(error ?? "");
	};

	const loginUserWithEmailAndPassword = async (email, password) => {
		const { error, user } = await AuthService.loginUserWithEmailAndPassword(email, password);
		setUser(user ?? null);
		setError(error ?? "");
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
	};
	const value = { user, error, createUserWithEmailAndPassword, loginUserWithEmailAndPassword, logout, setUser };

	return <authContext.Provider value={value} {...props} />;
}