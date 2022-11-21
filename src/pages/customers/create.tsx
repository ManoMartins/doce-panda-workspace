import {CreateCustomer} from "../../features/customer/components/create-customer";
import {LayoutWithSidebar} from "../../layouts/layout-with-sidebar";
import {Box, Pagehead} from "@primer/react";

function CreateCustomerPage() {
    return (
        <LayoutWithSidebar>
            <Pagehead sx={{ fontSize: 4, pb: 2 }}>
                Cadastrar cliente
            </Pagehead>

            <Box width={640}>
                <CreateCustomer />
            </Box>
        </LayoutWithSidebar>
    )
}

export default CreateCustomerPage