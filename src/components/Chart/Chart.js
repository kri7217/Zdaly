import React, { Component } from 'react'
import { Bar,Line } from 'react-chartjs-2'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: this.props.transactions.map(item => item['Date']),
                datasets: [
                    {
                        label: 'Deposit',
                        data: this.props.transactions.map(item => Number(item['Deposit AMT'].replace(/[^0-9.-]+/g,""))),
                        backgroundColor: 'lightgreen'
                    },
                    {
                        label: 'WithDraw',
                        data: this.props.transactions.map(item => Number(item['Withdrawal AMT'].replace(/[^0-9.-]+/g,""))),
                        backgroundColor: 'red'
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div style={{height:'300px',marginTop:'16px'}} className="chart">
                <Line data={this.state.chartData}
                    options={{ maintainAspectRatio: false }}>
                </Line>
                <Bar data={this.state.chartData}
                    options={{ maintainAspectRatio: false }}>
                </Bar>
            </div>
        )
    }
}

export default Chart