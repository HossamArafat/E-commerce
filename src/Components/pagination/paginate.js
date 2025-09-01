import ReactPaginate from 'react-paginate';
import '../../CSS/components/pagination.css'

export default function PaginatedItems({ itemsPerPage, data, setPage, total, perPage }) {
  const pageCount = Math.ceil( total/ perPage);

  function handlePageClick(e) {
    setPage(e.selected + 1)
  }
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName='paginate-container mb-0'
        pageLinkClassName='item-link text-gray'
        activeLinkClassName='bg-primary text-white'
      />
    </>
  );
}