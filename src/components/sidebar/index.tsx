import { NavList } from "@primer/react";
import { NavListItem } from "../nav-list-item";

function Sidebar() {
  return (
    <NavList>
      <NavListItem href={"/dashboard"} label={"Dashboard"} />
      <NavListItem href={"/customers"} label={"Clientes"} />
      <NavListItem href={"/orders"} label={"Pedidos"} />
    </NavList>
  );
}

export { Sidebar };
