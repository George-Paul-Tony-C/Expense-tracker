import React, { useEffect, useContext, useState } from "react";
import { UserContext } from '../context/userContext';
import { API_PATHS } from '../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // add a loading state

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info ", error);
                if (isMounted) {
                    clearUser();
                    navigate('/login');
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // Set loading to false after the fetch completes
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
        
    }, [user, updateUser, clearUser, navigate]);

    return loading; // Return the loading state to conditionally render content
};
