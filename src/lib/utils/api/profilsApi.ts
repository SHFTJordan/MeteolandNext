import { ApiResponse,UserData } from "@@/types/api";

async function getProfilInfos():Promise<ApiResponse<UserData>> {
  try {
    const res = await fetch("/api/profils/me", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json().catch(()=>{});
    if(!res.ok){
        const erroData = data;
        return {success:false,error:erroData.error || "Erreur inconnue lors de la récupération du profil"};
    }

    return {success:true,data
    }


  } catch (error: unknown) {
    const errMes = error instanceof Error ? error.message : String(error);
    console.error(errMes);
    return { success: false, error: errMes };
  }
}

export {getProfilInfos}