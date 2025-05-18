"use client"

import { SeccionalItemData } from "@/@types/database-types";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaUserNinja } from "react-icons/fa6";
import { MdLocalPolice } from "react-icons/md";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: SeccionalItemData | null
}

type CrimeInfoProps = {
    isOpen: boolean
    onClose: () => void
    data: string
}

export function CrimeTableModal({ isOpen, onClose, data }: ModalProps) {
    const date = data?.bo?.Data_BO ? new Date(data.bo.Data_BO.toString()).toLocaleDateString('pt-BR') : null
    const crimeDate = data?.bo?.crime?.DataHora_Crime ? new Date(data.bo.crime.DataHora_Crime.toString()).toLocaleDateString('pt-BR') : null
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="bg-white rounded-lg p-5 shadow-lg w-[90vw] h-[90vh] md:w-[900px] md:h-[700px] max-w-[90vw] max-h-[90vh] relative overflow-hidden overflow-y-scroll">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl">Boletim Ocorrência - {data?.bo?.Num_BO}</h1>
                                <button onClick={onClose} className="px-1 border rounded-lg text-zinc-600 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">✕</button>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-800">Data: {date}</p>
                                <p className="text-sm text-zinc-800">Rubrica: {data?.bo?.Rubrica}</p>
                            </div>
                            
                            <div className="border-b">
                                <h2 className="flex justify-start items-center gap-2">
                                    <FaUser className="inline-block"/>
                                    Dados Vitima
                                </h2>
                                <div className="p-2">
                                    <p>Nome: <span className="text-sm text-zinc-800">{data?.bo?.vitima?.Nome_Vitima}</span></p>
                                    <p>RG: <span className="text-sm text-zinc-800">{data?.bo?.vitima?.RG}</span></p>
                                </div>  
                            </div>

                            <div className="border-b">
                                <h2 className="flex justify-start items-center gap-2">
                                    <FaUserNinja className="inline-block" />
                                    Dados Crime
                                </h2>
                                <div className="p-2">
                                    <p>Data do Crime: <span className="text-sm text-zinc-800">{crimeDate}</span></p>
                                    <p>Descrição: <span className="text-sm text-zinc-800">{data?.bo?.crime?.Descricao_Crime}</span></p>
                                    <p>Local: <span className="text-sm text-zinc-800">{data?.bo?.crime?.Local_Crime}</span></p>
                                    <p>Cep: <span className="text-sm text-zinc-800">{data?.bo?.cep?.Num_CEP}</span></p>
                                    <p>Cidade: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.bairro?.regiao?.Nome_Cidade}</span></p>
                                    <p>Região: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.bairro?.regiao?.Nome_Regiao}</span></p>
                                    <p>Bairro: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.bairro?.Nome_Bairro}</span></p>
                                    <p>Municipio: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.bairro?.regiao?.Nome_Municipio}</span></p>
                                    <p>Logradouro: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.Nome_Logradouro}</span></p>
                                    <p>N° Logradouro: <span className="text-sm text-zinc-800">{data?.bo?.cep?.logradouro?.Num_Logradouro}</span></p>
                                </div>
                            </div>

                            <div className="border-b">
                                <h2 className="flex justify-start items-center gap-2">
                                    <MdLocalPolice className="inline-block" />
                                    Dados Departamento
                                </h2>
                                <div className="p-2">
                                    <p>Delegacia: <span className="text-sm text-zinc-800">{data?.Nome_Delegacia}</span></p>
                                    <p>Departamento: <span className="text-sm text-zinc-800">{data?.Nome_Departamento}</span></p>
                                    <p>Seccional: <span className="text-sm text-zinc-800">{data?.ID_Seccional}</span></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export function CrimeInfoModal({ isOpen, onClose, data }: CrimeInfoProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="bg-white rounded-lg p-6 shadow-lg w-[600px] min-h-[230px] relative overflow-hidden">
                        <div className="flex flex-col gap-5 w-full h-full">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl">Boletim de Ocorrência</h1>
                                <button onClick={onClose} className="px-1 border rounded-lg text-zinc-600 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">✕</button>
                            </div>
                            <div>
                                <p className="text text-zinc-800">{data}</p>
                            </div>

                            <button 
                                type="button" 
                                onClick={onClose}
                                className="ml-auto mt-auto w-max flex justify-center items-center gap-3 h-[38px] px-3 textup rounded-lg border border-zinc-400 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all">
                                Confirmar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}