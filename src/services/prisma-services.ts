import { AreaData, NeighborhoodData, SeccionalData } from "@/@types/database-types"
import { prisma } from "@/lib/prisma"

export async function prismaFindCrimeData(): Promise<SeccionalData> {

    const data = await prisma.seccional.findMany({
      take: 2000,  
      select: {
          ID_Seccional: true,
          Nome_Seccional: true,
          Nome_Departamento: true,
          Nome_Delegacia: true,
          bo: {
            select: {
              Rubrica: true,
              Num_BO: true,
              Data_BO: true,
              Ano_BO: true,
              vitima: {
                select: {
                  Nome_Vitima: true,
                  RG: true,
                }
              },
              crime: {
                select: {
                  Descricao_Crime: true,
                  Local_Crime: true,
                  DataHora_Crime: true,
                }
              },
              cep: {
                select: {
                  Num_CEP: true,
                  logradouro: {
                    select: {
                      Nome_Logradouro: true,
                      Num_Logradouro: true,
                      bairro: {
                        select: {
                          Nome_Bairro: true,
                          regiao: {
                            select: {
                              Nome_Regiao: true,
                              Nome_Cidade: true,
                              Nome_Municipio: true,
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })

    return data
}

export async function prismaFindAreaData(): Promise<AreaData[]> {
    const areaData = await prisma.regiao.findMany({
        distinct: ['Nome_Regiao'],
        select: { Nome_Regiao: true, ID_Regiao: true }
    })
    
    return areaData
}

export async function prismaFindNeighborhoodData(): Promise<NeighborhoodData[]> {
    const areaData = await prisma.bairro.findMany({
        distinct: ['Nome_Bairro'],
        select: { Nome_Bairro: true, regiao: {select: { Nome_Regiao: true }} }
    })
    
    return areaData
}