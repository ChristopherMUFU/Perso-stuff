import RestaurantPresentation from "../components/RestaurantPresentation";

const Restaurant= (mapKey) => {
  return (
    <div id='restaurant'>
      <RestaurantPresentation {...mapKey} />
    </div>
  );
};

export default Restaurant;