import { prismaFindNeighborhoodData } from "@/services/prisma-services";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const neighborhoodData = await prismaFindNeighborhoodData()

        return NextResponse.json(neighborhoodData)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
    }
}