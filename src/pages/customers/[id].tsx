import {LayoutWithSidebar} from "../../layouts/layout-with-sidebar";
import {ShowCustomer} from "../../features/customer/components/show-customer";

import {Box, Pagehead} from "@primer/react";

function ShowCustomerPage() {
    return (
        <LayoutWithSidebar>
            <Pagehead sx={{ fontSize: 4, pb: 2 }}>
                Informações do cliente
            </Pagehead>

            <Box width={640}>
                <ShowCustomer />
            </Box>
        </LayoutWithSidebar>
    )
}

export default ShowCustomerPage