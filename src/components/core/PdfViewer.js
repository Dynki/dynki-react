import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Icon, Pagination, Tooltip } from 'antd';
import styles from 'styled-components';
import ScrollToTop from './ScrollToTop';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledWrapper = styles.div`
    canvas {
        width: 100% !important;
        height: auto !important;
    }
`;

const StyledDocument = styles(Document)`
    box-shadow: 0 30px 40px 0 rgba(16, 36, 94, 0.2);
`;

const StyledToolbar = styles.div`
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    padding: 15px;
    width: 70%;
    margin-bottom: 10px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 100%;
    }
`;

const Container = styles.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: 15px;
    background-color: #BDB9B8;
    min-height: 1228px;
`;

const StyledPage = styles(Page)`
    // .react-pdf__Page__canvas {
    //     width: 860px!important;
    // }
`;

const StyledDownload = styles.a`
    margin-left: auto;
    padding: 5px;
    i { 
        font-size: 21px;
    }
`;

const PdfViewer = ({ url }) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>Previous</a>;
        }
        if (type === 'next') {
          return <a>Next</a>;
        }
        return originalElement;
    }

    const onChangePage = (page, pageSize) => {
        setPageNumber(page);
    }

    return (
        <ScrollToTop>
            <Container>
                <StyledToolbar>
                    <Pagination 
                        onChange={onChangePage}
                        itemRender={itemRender} 
                        pageSize={1}
                        total={numPages} 
                    />
                    <StyledDownload href={url} download>
                        <Tooltip title="Download PDF Document">
                            <Icon type="download"/>
                        </Tooltip>
                    </StyledDownload>
                </StyledToolbar>
                <StyledWrapper>
                    <StyledDocument
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => alert('Error while loading document! ' + error.message)}
                    >
                        <StyledPage pageNumber={pageNumber} scale={1.0}/>
                    </StyledDocument>
                </StyledWrapper>
            </Container>
        </ScrollToTop>
    )
}

export default PdfViewer;