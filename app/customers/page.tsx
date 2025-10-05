import { CustomerList } from "@/components/customer-list";
import { Customer } from "@/context/global-context";

const customers: Customer[] = [
    {
        cnpj: "12.345.678/0001-90",
        businessName: "Food SA",
        tradeName: "Northern Delights",
        buyer: "John Smith",
        contact: "(555) 123-4567",
        email: "john.smith@delights.com",
    },
    {
        cnpj: "23.456.789/0001-01",
        businessName: "Advanced Technology Ltd.",
        tradeName: "Tech Solutions",
        buyer: "Jane Doe",
        contact: "(555) 987-6543",
        email: "jane.doe@techsolutions.com",
    },
    {
        cnpj: "34.567.890/0001-12",
        businessName: "Construction and Renovations EIRELI",
        tradeName: "Prime Builders",
        buyer: "Michael Brown",
        contact: "(555) 234-5678",
        email: "michael.brown@primebuilders.com",
    },
    {
        cnpj: "45.678.901/0001-23",
        businessName: "Quick Transport ME",
        tradeName: "Fast Transports",
        buyer: "Emily Davis",
        contact: "(555) 345-6789",
        email: "emily.davis@fasttransports.com",
    },
    {
        cnpj: "56.789.012/0001-34",
        businessName: "Clothing Store Ltd.",
        tradeName: "Fashion Store",
        buyer: "William Garcia",
        contact: "(555) 456-7890",
        email: "william.garcia@fashionstore.com",
    },
    {
        cnpj: "67.890.123/0001-45",
        businessName: "Plastic Industry SA",
        tradeName: "Plastics Master",
        buyer: "Olivia Wilson",
        contact: "(555) 567-8901",
        email: "olivia.wilson@plasticsmaster.com",
    },
    {
        cnpj: "78.901.234/0001-56",
        businessName: "Total Security ME",
        tradeName: "Secure Protection",
        buyer: "David Martinez",
        contact: "(555) 678-9012",
        email: "david.martinez@secureprotection.com",
    },
    {
        cnpj: "89.012.345/0001-67",
        businessName: "Renewable Energy Ltd.",
        tradeName: "EcoEnergy",
        buyer: "Sophia Taylor",
        contact: "(555) 789-0123",
        email: "sophia.taylor@ecoenergy.com",
    },
    {
        cnpj: "90.123.456/0001-78",
        businessName: "Business Consulting EIRELI",
        tradeName: "Business Solutions",
        buyer: "James Anderson",
        contact: "(555) 890-1234",
        email: "james.anderson@businesssolutions.com",
    },
    {
        cnpj: "01.234.567/0001-89",
        businessName: "Education and Training SA",
        tradeName: "Learn More",
        buyer: "Isabella Thomas",
        contact: "(555) 901-2345",
        email: "isabella.thomas@learnmore.com",
    },
];


export default function Page() {
    return (
        <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-xl max-lg:px-5 mx-auto min-h-screen max-h-screen overflow-auto">
            <CustomerList customers={customers} />
        </main>
    );
}