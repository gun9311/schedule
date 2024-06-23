import React from "react";
import "./Article.css";
import Gym from "../../assets/gym.jpg";
import {CloseBtn} from "../../components/closebtn/CloseBtn";
// import { deleteArticle } from "../../packages/api/rest/article";

const Article = ({deleteMode, content, deleteArticle}) => {
    let image, color;
    if (content.imgUrl) {
        //  image = content.imgurl;
         image = encodeURI(content.imgUrl);
         color = 0.6;
    } else {
         image = Gym;
         color = 1;
    }

    const style = {
        background: `linear-gradient(rgba(0, 0, 0, ${color}), rgba(0, 0, 0, 0.4)), center / cover no-repeat url("${image}")`,
    }
    
    const handleClick = (href) => {
        // window.location.href = href
        window.open(href, '_blank'); // 새 창에서 열기
    }

    return(
        <div className={"container-fluid block-news" + (deleteMode ? "" : " none-delete-mode")} style={style}>
            {deleteMode && <CloseBtn onClickEvent={() => deleteArticle(content.id)}/> }
            <h4 className="title">{content.title}</h4>
            <div className="dateTime">
                <p>{content.time}</p>
            </div>
            <div className="content-news d-flex flex-column"  onClick={() => handleClick(content.href)}>
                <h3 className="title-news">{content.title}</h3>
                <h6 className="content-news-text fw-light">{content.content}</h6>
                <div>
                    <p>{content.time}</p>
                </div>
            </div>
        </div>

    );
}

export default Article;