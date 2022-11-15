import React,{ useEffect, useState, useRef } from 'react'
import axios from 'axios'

const  PokemonList = () => {
    const [data, setData] = useState()
    const [offset, setOffset] = useState(0)
    const limit = useRef(100)
    const url = 'https://pokeapi.co/api/v2/pokemon';
    useEffect(() => {
        (async function getData() {
            await axios
                .get(url, {
                    params: {
                        limit: limit.current,
                        offset,
                    },
                })
                .then((res) => setData(res.data))
                .catch((err) => {
                    console.log(err)
                    // return []
                })
        })()
    }, [offset])
    return (
        <div>
            <div className="p-2">
                <button
                    disabled={!data?.previous}
                    className="btn btn-primary"
                    onClick={() => {
                        if (!!data?.previous) setOffset((prev) => prev - limit.current)
                    }}
                >
                    Presious
                </button>
                <button
                    disabled={!data?.next}
                    className="btn btn-outline-dark"
                    onClick={() => {
                        if (!!data?.next) setOffset((prev) => prev + limit.current)
                    }}
                >
                    Next
                </button>
            </div>
            <table className="table table-striped w-50">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name Pokemon</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.results.map((pokemon, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pokemon.name}</td>
                            <td>
                                <a href={pokemon.url}>Detail</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PokemonList;