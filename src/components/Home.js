import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

const PER_PAGE = 3;
const Home = () => {
    const [data, setData] = useState([])

    const getData = () => {
        let url = "https://reqres.in/api/users?page=2"
        fetch(url)
            .then(res => res.json())
            .then(resApi => setData(resApi.data))
    }

    useEffect(() => {
        getData()
    }, [])

    const [currentPage, setCurrentPage] = useState(0);     //for pagination
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(data.length / PER_PAGE);

    return (
        <>
            <div className="container">
                <div className="col-8 offset-2 mt-5">
                    <div className="text-danger fs-1 fw-bold text-center">Home</div>
                    <table className='table table-bordered shadow rounded mt-5'>
                        <thead>
                            <tr className='bg-light text-danger'>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(curEle => {
                                    return (
                                        <tr key={curEle.id}>
                                            <td>{curEle.id}</td>
                                            <td>{curEle.first_name}</td>
                                            <td>{curEle.last_name}</td>
                                            <td>{curEle.email}</td>
                                        </tr>

                                    )
                                }).slice(offset, offset + PER_PAGE)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="mb-4 mt-5">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>
            </div>

        </>
    )
}
export default Home
