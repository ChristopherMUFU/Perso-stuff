// Components/Stocks/NouvelleCommande.js

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

import * as Theme from "../Styles/Theme";
import {
  getFournisseur,
  getProduitFournisseur,
  setCommande,
  getCommandeById,
} from "../../API/StocksData";

export default class NouvelleCommande extends React.Component {
  // CONSTRUCTEUR / CONSTRUCTOR -----------------------------
  constructor(props) {
    super(props);
    this.ico = {
      new_form: require("../../Assets/ico/new_form.png"),
    };
    this.ico = {
      shop: require("../../Assets/ico/shop.png"),
    };
    this.state = {
      fournisseurs: [],
      products: [],
      fournisseurSelectedId: -1,
      productSelectedId: -1,
      fournisseurListProducts: [],
      selectDisplay: "init",
      productsInTheBasket: {},
    };
  }

  componentDidMount() {
    if (this.props.route.params === undefined) {
      this._dropDownStateInit();
    } else {
      console.log("ID COMMANDE " + this.props.route.params.idCommande);
      getCommandeById(this.props.route.params.idCommande).then((data) => {
        this.setState({
          selectDisplay: "basket",
          productsInTheBasket: data.produits,
          fournisseurSelectedId: data.idFournisseur,
        });
        getProduitFournisseur(data.idFournisseur).then((data) => {
          this.setState({
            fournisseurListProducts: data,
          });
        });
      });
    }
  }
  // MÉTHODES / METHODS-----------------------------

  //// STATE-----------------------
  _dropDownStateInit() {
    // On récupère la liste de fournisseur et   / We retrieve the supplier list and
    // on la mappe pour la mettre dans la dropdown / we map it to put it in the dropdown
    getFournisseur().then((data) => {
      this.setState({
        fournisseurs: data.map((item) => {
          return { label: item.name, value: item.id };
        }),
      });
    });
  }

  _selectFournisseur(fournisseurId) {
    let productsList = [];

    // On va chercher la liste de produit / We’ll get the product list
    getProduitFournisseur(fournisseurId).then((data) => {
      productsList = data;
      this.setState({
        selectDisplay: "fournisseur",
        fournisseurSelectedId: fournisseurId,
        fournisseurListProducts: productsList,
      });
    });
  }

  _addProductToBasket(productId) {
    const id = productId.toString();
    const newBasket = { ...this.state.productsInTheBasket };

    if (this.state.productsInTheBasket[id] == undefined) {
      newBasket[id] = 1;
    } else {
      newBasket[id] += 1;
    }

    this.setState({ productsInTheBasket: newBasket }, () =>
      console.log("Article ajouté : " + this.state.productsInTheBasket)
    );
  }
  _removeProductFromBasket(productId) {
    const id = productId.toString();
    const newBasket = { ...this.state.productsInTheBasket };
    if (this.state.productsInTheBasket[id] === undefined) {
      return;
    } else if (this.state.productsInTheBasket[id] === 0) {
      delete newBasket[id];
    } else {
      newBasket[id] -= 1;
    }

    this.setState({ productsInTheBasket: newBasket }, () =>
      console.log("Article supprimé : " + this.state.productsInTheBasket)
    );
  }
  //// AFFICHAGE DYNAMIQUE ---------------------------------- / DYNAMIC DISPLAY ----------------------------------
  //// Pseudo-navigation
  _displayScreen() {
    if (this.state.selectDisplay === "fournisseur") {
      console.log("_displayScreen: affichage par fournisseur");
      return this._displayByFournisseur();
    } else if (this.state.selectDisplay === "init") {
      return this._displayInit();
    } else if (this.state.selectDisplay === "basket") {
      console.log("Panier affiché");
      return this._displayBasket();
    } else {
      console.log(
        "_displayWhenSelected : le state de selectDisplay n'est pas déclaré !"
      );
      return;
    }
  }

  _displayInit() {
    // Affichage Initial  / INITIAL DISPLAY
    return (
      <View style={styles.commandChoice_container}>
          {/* SÉLECTION FOURNISSEUR / SUPPLIER SELECTION ----------------------------*/}
        <Text style={styles.text}>Par fournisseur</Text>
        <DropDownPicker
          placeholder="Choix du fournisseur"
          items={this.state.fournisseurs}
          style={{ backgroundColor: "transparent" }}
          containerStyle={styles.dropDownContainerStyle}
          dropDownStyle={styles.dropDownStyle}
          dropDownMaxHeight={phoneHeight * 0.5}
          placeholderStyle={{ color: "white", fontSize: 16 }}
          labelStyle={{ color: "white", fontSize: 14 }}
          arrowColor={"white"}
          onChangeItem={(item) => {
            this._selectFournisseur(item.value);
          }}
        />
      </View>
    );
  }

