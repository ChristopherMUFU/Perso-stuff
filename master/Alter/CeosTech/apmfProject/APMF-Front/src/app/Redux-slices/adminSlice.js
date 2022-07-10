// import React, { useEffect, useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

// export const Global_admin = () => {
//   const [global_admin, setGlobal_admin] = useState(false);
// };
// *  Writing the Slices
//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    pages: [
      {
        name: "editer_article",
        path: "/editer-article",
        libelle: "Editer un article",
        active: false,
        icone: "fal fa-edit",
      },
      {
        name: "gestion_articles_publies",
        path: "/gestion-articles-publies",
        libelle: "Gestion des articles publiés",
        icone: "fal fa-newspaper",
        active: false,
      },
      {
        name: "journal_fabry",
        path: "/journal-fabry",
        libelle: "Le petit journal de Fabry",
        icone: "fa-clipboard-list",
        active: true,
      },
      {
        name: "gestion_journal_fabry",
        path: "/gestion-journal-fabry",
        libelle: "Gestion des journaux publiés",
        icone: "fal fa-newspaper",
        active: false,
      },
      {
        name: "adhesion",
        path: "/adhesion",
        libelle: "Adhésion",
        active: false,
        icone: "fad fa-database",
      },
      {
        name: "don",
        path: "/don",
        libelle: "Don",
        icone: "fas fa-heart",
        active: false,
      },
      {
        name: "activite",
        path: "/activite",
        libelle: "Activité du site",
        active: false,
        icone: "fal fa-trophy",
      },
      {
        name: "fichier_contact",
        path: "/fichier-contact",
        libelle: "Fichier contact",
        icone: " far fa-id-card",
        active: false,
      },
    ],
    currentPage: "editer_article",
    contacts: [],
    dons: [],
    adhesions: [],
    refresh: false,
  },
  reducers: {
    changePage: (state, action) => {
      state.pages.forEach((page) => {
        if (page.name === action.payload) {
          page.active = true;
          state.currentPage = page.name;
        } else {
          page.active = false;
        }
      });
    },
    changeDon: (state, action) => {
      state.dons = action.payload;
    },
    changeAdhesion: (state, action) => {
      state.adhesions = action.payload;
    },
    changeContact: (state, action) => {
      state.contacts = action.payload;
    },
    refreshContent: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const {
  changePage,
  changeContact,
  changeAdhesion,
  changeDon,
  refreshContent,
} = adminSlice.actions;

export const selectAdmin = (state) => state.admin;

// + the generated reducer function
export default adminSlice.reducer;
