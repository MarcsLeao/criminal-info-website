import { prismaFindCrimeData } from "@/services/prisma-services";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const crimeData = await prismaFindCrimeData()

        return NextResponse.json(crimeData)
    }catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
    }
}