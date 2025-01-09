'use server'

import { prismaClient } from "@/lib/prisma"
import { Budget } from "@prisma/client"

export async function createBudget(enterpriseId: number): Promise<Budget> {
    const response = await prismaClient.budget.create({
        data: {
            enterpriseId,// replace with appropriate customerId
            status: "IN_PROCESS"
        }
    })
    return response
}

export async function getBudgets(){
    const response = await prismaClient.budget.findMany({
        include: {
            enterprise: true,
            customer: true,
            items: {
                include: {product: true}
            }
        }
    })
    return response
}

export async function getBudgetById(id: number){
    const response = await prismaClient.budget.findUnique({
        where: {
            id
        },
        include: {
            enterprise: true,
            customer: true,
            items: {
                include: {product: true}
            }
        }
    })
    return response
}