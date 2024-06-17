import React from 'react';

export const Article = ({number,title}) => {
    return (
        <article className="episode">
            <div className="episode__number">{number}</div>
            <div className="episode__content">
                <div className="title">{title}</div>
                <div className="story">
                    <p>정보</p>
                    <p className="story-info">Contact: </p>
                    <p>운영 시간: 9:00 - 20:00 </p>
                    <p>전화번호: +78005553535</p>
                </div>
            </div>
        </article>
    );
};