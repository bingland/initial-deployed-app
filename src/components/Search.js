import React from 'react'
import './Search.css'

const Search = (props) => {

    return (

        <div className="search">
            <form className="searchForm" onSubmit={props.submit}>
                <input type="text" placeholder="Type a word..." onChange={props.changed} value={props.value} onFocus={props.onfocus} onBlur={props.onblur} onKeyDown={props.onkeydown}></input>
                <input type="submit"></input>

                <div className="autoComplete">
                    <div className="autoItems">
                        {
                            props.auto.map((item, key) => {
                                return (<div className={props.cursor === key ? 'autoItem selected' : 'autoItem'} key={key} onClick={props.onselect}>{item}</div>)
                            })
                        }
                    </div>
                    <div></div>
                </div>
            </form>
        </div>
    )
}

export default Search
