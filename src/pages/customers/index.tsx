import {LayoutWithSidebar} from "../../layouts/layout-with-sidebar";
import {ListCustomer} from "../../features/customer/components/list-customer";

function ListCustomersPage() {
    return (
        <LayoutWithSidebar>
            <ListCustomer />
        </LayoutWithSidebar>
    )
}

export default ListCustomersPage