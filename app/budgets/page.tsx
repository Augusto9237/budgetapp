import { BudgetList } from "@/components/budeget-list";
import { BudgetItem } from "@/components/budget-item";

enum BudgetStatus {
  IN_PROCESS = "IN_PROCESS",
  SENT = "SENT",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export interface BudgetItem {
  id: number;
  cod: string;
  ref: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}


interface Customer {
  id: number;
  CNPJ: string;
  CPF: string;
  IE: string;
  name: string;
  fantasy: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  email: string;
  phone: string;
  contact: string;
}

interface Enterprise {
  id: number;
  CNPJ: string;
  IE: string;
  corporate_reason: string;
  fantasy: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  email: string;
  phone: string;
  contact: string;
  logo: string;
}

export interface Budget {
  id: number;
  enterprise: Enterprise;
  customer: Customer;
  items: BudgetItem[];
  status: BudgetStatus;
  total: number;
}

export const budgets: Budget[] = [
  {
    id: 1,
    enterprise: {
      id: 1,
      CNPJ: "12.345.680/0001-95",
      IE: '123456789',
      corporate_reason: "Razão Social Teste",
      fantasy: "Fantasia11",
      address: "Rua Teste",
      city: "Belem",
      state: "PA",
      cep: "12345-678",
      email: "john.mclean@examplepetstore",
      phone: "(11) 1234-5678",
      contact: "Fulano",
      logo: "logo.jpg"
    },
    customer: {
      id: 1,
      CNPJ: "12.345.678/0001-90",
      CPF: '',
      IE: '123456789',
      name: "Cliente Teste 1",
      fantasy: "Fantasia Teste 1",
      address: "Rua Teste, 123",
      city: "Cidade Teste",
      state: "Estado Teste",
      cep: "12345-678",
      email: "william.henry.harrison@example-pet-store.com",
      phone: "(11) 1234-5678",
      contact: "Fulano de Tal"
    },
    items: [
      {
        id: 101, // ID do produto
        cod: "PROD-004", // Código do produto
        ref: "REF-120", // Referência do produto
        name: "Produto A",
        quantity: 2,
        unitPrice: 15.99,
        totalPrice: 31.98
      },
      {
        id: 100, // ID do produto
        cod: "PROD-003", // Código do produto
        ref: "REF-123", // Referência do produto
        name: "Produto B",
        quantity: 1,
        unitPrice: 50.00,
        totalPrice: 50.00
      }
    ],
    status: BudgetStatus.IN_PROCESS,
    total: 81.98
  },
  {
    id: 2,
    enterprise: {
      id: 3,
      CNPJ: "12.345.680/0001-95",
      IE: '123456789',
      corporate_reason: "Razão Social Teste",
      fantasy: "Fantasia11",
      address: "Rua Teste",
      city: "Belem",
      state: "PA",
      cep: "12345-678",
      email: "john.mclean@examplepetstore",
      phone: "(11) 1234-5678",
      contact: "Fulano",
      logo: "logo.jpg"
    },
    customer: {
      id: 2,
      CNPJ: "12.345.678/0001-05",
      CPF: '',
      IE: '123456788',
      name: "Cliente Testeeeeee",
      fantasy: "Fantasia Teste 5",
      address: "Rua Teste, 124",
      city: "Cidade Teste",
      state: "Estado Teste",
      cep: "12345-678",
      email: "william.henry.harrison@example.com",
      phone: "(11) 1234-5688",
      contact: "Fulano"
    },
    items: [
      {
        id: 103, // ID do produto
        cod: "PROD-002", // Código do produto
        ref: "REF-125", // Referência do produto
        name: "Produto X",
        quantity: 5,
        unitPrice: 10.00,
        totalPrice: 50.00
      }
    ],
    status: BudgetStatus.SENT,
    total: 50.00
  }
];


export default function Page() {
  return (
    <main className="flex flex-col items-center gap-8 pt-20 pb-5 w-full max-w-screen-lg max-lg:px-5 mx-auto min-h-screen max-h-screen overflow-auto">
      <BudgetList budgets={budgets} />
    </main>
  );
}
