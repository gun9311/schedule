import React from "react";
import "./News.css";

import Gym from "../../assets/gym.jpg";

const News = (props) => {
    return(
        <div className="container-fluid block-news" style={{
            background: `linear-gradient(rgba(41, 31, 30, 1), rgba(41, 31, 30, 0.4)), url("${Gym}"), center`,
            backgroundSize: 'cover'
        }}>
            {props.deleteMode &&
                <button
                    type="button"
                    className="btn-close-modal"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => props.delete(props.content.id)}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            }
            <h2 className="title">{props.content.header}</h2>
            <div className="dateTime title">
                <p>{props.content.dateTime}</p>
            </div>
            <div className="content-news d-flex flex-column">
                <h2 className="title-news">{props.content.header}</h2>
                <p className="content-news-text fw-light">{props.content.content}</p>
                <div>
                    <p>{props.content.dateTime}</p>
                </div>
            </div>
        </div>
    );
}

export default News;