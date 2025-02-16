import React from "react";
import Pagination from "react-js-pagination";
import "../../CSS/Pagination.css";

export default function PaginationBar({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
  totalPages,
}) {
  return (
    <Pagination
      activePage={currentPage} // 현재 페이지
      itemsCountPerPage={itemsPerPage} // 한 페이지당 보여줄 아이템 개수
      totalItemsCount={totalItems} // 전체 데이터 개수
      pageRangeDisplayed={5} // 표시할 페이지 버튼 개수
      onChange={handlePageChange} // 페이지 변경 시 실행되는 함수
      totalPages={totalPages}
      prevPageText={"‹"} // 이전 버튼
      nextPageText={"›"} // 다음 버튼
    />
  );
}
