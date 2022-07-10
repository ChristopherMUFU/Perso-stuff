const config = {
  screens: {
    ForgotMotdepasse: {
      path: "ForgotMotdepasse/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
    connexion: {
      path: "connexion/:id",
      parse: {
        id: (id) => `${id}`,
        
      },
    },
    // connexion: "connexion",
    // ForgotPassword: "ForgotMotdepasse",
  },
};


  const linking = {
    prefixes: ["http://www.ektort.com/"],
    config,
    
  };
  
  
  export default linking;