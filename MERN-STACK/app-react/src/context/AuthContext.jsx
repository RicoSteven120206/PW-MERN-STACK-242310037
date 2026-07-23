"use client"; 

import { createContext, useContext, useState, useEffect } from "react"; 
import { useRouter } from "next/navigation"; 

const AuthContext = createContext({}); 

export const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => { 
    checkAuth(); 
  }, []); 

  const checkAuth = () => { 
    try { 
      const token = localStorage.getItem("accessToken"); 
      const userData = localStorage.getItem("user"); 
      const expiresIn = localStorage.getItem("expiresIn"); 

      if (token && userData && expiresIn) { 
        const currentTime = Math.floor(Date.now() / 1000);  
        const expirationTime = parseInt(expiresIn, 10); 

        if (currentTime >= expirationTime) { 
          console.log("Token expired, logging out..."); 
          logout(); 
          return; 
        } 
        setUser(JSON.parse(userData)); 
      } else { 
        setUser(null); 
      } 
    } catch (error) { 
      console.error("Error checking auth:", error); 
      setUser(null); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  const login = (userData, token, expiresIn) => { 
    localStorage.setItem("accessToken", token); 
    localStorage.setItem("expiresIn", expiresIn); 
    localStorage.setItem("user", JSON.stringify(userData)); 
    setUser(userData); 

    return Promise.resolve(); 
  }; 

  const logout = () => { 
    setUser(null);

    // Clears all storage & cookies
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn"); 
    localStorage.removeItem("user"); 
    localStorage.clear();
    sessionStorage.clear();

    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    window.location.href = "/sign-in"; 
  }; 

  return ( 
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}> 
      {children} 
    </AuthContext.Provider> 
  ); 
}; 

export const useAuth = () => { 
  const context = useContext(AuthContext); 
  if (!context) { 
    throw new Error("useAuth must be used within AuthProvider"); 
  } 
  return context; 
};