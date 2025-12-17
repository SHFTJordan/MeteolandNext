"use client";

import { useRouter } from "next/navigation";
import { auth } from "@@/utils/api";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await auth.signoutUser();

    if (result.success) {
      console.log(result.message);
      router.refresh();
    } else {
      console.error("Échec de la déconnexion :", result.error);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleSignOut}
          className="px-2.5 py-1 tablet:py-2 rounded-full bg-button text-textColor text-[0.7rem] tablet:text-[1.2rem] font-medium no-underline"
        >
          Se Déconnecter
        </button>
      </div>
    </>
  );
}
