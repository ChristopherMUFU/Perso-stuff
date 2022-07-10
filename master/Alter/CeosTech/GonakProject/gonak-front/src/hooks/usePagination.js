// Allow to create a pagination : an array of datas splitted on several different pages, with page numbers to navigate in between
import { useEffect, useState } from "react";

const usePagination = (data, dataLimit, pageLimit) => {
     // pagination system 
     const [pages] = useState(Math.round(data.length / dataLimit));
     const [currentPage, setCurrentPage] = useState(1);
 
     
     // Scroll to top smoothly when we change pages
     useEffect(() => {
         window.scrollTo({ behavior: 'smooth', top: '0px' });
     }, [currentPage]);
 
     // Functions to change pages
     function goToNextPage() {
         const maximumNumberPages = data.length / dataLimit;
         if (currentPage !== maximumNumberPages) {
             setCurrentPage((page) => page + 1);
         }
     }
 
     function goToPreviousPage() {
         if (currentPage !== 1) {
             setCurrentPage((page) => page - 1);
         }
     }
 
     // When the user click on a page number
     function changePage(event) {
         const pageNumber = Number(event.target.textContent);
         setCurrentPage(pageNumber);
     }
 
     //Return number of posts egal to dataLimit
     // Will calculate exactly which slice of the data object to return
     const getPaginatedData = () => {
         const startIndex = currentPage * dataLimit - dataLimit;
         const endIndex = startIndex + dataLimit;
         return data.slice(startIndex, endIndex);
     };
 
     // Function to know how many page number we can display with a limit
     const getPaginationGroup = () => {
         let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
         const pagesArray = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
         const maximumNumberPages = data.length / dataLimit;
         return pagesArray.filter((page) => page <= maximumNumberPages)
     };

     return {
         pages,
         currentPage,
         goToNextPage,
         goToPreviousPage,
         changePage,
         getPaginatedData,
         getPaginationGroup
     }
 

}

export default usePagination;