//Component1.jsx
import React from 'react';
import '../assets/scss/public.scss'
import _ from 'lodash'

let dataList = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductRow(props){
    let cname="listItem ";
    let isFilter = props.obj.name.indexOf(props.filterText) > -1;
    if(props.inStockOnly){
         cname += props.obj.stocked ? isFilter  ? "show " : "hide " : "hide ";

    }else{
         cname += !props .obj.stocked?"red " : "";
         cname += isFilter ? "show " :"hide ";
    }
    return <p className={cname} ><span>{props.obj.name}</span><span>{props.obj.price}</span></p>;  
}

function ProductCategoryRow(props){
    const objs = props.obj;
    return (
            <div className="block">
                <h5>{props.name}</h5>
                {
                    objs.map((item)=>
                        <ProductRow key={item.name.toString()} obj={item} inStockOnly={props.inStockOnly} filterText = {props.filterText}/>)
                }
            </div>
        )
}

function ProductTable(props){
    const dataList = props.dataList;
    const newList = Object.entries(_.groupBy(dataList,'category'));
    const Comp = newList.map((item)=>
        <ProductCategoryRow key={item[0]} name={item[0]} obj={item[1]} inStockOnly={props.inStockOnly} filterText = {props.filterText}/>
    );


    return (
            <div className="content">
                <h5 className="title"><span>Name</span><span>Price</span></h5>
                <div className="con">
                    {Comp}
                </div>
            </div>
        );
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleStockChange = this.handleStockChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    handleStockChange(e){
        this.props.onStockChange(e.target.checked);
    }
    handleFilterChange(e){
        this.props.onFilterChange(e.target.value);
    }

    render(){
        return (
            <div className="search">
                <input type="text" name="search" value={this.props.filterText} placeholder="Search..."
                onChange = {this.handleFilterChange} /><br/>
                <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleStockChange} />Only show products in stock
            </div>
        );
    }
}


class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {filterText:'',inStockOnly: true};
        this.handleStockChange = this.handleStockChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleStockChange(inStockOnly){
        this.setState({inStockOnly: inStockOnly});
    }
    handleFilterChange(filterText){
        this.setState({filterText: filterText});
    }

    render(){
        const filterText = this.state.filterText;
        const inStockOnly = this.state.inStockOnly;

        return (
                <div className="wraper">
                    <SearchBar  filterText={filterText} inStockOnly={inStockOnly} 
                    onStockChange = {this.handleStockChange} onFilterChange = {this.handleFilterChange} />
                    <ProductTable dataList={dataList} inStockOnly={inStockOnly} filterText = {filterText} />
                </div>
        )
    }
    
}

//导出组件
export default FilterableProductTable;

