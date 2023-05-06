import React, { Component } from "react";
import Items from "./Items";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  
   
 capitalFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
 }
  constructor(props) {
    super(props);

    this.state = {
      articles: [ ],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `News App- ${this.capitalFirstLetter(this.props.category)}`
  }
  async updateNews(pageNo){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd39a4359ff46eda3f79587fdb79fea&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){

    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd39a4359ff46eda3f79587fdb79fea&page=1&pageSize=${this.props.pageSize}`
    //this.setState({loading: true})
    //let data = await fetch(url);
    //let parsedData = await data.json()
    //this.setState({
      //articles: parsedData.articles,
      //totalArticles: parsedData.totalResults,
      //loading: false
      this.updateNews();
    //})
  }

   //handlePrevBtn = async ()=> {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd39a4359ff46eda3f79587fdb79fea&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
    //this.setState({loading: true})
    //let data = await fetch(url);
    //let parsedData = await data.json()
    //this.setState({
      //articles: parsedData.articles,
     // page: this.state.page -1,
      //loading: false
   // })
   // this.updateNews();

 // }

  //handleNextBtn = async ()=> {
    //if (this.state.page +1 < (Math.ceil(this.state.totalArticles/this.props.pageSize) )) {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd39a4359ff46eda3f79587fdb79fea&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
    //this.setState({loading: true})
    //let data = await fetch(url);
    //let parsedData = await data.json()
    //this.setState({
      //articles: parsedData.articles,
      //page: this.state.page +1,
      //loading: false
   // })
  //}
  //else {

  //}
  //this.updateNews();
 // }

  fetchMoreData = async() => {
    this.setState({page: this.state.page +1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fd39a4359ff46eda3f79587fdb79fea&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })


  };


  render() {
    return (
      <>
        
          <h1 style={{margin: '15px', marginTop: '90px'}} className="mx-1 text-center">Top {this.capitalFirstLetter(this.props.category)} Headlines News</h1>
           { this.state.loading && <Spinner />}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader= {<Spinner/>}
        >
        <div className="container my-3">
          <div className="row">
          {this.state.articles.map((element)=> {
            return  <div className="col-md-4" key={element.url} >
              <Items source={element.source.name} author={element.author?element.author:"Unknown"} date={element.publishedAt} title={element.title?element.title.slice(0,45): " "} description={element.description?element.description.slice(0,75): " "} imageUrl={element.urlToImage?element.urlToImage:'https://images.livemint.com/img/2022/12/09/600x338/Nifty_1667546435835_1670548265677_1670548265677.jpg'} newsUrl={element.url} />
          </div>
          })}
          </div>
          </div>
       </InfiniteScroll>

              {/*<div className="my-2 d-flex justify-content-between"> 
                <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevBtn} className="btn btn-dark">&larr; Previous</button>
                <button disabled={this.state.page +1 >= (Math.ceil(this.state.totalArticles/this.props.pageSize) )} type="button" onClick={this.handleNextBtn} class="btn btn-dark">Next &rarr; </button>

        </div> */}
      </>
    );
  }
}

export default News;
