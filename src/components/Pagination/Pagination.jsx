import React from "react";
import './Pagination.scss';


export const Pagination = (
    {current = current,
    totalPages = totalPages,
    firstPage = firstPage,
    lastPage = lastPage,
    handlePagination  = () => {}}
) => {

    console.log(totalPages, 'totalPages')



    var arr = Array.from({ length: totalPages }, (_, i) => i + 1);
    const totalPagesNo = () => (
        arr?.map((value, index) => {
            return (
                <div key={index} className={`${current - 1 == index ? 'page-active' : ''} pagination-indexing`} onClick={() => handlePagination(value)}>
                    <span>{value}</span>
                </div>
            );
        })
    );
    return (
        <div className="pagination-continer">
            <div>
                <div className="pagination-wrapper">
                   {!firstPage && <div className={`${firstPage ? '' : 'pagination-disable'} pagination-mover`} onClick={() => handlePagination(current-1)}><span>Previous</span></div>}
                    <div className="total-pages">{totalPagesNo()}</div>
                    {!lastPage && <div className={`${lastPage ? '' : 'pagination-disable'} pagination-mover`} onClick={() => handlePagination(current+1)}><span>Next</span></div>}
                </div>
            </div>
        </div>
    );

}