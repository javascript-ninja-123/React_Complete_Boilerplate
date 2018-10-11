import React,{Component,Fragment} from 'react';
import styled, {css} from 'styled-components';

export const CoinListContainer = styled.div`
  margin:3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: auto;
  grid-gap:1rem;
  text-align: center;
`;
export const CoinListTile = styled.div`
  padding:1rem;
  border:1px solid white;
  transition:linear .3s ease-in;
  img{
    width:5rem;
  }
  &:hover{
    border:1px solid #03ff03;
    cursor:pointer;
  }
  ${props => props.selected && css `
    border:1px solid #03ff03;
  `}
  ${props => props.favorite && props.show && css`
    &:hover{
      border:1px solid red;
      cursor:pointer;
    }
  `}
  ${props => props.favorite && !props.show && css`
    pointer-events:none;
    opacity:.5;
    &:hover{
      border:1px solid red;
      cursor:pointer;
    }
  `}
`


class CoinList extends Component {

    onRemove = (coin,coinKeyName) => this.props.onRemove(coin,coinKeyName)

    onAdd = (coin,coinKeyName) => this.props.onAdd(coin,coinKeyName)

    createCoinListTile = (val,i, favorite = false, show = false, firstVisit = true) => (
      <CoinListTile key={i + val} firstvisit={firstVisit} show={show} favorite={favorite} onClick={favorite ? () => this.onRemove(this.props.list[val],val) : () => this.onAdd(this.props.list[val],val)}>
        <p>{this.props.list[val].CoinName}</p>
        <p>{this.props.list[val].Symbol}</p>
        <img src={"http://cryptocompare.com" + this.props.list[val].ImageUrl} alt='crypto image'/>
      </CoinListTile>
    )

    renderKeys = () => (
      Object.keys(this.props.list).slice(0,100).reduce((acc,val,i) => {
        let newVal;
        if(this.props.favoriteList.includes(this.props.list[val].CoinName)){
          newVal = this.createCoinListTile(val, i, true)
        }
        else{
          newVal = this.createCoinListTile(val, i)
        }
        acc[i] = newVal;
        return acc;
      }, new Array(this.props.list))
    )
    renderFavorite = () => (
      Object.keys(this.props.list).slice(0,100).reduce((acc,val,i) => {
        let newVal;
        if(this.props.favoriteList.includes(this.props.list[val].CoinName)){
          if(this.props.firstVisit){
          newVal = this.createCoinListTile(val, i, true, true)
          }
          else{
            newVal = this.createCoinListTile(val, i, true)
          }
        }
        acc.push(newVal);
        return acc;
      }, [])
    )

    render() {
        return (
          <Fragment>
            <div>Favorite</div>
            <CoinListContainer>
              {this.renderFavorite()}
            </CoinListContainer>
            <div>Normal</div>
            <CoinListContainer>
                  {
                    this.renderKeys()
                  }
            </CoinListContainer>
          </Fragment>
        );
    }
}

export default CoinList
