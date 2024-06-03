import React, {useEffect, useState} from "react";
import NewsRow from "./NewsRow";
import DateFormat from "../../utils/DateConvert";
import ArrayHelper from "../../utils/ArrayConvert";
import Modal from "../../components/modal/Modal";
import NewsFormContainer from "./form/NewsFormContainer";
import "./NewsBoard.css";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import {TOP_RIGHT} from "../../config/consts/ToastPosition";
import arrow from "../../assets/arrow.png";
import {useRole} from "../../customHooks/useRole";
import {news} from "../../packages/api";


export const NewsBoard = () => {
    const isModer = useRole("MODERATOR");
    const [reload, setReload] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);

    const [rowNews, setRowNews] = useState([]);
    const [rowNum, setRowNum] = useState(1);
    const [hasNews, setHasNews] = useState(true);

    const [, setIsLoadImages] = useState(false);
    useEffect(() => {
        setIsLoadImages(false);
        news.getNews(rowNum).then(
            response => {
                let rowNewsData = response.data.news;
                rowNewsData.map(value => value.dateTime = DateFormat.convertDataTimeToData(value.dateTime))
                getNewsImages(rowNewsData).then(
                    response => {
                        rowNewsData = response;
                    }
                ).finally(() => setIsLoadImages(true));
                if (rowNewsData.length % 6 !== 0) setHasNews(false);
                rowNewsData = ArrayHelper.sliceArray(rowNewsData, 3);
                setRowNews(prevNews => prevNews.concat(rowNewsData));
            },
            error => {
                setHasNews(false);
                setIsLoadImages(true);
                if (error?.response?.data?.errorCode === 404) {

                }
            }
        )
    },[rowNum, reload])

    const getNewsImages = async (rowNewsData) => {
        for (const value of rowNewsData) {
            try {
                let response = await news.getNewsImage(value.id);
                let imageData = response.data;
                value.img = imageData ? URL.createObjectURL(imageData) : null
            } catch (error) {}
        }
        return rowNewsData
    }

    const updateNews = () => {
        setRowNews([]);
        setHasNews(true);
        if (rowNum === 1) setReload(prevState => !prevState);
        else setRowNum(1);
    }

    // const deleteNews = (id) => {
    //     news.deleteNews(id).then(
    //         response => {
    //             console.log(response)
    //             updateNews();
    //             ToastMessages.success("Новость удалена!", TOP_RIGHT);
    //         },
    //         error => {
    //             console.log(error.response)
    //         }
    //     )
    // }
    const deleteNews = async (id) => {
        try {
            let response = await news.deleteNews(id)
            console.log(response);
            updateNews();
            ToastMessages.success("삭제되었습니다!", TOP_RIGHT);
        }catch (error) {console.log(error.response)}
    }

    return(
        <div className="d-flex justify-content-center">
            <div className="news-board">
                <div>
                    {isModer &&
                        <button className={deleteActive ? 'select' : 'noselect'}
                                onClick={() => setDeleteActive((prev) => !prev)}>
                            <span className='text'>삭제</span>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                                </svg>
                            </span>
                        </button>
                    }
                    <h1 className="news-title">ON THE BOARD</h1>
                    {isModer &&
                        <button className="add-news" onClick={() => setModalActive(true)}>
                            <span className='text'>추가</span>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" transform="rotate(45)" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                                </svg>
                            </span>
                        </button>
                    }
                </div>
                {rowNews && rowNews.map((param, index) => <NewsRow key={index} news={param} deleteNews={deleteNews} deleteMode={deleteActive}/>)}
                {hasNews &&
                    <div className="d-flex justify-content-center">
                        <div>
                            <button className="news-more" onClick={() => setRowNum(rowNum + 1)}><img className="more-news-icon" src={arrow} alt="Fit-Style"/></button>
                        </div>
                    </div>
                }
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
            {isModer &&
                <Modal active={modalActive} setActive={setModalActive} options={{closeBackground: false}}>
                    <NewsFormContainer setActive={setModalActive} updateNews={updateNews}/>
                </Modal>
            }
        </div>
    );
}

