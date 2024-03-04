import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"
import { RotatingLines } from "react-loader-spinner"
import styles from "./TableCoin.module.css"
import { marketChart } from "../../services/cryptoApi"
import Chart from "./Chart"

function TableCoin({ coins, isLoading, currency, setChart }) {


  return (
    <div className={styles.container}>
      {isLoading ? <RotatingLines strokeColor="#3874ff" strokeWidth="2" /> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{coins.map(coin => (<TableRow coin={coin} key={coin.id} currency={currency} setChart={setChart} />))}</tbody>
        </table>)}
    </div>
  )
}

export default TableCoin
const TableRow = ({ coin, currency, setChart ,chart}) => {


  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(coin.id));
      const json = await res.json();

      setChart({ ...json, coin });
      
    } catch (error) {
      setChart(null)
    }
  };






  return (<tr>
    <td>
      <div className={styles.symbol}><img src={coin.image} onClick={showHandler} />
        <span>{coin.symbol.toUpperCase()}</span>
      </div></td>
    <td>{coin.name}</td>
    <td>{currency === "usd" && <span>$</span>}{coin.current_price.toLocaleString()}</td>
    <td className={coin.price_change_percentage_24h > 0 ? styles.success : styles.error}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
    <td>{coin.total_volume.toLocaleString()}</td>
    <td><img src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown} alt={coin.name} /></td>


  </tr>)
}