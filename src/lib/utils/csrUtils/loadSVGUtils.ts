"use client"
export default async function loadSVG(code:string) {
  try {
    const response = await fetch(`/images/${code}.svg`);
    if (!response.ok) throw new Error("Échec du chargement SVG");
    return await response.text();
  } catch (err) {
    console.error("Erreur lors du chargement de l'icône météo :", err);
  }
}
