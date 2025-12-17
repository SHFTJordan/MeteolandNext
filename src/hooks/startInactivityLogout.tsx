// src/lib/hooks/startInactivityLogout.ts
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signoutUser } from "@@/utils/api/authApi"; // Assure-toi que ce chemin d'alias '@@' est correctement configuré dans tsconfig.json

export function useInactivityLogout(delayInMinutes: number) {
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null); // Type correct pour setTimeout
  const router = useRouter();

  const performLogout = useCallback(async () => {
    console.log("Déconnexion pour inactivité...");

    const result = await signoutUser();

    if (result.success) {
      console.log("✅ Déconnexion API réussie :", result.message);
    } else {
      console.error("❌ Erreur lors de la déconnexion API :", result.error);
    }
    // IMPORTANT : Rediriger TOUJOURS, peu importe le succès de l'API de déconnexion.
    // Cela garantit que l'utilisateur quitte la session active côté client.
    router.push("/timeout");
  }, [router]); // `signoutUser` est stable si c'est juste une fonction importée, donc pas besoin de l'ajouter ici.

  const resetInactivityTimer = useCallback(() => {
    // Si un timer existe, on le nettoie.
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null; // Important: réinitialiser la référence après clearTimeout
    }

    // N'active le timer QUE si delayInMinutes est positif.
    if (delayInMinutes > 0) {
      inactivityTimerRef.current = setTimeout(
        performLogout,
        delayInMinutes * 60 * 1000
      );
    }
  }, [delayInMinutes, performLogout]); // `performLogout` est stable grâce à useCallback

  useEffect(() => {
    // Si delayInMinutes est <= 0, on ne veut pas de minuteur.
    // On nettoie tout minuteur potentiel et on ne setup pas les écouteurs.
    if (delayInMinutes <= 0) {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      // Il faut aussi retirer les écouteurs si jamais ils ont été mis en place avant
      // (par exemple, si l'utilisateur s'est déconnecté et que delayInMinutes est devenu 0).
      // On va gérer ça dans la fonction de cleanup du return.
      return; // Sortir tôt si le timer n'est pas censé être actif
    }

    // Si delayInMinutes est > 0, on initialise ou réinitialise le minuteur.
    resetInactivityTimer();

    const events = [
      "click",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "input",
      "submit",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Fonction de nettoyage (s'exécute au démontage ou avant chaque re-exécution du useEffect)
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [resetInactivityTimer, delayInMinutes]); // `resetInactivityTimer` est stable. `delayInMinutes` est essentiel pour re-déclencher le setup si la durée change.
}
