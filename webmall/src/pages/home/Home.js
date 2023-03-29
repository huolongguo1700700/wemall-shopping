/**
 * @Description Home Component
 * @author GYX xiao sb!
 * @date 27.03.2023
 */

import React from 'react'

import Header from './components/header/Header'
import Main from './components/main/Main'
import Categories from './components/categories/Categories'
import APItest from '../../test/APItest'

const Home = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <Categories />
            <Main />
            {/*<APItest />*/}
        </div>
    )
}
/**
 * End of Home Component
 */
export default Home