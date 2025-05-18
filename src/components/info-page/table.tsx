"use client"

import { Dispatch, SetStateAction } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useFindCrimeData } from "@/hooks/useApi";
import { SeccionalData, SeccionalItemData } from "@/@types/database-types";
import { SlOptions } from "react-icons/sl";
  
type CrimeTableProps = {
  filteredCrimeData: SeccionalData | null
  fn: ({}:SeccionalItemData) => void
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function CrimeTable({ fn, filteredCrimeData, currentPage, setCurrentPage }: CrimeTableProps) {
    const {data, isLoading} = useFindCrimeData()

    if(isLoading) return <div className="text-4xl font-bold animate-pulse">LOADING</div>
    if(data === undefined) return <div className="text-4xl font-bold animate-pulse">INTERNAL SERVER ERROR</div>

    const formatDate = (date: string | undefined) => {
      const boDate = date ? new Date(date.toString()).toLocaleDateString('pt-BR') : null
      return boDate
    }

    const itensPorPagina = 10
    const inicio = (currentPage - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const dadosPaginados = filteredCrimeData ? filteredCrimeData!.slice(inicio, fim) : data!.slice(inicio, fim)
    const totalPaginas = filteredCrimeData ? Math.ceil(filteredCrimeData!.length / itensPorPagina) : Math.ceil(data!.length / itensPorPagina)
  
    return (
      <div className="min-h-full flex flex-col gap-3">
        <div className="min-h-[500px] lg:border border-gray-300 overflow-hidden rounded-lg">
          <table className="hidden lg:table min-w-full rounded-lg border-gray-300">
            <thead className="text-sm">
              <tr className="text-zinc-800 h-max">
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Nome Vítima</th>
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Nome Delegacia</th>
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Nº BO</th>
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Data BO</th>
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Local Crime</th>
                <th className="hidden xl:table-cell border-b border-r px-3 py-3 text-left font-medium h-[46px]">CEP</th>
                <th className="hidden xl:table-cell border-b border-r px-3 py-3 text-left font-medium h-[46px]">Descrição Crime</th>
                <th className="border-b border-r px-3 py-3 text-left font-medium h-[46px]">Rubrica</th>
                <th className="hidden border-b px-3 py-3 text-left font-medium h-[46px]">Detalhes</th>
              </tr>
            </thead>
            {dadosPaginados.length !== 0 && dadosPaginados.map((item) => (
              <tbody key={item.ID_Seccional}>
                <tr onClick={() => fn(item)} className="hover:bg-gray-100 text-sm text-zinc-800 cursor-pointer">
                  <td className="border-b border-r px-3 py-3 h-[46px]">{item.bo?.vitima?.Nome_Vitima}</td>
                  <td className="border-b border-r px-3 py-3 h-[46px]">{item.Nome_Delegacia || 'N/A'}</td>
                  <td className="border-b border-r px-3 py-3 h-[46px]">{item.bo?.Num_BO}</td>
                  <td className="border-b border-r px-3 py-3 h-[46px]">{formatDate(item.bo?.Data_BO?.toString())}</td>
                  <td className="border-b border-r px-3 py-3 h-[46px]">{item.bo?.crime?.Local_Crime}</td>
                  <td className="hidden xl:table-cell border-b border-r px-3 py-3 h-[46px]">{item.bo?.cep?.Num_CEP || 'N/A'}</td>
                  <td className="hidden xl:table-cell border-b border-r px-3 py-3 h-[46px]">{item.bo?.crime?.Descricao_Crime}</td>
                  <td className="border-b border-r px-3 py-3 h-[46px]">{item.bo?.Rubrica}</td>
                  <td className="hidden border-b border-r px-3 py-3 h-[46px]">
                    <SlOptions className="inline-block p-1 text-lg hover:bg-zinc-300 rounded-full cursor-pointer" />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {dadosPaginados.length === 0 && <div className="py-3 text-zinc-800 text-lg w-full flex justify-center items-center h-46">Sem Resultados</div>}

          <div className="lg:hidden flex flex-col gap-4">
            {dadosPaginados.length !== 0 && dadosPaginados.map((item, index) => (
              <div key={index} className="text-sm group flex flex-col cursor-pointer py-3 px-2 border-2 rounded-lg hover:bg-gray-100" onClick={() => fn(item)}>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium text-zinc-900">Nome:</span>
                    <span>{item.bo?.vitima?.Nome_Vitima}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium text-zinc-900">Nº BO:</span>
                    {item.bo?.Num_BO}
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium text-zinc-900">Nome Delegacia:</span>
                    {item.Nome_Delegacia || 'N/A'}
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium text-zinc-900">Data BO:</span>
                    {formatDate(item.bo?.Data_BO?.toString())}
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium text-zinc-900">Local Crime:</span>
                    {item.bo?.crime?.Local_Crime}
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-zinc-900">Rubrica:</span>
                    {item.bo?.Rubrica}
                  </div>
                  <div className='flex justify-center items-center mt-2'>
                    <span className='m-auto w-full uppercase text-center rounded-xl border font-medium px-4 py-1 group-hover:bg-zinc-950 group-hover:text-white transition-all'>
                      Detalhes
                    </span>
                  </div>
              </div>
            ))}
          </div>

        </div>
          
        <div className="flex justify-between items-center">
            <p className="hidden sm:inline-block text-zinc-800">Total de ocorrências: {filteredCrimeData ? filteredCrimeData.length : data.length}</p>
            <p className="sm:hidden text-zinc-800">Items: {filteredCrimeData ? filteredCrimeData.length : data.length}</p>
            <div className="flex justify-center items-center gap-2">
                <span className="hidden sm:inline-block text-sm text-zinc-800">
                    Página {currentPage} de {totalPaginas}
                </span>
                <button className="flex justify-center items-center text-lg p-1 rounded-lg border border-zinc-400 hover:bg-zinc-950 hover:border-zinc-950 hover:text-white transition-all cursor-pointer" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                    <MdOutlineKeyboardArrowLeft className="inline-block"/>
                </button>
                <button className="flex justify-center items-center text-lg p-1 rounded-lg border border-zinc-400 hover:bg-zinc-950 hover:border-zinc-950 hover:text-white transition-all cursor-pointer" disabled={currentPage === totalPaginas} onClick={() => setCurrentPage((prev) => prev + 1)}>
                    <MdOutlineKeyboardArrowRight className="inline-block"/>
                </button>
            </div>
        </div>      
      </div>
    )
}

  