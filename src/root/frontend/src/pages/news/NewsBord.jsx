import React, { Component } from "react";
import NewsRow from "./NewsRow";

export default class NewsBord extends Component {

    state = {
        header: '',
        content: '',
        dateTime: '',
        imgURL: ''
    }

    render() {
        const newsArray = [
            {
                title: 'ЛЭТИ переводит студентов',
                dateTime: '25.06.2001',
                content: 'Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.',
                imgURL: 'test'
            },
            {
                title: 'ЛЭТИ переводит студентов',
                dateTime: '25.06.2001',
                content: 'Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.',
                imgURL: 'test'
            },
            {
                title: 'ЛЭТИ не переводит студентов',
                dateTime: '25.06.2001',
                content: 'Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.Приятно, граждане, наблюдать, как элементы политического процесса могут быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! В частности, экономическая повестка сегодняшнего дня позволяет выполнить важные задания по разработке дальнейших направлений развития. Мы вынуждены отталкиваться от того, что разбавленное изрядной долей эмпатии, рациональное мышление прекрасно подходит для реализации модели развития.',
                imgURL: 'test'
            }
        ]
        return(
            <div className="d-flex justify-content-center">
                <div className="news-board">
                    <NewsRow news={newsArray}/>
                    <NewsRow news={newsArray}/>
                </div>
            </div>
        );
    }
}