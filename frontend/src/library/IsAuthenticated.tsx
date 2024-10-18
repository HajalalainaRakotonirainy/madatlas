"use server"
import { cookies } from "next/headers";

export const isAuthenticated = async () => {
    const password = cookies().get("token")?.value;    
    const email = cookies().get("email")?.value;    

    if (!password || !email) {
      return false
    }

    const response = await fetch("http://backend-sig:3001/utilisateur/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

      
    if (response.ok && response.status == 200) {           
      return true
    } else {
      cookies().delete("email")
      cookies().delete("token")
      cookies().delete("type")
      return false
    }
  };