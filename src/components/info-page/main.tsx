"use client"

import { useEffect, useState } from "react"
import Select from "react-select"
import { CrimeTableModal } from "../modal/modal"
import Link from "next/link"
import { LuUserSearch } from "react-icons/lu"
import { BsExclamationTriangle } from "react-icons/bs"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { CrimeTable } from "./table"
import { selectStyles } from "@/app/styles/select-styles"
import { useFindAreaData, useFindCrimeData, useFindNeighborhoodData } from "@/hooks/useApi"
import { InfoSkeleton } from "../skeletons/info-skeleton"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useForm } from "react-hook-form"
import { SeccionalData, SeccionalItemData } from "@/@types/database-types"
import { SlDocs } from "react-icons/sl"
import { RiRepeatLine } from "react-icons/ri"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
    area: z.string(),
    neighborhood: z.string()
})

type FormData = z.infer<typeof formSchema>

export default function InfoPageMain() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {data: area, isLoading: isFindAreaLoading} = useFindAreaData()
    const {data: neighborhood, isLoading: isFindNeighborhoodLoading} = useFindNeighborhoodData()

    const [selectedCrime, setSelectedCrime] = useState<SeccionalItemData | null>(null)
    const [neighborhoodCount, setneighborhoodCount] = useState<{neighborhood: string, count: number} | null>(null)
    const [rubricaCount, setRubricaCount] = useState<{rubrica: string, count: number} | null>(null)
    
    const {data, isLoading} = useFindCrimeData()
    const [filteredCrimeData, setFilteredCrimeData] = useState<SeccionalData | null>(null)

    const searchParams = useSearchParams()
    const areaParam = searchParams.get('area')
    const neighborhoodParam = searchParams.get('neighborhood')

    const {handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })
    const [selectedArea, setSelectedArea] = useState<string | null>(null)
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<{value: string, label: string} | null>(null)
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<{value: string, label: string}[] | null>(null)
    
    const router = useRouter()

    const handleAreaSelect = (value: string) => {
        if(!neighborhood) {
            alert('nt')
            return
        }

        router.push('/info')
        setSelectedArea(() => value)
        setValue('area', value)
        setValue('neighborhood', '')
        setSelectedNeighborhood(() => null)

        const filtered = neighborhood.filter(n => n.regiao?.Nome_Regiao === value)
        const mappedNeighborhoods = filtered.map(n => ({ value: n.Nome_Bairro, label: n.Nome_Bairro }))
        setFilteredNeighborhoods(mappedNeighborhoods)
    }

    const handleNeighborhoodSelect = (value: string) => {
        setValue('neighborhood', value)
        setSelectedNeighborhood({value, label: value})
    }

    const getMostReportedNeighborhood = (data: SeccionalData | undefined) => {
        if (!data) return

        const neighborhoodCount: Record<string, number> = {}

        for (const seccional of data) {
            const bos = Array.isArray(seccional.bo) ? seccional.bo : (seccional.bo ? [seccional.bo] : [])
            
            for (const bo of bos) {
                const neighborhood = bo.cep?.logradouro?.bairro?.Nome_Bairro
                if (neighborhood) neighborhoodCount[neighborhood] = (neighborhoodCount[neighborhood] || 0) + 1
            }
        }

        const mostCommonNeighborhood = Object.entries(neighborhoodCount).sort((a, b) => b[1] - a[1])[0]
      
        return mostCommonNeighborhood[0] && mostCommonNeighborhood[1] ?
            setneighborhoodCount({neighborhood: mostCommonNeighborhood[0], count: mostCommonNeighborhood[1]}) 
            : null
      }

    const getMostCommonRubrica = (data: SeccionalData | undefined) => { 
        if (!data) return
      
        const rubricaCount: Record<string, number> = {}
      
        for (const seccional of data) {
          const bos = Array.isArray(seccional.bo) ? seccional.bo : (seccional.bo ? [seccional.bo] : [])
      
          for (const bo of bos) {
            const rubrica = bo.Rubrica
            if (rubrica) rubricaCount[rubrica] = (rubricaCount[rubrica] || 0) + 1
          }
        }
      
        const mostCommonRubrica = Object.entries(rubricaCount).sort((a, b) => b[1] - a[1])[0]

        return mostCommonRubrica[0] && mostCommonRubrica[1] ? 
        setRubricaCount({rubrica: mostCommonRubrica[0], count: mostCommonRubrica[1]}) 
        : null
    }

    const handleForm = (formData: FormData) => {
        const neighborhood = formData.neighborhood.toLowerCase()
        const region = formData.area.toLowerCase()

        if ((neighborhood || region) && data) {
            const filteredCrimeDataa = data.filter((item) => {
                const bairro = item.bo?.cep?.logradouro?.bairro
                const regiao = bairro?.regiao
        
                const bairroMatch = neighborhood
                ? bairro?.Nome_Bairro.toLowerCase().includes(neighborhood)
                : true
        
                const regiaoMatch = region
                ? regiao?.Nome_Regiao.toLowerCase().includes(region)
                : true
        
                return bairroMatch && regiaoMatch
            })

          setCurrentPage(1)
          setFilteredCrimeData(() => filteredCrimeDataa)
        }
    }

    useEffect(() => {
        if(data) {
            getMostCommonRubrica(data)
            getMostReportedNeighborhood(data)
        }

        if (areaParam && neighborhood && area) {
            setSelectedArea(areaParam)
            setValue('area', areaParam)
        
            const filtered = neighborhood.filter(n => n.regiao?.Nome_Regiao === areaParam)
            const mappedNeighborhoods = filtered.map(n => ({ value: n.Nome_Bairro, label: n.Nome_Bairro }))
            setFilteredNeighborhoods(mappedNeighborhoods)
        
            const selectedNeighborhoodOption = mappedNeighborhoods.find(n => n.value === neighborhoodParam)
            if (selectedNeighborhoodOption) {
              setSelectedNeighborhood(selectedNeighborhoodOption)
              setValue('neighborhood', selectedNeighborhoodOption.value)
            }
        
            if(areaParam && neighborhoodParam && data) handleForm({ area: areaParam, neighborhood: neighborhoodParam })
          }
        }, [areaParam, neighborhoodParam, neighborhood, area, data])

    if(isFindAreaLoading || isFindNeighborhoodLoading || isLoading) return <InfoSkeleton />
    if(area === undefined || neighborhood === undefined || data === undefined) return <div className="font-bold text-4xl">Internal Server Error</div>

    const selectAreaOptions = area!.map((item) => ({
        value: item.Nome_Regiao, label: item.Nome_Regiao
    }))

    return (
        <main className='flex h-screen bag-zinc-300'>
            <CrimeTableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedCrime}/>
            <aside className='hidden sm:flex flex-col justify-start gap-4 items-center p-5  md:min-w-[250px] h-full bg-zinc-950 text-white'>
                <div className='w-full'>
                    <p className='text-sm text-zinc-400'>Serviços</p>
                </div>

                <Link href="/info" className='inline-block w-full'>
                    <button type='button' className='flex gap-4 px-4 py-2 w-full justify-center md:justify-start items-center bg-zinc-900 hover:bg-zinc-800 rounded-lg cursor-pointer transition-all'>
                        <LuUserSearch className='inline-block' />
                        <p className="hidden md:inline-block">Relatório</p>
                    </button>
                </Link>

                <div className='border-t border-zinc-500 py-5 w-full mt-auto'>
                    <Link href="/">
                        <button type='button' className='flex gap-4 px-4 py-2 w-full justify-center md:justify-start items-center bg-zinc-900 hover:bg-zinc-800 rounded-lg cursor-pointer transition-all'>
                            <FaArrowRightToBracket className='inline-block' />
                            <p className="hidden md:inline-block">Início</p>
                        </button>
                    </Link>
                </div>
            </aside>

            <section className='w-full flex flex-col overflow-hidden overflow-y-auto'>
                <div className="flex justify-between items-center px-5 py-2">
                    <div className="w-full py-2 flex justify-between items-center sm:justify-start sm:items-start sm:gap-4 border-b border-gray-300">
                        <div className="sm:border-r border-zinc-300">
                            <div  className="md:h-[70px] flex justify-center items-center gap-2 sm:py-1 transition-all rounded-lg">
                                <SlDocs className="w-[20px] h-[20px] sm:w-[50px] sm:h-[50px] p-[2px] sm:p-3 rounded-lg bg-zinc-100 text-zinc-800 transition-all"/>
                                <div className="mr-1 lg:mr-6">
                                    <p className="whitespace-nowrap rounded-lg text-xs sm:text-sm text-zinc-700 transition-all">Total BOs</p>
                                    <p className="text-xs md:text-base lg:text-xl">{data.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:border-r border-zinc-300">
                            <div  className="md:h-[70px] flex justify-center items-center gap-2 sm:py-1 transition-all rounded-lg">
                                <BsExclamationTriangle className="w-[20px] h-[20px] sm:w-[50px] sm:h-[50px] p-[2px] sm:p-3 rounded-lg bg-zinc-100 text-zinc-800 transition-all"/>
                                <div className="mr-1 lg:mr-6">
                                    <p className="whitespace-nowrap rounded-lg text-xs sm:text-sm text-zinc-700">Maior Risco</p>
                                    <p className="text-xs md:text-base lg:text-xl">{neighborhoodCount?.neighborhood}</p>
                                </div>
                            </div>
                        </div>
                        <div  className="md:h-[70px] flex justify-center items-center gap-2 sm:py-1 transition-all rounded-lg">
                            <RiRepeatLine className="w-[20px] h-[20px] sm:w-[50px] sm:h-[50px] p-[2px] sm:p-3 rounded-lg bg-zinc-100 text-zinc-800 transition-all"/>
                            <div className="mr-1 lg:mr-6">
                                <p className="whitespace-nowrap rounded-lg text-xs sm:text-sm text-zinc-700">Mais Comum</p>
                                <p className="text-xs md:text-base lg:text-xl">{rubricaCount?.rubrica}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleForm)} className='p-5 flex flex-col lg:flex-row justify-start lg:items-end gap-4'>
                    <div className="lg:w-[300px]">
                        <label className="text-sm">Região</label>
                        <Select styles={selectStyles} options={selectAreaOptions || []} onChange={(i) => handleAreaSelect(i?.value || '')} placeholder="Selecione uma região" value={selectedArea ? {value: selectedArea, label: selectedArea} : null}/>
                    </div>

                    <div className="lg:w-[300px]">
                        <label className="text-xs">Bairro</label>
                        <Select styles={selectStyles} options={filteredNeighborhoods || []} onChange={(i) => handleNeighborhoodSelect(i?.value || '')} placeholder="Selecione um bairro" value={selectedNeighborhood}/>
                    </div>

                    <div className="text-sm">
                        <button type="submit" className="w-full lg:w-max flex justify-center items-center gap-3 h-[38px] px-3 textup rounded-lg border border-zinc-400 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all">
                            Buscar
                        </button>
                    </div>
                </form>
                <div className="flex gap-4 px-5">
                    {errors.area?.message && <p className="w-full lg:w-[300px] mb-2 text-red-600 text-sm mt-1">Selecione uma região.</p>}
                    {errors.neighborhood?.message && <p className="w-full lg:w-[300px] mb-2 text-red-600 text-sm mt-1">Selecione um bairro.</p>}
                </div>

                <div className='px-5 h-full'>
                    <CrimeTable 
                        fn={(item: SeccionalItemData | null) => {
                            setSelectedCrime(item)
                            setIsModalOpen(true)
                        }}  filteredCrimeData={filteredCrimeData} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
            </section>
        </main>    
    )
}