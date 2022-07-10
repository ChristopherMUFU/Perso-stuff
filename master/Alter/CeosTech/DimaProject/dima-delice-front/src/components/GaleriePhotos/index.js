import React, { Component } from "react";
import "./galerie.css";
class GaleriePhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      rowsToDisplay: 6,
      expended: false,
    };
    this.showMore = this.showMore.bind(this);
  }
  showMore() {
    this.state.rowsToDisplay === 6
      ? this.setState({
          rowsToDisplay: this.state.items?.length,
          expanded: true,
        })
      : this.setState({ rowsToDisplay: 6, expanded: false });
  }

  componentDidMount() {
    fetch(
      "https://graph.instagram.com/me/media?fields=permalink,id,caption,media_type,media_url,thumbnail_url,timestamp,username&access_token=IGQVJYUElmNWphTVdGRV9JWHJQMU9Vb1I0NV90bXpCaUdsUjg0UjZA6aWhfUEJJT3Q1SmN2NHlacEI0NHpVNDJVaDR5aFhqLXhGMTBNSldnWE00SXN6LXExcFhNby1sdk5iQkdlTTBuMDhDN2U3akdCdAZDZD"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result["data"]);
          this.setState({
            isLoaded: true,
            items: result["data"],
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, items, showMore } = this.state;
    if (error) {
      return;
      <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="">Chargement…</div>;
    } else {
      return (
        <div className="galeriePhotos" id="galeriePhotos">
          <div className="galerie_title">Galerie Photos</div>
          <h2>
            {" "}
            <p>Dima Delice  </p>
          </h2>

          <div className="photos">
            <ul className="photos__list">
              {this.state.items?.slice(0, this.state.rowsToDisplay)
                .map((item) => (
                  <li key={item.name}>
                    <img className="photo" src={item.media_url} alt="img" />
                  </li>
                ))}
            </ul>
          </div>
          <div className="more__photos" onClick={this.showMore}>
            {this.state.expanded ? <div>Voir moins</div> : <div>Voir plus</div>}
          </div>
        </div>
      );
    }
  }
}
export default GaleriePhotos;
