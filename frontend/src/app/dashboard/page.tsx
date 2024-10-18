"use client";

import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [urgenceName, setUrgenceName] = useState("csb");
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:3001/urgence/${urgenceName}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [urgenceName]);

  const handleExportPDF = () => {
    // Récupérer les données de l'API

    // Créer une instance de jsPDF
    const doc = new jsPDF();

    // Ajouter un titre
    doc.text(`Liste des Services d'Urgence ${urgenceName}`, 20, 10);

    // Générer la table dans le PDF
    autoTable(doc, {
      startY: 20,
      head: [["Nom", "Adresse", "Numéro", "Heure", "Service", "Lien"]],
      body: data.map((item) => [item.nom, item.adresse, item.numero, item.heure, item.service, item.lien]),
    });

    // Télécharger le fichier PDF
    doc.save(`services_urgences_${urgenceName}.pdf`);
  };

  return (
    <>
      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Tableau de Bord de la Distribution Géographique
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Types d'Urgence */}
          <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Types d'Urgence Existants
            </h3>
            <ul className="space-y-2">
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("csb");
                }}
              >
                <img
                  src="images/centre_sante_base.png"
                  alt="Centre de Santé de Base"
                  className="w-6 h-6 mr-2"
                />
                CSB - Centre de Santé de Base
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("dispensaire");
                }}
              >
                <img
                  src="images/dispensaire.png"
                  alt="Dispensaire"
                  className="w-6 h-6 mr-2"
                />
                Dispensaire
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("gendarmerie");
                }}
              >
                <img
                  src="images/police_proximite.png"
                  alt="Police de Proximité"
                  className="w-6 h-6 mr-2"
                />
                Gendarmerie - Police de Proximité
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("hopital");
                }}
              >
                <img
                  src="images/centre_hospitalier.png"
                  alt="Centre Hospitalier"
                  className="w-6 h-6 mr-2"
                />
                CHU - Centre Hospitalier
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("jirama");
                }}
              >
                <img
                  src="images/jirama.png"
                  alt="Jirama"
                  className="w-6 h-6 mr-2"
                />
                Jirama
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("pharmacie");
                }}
              >
                <img
                  src="images/pharmacie.png"
                  alt="Pharmacie"
                  className="w-6 h-6 mr-2"
                />
                Pharmacie
              </li>
              <li
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setUrgenceName("police");
                }}
              >
                <img
                  src="images/vigie_police.png"
                  alt="Police"
                  className="w-6 h-6 mr-2"
                />
                VDP - Vigie de Police
              </li>
            </ul>
          </div>

          {/* Nombre Total de Services */}
          <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg flex justify-center items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Nombre Total de Services d'Urgence {urgenceName}
              </h3>
              <p className="text-3xl sm:text-4xl font-bold mt-4">
                {data.length}
              </p>
              <button onClick={()=>handleExportPDF()} className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-600">
                <span className="mr-2">📥</span> Exporter les données de
                services d'urgences {urgenceName}
              </button>
            </div>
          </div>
        </div>

        {/* Boutons d'exportation */}
        {/* <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-600">
          <span className="mr-2">📥</span> Exporter les données de services
          d'urgences
        </button>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-600">
          <span className="mr-2">📥</span> Exporter les données de pharmacies
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-600"
        >
          <span className="mr-2">📥</span> Exporter les données des bouches
          d'incendies
        </button>
      </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
