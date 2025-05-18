"use client"

import { useEffect, useState } from "react"
import Select from "react-select"
import { motion } from "framer-motion"
import { HomeSkeleton } from "../skeletons/home-skeleton"
import { useFindAreaData, useFindNeighborhoodData } from "@/hooks/useApi"
import { homeSelectStyles } from "@/app/styles/select-styles"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"

const formSchema = z.object({
    area: z.string(),
    neighborhood: z.string()
})

type FormData = z.infer<typeof formSchema>

export default function Main() {
    const router = useRouter()
    const [inputFocused, setInputFocused] = useState(false)
    const {data: area, isLoading: isFindAreaLoading} = useFindAreaData()
    const {data: neighborhood, isLoading: isFindNeighborhoodLoading} = useFindNeighborhoodData()
    
    const {handleSubmit, setValue, formState: {errors}, reset} = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })
    const [selectedArea, setSelectedArea] = useState<string | null>(null)
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<{value: string, label: string} | null>(null)
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<{value: string, label: string}[] | null>(null)

    const handleAreaSelect = (value: string) => {
        reset()
        setSelectedArea(() => value)
        setValue('area', value)
        setSelectedNeighborhood(() => null)
    }

    const handleNeighborhoodSelect = (value: string) => {
        setValue('neighborhood', value)
        setSelectedNeighborhood({value, label: value})
    }

    useEffect(() => {
        if (selectedArea) {
          const filtered = neighborhood!.filter((neighborhood) => neighborhood.regiao?.Nome_Regiao === selectedArea)
          const map = filtered.map((value) => ({value: value.Nome_Bairro, label: value.Nome_Bairro}))
          setFilteredNeighborhoods(map)
        } else {
          setFilteredNeighborhoods([])
        }
    }, [selectedArea])

    if(isFindAreaLoading || isFindNeighborhoodLoading) return <HomeSkeleton />
    if(area === undefined || neighborhood === undefined) return <div className="font-bold text-4xl">Internal Server Error</div>

    const selectAreaOptions = area!.map((item) => ({
        value: item.Nome_Regiao, label: item.Nome_Regiao
    }))

    const handleForm = (data: FormData) => {
        if(data.area && data.neighborhood){
            router.push(`/info?area=${data.area}&neighborhood=${data.neighborhood}`)
            return 
        }

        return alert('error')
    }
    
    return (
        <section className="bg-zinc-950 overflow-hidden">
            <motion.main className={`flex flex-col lg:grid ${inputFocused ? 'lg:grid-cols-[1fr,1fr] xl:grid-cols-[1fr,2fr]' : 'lg:grid-cols-[2fr,1fr] xl:grid-cols-[2fr,1fr]'} lg:h-screen transition-all duration-500`} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2, }}}}>
                <motion.div className="flex flex-col justify-between items-start w-full gap-4 p-5" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className="flex flex-col justify-between items-start w-full h-full gap-4 sm:p-5 bg-wahite">
                        <div>
                            <p className="text-zinc-500 text-sm">DATABASE PROJECT</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-white font-semibold text-9xl cursor-default">SIC</p>
                            <p className="text-zinc-300 text-lg cursor-default">Sistema de Informação Criminal</p>
                            <div className="flex gap-4 justify-between">
                                <p className="text-white border rounded-lg p-3 sm:p-5 border-zinc-500 cursor-default transition-all">
                                    Sistema de mapeamento de registros de boletins de ocorrência &quot;B.O.&quot; por regiões, permitindo visualizar e comparar os níveis de criminalidade em diferentes áreas urbanas.
                                </p>
                                <p className="text-white border rounded-lg p-3 sm:p-5 border-zinc-500 cursor-default transition-all">
                                    <span className="font-bold">Membros</span>: Lucas Rodrigo, Jhonatan Teles, Joao Carlos, Gustavo Henrique, Eder Vieira, Joao Victor, Joao Vitor, Caio Augusto, Guilherme Barion e Kaua Merces.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                            <p className="py-1 px-4 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">Conheça o risco da sua região.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="h-[450px] lg:h-full flex flex-col p-4 sm:p-8 gap-4 justify-center items-center bg-white" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex justify-center items-center font-medium text-3xl">
                            Bem-vindo ao SIC
                        </p>
                        <p>faça a sua busca</p>
                    </div>
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4 rounded-lg w-full">
                        <div className="flex flex-col w-full">
                            <label>Região</label>
                            <Select
                                styles={homeSelectStyles}
                                options={selectAreaOptions}
                                placeholder="Selecione uma região"
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                onChange={(value) => handleAreaSelect(value!.value)}
                            />
                            {errors.area?.message && <p className="text-red-600 text-sm mt-1">Selecione uma região.</p>}
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Bairro</label>
                            <Select
                                isDisabled={!selectedArea}
                                styles={homeSelectStyles}
                                options={filteredNeighborhoods || []}
                                placeholder="Selecione um bairro"
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                onChange={(value) => handleNeighborhoodSelect(value!.value)}
                                value={selectedNeighborhood}
                            />
                            {errors.neighborhood?.message && <p className="text-red-600 text-sm mt-1">Selecione um bairro.</p>}
                        </div>
                        <div className="w-full mt-4">
                            <button type="submit" className="w-full py-3 textup border rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.main>
        </section>
    )
}