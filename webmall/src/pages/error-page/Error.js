/**
 * @Description Error Component
 * @author GYX xiao sb
 * @date 27.03.2023
*/
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <div className="h-2/5 leading-[50px] text-xl text-center">
                <h1 className="text-3xl font-bold mb-3">Oops!</h1>
                <p className="">Sorry, an unexpected error has occurred.</p>
                <p className="">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}