  _displayTotalProductsInTheBasket() {
    let compteur = 0;
    if (Object.entries(this.state.productsInTheBasket).length > 0) {
      for (let value in this.state.productsInTheBasket) {
        console.log(value);
        compteur += this.state.productsInTheBasket[value];
      }
    }

    return compteur;
  }
  _displayByFournisseur() {
    /* Affichage après sélection du fournisseur / Display after supplier selection */
    console.log("Fournisseur ID: " + this.state.fournisseurSelectedId);
    console.log("Ses produits: " + this.state.fournisseurListProducts[0].name);

    // Affichage
    return (
      <>
        <View
          style={[styles.commandChoice_container, { flexDirection: "row" }]}
        >
          <DropDownPicker
            defaultValue={this.state.fournisseurSelectedId}
            placeholder="Choix du fournisseur"
            items={this.state.fournisseurs}
            style={{ backgroundColor: "transparent" }}
            containerStyle={[styles.dropDownContainerStyle, { flex: 2 }]}
            dropDownStyle={styles.dropDownStyle}
            dropDownMaxHeight={phoneHeight * 0.5}
            placeholderStyle={{ color: "white", fontSize: 16 }}
            labelStyle={{ color: "white", fontSize: 14 }}
            arrowColor={"white"}
            onChangeItem={(item) => {
              this._selectFournisseur(item.value);
            }}
          />
          <View style={styles.panier_container}>
            <TouchableOpacity
              onPress={() => {
                if (this._displayTotalProductsInTheBasket() > 0) {
                  this.setState({ selectDisplay: "basket" });
                } else {
                  Alert.alert("Le panier est vide !");
                }
              }}
            >
              <Image source={this.ico.shop} style={styles.shop_ico} />
            </TouchableOpacity>
            <Text style={styles.badgeCount}>
              {this._displayTotalProductsInTheBasket()}
            </Text>
          </View>
        </View>

        <View style={styles.header_list_container}>
          <Text style={styles.header_list_text}>Produit</Text>
          <Text style={styles.header_list_text}>Prix/Unité</Text>
          <Text style={[styles.header_list_text, { textAlign: "center" }]}>
            Commander
          </Text>
        </View>

        <View style={{ flex: 7 }}>
          <FlatList
            data={this.state.fournisseurListProducts}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={<View />}
            ListHeaderComponentStyle={{ marginTop: "5%" }}
            renderItem={({ item }) => {
              return (
                <View style={styles.productItemBox_container}>
                  <View style={styles.productItemBox_left_container}>
                    <Text style={styles.list_textTitle}>{item.name}</Text>
                    <Text style={styles.text}>{item.ref}</Text>
                  </View>

                  <View style={styles.productItemBox_center_container}>
                    <Text style={styles.list_textTitle}>{item.price}€</Text>
                    <Text style={styles.text}>
                      {" "}
                      / {item.lot} {item.unite}
                    </Text>
                  </View>

                  <View style={styles.productItemBox_right_container}>
                    <LinearGradient
                      elevation={5}
                      colors={["#707070", "#606060", "#404040"]}
                      style={styles.button_gradient}
                    >
                      <TouchableOpacity
                        onPress={() => this._removeProductFromBasket(item.id)}
                      >
                        <Text style={styles.button_action_text}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.button_action_text}>
                        {this._displayNbProductsAdded(item.id)}
                      </Text>

                      <TouchableOpacity
                        onPress={() => this._addProductToBasket(item.id)}
                      >
                        <Text style={styles.button_action_text}>+</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </>
    );
  }

  _displayBasket() {
     // Affichage du Panier / Display of the Basket
    console.log(
      "fournisseurListProducts: " + this.state.fournisseurListProducts
    );
    console.log("productsInTheBasket: " + this.state.productsInTheBasket);
    return (
      <>
        <Text style={styles.title_text}>Panier</Text>

        <View style={styles.header_list_container}>
          <Text style={styles.header_list_text}>Produit</Text>
          <Text style={styles.header_list_text}>Quantité</Text>
          <Text style={[styles.header_list_text, { textAlign: "center" }]}>
            Prix Total
          </Text>
        </View>

        <View style={{ flex: 7 }}>
          <FlatList
            data={this.state.fournisseurListProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              if (
                this.state.productsInTheBasket[item.id.toString()] !== undefined
              ) {
                let qty = this.state.productsInTheBasket[item.id.toString()];
                return (
                  <View style={styles.productItemBox_container}>
                    <View style={styles.productItemBox_left_container}>
                      <Text style={styles.list_textTitle}>{item.name}</Text>
                    </View>

                    <View style={styles.productItemBox_center_container}>
                      <Text style={[styles.text, { textAlign: "center" }]}>
                        {qty}
                      </Text>
                    </View>

                    <View style={styles.productItemBox_right_container}>
                      <Text
                        style={[styles.list_textTitle, { textAlign: "center" }]}
                      >
                        {item.price * qty}€
                      </Text>
                    </View>
                  </View>
                );
              }
            }}
          />
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <Text style={styles.text}>Total :</Text>
          <LinearGradient
            elevation={5}
            colors={["#707070", "#606060", "#404040"]}
            style={styles.button_gradient}
          >
            <TouchableOpacity onPress={() => this._registerCommande()}>
              <Text style={styles.button_action_text}>Valider</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </>
    );
  }
    //// Affichage du nombre ajouté pour un article / Display number added for item
  _displayNbProductsAdded(productId) {
    let nbProduct = this.state.productsInTheBasket[productId.toString()];
    nbProduct = nbProduct == undefined ? 0 : nbProduct;
    return nbProduct;
  }

  // BACK -------------------------
  _registerCommande() {
    const commande = {};
    commande["fournisseur_id"] = this.state.fournisseurSelectedId;
    commande["panier"] = this.state.productsInTheBasket;
    console.log(" Commande : ", commande);
    setCommande(commande);
    Alert.alert("Votre commande est validée. ");
    this.props.navigation.navigate("command_historic");
  }

  // RENDER -----------------------------
  render() {
    return (
      <View style={Theme.styles.container}>
        <View style={styles.header_container}>
          <View style={styles.title_container}>
            <Text style={styles.header_title}>
              Je souhaite effectuer une nouvelle commande
            </Text>
          </View>
        </View>
        <View style={styles.content_container}>{this._displayScreen()}</View>
      </View>
    );
  }
}

// CONSTANTE TAILLE PHONE / PHONE SIZE CONSTANT
const phoneHeight = Dimensions.get("window").height;
const phoneWidth = Dimensions.get("window").width;

// STYLES -----------------------------
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
    // fontWeight: 'bold',
    fontStyle: "italic",
  },
  title_text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  header_container: {
    // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
    ...(Platform.OS !== "android" && {
      zIndex: 10,
    }),
    // alignItems: 'center' ,
    flex: 3,
    width: phoneWidth,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  commandChoice_container: {
   // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
    ...(Platform.OS !== "android" && {
      zIndex: 10,
    }),
    flex: 1,
    marginRight: "3%",
    marginLeft: "3%",
    alignItems: "center",
  },

  dropDownStyle: {
    backgroundColor: "#222",
  },
  dropDownContainerStyle: {
    height: phoneHeight * 0.06,
    width: phoneWidth * 0.9,
    marginBottom: "1%",
    marginTop: "3%",
  },
  panier_container: {
    flex: 1,
    alignItems: "center",
  },
  shop_ico: {
    resizeMode: "contain",
    height: 32,
  },
  badgeCount: {
    position: "absolute",
    right: 28,
    top: 24,
    color: "white",
  },

  title_container: {
    marginTop: "10%",
    width: phoneWidth * 0.5,
  },
  header_title: {
    color: "#e0e0e0",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },

  content_container: {
    flex: 13,
    width: phoneWidth,
    paddingTop: "5%",
    // justifyContent: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'white',
  },

  header_list_container: {
    flex: 1,
    width: phoneWidth,
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderTopWidth: 1,
    borderTopColor: "grey",
    marginTop: "10%",
    paddingTop: "3%",
    paddingBottom: "1%",
    paddingLeft: "3%",
    paddingRight: "2%",
  },

  header_list_text: {
    color: "#90D9F1",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },

  productItemBox_container: {
    height: phoneHeight * 0.11,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: "3%",
    flexDirection: "row",
  },
  productItemBox_left_container: {
    flex: 1,
  },
  productItemBox_center_container: {
    flex: 1,
  },
  productItemBox_right_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  list_textTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    flex: 3,
  },

  button_gradient: {
    padding: "5%",
    borderRadius: 5,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: phoneWidth * 0.4,
    maxHeight: 40,
  },
  button_action_text: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
