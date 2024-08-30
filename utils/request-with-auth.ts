import useSecureStore from "@/hook/useSecureStore";
import { refreshToken } from "@/lib/fetchers/users";

const { getValueFor, save } = useSecureStore();

async function requestWithAuth<T>(
  apiCall: () => Promise<T>
): Promise<T | void> {
  // Ottieni il token di accesso
  const token = await getValueFor("accessToken");
  if (!token) {
    console.error("No access token available");
    return;
  }

  try {
    // Esegui la chiamata API
    const response = await apiCall();

    // Controlla se la risposta è 401 (non autorizzato)
    if ((response as any).status === 401) {
      const errorBody = await (response as any).json();
      if (
        errorBody.errors &&
        errorBody.errors[0].message === "Token expired."
      ) {
        try {
          // Aggiorna il token
          const myRefreshToken = await getValueFor("refreshToken");
          const refreshResponse = await refreshToken(myRefreshToken!);

          if (!refreshResponse) {
            throw new Error("Token refresh failed");
          }

          // Salva il nuovo token
          await save("accessToken", refreshResponse.access_token!);
          await save("refreshToken", refreshResponse.refresh_token!);

          // Riprova la chiamata API con il nuovo token
          const retryResponse = await apiCall();
          return retryResponse;
        } catch (error) {
          console.error("Token refresh failed:", error);
          throw error;
        }
      }
    }

    // Restituisci la risposta originale se non è 401
    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export default requestWithAuth;
