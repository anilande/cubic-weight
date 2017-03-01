import React, {Component} from 'react';
import ReactDom from 'react-dom';

import List from './components/list';
import data from './data/data';
import Page from './components/page';
import Filter from './components/filter';

const API_PATH = "/api/products";

class AvgCubicWeight extends Component {

    constructor () {
        super(...arguments);

        this.catch = [];

        this.pageNo = 1;

        this.data = data.objects;

        this.dataUrl = API_PATH + "/1";

        this.paggingState = 'next';

        this.state = {
            itemsList: data.objects,
            showNext: true,
            showPrev: false
        };

        this.nextUpdate = this.nextUpdate.bind(this);
        this.prevUpdate = this.prevUpdate.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.getCategoryList = this.getCategoryList.bind(this);
    }

    componentWillMount() {
        var self = this;

        fetch(this.dataUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(myBlob) {
                self.dataUrlNext = data.next;
                self.catch[self.pageNo] = {url: self.dataUrl, data};
                self.setData(data.objects, true, false);
                self.pageNo++;
            });
    }

    getCategoryList() {
        let catList = [];

        this.data.forEach(function (item, index) {
            catList[index] = item.category;
        });

        return [...new Set(catList)].sort();
    }

    setData(data, next, prev) {
        this.data = data;

        this.setState({itemsList: data, showNext: next, showPrev: prev});
    }

    nextUpdate(){
        const self = this;

        if (this.dataUrlNext !== null) {
            if (this.paggingState === 'prev') {
                this.pageNo++;
            }

            if (this.catch[this.pageNo]) {
                this.setData(this.catch[this.pageNo].data.objects, true, true);
                this.pageNo++;
                this.paggingState = 'next';
            }
            else {
                fetch(this.dataUrlNext)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        self.catch[self.pageNo] = {url: self.dataUrlNext, data};
                        self.dataUrlNext = data.next;
                        
                        if (data.next === null) {
                            self.setData(data.objects, false, true);
                        }
                        else {
                            self.pageNo++;
                            self.paggingState = 'next';
                            self.setData(data.objects, true, true);
                        }
                    });
            }
        }
    }

    prevUpdate(){
        if (this.paggingState === 'next') {
            this.pageNo--;
        }

        const
            self = this,
            previousPage = this.pageNo - 1;
       
        if (this.catch[previousPage]) {
            let data = this.catch[previousPage].data;
            if (previousPage <= 1) {
                this.setData(data.objects, true, false);
            }
            else {
                this.pageNo--;
                this.paggingState = 'prev';
                this.setData(data.objects, true, true);
            }
            this.dataUrlNext = data.next;
        }
        else {
            fetch(API_PATH + this.catch[previousPage].url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                self.catch[previousPage].data = data.objects;
                
                if (previousPage <= 1) {
                    self.setData(data.objects, true, false);
                }
                else {
                    self.pageNo--;
                    self.paggingState = 'prev';
                    self.setData(data.objects, true, true);
                }
                self.dataUrlNext = data.next;
            });
        }
    }

    applyFilters(filter) {
        let
            newData= [],
            i = 0;

        this.data.forEach(function (item) {
            if (item.category === filter) {
                newData[i++] = item;
            }
        });

        this.setState({itemsList: newData});
    }

    render () {
        const data = this.state.itemsList;

        return (
            <div className="app-page">
                <Filter options={this.getCategoryList()} onChange={this.applyFilters}/>
                <div className="lists-wrapper">
                    <List itemsList={data} />
                </div>
                
                <span className="prev">{ this.state.showPrev ? <Page nextPage={this.prevUpdate} label="prev" /> : null }</span>

                <span className="next">{ this.state.showNext ? <Page nextPage={this.nextUpdate} label="next" className="next"/> : null }</span>
            </div>
        );
    }
}

// ReactDom.render(<AvgCubicWeight />, document.getElementById('appContainer'));

export default (AvgCubicWeight);
