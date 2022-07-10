import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Journal from "./Journal";
import Pagination from "react-js-pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "3rem auto",
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
    width: "20%",
  },

  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottom: "1px solid black",
  },

  detail: {
    fontSize: theme.typography.pxToRem(16),
    color: "black",
  },

  color: {
    color: "black",
  },
}));

const ItemsCountPerPage = 4;

export default function JournalsList({ journaux }) {
  const [bounds, setBounds] = useState([0, ItemsCountPerPage]);
  const [activePage, setActivePage] = useState(1);

  const classes = useStyles();

  //fonction permet de traiter le changement de page
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setBounds([
      (pageNumber - 1) * ItemsCountPerPage,
      pageNumber * ItemsCountPerPage,
    ]);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {journaux.length > 0 && (
        <>
          <div className={classes.table}>
            <p className={classes.heading}>Titre</p>
            <p className={classes.heading}>Date de publication</p>
          </div>
          {journaux.slice(bounds[0], bounds[1]).map((journal) => (
            <Journal journal={journal} key={journal.id} />
          ))}
          <hr style={{ marginTop: "2rem" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Pagination
              activePage={activePage}
              itemsCountPerPage={
                ItemsCountPerPage
              } /*{bounds[1] - bounds[0] + 1}*/
              totalItemsCount={journaux.length}
              pageRangeDisplayed={ItemsCountPerPage}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </>
      )}
    </div>
  );
}
