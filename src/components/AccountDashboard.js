import React, { Component } from 'react'
import axios from 'axios'
import Transaction from './Transaction'
import PageItem from './PageItem/PageItem'
import Chart from './Chart/Chart'
import './AccountDashboard.css'

class AccountDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            currPageTransactions: [],
            searchCriterianResults: [],
            currPage: 1,
            filter: ''
        }
    }

    componentDidMount() {

        axios.get("https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/bankAccount")
            .then(res => {
                console.log(res.data)
                this.setState({
                    transactions: res.data,
                    currPageTransactions: res.data.slice(0, 10)
                })
            }).catch(err => console.log(err))
    }

    pageChangedClickHandler = (pageNo) => {
        let pageStart = 10 * (pageNo - 1)
        let transactions = this.state.searchCriterianResults.length > 0 ? this.state.searchCriterianResults : this.state.transactions
        this.setState({
            currPage: pageNo,
            currPageTransactions: transactions.slice(pageStart, pageStart + 10)
        })
    }

    searchCriteriaChangeHandler = (e) => {
        console.log(e.target.value)
        if (e.target.value.trim()) {
            this.state.transactions.filter(transac => transac['Transaction Details'].includes(e.target.value))
            this.setState({
                filter: e.target.value,
                searchCriterianResults: this.state.transactions.filter(transac => transac['Transaction Details'].includes(e.target.value)),
                currPageTransactions: this.state.transactions.filter(transac => transac['Transaction Details'].includes(e.target.value)).slice(0, 10)

            })
        }
        else {
            this.setState({
                filter: '',
                searchCriterianResults: [],
                currPageTransactions: this.state.transactions.slice(0, 10)
            })
        }

    }

    render() {

        let transactions = null;
        let paginationStrip = null;
        let transaction = this.state.searchCriterianResults.length > 0 ? this.state.searchCriterianResults : this.state.transactions

        if (this.state.currPageTransactions.length > 0) {
            paginationStrip = (
                [...Array(Math.round(transaction.length / 10))]
                    .map((e, i) => <PageItem pageNo={i + 1}
                        pageChangedClickHandler={() => this.pageChangedClickHandler(i + 1)}
                        key={i}>{i + 1}</PageItem>)
            )

            transactions = (
                <div>
                    <table>
                        <thead>
                            <tr className="headerRow">
                                <th>Acc No</th>
                                <th>Date</th>
                                <th>Transac Detail</th>
                                <th>Withdrawal</th>
                                <th>Deposit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currPageTransactions.map((item, i) => {
                                return <Transaction key={i} item={item}></Transaction>
                            })}
                        </tbody>
                    </table>


                    <div className="paginationStrip">
                        {paginationStrip}
                    </div>
                    <Chart transactions={this.state.transactions}></Chart>

                </div>

            )
        }

        return (
            <div>
                <div style={{ margin: '8px' }}>
                    <input className="search" type="text" value={this.state.filter}
                        onChange={this.searchCriteriaChangeHandler} placeholder="Search Transaction details"></input>
                </div>
                {transactions}
            </div>
        )
    }
}

export default AccountDashboard