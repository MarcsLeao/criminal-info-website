type AreaValue = {
    Nome_Regiao: string    
}

export type NeighborhoodData = {
    Nome_Bairro: string  
    regiao: AreaValue | null 
}

export type AreaData = {
    Nome_Regiao: string
    ID_Regiao: number
}

export type CrimeData = {
    Ano_BO: number
    Data_BO: Date
    Num_BO: string
    Rubrica: string
    crime: {
        DataHora_Crime: Date | null
        Descricao_Crime: string
        Local_Crime: string
    } | null
    cep: {
        Num_CEP: number | null
        logradouro: {
            Nome_Logradouro: string
            Num_Logradouro: number | null
            bairro: {
                Nome_Bairro: string
                regiao: {
                    Nome_Cidade: string
                    Nome_Municipio: string
                    Nome_Regiao: string
                } | null
            } | null
        } | null
    } | null
    vitima: {
        Nome_Vitima: string | null
        RG: number | null
    } | null
    seccional: {
        Nome_Delegacia: string
        Nome_Departamento: string
        Nome_Seccional: string
    }[]
}

export type SeccionalData = {
    ID_Seccional: number
    Nome_Seccional: string
    Nome_Departamento: string
    Nome_Delegacia: string
    bo: {
      Rubrica: string
      Num_BO: string
      Data_BO: Date
      Ano_BO: number
      vitima: {
        Nome_Vitima: string | null
        RG: number | null
      } | null
      crime: {
        Descricao_Crime: string
        Local_Crime: string
        DataHora_Crime: Date | null
      } | null
      cep: {
        Num_CEP: number | null
        logradouro: {
          Nome_Logradouro: string
          Num_Logradouro: number | null
          bairro: {
            Nome_Bairro: string
            regiao: {
              Nome_Regiao: string
              Nome_Cidade: string
              Nome_Municipio: string
            } | null
          } | null
        } | null
      } | null
    } | null
}[]

export type SeccionalItemData = {
  ID_Seccional: number
  Nome_Seccional: string
  Nome_Departamento: string
  Nome_Delegacia: string
  bo: {
    Rubrica: string
    Num_BO: string
    Data_BO: Date
    Ano_BO: number
    vitima: {
      Nome_Vitima: string | null
      RG: number | null
    } | null
    crime: {
      Descricao_Crime: string
      Local_Crime: string
      DataHora_Crime: Date | null
    } | null
    cep: {
      Num_CEP: number | null
      logradouro: {
        Nome_Logradouro: string
        Num_Logradouro: number | null
        bairro: {
          Nome_Bairro: string
          regiao: {
            Nome_Regiao: string
            Nome_Cidade: string
            Nome_Municipio: string
          } | null
        } | null
      } | null
    } | null
  } | null
}