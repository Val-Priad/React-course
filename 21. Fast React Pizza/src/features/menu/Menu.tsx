import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Pizza } from "../services/apiRestaurant";

function Menu() {
  const menu = useLoaderData() as Pizza[];
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;
