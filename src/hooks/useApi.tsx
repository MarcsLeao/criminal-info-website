import { AreaData, NeighborhoodData, SeccionalData } from "@/@types/database-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const findAreaData = async () => {
    const { data } = await axios.get<AreaData[]>('/api/area')

    return data
}

export const useFindAreaData = () => {
    const { data, isLoading } = useQuery({queryKey: ['area-data'], queryFn: findAreaData})
    
    return { data, isLoading }
}

const findNeighborhoodData = async () => {
    const { data } = await axios.get<NeighborhoodData[]>('/api/neighborhood')

    return data
}

export const useFindNeighborhoodData = () => {
    const { data, isLoading } = useQuery({queryKey: ['neighborhood-data'], queryFn: findNeighborhoodData})
    
    return { data, isLoading }
}

const findCrimeData = async () => {
    const { data } = await axios.get<SeccionalData>('/api/crime')

    return data
}

export const useFindCrimeData = () => {
    const { data, isLoading } = useQuery({queryKey: ['crime-data'], queryFn: findCrimeData})
    
    return { data, isLoading }
}