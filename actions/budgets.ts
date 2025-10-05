'use server'

import { prismaClient } from "@/lib/prisma"
import { Budget } from "@prisma/client"

export async function createBudget(enterpriseId: number): Promise<Budget> {
    const response = await prismaClient.budget.create({
        data: {
            enterpriseId,
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

export async function updateBudget(budgetId: number, customerId: number, items: any[]){
    const response = await prismaClient.budget.update({
        where: {
            id: budgetId
        },
        data: {
            customerId,
            items: {
                deleteMany: {},
                create: items.map((item) => ({
                    quantity: item.quantity,
                    unitPrice: item.product.price,
                    discount: item.discount || 0,
                    total: item.quantity * item.product.price,
                    product: {
                        connect: {
                            id: item.product.id
                        }
                    }
                }))
            }
        }
    })
    return response
}
