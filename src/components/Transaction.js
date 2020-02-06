import React from 'react'
import './Transaction.css'

function transaction(props) {
    return (
        <tr className="transaction">
            <td>{props.item['Account No']}</td>
            <td>{props.item['Date']}</td>
            <td>{props.item['Transaction Details']}</td>
            <td>{props.item['Withdrawal AMT']}</td>
            <td>{props.item['Deposit AMT']}</td>
            <td>{props.item['Balance AMT']}</td>
        </tr>
    )
}

export default transaction