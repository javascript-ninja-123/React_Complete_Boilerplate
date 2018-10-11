import React,{Component,Fragment} from 'react';
import styled, {css}  from 'styled-components';
import {CoinListContainer, CoinListTile} from './CoinList';
import ReactHighcharts from 'react-highcharts';
import ReactDOM from 'react-dom';
import {config} from './Highchart';
import{theme} from './HighChartTheme'
ReactHighcharts.Highcharts.setOptions(theme);

const GreenContainer = styled.span`
    color:green;
    ${props => props.red && css`
      color:red;
    `}
`,
ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  grid-auto-rows: auto;
`

class Dashboard extends Component {

     renderTile = (USD, price, i, red = false) => {
       if(this.props.currentFavorite === this.props.coinNames[i]){
        return(
          <CoinListTile selected={true} key={USD["PRICE"] + i} onClick={() => this.props.onClick(this.props.coinNames[i])}>
            <div>{this.props.coinNames[i]}</div>
            <div>$ {USD["PRICE"]}</div>
            <div>Change <GreenContainer red={red}>{price} %</GreenContainer></div>
          </CoinListTile>
        )
       }
       else{
         return(
           <CoinListTile key={USD["PRICE"] + i} onClick={() => this.props.onClick(this.props.coinNames[i])}>
             <div>{this.props.coinNames[i]}</div>
             <div>$ {USD["PRICE"]}</div>
             <div>Change <GreenContainer red={red}>{price} %</GreenContainer></div>
           </CoinListTile>
         )
       }
     }

    renderPrice = () => (
      this.props.prices.reduce((acc,val,i) => {
        const USD = Object.values(val)[0]["USD"];
        const price = USD['CHANGEPCT24HOUR'].toFixed(2);
        let newVal;
        if(Number(price) < 0){
          newVal = this.renderTile(USD, price, i, true)
        }
        else{
          newVal = this.renderTile(USD, price, i )
         }
        acc.push(newVal)
        return acc;
      }, [])
    )

    renderStuff = () => {
      if(this.props.currentFavorite !== null){
        const myString = this.props.currentFavorite.replace(/\D/g,'');
        if(!Number.isNaN(Number(myString) && Number(myString) !== 0)){
            return <img src={"http://cryptocompare.com" + this.props.list[myString].ImageUrl} alt='crypto image'/>
        }
      }
    }

    mixConfig = () => {
      const data = this.props.chartData.reduce((acc,val,i) => {
        acc.push(val.id)
        return acc;
      },[])

      const series = [
        {
          name:'ids',
          data
        }
      ]
      const y  ={...config,series};
      return y
    }

    render() {
        return (
          <Fragment>
            <CoinListContainer>
                {this.renderPrice()}
            </CoinListContainer>
            <ChartContainer>
              <div>
                {this.renderStuff()}
              </div>
              <ReactHighcharts config={this.mixConfig()}></ReactHighcharts>
            </ChartContainer>
          </Fragment>
        );
    }
}

export default  Dashboard
