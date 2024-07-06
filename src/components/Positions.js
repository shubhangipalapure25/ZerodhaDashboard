import React, { useEffect, useState } from "react";
import axios from "axios";
// import { positions } from "../data/data";  //static data

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

useEffect(()=>{
   axios.get('http://localhost:3002/allPositions').then((res)=>{
    //  console.log(res);
    setAllPositions(res.data);
   });

},[]);

  return (<>
  <h3 className="title">Position <span>{allPositions.length}</span></h3>
  <div className="order-table">
    <table>
      <tr>
        <th>Product</th>
        <th>Instrument</th>
        <th>Qty.</th>
        <th>Avg</th>
        <th>LTP</th>
        <th>P&L</th>
        <th>Chg.</th>
      </tr>
        {
        allPositions.map((stock,index) =>{
          const currVal = stock.price*stock.qty;
      const isProfit = currVal - stock.avg*stock.qty >=0.0;
      const profClass = isProfit ? "profit" : "loss";
      const dayClass = stock.isLoss?"loss":"profit";

        return  <tr key={index}>
            <td>{stock.product}</td>
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg.toFixed(2)}</td>
            <td>{stock.price.toFixed(2)}</td>
            <td className={profClass}>{(currVal - stock.avg *stock.qty).toFixed(2)}</td>
            <td className={dayClass}>{stock.day}</td>
            </tr>
        })
        }
    </table>
  </div>
  </>);
};

export default Positions;