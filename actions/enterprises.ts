'use server'

import { prismaClient } from "@/lib/prisma"
import { Enterprise } from "@prisma/client"

export async function getEnterprises(): Promise<Enterprise[]> {
    const response = await prismaClient.enterprise.findMany()
    return response
}

export async function getEnterpriseById(id: number): Promise<Enterprise | null> {
    const response = await prismaClient.enterprise.findUnique({
        where: {
            id
        }
    })
    return response
}