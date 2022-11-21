import { LayoutWithSidebar } from "../../layouts/layout-with-sidebar";
import { ListOrder } from "../../features/order/components/list-order";

function ListOrdersPage() {
  return (
    <LayoutWithSidebar>
      <ListOrder />
    </LayoutWithSidebar>
  );
}

export default ListOrdersPage;
