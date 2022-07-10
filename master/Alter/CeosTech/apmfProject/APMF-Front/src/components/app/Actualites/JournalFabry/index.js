import './styles.css';
import React, { useState, useEffect } from "react";
import { sendrequest } from "../../../../middlewares/request"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from "react-js-pagination";

// import hook
import usePagination from '../../../../hooks/usePagination';

import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
        marginTop: theme.spacing(2),
      },
  },
}));

const ItemsCountPerPage = 4;

const JournalFabry = () => {
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



    const classes = useStyles();
    const [journaux, setJournaux] = useState([]);
    const [journauxLoaded, setJournauxLoaded] = useState(false);

    //Maximum number of item per page
    const dataLimit = 4;

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
        getPaginationGroup 
    } = usePagination(journaux, dataLimit, pageLimit);
   
    useEffect(() => {
       getJournaux();
      }, []);

    //get API sur https://apmf-siteweb.herokuapp.com/journaux/
    const getJournaux = async () => {
        try {
            // Send the request
            const response = await sendrequest('GET', 'journaux/');
            const journauxData = [...response['data']];
            setJournaux(journauxData);
            setJournauxLoaded(true);
        } catch (e) {
            setJournauxLoaded(true);
        }
    }

    return (
        <div id="journalFabry-page">
            <div className={classes.root}>

                {journaux.length !== 0 && journauxLoaded &&
                    //show the posts, a certain number (dataLimits) of posts at a time
                    journaux.slice(bounds[0], bounds[1]).map((journal) => (
                            <Grid container spacing={5} className="journalFabry-Item">
                                <Grid item xs={12} sm={12} md={6}>
                                    <img src={journal.photo} alt="fabry"></img>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <h4> {journal.titre} </h4>
                                    <br></br>
                                    <p className="actualite-text-Download"><u> 
                                        <a
                                            href={journal.journal}
                                            target="_blank"
                                        > 
                                            Télécharger
                                        </a> 
                                    </u></p>
                                    <br></br>
                                    <div className="Journal-text">
                                        <p> {parse(journal.text)} </p>
                                    </div>
                                </Grid>
                            </Grid>
                    ))
                }  
                    
                {journaux.length === 0 && journauxLoaded && (
                    <p style={{textAlign: "center"}}>Nous sommes désolés, nous n'avons aucun journal de Fabry en ligne pour l'instant, revenez bientôt !</p>
                )}


                   {/* 
                   //show the pagination
                    //it consists of next and previous buttons
                    //along with page numbers, in our case, 5 page
                    //numbers at a time
                   */} 
               
                {journaux.length !== 0 && journauxLoaded && (                    

                
                    <div
                    className="Paginate"
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

                )}
        </div>
          
        </div>
    )
}

export default JournalFabry;