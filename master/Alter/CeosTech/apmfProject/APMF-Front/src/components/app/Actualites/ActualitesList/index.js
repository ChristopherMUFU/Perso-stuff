import './styles.css';

import { useSelector} from "react-redux";
import { getNewsState } from "../../../../app/Redux-slices/newsSlice";
import React, { useState } from "react";

import ActualitesCard from "../Templates/ActualitesCard";

import usePagination from '../../../../hooks/usePagination';
import Pagination from "react-js-pagination";


const ItemsCountPerPage = 6;


const ActualitesList = () => {
    const [bounds, setBounds] = useState([0, ItemsCountPerPage]);
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        setBounds([
          (pageNumber - 1) * ItemsCountPerPage,
          pageNumber * ItemsCountPerPage,
        ]);
        window.scrollTo(0, 0);
      };

    const newsData = useSelector(getNewsState).news.newsData; 
    // We check that the array received by the back are not undefined. If it is, we leave a message
//Maximum number of item per page
        const dataLimit = 6;

        //Maximum number of page number per pagination
        const pageLimit = 5;

        // hook pagination
        const { 
            pages,
            currentPage,
            goToNextPage,
            goToPreviousPage,
            changePage,
            getPaginatedData,
            getPaginationGroup,
        } = usePagination(newsData, dataLimit, pageLimit);


    return (
        <div>
            <div id="actualitesList-page">
                {newsData !== undefined && 
                    newsData.slice(bounds[0], bounds[1]).map((contentActual) => (
                    <ActualitesCard 
                        key={contentActual.id}
                        {...contentActual}
                    />
                ))}
            </div>
            
                <div
                style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
                }}
            >

                <Pagination
                activePage={activePage}
                itemsCountPerPage={
                    ItemsCountPerPage
                } /*{bounds[1] - bounds[0] + 1}*/
                totalItemsCount={newsData.length}
                pageRangeDisplayed={ItemsCountPerPage}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                />
            </div>
                
        </div>
    )
}

export default ActualitesList;