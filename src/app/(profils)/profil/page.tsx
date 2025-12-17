"use client";
import { profils } from "@@/utils/api/";
import { useEffect } from "react";
export default function ProfilPage() {
  useEffect(() => {
    (async () => {
      const res = await profils.getProfilInfos();
      console.log(res);
    })();
  }, []);
  return (
    <div>
      <h1 className="my-2 mx-2 text-4xl">Page de profil</h1>
      <form id="profil_form" method="POST">
        {/*Informations de profil*/}
        <div>
          <label
            htmlFor="username"
            className=" mx-2 text-sm font-medium text-gray-700"
          >
            Nom d&apos;utilisateur :
          </label>
          <input
            className="mx-2 my-4 px-4 py-1 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="text"
            id="username"
            name="username"
            placeholder=""
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="lastname"
          >
            Nom :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="text"
            id="lastname"
            name="lastname"
            placeholder=""
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="firstname"
          >
            Prénom :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="text"
            id="firstname"
            name="firstname"
            placeholder=""
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="birthday_date"
          >
            Date de naissance :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="date"
            id="birthday_date"
            name="birthday_date"
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="phone_number"
          >
            Numéro de téléphone :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="tel"
            id="phone_number"
            name="phone_number"
            placeholder=""
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="location"
          >
            Localisation :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="text"
            id="location"
            name="location"
            placeholder=""
          />
        </div>
        <div>
          <button
            className="mx-2 my-4 flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 active:scale-95"
            type="submit"
          >
            Modifier les informations
          </button>
        </div>
      </form>
      {/*Changement de l'email*/}
      <h2 className="mx-2 text-2xl">Modifier l&apos;email</h2>
      <form id="email_form" method="POST">
        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email :
          </label>
          <input
            className="mx-2 my-4 px-4 py-1 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="email"
            id="email"
            name="email"
            placeholder=""
            required
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="email_confirm"
          >
            Confirmer l&apos;email :
          </label>
          <input
            className="mx-2 my-4 px-4 py-1 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="email"
            id="email_confirm"
            name="email_confirm"
            required
          />
        </div>
        <div>
          <button
            className="mx-2 my-4 flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 active:scale-95"
            type="submit"
          >
            Changer l&apos;email
          </button>
        </div>
      </form>

      {/*Changement de mot de passe*/}
      <h2 className="mx-2 text-2xl">Modifier le mot de passe</h2>

      <form id="password_form" method="POST">
        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="current_password"
          >
            Mot de passe actuel :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="password"
            id="current_password"
            name="current_password"
            required
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="new_password"
          >
            Nouveau mot de passe :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="password"
            id="new_password"
            name="new_password"
            required
          />
        </div>

        <div>
          <label
            className=" mx-2 text-sm font-medium text-gray-700"
            htmlFor="confirm_new_password"
          >
            Confirmer le nouveau mot de passe :
          </label>
          <input
            className="mx-2 my-4 px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm"
            type="password"
            id="confirm_new_password"
            name="confirm_new_password"
            required
          />
        </div>

        <div>
          <button
            className="mx-2 my-4 flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 active:scale-95"
            type="submit"
          >
            Changer le mot de passe
          </button>
        </div>
      </form>
    </div>
  );
}
