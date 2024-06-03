import React, {useEffect, useState} from "react";
import ArticleRow from "./ArticleRow";
import DateFormat from "../../utils/DateConvert";
import ArrayHelper from "../../utils/ArrayConvert";
import Modal from "../../components/modal/Modal";
import ArticleFormContainer from "./form/ArticleFormContainer";
import "./ArticleBoard.css";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import {TOP_RIGHT} from "../../config/consts/ToastPosition";
import arrow from "../../assets/arrow.png";
import {useRole} from "../../customHooks/useRole";
import {article} from "../../packages/api";


export const ArticleBoard = () => {
    const isModer = useRole("MODERATOR");
    const [reload, setReload] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);

    const [rowArticle, setRowArticle] = useState([]);
    const [rowNum, setRowNum] = useState(1);
    const [hasArticle, setHasArticle] = useState(true);

    // const [, setIsLoadImages] = useState(false);
    useEffect(() => {
        // setIsLoadImages(false);
        article.getArticle(rowNum).then(
            response => {
                let rowArticleData = response.data.article;
                rowArticleData.map(value => value.time = DateFormat.convertDataTimeToData(value.time))
                // getArticleImages(rowArticleData).then(
                //     response => {
                //         rowArticleData = response;
                //     }
                // ).finally(() => setIsLoadImages(true));
                if (rowArticleData.length % 6 !== 0) setHasArticle(false);
                rowArticleData = ArrayHelper.sliceArray(rowArticleData, 3);
                setRowArticle(prevArticle => prevArticle.concat(rowArticleData));
            },
            error => {
                setHasArticle(false);
                // setIsLoadImages(true);
                if (error?.response?.data?.errorCode === 404) {

                }
            }
        )
    },[rowNum, reload])

    // const getArticleImages = async (rowArticleData) => {
    //     for (const value of rowArticleData) {
    //         try {
    //             let response = await article.getArticleImage(value.id);
    //             let imageData = response.data;
    //             value.img = imageData ? URL.createObjectURL(imageData) : null
    //         } catch (error) {}
    //     }
    //     return rowArticleData
    // }

    const updateArticle = () => {
        setRowArticle([]);
        setHasArticle(true);
        if (rowNum === 1) setReload(prevState => !prevState);
        else setRowNum(1);
    }

    const deleteArticle = async (id) => {
        await article.deleteArticle(id).then(
            response => {
                console.log(response)
                updateArticle();
                ToastMessages.success("삭제되었습니다!", TOP_RIGHT);
            },
            error => {
                console.log(error.response)
            }
        )
    }
    // const deleteArticle = async (id) => {
    //     try {
    //         let response = await article.deleteNews(id)
    //         console.log(response);
    //         updateArticle();
    //         ToastMessages.success("Новость удалена!", TOP_RIGHT);
    //     }catch (error) {console.log(error.response)}
    // }

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
                    <h1 className="news-title">뉴스 피드</h1>
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
                {rowArticle && rowArticle.map((param, index) => <ArticleRow key={index} article={param} deleteArticle={deleteArticle} deleteMode={deleteActive}/>)}
                {hasArticle &&
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
                    <ArticleFormContainer setActive={setModalActive} updateArticle={updateArticle}/>
                </Modal>
            }
        </div>
    );
}

