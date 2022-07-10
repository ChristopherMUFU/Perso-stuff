import React, { useEffect, useState } from "react";

// import { auth } from "../../config/firebase";
import useForm from "../hooks/useForm";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AdminPage from "../components/admin";
// import AdminPage from "./AdminPage";
import axios from "axios";
import {URL} from "../middlewares/request";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../app/Redux-slices/adminSlice";
//import Global_admin from "../app/Redux-slices/adminSlice";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "3rem auto",
  },
  margin: {
    margin: theme.spacing(4, 1),
  },
}));

const Admin = () => {
  // const classes = useStyles();
  // const [admin, setAdmin] = useState();
  // const [email, setEmail] = useState( '' );
  // const [password, setPassword] = useState( '' );
  // const admin_account = useSelector(selectAdmin);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const { path, url } = useRouteMatch();

  //  //useEffect(() => {
  //   // const unSubscribe = auth.onAuthStateChanged((authUser) => {
  //   //   if (authUser) {
  //   //     setAdmin(authUser);
  //   //   } else {
  //   //     setAdmin(null);
  //   //   }
  //   // });
  //   // return () => {
  //   //   unSubscribe();
  //   // };
  // //}, [admin]);

  // useEffect(() => {
  //   dispatch(changePage(admin_account.currentPage));
  //   history.push(path);
  // }, []);

  // const updateDisponibiliteRestaurant = async (disponibilite) => {
  //   console.log(disponibilite);
  //   await axios.put(URL + "restaurant/info_restaurant/1/", {
  //     disponibilite_restaurant: disponibilite,
  //   });
  // };


  
  // const seConnecter = async () => {
  //   const tmp_mail = email;
  //   const tmp_pass = password;
  //   await axios.post(URL+"restaurant/token/", {
  //     username: tmp_mail, //"mr.markus@test.com",
  //     password: tmp_pass, //"A1Z2E3R4T5Y6",
  //   }).then(data => {
  //       //window.location.reload(true);
  //         if(data !== null)
  //         {
  //           updateDisponibiliteRestaurant(true);
  //           setAdmin(true);
  //           //window.location.reload(true);
  //           //setGlobal_admin(true);
  //         }
  //     });
  //   //e.preventDefault();
  //   // auth
  //   //   .signInWithEmailAndPassword(email, password)
  //   //   .catch((err) => alert(err.message));
  // };

  return (
    <>
      <AdminPage />

      {/* {admin ? (
      ) : (
        <div
          style={{
            height: "92vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <form
            noValidate
            autoComplete='off'
            className={classes.root}
          >
            <FormControl fullWidth className={classes.margin}>
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type='email'
                name='email'
                value={email}
                onChange={e => {setEmail(e.target.value)}}
                required
              />
            </FormControl>

            <FormControl fullWidth className={classes.margin}>
              <TextField
                id='filled-password-input'
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                variant='filled'
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                required
              />
            </FormControl>

            <Button
              variant='contained'
              color='primary'
              onClick={seConnecter}
              style={{
                display: "flex",
                margin: "10px auto",
                textAlign: "center",
                background: "rgb(77, 76, 76)",
              }}>
              Se connecter
            </Button>
          </form>
        </div>
      )} */}
    </>
  );
};

export default Admin;
