import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';

const cache=[];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPage:0,
      currentPage:1,
      results:[],
      allList:[],
      likeList:[],
      dislikeList:[],
      priorities:[],
      search:''
    }

    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSortByTitle = this.handleSortByTitle.bind(this);
    this.handleLikeItem = this.handleLikeItem.bind(this);
    this.handleDislikeItem = this.handleDislikeItem.bind(this);
    this.handleSortByPriority = this.handleSortByPriority.bind(this);
    this.handleSearchByTitle = this.handleSearchByTitle.bind(this);
  }

  fetchData(page = 1) {
    if(cache[page]){
      this.setState({
        currentPage:page,
        results:cache[page]
      })
    }else{
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page='+page)
      .then(response => response.json())
      .then(json => {
        cache[json.page] = json.results;
        this.setState({
          totalPage:json.total_pages,
          currentPage:json.page,
          results:json.results,
        })
      })
    }
  }

  handlePrevPage(event) {
    if(this.state.currentPage > 1) {
      if(!this.state.search) {
        this.setState({search:''});
      }
      cache[this.state.currentPage] = this.state.results;
      this.fetchData(this.state.currentPage-1);
    }
  }

  handleNextPage(event) {
    if(this.state.currentPage < this.state.totalPage){
      if(this.state.search) {
        this.setState({search:''});
      }
      cache[this.state.currentPage] = this.state.results;
      this.fetchData(this.state.currentPage+1);
    }
  }

  componentWillMount() {
    this.fetchData(this.state.currentPage);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.search) {
    }
  }

  handleChangeItem(title, index) {
    const newResults = [...this.state.results];
    newResults[index].title = title;
    this.setState({results:newResults});
  }

  handleAddItem(item, listId = 1) {
    if(listId === 1) {
      for(let result of this.state.results) {
        if(result.title.toUpperCase() === item.title.toUpperCase()){
          return false;
        }
      }
      this.setState({
        results:[item, ...this.state.results],
        priorities:[0, ...this.state.priorities]
      });
      return true;
    } else if(listId === 2) {
      this.setState({likeList:[...this.state.likeList, item]});
    } else if(listId === 3) {
      this.setState({dislikeList:[...this.state.dislikeList, item]});   
    }
  }

  handleRemoveItem(index, listId) {
    if(listId === 1) {
      this.setState({
        results:[...this.state.results.slice(0, index), ...this.state.results.slice(index + 1, this.state.results.length)],
        priorities:[...this.state.priorities.slice(0, index), ...this.state.priorities.slice(index + 1, this.state.priorities.length)]
      });
    } else {
      if(listId === 2) {
        this.setState({likeList:[...this.state.likeList.slice(0, index), ...this.state.likeList.slice(index + 1, this.state.likeList.length)]});
      }else if(listId === 3) {
        this.setState({dislikeList:[...this.state.dislikeList.slice(0, index), ...this.state.dislikeList.slice(index + 1, this.state.dislikeList.length)]});
      }
    }
  }

  handleSortByTitle(event) {
    const sortedResults = [...this.state.results];
    sortedResults.sort(function(a, b) {
      if(a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      }else {
        return -1;
      }
    });
    this.setState({results:sortedResults});
  }

  handleLikeItem(index, listId) {
    if(listId === 2) {
      return;
    } else{
      if(listId === 1) {
        this.handleAddItem(this.state.results[index], 2);
      } else if(listId === 3) {
        this.handleAddItem(this.state.dislikeList[index], 2);      
      }
      this.handleRemoveItem(index, listId);
    }
  }

  handleDislikeItem(index, listId) {
    if(listId === 3) {
      return;
    } else {
      if(listId === 1) {
        this.handleAddItem(this.state.results[index], 3);
      } else if(listId === 2) {
        this.handleAddItem(this.state.likeList[index], 3);      
      }
      this.handleRemoveItem(index, listId);
    }
  }

  sortArrayByPriority({arr, prio}) {
    if(arr.length !== prio.length) {
      return;
    }
    for(let i = 0; i < arr.length; i++) {
      for(let j = i + 1; j < arr.length; j++) {
        if(prio[i] < prio[j]) {
          let swap = arr[i];
          arr[i] = arr[j];
          arr[j] = swap;
          swap = prio[i];
          prio[i] = prio[j];
          prio[j] = swap;
        }
      }
    }
    return {arr, prio};
  }

  handleSortByPriority(index, priority = 0) {
    if(priority.isNaN) {
      return;
    }
    const sortObj = {
      arr:[...this.state.results],
      prio:[...this.state.priorities]
    }
    if(!sortObj.prio.length) {
      for(let i = 0; i < sortObj.arr.length; i++) {
        sortObj.prio.push(0);
      }
    }
    sortObj.prio[index] = priority;
    const sortedObj = this.sortArrayByPriority(sortObj);
    
    this.setState({
      priorities:sortedObj.prio,
      results:sortedObj.arr
    });
  }

  handleSearchByTitle(event) {
    const term = event.target.value;
    if(term){
      const searchResults = [];
      this.state.results.map(result => {
        if(result.title.search(new RegExp(term,'i')) > -1) {
          searchResults.push(result);
        }
      });
      this.setState({
        search:term,
        allList:searchResults
      });
    } else {
      this.setState({
        search:term
      });
    }

  }

  renderItemList(listId) {
    return <ItemList 
      listId={listId}
      data={ 
        listId === 1 ? 
        (this.state.search ? this.state.allList : this.state.results) :
        (listId === 2 ? this.state.likeList : this.state.dislikeList)
      }
      handleChange={this.handleChangeItem} 
      handleRemove={this.handleRemoveItem}
      handleLike={this.handleLikeItem}
      handleDislike={this.handleDislikeItem}
      handleSort={this.handleSortByPriority}
      handleAdd={this.handleAddItem} />
  }

  render() {
    return (
      <div className="App row">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="App-intro col-md-12">
          <h3>All Items List</h3>
          <div className="row">
            <div className="col-md-6 row">
              <div className="col-md-6">
                <button className="sort-btn btn btn-default btn-block" onClick={this.handleSortByTitle}>Sort By Title</button>
              </div>
              <div className="col-md-6">
                <input className="form-control" onChange={this.handleSearchByTitle} value={this.state.search} placeholder="Search by title" />
              </div>
            </div>
            <div className="col-md-6">
              <AddItem handleAdd={this.handleAddItem} />
            </div>
            <div className="col-md-12">
              {this.renderItemList(1)}            
              <span className="glyphicon glyphicon-minus btn btn-default" onClick={this.handlePrevPage}></span>
              <span>---- {this.state.currentPage} ----</span>
              <span className="glyphicon glyphicon-plus btn btn-default" onClick={this.handleNextPage}></span>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <hr />
          <div className="col-md-6">
            <h3>Like Items List</h3>
              {this.renderItemList(2)}
          </div>

          <div className="col-md-6">
            <h3>Dislike Items List</h3>
              {this.renderItemList(3)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
