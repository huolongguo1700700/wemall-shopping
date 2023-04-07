/**
 * @Description LoginForm Component
 * @author GYX xiao sb
 * @date 2023/4/7
 */

import React from 'react'
import tw from 'tailwind-styled-components'

const LoginForm = () => {
    return (
        <div className="w-full h-full flex flex-col justify-around items-center px-12">
            <div className="">Login here</div>
            <InputStyles type="text" placeholder="username" required={true}/>
            <InputStyles type="password" placeholder="password" required={true}/>
            <button onClick={() => {}}
                    className="w-full p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white "
            >
                Login
            </button>
        </div>
    )
}

const InputStyles = tw.input`
    w-full
    p-2
    uppercase-placeholder cursor-pointer
    text-middle
    hover:shadow-inner border-2 border-slate-400 focus:cursor-text
`
/**
 * End of LoginForm Component
 */
export default LoginForm