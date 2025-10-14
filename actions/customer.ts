'use server';

import { prismaClient } from "@/lib/prisma";
import { Customer } from "@prisma/client";

export async function CreateCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    try {
        const response = await prismaClient.customer.create({
            data
        })
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getCustomers(): Promise<Customer[]> {
    try {
        const customer = await prismaClient.customer.findMany({})
        return customer
    } catch (error) {
        console.log(error)
        throw error
    }
}