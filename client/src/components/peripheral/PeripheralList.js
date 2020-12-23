import React from 'react'

const PeripheralList = ({peripherals, deletePeripheral}) =>{
    const peripheralList = peripherals.length ? (
        peripherals.map(peripheral => {
            return(
                <tr key = {peripheral['uid']} className="column-gateway" onClick={() => {deletePeripheral(peripheral.uid)}}>
                   <td >{peripheral['uid']}</td> 
                   <td >{peripheral['vendor']}</td> 
                   <td >{peripheral['status']}</td> 
                   <td >{peripheral['gatewayId']}</td> 
                </tr>
            )
        })
    ) :(
        <div/>
    );
    return (
        <div>
            <table className="gateways-table">
                <thead className= "table-head">
                    <tr className="container table-head-row">
                        <th className="column-gateway">UID</th>
                        <th className="column-gateway">Vendor</th>
                        <th className="column-gateway">Status</th>
                        <th className="column-gateway">Gateway ID</th>
                    </tr>
                </thead>
                <tbody>   
                    {peripheralList}
                </tbody>
            </table>
        </div>
    )
} 

export default PeripheralList;