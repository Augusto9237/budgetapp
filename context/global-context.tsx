'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
export type Customer = {
  cnpj: string;
  businessName: string;
  tradeName: string;
  buyer: string;
  contact: string;
  email: string;
};

export type Product = {
  name: string;
  reference: string;
  code: string;
  brand: string;
  price: number;
};

export interface BucketProduct {
  product: Product;
  quantity: number;
  discount: number;
}

export const GlobalContext = createContext({} as any); // Initialize with an empty object of any type

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [productsBucket, setProductsBuckets] = useState<BucketProduct[]>([]);

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("selectedCustomer") || '[]')
    if (storedCustomer) {
      setSelectedCustomer(storedCustomer);
    }
  }, []);
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("budget-app/products") || '[]')
    if (storedProducts) {
      setProductsBuckets(storedProducts);
    }
  }, []);

  useEffect(() => {
    if (selectedCustomer !== null) {
      localStorage.setItem('selectedCustomer', JSON.stringify(selectedCustomer))
    }
  }, [selectedCustomer])

  useEffect(() => {
    if (productsBucket.length > 0) {
      localStorage.setItem('budget-app/products', JSON.stringify(productsBucket))
    }
  }, [productsBucket])


  const addProductToBucket = (product: Product, quantity: number, discount: number) => {
    const productIsAlreadyOnBucket = productsBucket.some(
      (cartProduct) => cartProduct.product.code === product.code,
    );

    if (productIsAlreadyOnBucket) {
      setProductsBuckets((prev) =>
        prev.map((bucketProduct) => {
          if (bucketProduct.product.code === product.code) {

            return {
              ...bucketProduct,
              quantity: bucketProduct.quantity + quantity,
            };
          }

          return bucketProduct;
        }),
      );
      return;
    }

    setProductsBuckets((prev) => [...prev, { product, quantity, discount }]);
    return;
  };

  const updateProductQuantity = (product: Product, quantity: number, discount: number) => {
    const productIsAlreadyOnBucket = productsBucket.some(
      (cartProduct) => cartProduct.product.code === product.code,
    );

    if (productIsAlreadyOnBucket) {
      setProductsBuckets((prev) =>
        prev.map((bucketProduct) => {
          if (bucketProduct.product.code === product.code) {

            return {
              ...bucketProduct,
              discount: discount,
              quantity: quantity,
            };
          }

          return bucketProduct;
        }),
      );
      return;
    }

  }

  const removeProductFromBudget = (productCode: string) => {
    setProductsBuckets((prev) => {
      // Filtra o array removendo o produto com o código passado
      const updatedProducts = prev.filter((product) => product.product.code !== productCode);

      // Se não houver mais produtos, remove o item do localStorage
      if (updatedProducts.length === 0) {
        localStorage.removeItem('budget-app/products');
      }

      // Retorna o array atualizado
      return updatedProducts;
    });

    toast.error('Produto removido do orçamento');
  };



  return (
    <GlobalContext.Provider value={{ productsBucket, selectedCustomer, setSelectedCustomer, addProductToBucket, updateProductQuantity, removeProductFromBudget }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
