// This file defines the expected response shape from the API
export interface Lookup {
    def:def[]
}

interface def{
    text:string,
    pos:string,
    tr:tr[]

}

interface tr{
    text:string,
    pos:string,
    syn:field[],
    mean:field[],
    ex:textWithTr[]
}

interface field{
    text:string
}

interface textWithTr extends field{
    tr:field[]
}
