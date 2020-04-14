import React, { Component } from 'react';

class ListOfPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            actualPage: 0,
            pagesForDisplay: [],
            totalItemsInState: null
        }
    }

    createPages = (totalItems) => {
        const quantity = Math.ceil(totalItems / 20);
        const result = [];
        for (let i = 0; i < quantity; i++) {
            result.push({
                indexOfPage: i,
                offset: i * 20
            })
        }

        this.setState({
            pages: [...result],
            totalItemsInState: totalItems
        }, () => this.handleList(0))
    }

    handleList = (indexOfPage) => {
        const { pages } = this.state;
        const result = [];
        for (let i = -5; i <= 5; i++) {
            if (!pages[indexOfPage + i]) {
                continue
            }
            result.push(pages[indexOfPage + i])
        }
        this.setState({
            pagesForDisplay: [...result]
        })
    }

    handleClick = (page) => {
        this.props.setOffset(page.offset);
        this.handleList(page.indexOfPage);
    }

    render() {
        const { pages, totalItemsInState, pagesForDisplay } = this.state;
        const { numberOfTotalItems } = this.props;

        if (totalItemsInState !== numberOfTotalItems) {
            this.createPages(numberOfTotalItems);
        }

        return pages.length ? (
            <div className="pages">
                <span className="num-page" onClick={() => this.handleClick(pages[0])}>Początek</span>

                {pagesForDisplay.map((item, index) => {
                    return (
                        <span key={index} className="num-page" onClick={() => this.handleClick(item)}>{item.indexOfPage + 1}</span>
                    )
                })}

                <span className="num-page" onClick={() => this.handleClick(pages[pages.length - 1])}>Koniec</span>
            </div>
        ) : null
    }
}


export default ListOfPages;