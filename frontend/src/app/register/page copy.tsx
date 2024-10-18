"use client";
import Footer from "@/components/Footer";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/utilisateur/${id}`).then((res) => {
        const dataUser = res.data[0]
        setData({
          nom: dataUser.nom,
          prenom: dataUser.prenom,
          email: dataUser.email,
          password: "",
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (data.password !== confirmPassword) {
      Swal.fire({
        text: "Les mots de passe ne correspondent pas.",
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return;
    }

    // Proceed with the form submission
    if (id) {
      data.idUtilisateur = id;
      axios
        .post(`http://localhost:3001/utilisateur/check`, {
          idUtilisateur: id,
          password: oldPassword,
        })
        .then((response) => {
          if (response.data.length > 0) {
            axios
              .post(`http://localhost:3001/utilisateur/modifier`, data)
              .then(() => {
                router.push("/user");
                Swal.fire({
                  text: "Utilisateur modifié avec succès",
                  icon: "success",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 2000,
                });
              });
          } else {
            Swal.fire({
              text: "Current mot de passe error",
              icon: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            });
          }
        });
    } else {
      axios.post("http://localhost:3001/utilisateur/ajouter", data).then(() => {
        router.push("/user");
        Swal.fire({
          text: "Utilisateur ajouté avec succès",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
      });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {id ? "Update account" : "Create an account"}
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                method="post"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="nom"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    id="nom"
                    value={data.nom}
                    onChange={(e) => setData({ ...data, nom: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nom"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="prenom"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenom"
                    value={data.prenom}
                    onChange={(e) =>
                      setData({ ...data, prenom: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                {id ? (
                  <div>
                    <label
                      htmlFor="oldpassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Current password
                    </label>
                    <input
                      type="password"
                      name="oldpassword"
                      id="oldpassword"
                      placeholder="••••••••"
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {id ? "Update account" : "Create an account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
