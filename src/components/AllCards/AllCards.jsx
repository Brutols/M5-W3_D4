import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allBooks, getBooks } from "../../Reducers/bookReducer/bookSlice"
import SingleCard from "../SingleCard/SingleCard"



const AllCards = () => {
    const books = useSelector(allBooks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBooks())
    }, [dispatch])

    return (
        <>
            {books.map((book, i) => {
                return <SingleCard key={i} title={book.title} img={book.img} desc={book.category} asin={book.asin} />
            })}
        </>
    )
}

export default AllCards