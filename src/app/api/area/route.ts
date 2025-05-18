import { prismaFindAreaData } from "@/services/prisma-services"
import { NextResponse } from "next/server"

export async function GET() {
    try{
        const areaData = await prismaFindAreaData()
        
        return NextResponse.json(areaData)
    }catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
    }
}