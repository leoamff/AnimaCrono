import { useState } from "react"
import { useParams } from "react-router-dom"

export default function Movie() {
    const { id } = useParams()

    return (
        <div>Movie</div>
    )
}