import React,{Component,Fragment} from 'react';
import styled, {css} from 'styled-components';
import cc from 'cryptocompare';
import './App.css';
import Search from './Search';
import CoinList from './CoinList';
import Dashboard from './Dashboard';

const AppLayout = styled.div`
    padding:2rem 4rem;
`, GridContainer = styled.div`
  display: grid;
  font-size:2rem;
  margin-bottom:4rem;
  grid-template-columns: 20rem auto 10rem 10rem;
`,
  Logo = styled.div`
    font-size:2.5rem;
  `,
  ControlButton = styled.div.attrs({
    active:props => props.active
  })`
  font-size:1.7rem;
   justify-self: end;
   cursor::pointer;
   ${props => props.active && css `
     text-shadow:0 0 6rem #03ff03;
     font-size:1.9rem;
   `}
  `,
  Content = styled.div`

  `

 class APP extends Component {
    state = {
      page:'setting',
      coinList:{},
      filteredCoinList:{},
      favoriteCoins:JSON.parse(localStorage.getItem('cryptoDash')) || [],
      dashboardRenderCoin:JSON.parse(localStorage.getItem('crpytoPrice')) || [],
      prices:[],
      currentFavorite:null
    }

    componentDidMount() {
      this.checkFirstVisit();
      //fetch the coin
      this.fetchCoin();
      this.fetchPrice();
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.state.dashboardRenderCoin !== prevState.dashboardRenderCoin){
        this.fetchPrice();
      }
    }

    fetchCoin = async () => {
      const {Data} = await cc.coinList();
      this.setState({coinList: Data})
    }
    fetchPrice = async () => {
      try{

        let promises =[]
        this.state.dashboardRenderCoin.forEach(coinName => {
          promises.push(cc.priceFull(coinName, 'USD'))
        })
        const prices = await Promise.all(promises)
        this.setState({prices})
      }
      catch(err){
        console.log(err)
      }
    }

    onRemove = (coin,coinKeyName) => {
      const removedCoins = this.state.favoriteCoins.filter(value => value !== coin.CoinName);
      this.setState({favoriteCoins:removedCoins})
      const removeDashboardCoins = this.state.dashboardRenderCoin.filter(value => value !== coinKeyName)
      this.setState({dashboardRenderCoin:removeDashboardCoins})
    }

    onAdd = (coin,coinKeyName) => {
      this.setState({favoriteCoins:[...this.state.favoriteCoins, coin.CoinName]})
      this.setState({dashboardRenderCoin:[...this.state.dashboardRenderCoin, coinKeyName]})
    }

    checkFirstVisit = () => {
      const crptoDashData = localStorage.getItem('cryptoDash');
      if(!crptoDashData){
        this.setState({
          page:'setting',
          firstVisit:true
        })
      }
      else{
        this.setState({
          page:'dashboard',
          firstVisit:false
        });
      }
    }



    displayDashboard = () => this.state.page === 'dashboard'

    displaySetting = () => this.state.page === 'setting'

    confirmFavorites = () => {
      localStorage.setItem('cryptoDash', JSON.stringify(this.state.favoriteCoins))
      localStorage.setItem('crpytoPrice', JSON.stringify(this.state.dashboardRenderCoin));
      this.setState({firstVisit:false,page:'dashboard'})
    }

    loadContent = () => (
      <Fragment>
        <div>Welcome to CryptoDash, please select your favorite coins to begin</div>
      </Fragment>
    )

    onChange = ({target}) => {
      const searchValue = target.value;
      if(searchValue === '' || !searchValue || searchValue.trim().length === 0){
        return this.setState({filteredCoinList:{}});
      }
      const copyList = {...this.state.coinList};
      const filteredCoinList = Object.keys(copyList).reduce((acc,val) => {
        if(copyList[val].CoinName.includes(searchValue)){
          acc[val] = copyList[val];
          return acc;
        }
        return acc;
      }, {});
      this.setState({filteredCoinList})
    }
    render() {
        let tileProps = {
          currentFavorite:this.state.currentFavorite,
          onClick:(coinName) => {
            this.setState({currentFavorite:coinName})
          }
        }


        return (
            <AppLayout>
              <GridContainer>
                <Logo>
                  CrptoDash
                </Logo>
                <div></div>
                {
                  !this.state.firstVisit &&
                  <ControlButton active={this.displayDashboard()} onClick={() => this.setState({page:'dashboard'})}>
                    Dashboard
                  </ControlButton>
                }
                <ControlButton active={this.displaySetting()} onClick={() => this.setState({page:'setting'})}>
                  Setting
                </ControlButton>
              </GridContainer>
              {
                this.state.page === 'setting' &&
                <Fragment>
                  <Content>
                    {
                      this.state.firstVisit && this.loadContent()
                    }
                    <div onClick={this.confirmFavorites}>
                        Confirm favorite coin
                    </div>
                  </Content>
                  <Search onChange={this.onChange}/>
                  <div>
                    {Object.keys(this.state.coinList).length > 0 && <CoinList
                      list={Object.keys(this.state.filteredCoinList).length <= 0 ? this.state.coinList : this.state.filteredCoinList}
                      onRemove={this.onRemove}
                      firstVisit={this.state.firstVisit}
                      onAdd={this.onAdd}
                      favoriteList={this.state.favoriteCoins}/>}
                  </div>
                </Fragment>
              }
              {
                this.state.page === 'dashboard' &&
                <Fragment>
                  {
                    this.state.prices.length <= 0
                    ?
                    <div>Loading fetching the prices</div>
                    : <Dashboard prices={this.state.prices} coinNames={this.state.favoriteCoins} {...tileProps} list={this.state.coinList}/>
                  }
                </Fragment>
              }
            </AppLayout>
        );
    }
}

export default APP
