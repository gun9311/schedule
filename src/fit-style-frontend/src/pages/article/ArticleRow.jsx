import React from "react";
import Article from "./Article";
import "./Article.css";

const ArticleRow = (props) => {
    return(
        <div>
            <div className="row-news d-flex justify-content-start">
                {props.article.map((param, index) => <Article key={index} content={param} deleteArticle={props.deleteArticle} deleteMode={props.deleteMode}/>)}
            </div>
        </div>
    );
}

export default ArticleRow;
