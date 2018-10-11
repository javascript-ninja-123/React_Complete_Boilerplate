import React,{Component} from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  margin:2rem 0;
`,
SearchInput = styled.input`
  place-self:center left;
`

class Search extends Component {

    render() {
        return (
            <GridContainer>
                <div>Search all coins</div>
                <SearchInput onChange={this.props.onChange}/>
            </GridContainer>
        );
    }
}

export default  Search;
